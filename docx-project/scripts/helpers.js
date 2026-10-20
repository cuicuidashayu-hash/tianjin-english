// 六年级英语被动语态 - 试卷错题精讲与专项练习
// 文档风格：正式试卷风（黑白为主，A4紧凑，SimSun/TNR）
// 输出：/home/z/my-project/download/六年级被动语态_错题精讲与专项练习.docx

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, HeadingLevel, WidthType,
  BorderStyle, ShadingType, PageOrientation, PageBreak, LevelFormat,
} = require("docx");
const fs = require("fs");

// ============================================================
//  颜色与字体常量
// ============================================================
const C = {
  title: "000000", body: "000000", section: "1F1F1F",
  grey: "555555", light: "888888",
  studentAns: "B22222",   // 学生答案：暗红色（错误用）
  correctAns: "1F4E79",   // 正确答案：深蓝色
  highlight: "F2F2F2",     // 浅灰背景
  headerBg: "EAEAEA",      // 表头背景
  tipBg: "FFF8E1",         // 小贴士背景（米黄）
};

const FONT = { ascii: "Times New Roman", eastAsia: "SimSun" };
const FONT_HEI = { ascii: "Times New Roman", eastAsia: "SimHei" };

// ============================================================
//  基础构造函数
// ============================================================

// 普通正文段落
function bodyP(text, opts = {}) {
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
  });
}

// 标题（一级标题——大节）
function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.LEFT,
    spacing: { before: 320, after: 160, line: 312 },
    children: [new TextRun({
      text, size: 30, bold: true, color: C.title, font: FONT_HEI,
    })],
  });
}

// 二级标题（小节）
function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    alignment: AlignmentType.LEFT,
    spacing: { before: 240, after: 120, line: 312 },
    children: [new TextRun({
      text, size: 26, bold: true, color: C.title, font: FONT_HEI,
    })],
  });
}

// 三级标题
function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    alignment: AlignmentType.LEFT,
    spacing: { before: 200, after: 100, line: 312 },
    children: [new TextRun({
      text, size: 24, bold: true, color: C.section, font: FONT_HEI,
    })],
  });
}

// 富文本段落（多个 TextRun）
function richP(runs, opts = {}) {
  return new Paragraph({
    alignment: opts.alignment || AlignmentType.LEFT,
    spacing: { before: opts.before || 60, after: opts.after || 60, line: 312 },
    indent: opts.indent || { firstLine: 0 },
    children: runs,
  });
}

// 一个 TextRun 工厂
function run(text, opts = {}) {
  return new TextRun({
    text, size: opts.size || 22,
    bold: opts.bold || false,
    italics: opts.italics || false,
    color: opts.color || C.body,
    font: opts.font || FONT,
    underline: opts.underline ? { type: "single", color: opts.underlineColor || "000000" } : undefined,
  });
}

// 答案与解析块（带浅色背景的边框段落，使用单格表格实现）
function answerBlock(answerText, analysisText) {
  const cell = new TableCell({
    width: { size: 100, type: WidthType.PERCENTAGE },
    margins: { top: 100, bottom: 100, left: 160, right: 160 },
    shading: { type: ShadingType.CLEAR, fill: "F7F9FC" },
    borders: {
      left: { style: BorderStyle.SINGLE, size: 16, color: "4A7DBD" },
      top: { style: BorderStyle.SINGLE, size: 4, color: "D6E0F0" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "D6E0F0" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "D6E0F0" },
    },
    children: [
      richP([
        run("【答案】", { bold: true, color: C.correctAns, size: 22 }),
        run(answerText, { color: C.correctAns, bold: true, size: 22 }),
      ], { before: 0, after: 40 }),
      richP([
        run("【解析】", { bold: true, color: C.section, size: 22 }),
        run(analysisText, { size: 22 }),
      ], { before: 0, after: 0 }),
    ],
  });
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [new TableRow({ cantSplit: true, children: [cell] })],
  });
}

