// 习题集 docx 生成模块
// 复用之前 docx-project 里的 helpers.js 风格，适配 ESM + TypeScript

import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, HeadingLevel, WidthType,
  BorderStyle as BS, ShadingType, PageOrientation, PageBreak, TableLayoutType,
} from 'docx'
import { getExerciseExportInfo, getFillBefore } from './exercise-export-data'

// ============================================================
//  颜色和字体常量（与之前 Word 文档保持一致）
// ============================================================
const C = {
  title: "000000",
  body: "000000",
  section: "1F4E79",
  grey: "555555",
  light: "888888",
  correctAns: "1F4E79",
  headerBg: "EAEAEA",
  warnBg: "FEE2E2",
  warnText: "B22222",
}

const FONT = { ascii: "Times New Roman", eastAsia: "SimSun" }
const FONT_HEI = { ascii: "Times New Roman", eastAsia: "SimHei" }

// ============================================================
//  基础构造函数
// ============================================================

function bodyP(text: string, opts: any = {}): Paragraph {
  return new Paragraph({
    alignment: opts.alignment || AlignmentType.LEFT,
    spacing: { before: opts.before || 60, after: opts.after || 60, line: 312 },
    indent: opts.indent || { firstLine: 0 },
    children: [new TextRun({
      text, size: opts.size || 22,
      color: opts.color || C.body,
      bold: opts.bold || false,
      font: FONT,
    })],
  })
}

function h1(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.LEFT,
    spacing: { before: 360, after: 180, line: 312 },
    children: [new TextRun({ text, size: 32, bold: true, color: C.section, font: FONT_HEI })],
  })
}

function h2(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    alignment: AlignmentType.LEFT,
    spacing: { before: 280, after: 140, line: 312 },
    children: [new TextRun({ text, size: 28, bold: true, color: C.title, font: FONT_HEI })],
  })
}

function h3(text: string): Paragraph {
  return new Paragraph({
    spacing: { before: 200, after: 80, line: 312 },
    children: [new TextRun({ text, size: 24, bold: true, color: C.section, font: FONT_HEI })],
  })
}

function richP(runs: any[], opts: any = {}): Paragraph {
  return new Paragraph({
    alignment: opts.alignment || AlignmentType.LEFT,
    spacing: { before: opts.before || 40, after: opts.after || 40, line: 312 },
    children: runs,
  })
}

function run(text: string, opts: any = {}): TextRun {
  return new TextRun({
    text, size: opts.size || 22,
    bold: opts.bold || false,
    italics: opts.italics || false,
    color: opts.color || C.body,
    font: FONT,
  })
}

function spacer(h = 60): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 0, line: Math.max(h, 40), lineRule: "exact" },
    children: [new TextRun({ text: "·", size: 8, color: "FFFFFF", font: FONT })],
  })
}

function pbPara(): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({ text: "·", size: 1, color: "FFFFFF", font: FONT }),
      new PageBreak(),
    ],
  })
}

// 无边框（用于纯排版表格）。Word 中 NIL 比 NONE 优先级高，能覆盖表格级默认边框。
const NO_BORDER = { style: BS.NIL, size: 0, color: "auto" } as const
const NO_TABLE_BORDERS = {
  top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER,
  insideHorizontal: NO_BORDER, insideVertical: NO_BORDER,
}
const NO_CELL_BORDERS = {
  top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER,
}

// 答案解析单元格；columnSpan 用于与选项行合并成同一张表
function answerCell(answer: string, analysis: string, columnSpan: number): TableCell {
  return new TableCell({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnSpan,
    margins: { top: 100, bottom: 100, left: 160, right: 160 },
    shading: { type: ShadingType.CLEAR, fill: "F7F9FC" },
    borders: {
      left: { style: BS.SINGLE, size: 16, color: "4A7DBD" },
      top: { style: BS.SINGLE, size: 4, color: "D6E0F0" },
      right: { style: BS.SINGLE, size: 4, color: "D6E0F0" },
      bottom: { style: BS.SINGLE, size: 4, color: "D6E0F0" },
    },
    children: [
      richP([
        run("【答案】", { bold: true, color: C.correctAns, size: 21 }),
        run(answer, { color: C.correctAns, bold: true, size: 21 }),
      ], { before: 0, after: 40 }),
      richP([
        run("【解析】", { bold: true, color: C.section, size: 21 }),
        run(analysis, { size: 21 }),
      ], { before: 0, after: 0 }),
    ],
  })
}

function answerBlock(answer: string, analysis: string): Table {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: NO_TABLE_BORDERS,
    rows: [new TableRow({ cantSplit: true, children: [answerCell(answer, analysis, 1)] })],
  })
}

// 选择题：选项行与答案解析行放在同一张表里。
// 相邻的独立表格会被 Word 合并，导致答案块缩进到某一列，因此不能再拆成两张表。
// 固定列宽 + 固定布局，保证多行选项在 Word 中左右严格对齐。
const CONTENT_WIDTH = 9638 // A4 宽 11906 减去左右页边距 1134×2（twips）

