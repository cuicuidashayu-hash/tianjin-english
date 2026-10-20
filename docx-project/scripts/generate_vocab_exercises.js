// 同时生成 3 个 Word 文档：
// 1. 小学3-6年级词汇总表（按主题分类）
// 2. 36单元配套习题集（含答案+解析）
// 3. 36单元配套习题集（无答案版，可打印给孩子做）

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, HeadingLevel, WidthType,
  BorderStyle, ShadingType, PageOrientation, PageBreak,
} = require("docx");
const fs = require("fs");

const H = require("./helpers.js");
const VOCAB = require("./vocab_data.js");
const EX = require("./exercises_data.js");

const { C, FONT, FONT_HEI } = H;

// ============================================================
//  通用构造函数
// ============================================================

function bodyP(text, opts = {}) {
  return new Paragraph({
    alignment: opts.alignment || AlignmentType.LEFT,
    spacing: { before: opts.before || 60, after: opts.after || 60, line: 312 },
    indent: opts.indent || { firstLine: 0 },
    children: [new TextRun({
      text, size: opts.size || 22,
      color: opts.color || C.body,
      bold: opts.bold || false,
      italics: opts.italics || false,
      font: FONT,
    })],
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.LEFT,
    spacing: { before: 360, after: 180, line: 312 },
    children: [new TextRun({ text, size: 30, bold: true, color: C.section, font: FONT_HEI })],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    alignment: AlignmentType.LEFT,
    spacing: { before: 280, after: 140, line: 312 },
    children: [new TextRun({ text, size: 26, bold: true, color: C.title, font: FONT_HEI })],
  });
}

function h3(text) {
  return new Paragraph({
    spacing: { before: 200, after: 80, line: 312 },
    children: [new TextRun({ text, size: 24, bold: true, color: C.section, font: FONT_HEI })],
  });
}

function richP(runs, opts = {}) {
  return new Paragraph({
    alignment: opts.alignment || AlignmentType.LEFT,
    spacing: { before: opts.before || 40, after: opts.after || 40, line: 312 },
    children: runs,
  });
}

function run(text, opts = {}) {
  return new TextRun({
    text, size: opts.size || 22,
    bold: opts.bold || false,
    italics: opts.italics || false,
    color: opts.color || C.body,
    font: FONT,
  });
}

function spacer(h = 60) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 0, line: Math.max(h, 40), lineRule: "exact" },
    children: [new TextRun({ text: "·", size: 8, color: "FFFFFF", font: FONT })],
  });
}

// 通用表格
function makeTable(rows) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 6, color: "333333" },
      bottom: { style: BorderStyle.SINGLE, size: 6, color: "333333" },
      left: { style: BorderStyle.SINGLE, size: 4, color: "888888" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "888888" },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "BBBBBB" },
      insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "BBBBBB" },
    },
    rows: rows,
  });
}

function mkHeaderCell(text, width, align = AlignmentType.CENTER) {
  return new TableCell({
    width: { size: width, type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, fill: C.headerBg },
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({
      alignment: align,
      children: [new TextRun({ text, bold: true, size: 21, font: FONT_HEI, color: C.title })],
    })],
  });
}

function mkDataCell(text, opts = {}) {
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
  });
}

// 答案解析块（蓝色边框）
function answerBlock(answer, analysis) {
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
        run("【答案】", { bold: true, color: C.correctAns, size: 21 }),
        run(answer, { color: C.correctAns, bold: true, size: 21 }),
      ], { before: 0, after: 40 }),
      richP([
        run("【解析】", { bold: true, color: C.section, size: 21 }),
        run(analysis, { size: 21 }),
      ], { before: 0, after: 0 }),
    ],
  });
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [new TableRow({ cantSplit: true, children: [cell] })],
  });
}