// 错题讲解块（更复杂：原题+学生答案+正确答案+错因+知识点）
function errorAnalysisBlock(num, originalText, studentAns, correctAns, analysisText, knowledgeText) {
  const cell = new TableCell({
    width: { size: 100, type: WidthType.PERCENTAGE },
    margins: { top: 120, bottom: 120, left: 160, right: 160 },
    shading: { type: ShadingType.CLEAR, fill: "FFFFFF" },
    borders: {
      left: { style: BorderStyle.SINGLE, size: 16, color: "B22222" },
      top: { style: BorderStyle.SINGLE, size: 4, color: "D9D9D9" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "D9D9D9" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "D9D9D9" },
    },
    children: [
      // 原题
      richP([
        run(`第 ${num} 题  `, { bold: true, color: C.title, size: 22 }),
        run(originalText, { size: 22 }),
      ], { before: 0, after: 80 }),
      // 学生答案 vs 正确答案
      richP([
        run("学生答案：", { bold: true, size: 22 }),
        run(studentAns, { color: C.studentAns, bold: true, size: 22, underline: true }),
        run("     正确答案：", { bold: true, size: 22 }),
        run(correctAns, { color: C.correctAns, bold: true, size: 22 }),
      ], { before: 0, after: 80 }),
      // 错因分析
      richP([
        run("错因分析：", { bold: true, color: C.studentAns, size: 22 }),
        run(analysisText, { size: 22 }),
      ], { before: 0, after: 80 }),
      // 知识点延伸
      richP([
        run("知识点延伸：", { bold: true, color: C.correctAns, size: 22 }),
        run(knowledgeText, { size: 22 }),
      ], { before: 0, after: 0 }),
    ],
  });
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [new TableRow({ cantSplit: true, children: [cell] })],
  });
}

// 选择题选项表（4列）
function mcOptionsTable(options) {
  const cells = options.map((opt, i) =>
    new TableCell({
      width: { size: 25, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
      },
      margins: { top: 30, bottom: 30, left: 80, right: 80 },
      children: [new Paragraph({
        spacing: { before: 0, after: 0, line: 312 },
        children: [new TextRun({
          text: `${String.fromCharCode(65 + i)}. ${opt}`, size: 22, font: FONT,
        })],
      })],
    })
  );
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [new TableRow({ cantSplit: true, children: cells })],
  });
}

// 选择题选项表（2列×2行，用于较长选项）
function mcOptionsTable2col(options) {
  const row1 = options.slice(0, 2);
  const row2 = options.slice(2, 4);
  const mkRow = (opts) => new TableRow({
    cantSplit: true,
    children: opts.map((opt, i) =>
      new TableCell({
        width: { size: 50, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
        },
        margins: { top: 30, bottom: 30, left: 80, right: 80 },
        children: [new Paragraph({
          spacing: { before: 0, after: 0, line: 312 },
          children: [new TextRun({
            text: `${String.fromCharCode(65 + (opts === row1 ? i : i + 2))}. ${opt}`,
            size: 22, font: FONT,
          })],
        })],
      })
    ),
  });
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [mkRow(row1), mkRow(row2)],
  });
}

// 题目段落（带题号+题干）
function questionP(num, text) {
  return new Paragraph({
    spacing: { before: 160, after: 80, line: 312 },
    indent: { left: 0, hanging: 0 },
    children: [
      new TextRun({ text: `${num}. `, bold: true, size: 22, font: FONT }),
      new TextRun({ text, size: 22, font: FONT }),
    ],
  });
}

// 填空题段落（题号+前段+下划线空+后段）
function fillBlankP(num, before, after) {
  return new Paragraph({
    spacing: { before: 160, after: 80, line: 312 },
    children: [
      new TextRun({ text: `${num}. `, bold: true, size: 22, font: FONT }),
      new TextRun({ text: before, size: 22, font: FONT }),
      new TextRun({ text: "____________", size: 22, font: FONT, color: C.light }),
      new TextRun({ text: after, size: 22, font: FONT }),
    ],
  });
}

// 提示/小贴士块（米黄背景）
function tipBlock(text) {
  const cell = new TableCell({
    width: { size: 100, type: WidthType.PERCENTAGE },
    margins: { top: 100, bottom: 100, left: 160, right: 160 },
    shading: { type: ShadingType.CLEAR, fill: C.tipBg },
    borders: {
      left: { style: BorderStyle.SINGLE, size: 16, color: "E0C36A" },
      top: { style: BorderStyle.SINGLE, size: 4, color: "F0E0A0" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "F0E0A0" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "F0E0A0" },
    },
    children: [
      new Paragraph({
        spacing: { before: 0, after: 0, line: 312 },
        children: [new TextRun({ text, size: 22, font: FONT })],
      }),
    ],
  });
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [new TableRow({ cantSplit: true, children: [cell] })],
  });
}

// 段间空行（用一个低对比度的中点字符避免被检测为"空段落"）
function spacer(h = 80) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 0, line: Math.max(h, 60), lineRule: "exact" },
    children: [new TextRun({ text: "·", size: 10, color: "FFFFFF", font: FONT })],
  });
}

// ============================================================
//  导出（构建逻辑在另一个文件中）
// ============================================================
module.exports = {
  C, FONT, FONT_HEI,
  bodyP, h1, h2, h3, richP, run,
  answerBlock, errorAnalysisBlock, mcOptionsTable, mcOptionsTable2col,
  questionP, fillBlankP, tipBlock, spacer,
};