function mcQuestionTable(options: string[], answer?: string, analysis?: string): Table {
  const twoCol = Math.max(...options.map(option => option.length)) > 8
  const columns = twoCol ? Math.min(2, options.length) : Math.min(4, options.length)
  const columnWidth = Math.floor(CONTENT_WIDTH / columns)
  const rows: TableRow[] = []

  for (let start = 0; start < options.length; start += columns) {
    rows.push(new TableRow({
      cantSplit: true,
      keepNext: Boolean(answer),
      children: options.slice(start, start + columns).map((opt, i) =>
        new TableCell({
          width: { size: columnWidth, type: WidthType.DXA },
          borders: NO_CELL_BORDERS,
          margins: { top: 30, bottom: 30, left: 80, right: 80 },
          children: [new Paragraph({
            spacing: { before: 0, after: 0, line: 312 },
            children: [new TextRun({
              text: `${String.fromCharCode(65 + start + i)}. ${opt}`,
              size: 22, font: FONT,
            })],
          })],
        })
      ),
    }))
  }

  if (answer) rows.push(new TableRow({ cantSplit: true, children: [answerCell(answer, analysis || '', columns)] }))

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: Array.from({ length: columns }, () => columnWidth),
    layout: TableLayoutType.FIXED,
    borders: NO_TABLE_BORDERS,
    rows,
  })
}

// 填空题段落；答案版让题干与紧随其后的答案解析保持在同一页
function fillBlankP(num: number, before: string, after: string, withAnswers: boolean, answer: string): Paragraph {
  return new Paragraph({
    spacing: { before: 160, after: 80, line: 312 },
    keepNext: withAnswers,
    children: [
      new TextRun({ text: `${num}. `, bold: true, size: 22, font: FONT }),
      new TextRun({ text: getFillBefore({ before, answer }, withAnswers), size: 22, font: FONT }),
      withAnswers
        ? new TextRun({ text: answer, size: 22, font: FONT, color: C.correctAns, bold: true })
        : new TextRun({ text: "____________", size: 22, font: FONT, color: C.light }),
      new TextRun({ text: after, size: 22, font: FONT }),
    ],
  })
}

// 题目段落（带题号+题干）；与选项表保持同页
function questionP(num: number, text: string): Paragraph {
  return new Paragraph({
    spacing: { before: 160, after: 80, line: 312 },
    keepNext: true,
    children: [
      new TextRun({ text: `${num}. `, bold: true, size: 22, font: FONT }),
      new TextRun({ text, size: 22, font: FONT }),
    ],
  })
}

// ============================================================
//  主入口：生成习题 docx 文档
// ============================================================

export interface ExerciseQuestion {
  type: '选择' | '填空'
  stem?: string
  before?: string
  after?: string
  options?: string[]
  answer: string
  analysis: string
}

export interface ExerciseUnit {
  num: number
  title: string
  topic: string
  questions: ExerciseQuestion[]
}

export interface ExerciseGrade {
  id: string
  name: string
  version: string
  units: ExerciseUnit[]
}

export interface ExportOptions {
  format: 'docx' | 'pdf'
  withAnswers: boolean
  scope: string[]  // 空 = 全部，['g4up'] = 单模块，['g5up', 'g5down', 'g6up'] = 合并
}