// ============================================================
//  文档 1：词汇总表
// ============================================================
function buildVocabDoc() {
  const items = [];

  // 标题块
  items.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 120, line: 480, lineRule: "atLeast" },
    children: [new TextRun({ text: "小学 3-6 年级核心词汇总表", size: 40, bold: true, color: C.title, font: FONT_HEI })],
  }));
  items.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 80, line: 360, lineRule: "atLeast" },
    children: [new TextRun({ text: "—— 人教精通版（三年级起点）+ 天津版快乐英语 ——", size: 24, color: C.section, font: FONT_HEI })],
  }));
  items.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 120, line: 312 },
    children: [new TextRun({ text: "—— 机构备课参考 · 共 21 大主题约 500 词 ——", size: 20, italics: true, color: C.light, font: FONT })],
  }));
  items.push(new Paragraph({
    spacing: { before: 60, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: "888888" } },
    children: [new TextRun({ text: " ", size: 4 })],
  }));

  items.push(bodyP(
    VOCAB.meta.note + "。词汇按主题分类便于记忆和复习；★ 标记四会词（听说读写），无标记为三会词（听说读）。",
    { before: 60, after: 120, size: 21, color: C.grey }
  ));

  items.push(spacer(80));

  // 各主题分类
  VOCAB.categories.forEach((cat) => {
    items.push(h2(`📚 ${cat.name}`));
    items.push(bodyP(`适用年级：${cat.grades}　|　词汇数：${cat.words.length}`, { size: 20, color: C.grey, before: 0, after: 80 }));

    // 词汇表
    const rows = [
      new TableRow({
        tableHeader: true,
        cantSplit: true,
        children: [
          mkHeaderCell("英文", 35),
          mkHeaderCell("中文", 35),
          mkHeaderCell("出现年级", 18),
          mkHeaderCell("四会", 12),
        ],
      }),
      ...cat.words.map(w => new TableRow({
        cantSplit: true,
        children: [
          mkDataCell(w.word, { bold: true, color: C.accent, width: 35, size: 21 }),
          mkDataCell(w.cn, { width: 35 }),
          mkDataCell(w.grade, { width: 18, align: AlignmentType.CENTER, size: 20, color: C.grey }),
          mkDataCell(w.star || "—", { width: 12, align: AlignmentType.CENTER, color: C.star, bold: true }),
        ],
      })),
    ];
    items.push(makeTable(rows));
    items.push(spacer(80));
  });

  return items;
}

// ============================================================
//  文档 2 / 3：习题集（含答案版 / 无答案版）
// ============================================================
function buildExercisesDoc(withAnswers) {
  const items = [];

  // 标题块
  const titleSuffix = withAnswers ? "（含答案与解析）" : "（无答案版 · 可直接打印做题）";
  items.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 120, line: 480, lineRule: "atLeast" },
    children: [new TextRun({ text: "小学 4-6 年级 36 单元配套习题集", size: 38, bold: true, color: C.title, font: FONT_HEI })],
  }));
  items.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 80, line: 360, lineRule: "atLeast" },
    children: [new TextRun({ text: titleSuffix, size: 24, color: C.section, font: FONT_HEI })],
  }));
  items.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 120, line: 312 },
    children: [new TextRun({ text: "—— 人教精通版 4上→6下 共 6 册 36 单元 · 每单元 3 选择 + 2 填空 = 180 题 ——", size: 20, italics: true, color: C.light, font: FONT })],
  }));
  items.push(new Paragraph({
    spacing: { before: 60, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: "888888" } },
    children: [new TextRun({ text: " ", size: 4 })],
  }));

  // 学生信息行（仅无答案版）
  if (!withAnswers) {
    const infoCell = (text, align = AlignmentType.CENTER) => new TableCell({
      width: { size: 33, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
      },
      margins: { top: 30, bottom: 30, left: 80, right: 80 },
      children: [new Paragraph({
        alignment: align, spacing: { before: 0, after: 0, line: 312 },
        children: [new TextRun({ text, size: 22, font: FONT, color: C.body })],
      })],
    });
    items.push(new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [new TableRow({
        cantSplit: true,
        children: [
          infoCell("姓名：______________", AlignmentType.LEFT),
          infoCell("班级：______________", AlignmentType.CENTER),
          infoCell("得分：______________", AlignmentType.RIGHT),
        ],
      })],
    }));
    items.push(new Paragraph({ spacing: { before: 80, after: 80 }, children: [new TextRun({ text: " " })] }));
    items.push(bodyP(
      "【做题说明】本习题集共 36 单元 180 题，每单元含 3 道选择题 + 2 道填空题。请认真审题，圈出关键词，写出完整答案。",
      { before: 60, after: 120, size: 21, color: C.grey }
    ));
  } else {
    items.push(bodyP(
      "【使用说明】本习题集为人教精通版 4-6 年级 36 单元配套习题，每单元 5 题（3 选择 + 2 填空），共 180 题，含答案与解析。建议老师备课或家长辅导时使用；孩子做题请使用对应的「无答案版」。",
      { before: 60, after: 120, size: 21, color: C.grey }
    ));
  }

  items.push(spacer(80));

  // 按年级分章节
  EX.grades.forEach((grade) => {
    items.push(h1(grade.name));
    grade.units.forEach((unit) => {
      items.push(h2(`Unit ${unit.num}：${unit.title}`));
      items.push(bodyP(`主题：${unit.topic}`, { size: 20, color: C.grey, before: 0, after: 80 }));

      unit.questions.forEach((q, idx) => {
        const qNum = idx + 1;
        if (q.type === "选择") {
          // 题干
          items.push(new Paragraph({
            spacing: { before: 140, after: 60, line: 312 },
            children: [
              new TextRun({ text: `(${qNum}) `, bold: true, size: 22, color: C.title, font: FONT }),
              new TextRun({ text: q.stem, size: 22, font: FONT }),
            ],
          }));
          // 选项（4 列）
          const optCells = q.options.map((opt, i) => new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
            },
            margins: { top: 30, bottom: 30, left: 80, right: 80 },
            children: [new Paragraph({
              spacing: { before: 0, after: 0, line: 312 },
              children: [new TextRun({
                text: (withAnswers && String.fromCharCode(65 + i) === q.answer ? "★ " : "") + String.fromCharCode(65 + i) + ". " + opt,
                size: 22,
                bold: withAnswers && String.fromCharCode(65 + i) === q.answer,
                color: withAnswers && String.fromCharCode(65 + i) === q.answer ? C.correctAns : C.body,
                font: FONT,
              })],
            })],
          }));
          items.push(new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [new TableRow({ cantSplit: true, children: optCells })],
          }));
        } else {
          // 填空题
          items.push(new Paragraph({
            spacing: { before: 140, after: 60, line: 312 },
            children: [
              new TextRun({ text: `(${qNum}) `, bold: true, size: 22, color: C.title, font: FONT }),
              new TextRun({ text: q.before, size: 22, font: FONT }),
              new TextRun({ text: withAnswers ? q.answer : "____________", size: 22, font: FONT, color: withAnswers ? C.correctAns : C.light, bold: withAnswers }),
              new TextRun({ text: q.after, size: 22, font: FONT }),
            ],
          }));
        }

        // 答案解析（仅含答案版）
        if (withAnswers) {
          const ansText = q.type === "选择" ? `${q.answer}. ${q.options[q.answer.charCodeAt(0) - 65]}` : q.answer;
          items.push(answerBlock(ansText, q.analysis));
        }
        items.push(spacer(60));
      });
    });
  });

  return items;
}

