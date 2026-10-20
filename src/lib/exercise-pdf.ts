import type { Content, ContentStack, TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces'
import type { ExerciseGrade, ExerciseQuestion, ExportOptions } from './exercise-export'
import { getExerciseExportInfo, getFillBefore } from './exercise-export-data'

const PDF_FONTS: TFontDictionary = {
  WuqingExport: {
    normal: 'WuqingExport-Regular.otf', bold: 'WuqingExport-Bold.otf',
    italics: 'WuqingExport-Regular.otf', bolditalics: 'WuqingExport-Bold.otf',
  },
}

let fontsPromise: Promise<Record<string, string>> | undefined

async function loadFonts(): Promise<Record<string, string>> {
  if (!fontsPromise) {
    fontsPromise = Promise.all(['Regular', 'Bold'].map(async weight => {
      const name = `WuqingExport-${weight}.otf`
      const response = await fetch(`/fonts/${name}`)
      if (!response.ok) throw new Error('PDF 字体加载失败，请检查网络后重试')
      const bytes = new Uint8Array(await response.arrayBuffer())
      let binary = ''
      for (let i = 0; i < bytes.length; i += 8192) {
        binary += String.fromCharCode(...bytes.subarray(i, i + 8192))
      }
      return [name, btoa(binary)] as const
    })).then(entries => Object.fromEntries(entries)).catch(error => {
      fontsPromise = undefined
      throw error
    })
  }
  return fontsPromise
}

// 使用已加载的字体直接生成 PDF，不依赖远程转换服务或打印窗口。
export async function createExercisePdfBlob(definition: TDocumentDefinitions, fonts: Record<string, string>): Promise<Blob> {
  const { default: pdfMake } = await import('pdfmake/build/pdfmake')
  return new Promise((resolve, reject) => {
    // 字体均在 VFS 中，getStream 同步创建文档，排版异常和流异常均可回传到导出界面。
    const stream = pdfMake.createPdf(definition, undefined, PDF_FONTS, fonts).getStream()
    const chunks: ArrayBuffer[] = []
    stream.on('data', (chunk: Uint8Array) => chunks.push(new Uint8Array(chunk).buffer))
    stream.on('error', reject)
    stream.on('end', () => resolve(new Blob(chunks, { type: 'application/pdf' })))
    stream.end()
  })
}

export async function generateExercisePdf(grades: ExerciseGrade[], options: ExportOptions): Promise<Blob> {
  const definition = createExercisePdfDefinition(grades, options)
  const fonts = await loadFonts()
  return createExercisePdfBlob(definition, fonts)
}

function questionContent(question: ExerciseQuestion, index: number, withAnswers: boolean): ContentStack {
  const stack: Content[] = []
  if (question.type === '选择' && question.options) {
    stack.push({ text: `${index + 1}. ${question.stem || ''}`, bold: true, margin: [0, 0, 0, 5] })
    const shortOptions = question.options.every(option => option.length <= 16)
    if (shortOptions) {
      stack.push({ columns: question.options.map((option, i) => ({
        text: `${String.fromCharCode(65 + i)}. ${option}`, width: '*',
      })), columnGap: 8, margin: [0, 0, 0, 4] })
    } else {
      stack.push({ stack: question.options.map((option, i) => ({
        text: `${String.fromCharCode(65 + i)}. ${option}`, margin: [0, 1, 0, 2],
      })), margin: [8, 0, 0, 4] })
    }
  } else {
    stack.push({ text: [
      { text: `${index + 1}. `, bold: true },
      getFillBefore(question, withAnswers),
      { text: withAnswers ? question.answer : '____________', bold: withAnswers, color: withAnswers ? '#1F4E79' : '#333333' },
      question.after || '',
    ], margin: [0, 0, 0, 5] })
  }
  if (withAnswers) {
    const answerIndex = question.answer.charCodeAt(0) - 65
    const answer = question.type === '选择' && question.options?.[answerIndex]
      ? `${question.answer}. ${question.options[answerIndex]}` : question.answer
    stack.push({ text: `【答案】${answer}`, color: '#1F4E79', bold: true, fontSize: 10, margin: [0, 3, 0, 2] })
    stack.push({ text: `【解析】${question.analysis}`, color: '#555555', fontSize: 10 })
  }
  return { stack, margin: [0, 7, 0, 8] }
}

export function createExercisePdfDefinition(grades: ExerciseGrade[], options: ExportOptions): TDocumentDefinitions {
  const info = getExerciseExportInfo(grades, options)
  const answerTag = options.withAnswers ? '含答案与解析' : '无答案版'
  const content: Content[] = [
    { text: '小学英语配套习题集', style: 'title' },
    { text: answerTag, alignment: 'center', fontSize: 13, color: '#1F4E79', margin: [0, 0, 0, 6] },
    { text: `人教精通版 · ${info.scopeText} · 共 ${info.totalQuestions} 题`, alignment: 'center', color: '#666666', fontSize: 10, margin: [0, 0, 0, 18] },
  ]
  if (!options.withAnswers) {
    content.push({ text: '姓名：____________    班级：____________    得分：____________', margin: [0, 0, 0, 12] })
    content.push({ text: '【做题说明】请认真审题，圈出关键词，写出完整答案。', fontSize: 10, color: '#555555', margin: [0, 0, 0, 12] })
  }
  info.grades.forEach((grade, gradeIndex) => {
    content.push({ text: grade.name, style: 'grade', pageBreak: gradeIndex ? 'before' : undefined, headlineLevel: 1 })
    content.push({ text: `版本：${grade.version}`, fontSize: 9, color: '#666666', margin: [0, 0, 0, 10] })
    grade.units.forEach(unit => {
      content.push({
        table: {
          widths: ['*'], headerRows: 1, keepWithHeaderRows: 1, dontBreakRows: true,
          body: [
            [{ stack: [
              { text: `Unit ${unit.num}：${unit.title}`, style: 'unit' },
              { text: `主题：${unit.topic}`, fontSize: 9, color: '#666666', margin: [0, 0, 0, 6] },
            ] }],
            ...unit.questions.map((question, index) => [questionContent(question, index, options.withAnswers)]),
          ],
        },
        layout: {
          hLineWidth: () => 0, vLineWidth: () => 0,
          paddingLeft: () => 0, paddingRight: () => 0,
          paddingTop: () => 0, paddingBottom: () => 0,
        },
        margin: [0, 0, 0, 10],
      })
    })
  })
  return {
    info: { title: `小学英语配套习题集_${info.scopeText}_${answerTag}`, author: '机构备课素材包' },
    pageSize: 'A4', pageMargins: [48, 48, 48, 48],
    defaultStyle: { font: 'WuqingExport', fontSize: 11, lineHeight: 1.35, color: '#222222' },
    styles: {
      title: { fontSize: 22, bold: true, alignment: 'center', margin: [0, 4, 0, 10] },
      grade: { fontSize: 17, bold: true, color: '#1F4E79', margin: [0, 6, 0, 8] },
      unit: { fontSize: 13, bold: true, margin: [0, 8, 0, 5] },
    },
    content,
    header: { text: `小学英语配套习题集 · ${answerTag}`, alignment: 'center', font: 'WuqingExport', fontSize: 8, color: '#888888', margin: [48, 20, 48, 0] },
    footer: (page, pages) => ({ text: `第 ${page} 页 / 共 ${pages} 页`, alignment: 'center', fontSize: 9, color: '#888888', margin: [0, 12, 0, 0] }),
    pageBreakBefore: (node, following) => node.headlineLevel === 1 && following.length === 0,
  }
}