export async function generateExerciseDocx(
  grades: ExerciseGrade[],
  options: ExportOptions
): Promise<Blob> {
  const { withAnswers } = options

  // 按 scope 过滤
  const info = getExerciseExportInfo(grades, options)
  const targetGrades = info.grades

  const allChildren: any[] = []

  // 标题块
  const titleSuffix = withAnswers ? "（含答案与解析）" : "（无答案版 · 可直接打印做题）"
  const scopeText = info.scopeText
  const totalQ = info.totalQuestions

  allChildren.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 120, line: 480, lineRule: "atLeast" },
    children: [new TextRun({
      text: "小学英语配套习题集",
      size: 38, bold: true, color: C.title, font: FONT_HEI,
    })],
  }))

  allChildren.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 80, line: 360, lineRule: "atLeast" },
    children: [new TextRun({
      text: titleSuffix,
      size: 24, color: C.section, font: FONT_HEI,
    })],
  }))

  allChildren.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 120, line: 312 },
    children: [new TextRun({
      text: `—— 人教精通版 · ${scopeText} · 共 ${totalQ} 题 ——`,
      size: 20, italics: true, color: C.light, font: FONT,
    })],
  }))

  allChildren.push(new Paragraph({
    spacing: { before: 60, after: 120 },
    border: { bottom: { style: BS.SINGLE, size: 8, color: "888888" } },
    children: [new TextRun({ text: " ", size: 4 })],
  }))

  // 学生信息行（仅无答案版）
  if (!withAnswers) {
    const infoCell = (text: string, align: (typeof AlignmentType)[keyof typeof AlignmentType] = AlignmentType.CENTER) => new TableCell({
      width: { size: 33, type: WidthType.PERCENTAGE },
      margins: { top: 30, bottom: 30, left: 80, right: 80 },
      children: [new Paragraph({
        alignment: align, spacing: { before: 0, after: 0, line: 312 },
        children: [new TextRun({ text, size: 22, font: FONT, color: C.body })],
      })],
    })
    allChildren.push(new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [new TableRow({
        cantSplit: true,
        children: [
          infoCell("姓名：______________", AlignmentType.LEFT),
          infoCell("班级：______________", AlignmentType.CENTER),
          infoCell("得分：______________", AlignmentType.RIGHT),
        ],
      })],
    }))
    allChildren.push(new Paragraph({ spacing: { before: 80, after: 80 }, children: [new TextRun({ text: " " })] }))
    allChildren.push(bodyP(
      `【做题说明】本习题集共 ${totalQ} 题，含选择题和填空题。请认真审题，圈出关键词，写出完整答案。`,
      { before: 60, after: 120, size: 21, color: C.grey }
    ))
  } else {
    allChildren.push(bodyP(
      `【使用说明】本习题集为人教精通版 ${scopeText} 配套习题，共 ${totalQ} 题，含答案与解析。建议老师备课或家长辅导时使用；孩子做题请使用对应的「无答案版」。`,
      { before: 60, after: 120, size: 21, color: C.grey }
    ))
  }

  allChildren.push(spacer(80))

  // 各年级习题
  targetGrades.forEach((grade, gradeIdx) => {
    allChildren.push(h1(grade.name))
    allChildren.push(bodyP(`版本：${grade.version}`, { size: 20, color: C.grey, before: 0, after: 80 }))

    grade.units.forEach((unit) => {
      allChildren.push(h2(`Unit ${unit.num}：${unit.title}`))
      allChildren.push(bodyP(`主题：${unit.topic}`, { size: 20, color: C.grey, before: 0, after: 80 }))

      unit.questions.forEach((q, idx) => {
        const qNum = idx + 1
        if (q.type === '选择' && q.options) {
          // 选择题：选项行和答案解析行在同一张无边框表内，避免 Word 合并相邻表格导致错位
          allChildren.push(questionP(qNum, q.stem || ''))
          const showAnswer = withAnswers && Boolean(q.answer)
          const ansLetter = q.answer
          const ansText = q.options[ansLetter.charCodeAt(0) - 65]
          allChildren.push(mcQuestionTable(
            q.options,
            showAnswer ? `${ansLetter}. ${ansText}` : undefined,
            q.analysis,
          ))
        } else {
          // 填空题
          allChildren.push(fillBlankP(qNum, q.before || '', q.after || '', withAnswers, q.answer))
          if (withAnswers) {
            allChildren.push(answerBlock(q.answer, q.analysis))
          }
        }
        allChildren.push(spacer(60))
      })
    })

    // 年级之间分页
    if (gradeIdx < targetGrades.length - 1) {
      allChildren.push(pbPara())
    }
  })

  // 组装文档
  const doc = new Document({
    creator: "机构备课素材包",
    title: `小学英语配套习题集 ${titleSuffix}`,
    description: `${scopeText} · 共 ${totalQ} 题`,
    styles: {
      default: {
        document: {
          run: { font: FONT, size: 22, color: C.body },
          paragraph: { spacing: { line: 312 } },
        },
        heading1: {
          run: { font: FONT_HEI, size: 32, bold: true, color: C.section },
          paragraph: { spacing: { before: 360, after: 180, line: 312 } },
        },
        heading2: {
          run: { font: FONT_HEI, size: 28, bold: true, color: C.title },
          paragraph: { spacing: { before: 280, after: 140, line: 312 } },
        },
        heading3: {
          run: { font: FONT_HEI, size: 24, bold: true, color: C.section },
          paragraph: { spacing: { before: 200, after: 80, line: 312 } },
        },
      },
    },
    sections: [{
      properties: {
        page: {
          size: { width: 11906, height: 16838, orientation: PageOrientation.PORTRAIT },
          margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 },
        },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 0, line: 240 },
            children: [new TextRun({
              text: `小学英语配套习题集 ${titleSuffix} · ${scopeText}`,
              size: 18, color: C.light, font: FONT,
            })],
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 0, line: 240 },
            children: [
              new TextRun({ text: "第 ", size: 18, color: C.light, font: FONT }),
              new TextRun({ children: [PageNumber.CURRENT], size: 18, color: C.light, font: FONT }),
              new TextRun({ text: " 页", size: 18, color: C.light, font: FONT }),
            ],
          })],
        }),
      },
      children: allChildren,
    }],
  })

  return Packer.toBlob(doc)
}