// ============================================================
//  组装文档
// ============================================================
function assembleDoc(title, description, allChildren) {
  return new Document({
    creator: "机构备课参考",
    title: title,
    description: description,
    styles: {
      default: {
        document: {
          run: { font: FONT, size: 22, color: C.body },
          paragraph: { spacing: { line: 312 } },
        },
        heading1: {
          run: { font: FONT_HEI, size: 30, bold: true, color: C.section },
          paragraph: { spacing: { before: 360, after: 180, line: 312 } },
        },
        heading2: {
          run: { font: FONT_HEI, size: 26, bold: true, color: C.title },
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
            children: [new TextRun({ text: title, size: 18, color: C.light, font: FONT })],
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
  });
}

async function generateAll() {
  // 文档 1：词汇总表
  const vocabChildren = buildVocabDoc();
  const vocabDoc = assembleDoc(
    "小学 3-6 年级核心词汇总表",
    "人教精通版 + 天津版快乐英语 · 21 大主题约 500 词",
    vocabChildren
  );
  let vocabBuf = await Packer.toBuffer(vocabDoc);
  let vocabPath = "/home/z/my-project/download/小学3-6年级核心词汇总表.docx";
  fs.writeFileSync(vocabPath, vocabBuf);
  console.log("✅ 文档 1 词汇总表：" + vocabPath + "（" + (vocabBuf.length / 1024).toFixed(1) + " KB）");

  // 文档 2：习题集含答案版
  const exWithAnsChildren = buildExercisesDoc(true);
  const exWithAnsDoc = assembleDoc(
    "小学 4-6 年级 36 单元配套习题集（含答案与解析）",
    "人教精通版 4上→6下 · 共 6 册 36 单元 180 题",
    exWithAnsChildren
  );
  let exAnsBuf = await Packer.toBuffer(exWithAnsDoc);
  let exAnsPath = "/home/z/my-project/download/小学4-6年级36单元配套习题集_含答案版.docx";
  fs.writeFileSync(exAnsPath, exAnsBuf);
  console.log("✅ 文档 2 习题集含答案版：" + exAnsPath + "（" + (exAnsBuf.length / 1024).toFixed(1) + " KB）");

  // 文档 3：习题集无答案版
  const exNoAnsChildren = buildExercisesDoc(false);
  const exNoAnsDoc = assembleDoc(
    "小学 4-6 年级 36 单元配套习题集（无答案版）",
    "人教精通版 4上→6下 · 共 6 册 36 单元 180 题 · 可直接打印做题",
    exNoAnsChildren
  );
  let exNoBuf = await Packer.toBuffer(exNoAnsDoc);
  let exNoPath = "/home/z/my-project/download/小学4-6年级36单元配套习题集_无答案版.docx";
  fs.writeFileSync(exNoPath, exNoBuf);
  console.log("✅ 文档 3 习题集无答案版：" + exNoPath + "（" + (exNoBuf.length / 1024).toFixed(1) + " KB）");
}

generateAll().catch(err => {
  console.error("❌ 生成失败：", err);
  process.exit(1);
});
