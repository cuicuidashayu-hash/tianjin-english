// 习题集 docx 生成模块
// 复用之前 docx-project 里的 helpers.js 风格，适配 ESM + TypeScript

import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, HeadingLevel, WidthType,
  BorderStyle, BorderStyle as BS, ShadingType, PageOrientation, PageBreak,
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

// 通用表格
function makeTable(rows: TableRow[]): Table {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BS.SINGLE, size: 6, color: "333333" },
      bottom: { style: BS.SINGLE, size: 6, color: "333333" },
      left: { style: BS.SINGLE, size: 4, color: "888888" },
      right: { style: BS.SINGLE, size: 4, color: "888888" },
      insideHorizontal: { style: BS.SINGLE, size: 1, color: "BBBBBB" },
      insideVertical: { style: BS.SINGLE, size: 1, color: "BBBBBB" },
    },
    rows: rows,
  })
}

function mkHeaderCell(text: string, width: number, align = AlignmentType.CENTER): TableCell {
  return new TableCell({
    width: { size: width, type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, fill: C.headerBg },
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({
      alignment: align,
      children: [new TextRun({ text, bold: true, size: 21, font: FONT_HEI, color: C.title })],
    })],
  })
}

function mkDataCell(text: string, opts: any = {}): TableCell {
  return new TableCell({
    width: { size: opts.width || 25, type: WidthType.PERCENTAGE },
    margins: { top: 50, bottom: 50, left: 100, right: 100 },
    children: [new Paragraph({
      alignment: opts.align || AlignmentType.LEFT,
      children: [new TextRun({
        text: String(text), size: opts.size || 21,
        bold: opts.bold || false,
        color: opts.color || C.body,
        font: FONT,
      })],
    })],
  })
}

// 答案解析块
function answerBlock(answer: string, analysis: string): Table {
  const cell = new TableCell({
    width: { size: 100, type: WidthType.PERCENTAGE },
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
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [new TableRow({ cantSplit: true, children: [cell] })],
  })
}

// 选择题选项表（4 列）
function mcOptionsTable(options: string[]): Table {
  const cells = options.map((opt, i) =>
    new TableCell({
      width: { size: 25, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BS.NONE }, bottom: { style: BS.NONE },
        left: { style: BS.NONE }, right: { style: BS.NONE },
      },
      margins: { top: 30, bottom: 30, left: 80, right: 80 },
      children: [new Paragraph({
        spacing: { before: 0, after: 0, line: 312 },
        children: [new TextRun({
          text: `${String.fromCharCode(65 + i)}. ${opt}`,
          size: 22, font: FONT,
        })],
      })],
    })
  )
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [new TableRow({ cantSplit: true, children: cells })],
  })
}

// 选择题选项表（2 列）
function mcOptions2col(options: string[]): Table {
  const row1 = options.slice(0, 2)
  const row2 = options.slice(2, 4)
  const mkRow = (opts: string[], startIdx: number) => new TableRow({
    cantSplit: true,
    children: opts.map((opt, i) =>
      new TableCell({
        width: { size: 50, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BS.NONE }, bottom: { style: BS.NONE },
          left: { style: BS.NONE }, right: { style: BS.NONE },
        },
        margins: { top: 30, bottom: 30, left: 80, right: 80 },
        children: [new Paragraph({
          spacing: { before: 0, after: 0, line: 312 },
          children: [new TextRun({
            text: `${String.fromCharCode(65 + startIdx + i)}. ${opt}`,
            size: 22, font: FONT,
          })],
        })],
      })
    ),
  })
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [mkRow(row1, 0), mkRow(row2, 2)],
  })
}

// 填空题段落
function fillBlankP(num: number, before: string, after: string, withAnswers: boolean, answer: string): Paragraph {
  return new Paragraph({
    spacing: { before: 160, after: 80, line: 312 },
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

// 题目段落（带题号+题干）
function questionP(num: number, text: string): Paragraph {
  return new Paragraph({
    spacing: { before: 160, after: 80, line: 312 },
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
      borders: {
        top: { style: BS.NONE }, bottom: { style: BS.NONE },
        left: { style: BS.NONE }, right: { style: BS.NONE },
      },
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
          // 选择题
          allChildren.push(questionP(qNum, q.stem || ''))
          const maxLen = Math.max(...q.options.map(o => o.length))
          if (maxLen <= 8) {
            allChildren.push(mcOptionsTable(q.options))
          } else {
            allChildren.push(mcOptions2col(q.options))
          }
          // 答案解析（仅含答案版）
          if (withAnswers && q.answer) {
            const ansLetter = q.answer
            const ansText = q.options[ansLetter.charCodeAt(0) - 65]
            allChildren.push(answerBlock(`${ansLetter}. ${ansText}`, q.analysis))
          }
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
