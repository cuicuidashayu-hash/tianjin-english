// 30 道练习题（无答案无解析版） - 直接打印给孩子做题用
// 用法：node /home/z/my-project/scripts/generate_practice_only.js

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, HeadingLevel, WidthType,
  BorderStyle, ShadingType, PageOrientation, PageBreak,
} = require("docx");
const fs = require("fs");

const H = require("./helpers.js");
const D = require("./data.js");
const { C, FONT, FONT_HEI } = H;

// ============================================================
//  标题块
// ============================================================
function buildTitleBlock() {
  const items = [];

  items.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 120, line: 480, lineRule: "atLeast" },
    children: [new TextRun({
      text: "六年级英语 · 被动语态专项练习",
      size: 40, bold: true, color: C.title, font: FONT_HEI,
    })],
  }));

  items.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 80, line: 360, lineRule: "atLeast" },
    children: [new TextRun({
      text: "（30 题 · 含填空 / 句型转换 / 单选 三种题型）",
      size: 24, color: C.section, font: FONT_HEI,
    })],
  }));

  // 学生信息行（姓名/班级/得分）
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

  items.push(new Paragraph({
    spacing: { before: 200, after: 80, line: 312 },
    children: [],
  }));

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

  // 分隔线
  items.push(new Paragraph({
    spacing: { before: 120, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: "888888" } },
    children: [new TextRun({ text: " ", size: 4 })],
  }));

  // 做题说明
  items.push(H.bodyP(
    "【做题说明】本练习共 30 题，分两部分：第一部分 15 道考查一般现在时的被动语态（am/is/are + 过去分词），第二部分 15 道考查一般过去的被动语态（was/were + 过去分词）。每部分含填空题、句型转换、单项选择各 5 道。请认真阅读题目，圈出时间标志词，判断主语单复数，再填写答案。",
    { before: 60, after: 120, size: 21, color: C.grey }
  ));

  return items;
}

// ============================================================
//  练习节构造（无答案版）
// ============================================================
function buildPracticeSection(title, introText, practiceData) {
  const items = [];
  items.push(H.h1(title));
  items.push(H.bodyP(introText, { before: 0, after: 160, size: 21 }));

  // 填空题
  items.push(H.h2("一、填空题（5 题）"));
  items.push(H.bodyP(
    "请用括号中所给动词的正确被动形式填空。",
    { before: 0, after: 120, size: 21, color: C.grey }
  ));
  practiceData.slice(0, 5).forEach((q) => {
    items.push(H.fillBlankP(q.num, q.before, q.after));
  });

  // 句型转换
  items.push(H.h2("二、句型转换（5 题）"));
  items.push(H.bodyP(
    "请将下列主动语态句子改为被动语态。",
    { before: 0, after: 120, size: 21, color: C.grey }
  ));
  practiceData.slice(5, 10).forEach((q) => {
    items.push(H.questionP(q.num, q.transform));
    // 留出书写空间
    items.push(new Paragraph({
      spacing: { before: 0, after: 0, line: 500 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
      children: [new TextRun({ text: " ", size: 22, font: FONT })],
    }));
    items.push(new Paragraph({
      spacing: { before: 0, after: 60, line: 500 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
      children: [new TextRun({ text: " ", size: 22, font: FONT })],
    }));
  });

  // 选择题
  items.push(H.h2("三、单项选择（5 题）"));
  items.push(H.bodyP(
    "从 A、B、C、D 四个选项中选出最佳答案，将选项字母填入题号前的括号内。",
    { before: 0, after: 120, size: 21, color: C.grey }
  ));
  practiceData.slice(10, 15).forEach((q) => {
    // 题号前留括号
    items.push(new Paragraph({
      spacing: { before: 160, after: 60, line: 312 },
      children: [
        new TextRun({ text: "(     ) ", bold: true, size: 22, font: FONT }),
        new TextRun({ text: `${q.num}. `, bold: true, size: 22, font: FONT }),
        new TextRun({ text: q.stem, size: 22, font: FONT }),
      ],
    }));
    const maxLen = Math.max(...q.options.map(o => o.length));
    if (maxLen <= 8) {
      items.push(H.mcOptionsTable(q.options));
    } else {
      items.push(H.mcOptionsTable2col(q.options));
    }
  });

  return items;
}

// ============================================================
//  组装文档
// ============================================================
async function buildDocument() {
  const introChildren = buildTitleBlock();

  const presentChildren = buildPracticeSection(
    "第一部分：一般现在时的被动语态",
    "本部分 15 题，针对一般现在时的被动语态（am / is / are + 过去分词）。请圈出 every spring / every day / now / these days 等时间标志词，判断主语单复数后再填写。",
    D.PRACTICE_PRESENT
  );

  const pastChildren = buildPracticeSection(
    "第二部分：一般过去时的被动语态",
    "本部分 15 题，针对一般过去时的被动语态（was / were + 过去分词）。请圈出 yesterday / last week / two days ago / in 1990 等时间标志词，判断主语单复数后再填写。",
    D.PRACTICE_PAST
  );

  const pbPara = () => new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({ text: "·", size: 1, color: "FFFFFF", font: FONT }),
      new PageBreak(),
    ],
  });

  const allChildren = [
    ...introChildren,
    pbPara(),
    ...presentChildren,
    pbPara(),
    ...pastChildren,
  ];

  const doc = new Document({
    creator: "六年级被动语态练习",
    title: "六年级英语被动语态专项练习（无答案版）",
    description: "30 道练习题，含填空、句型转换、单项选择，无答案与解析",
    styles: {
      default: {
        document: {
          run: { font: FONT, size: 22, color: C.body },
          paragraph: { spacing: { line: 312 } },
        },
        heading1: {
          run: { font: FONT_HEI, size: 30, bold: true, color: C.title },
          paragraph: { spacing: { before: 320, after: 160, line: 312 } },
        },
        heading2: {
          run: { font: FONT_HEI, size: 26, bold: true, color: C.title },
          paragraph: { spacing: { before: 240, after: 120, line: 312 } },
        },
        heading3: {
          run: { font: FONT_HEI, size: 24, bold: true, color: C.section },
          paragraph: { spacing: { before: 200, after: 100, line: 312 } },
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
              text: "六年级英语 · 被动语态专项练习（30 题 · 无答案版）",
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
  });

  const buffer = await Packer.toBuffer(doc);
  const outPath = "/home/z/my-project/download/六年级被动语态_专项练习_无答案版.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("✅ 文档已生成：" + outPath);
  console.log("📊 大小：" + (buffer.length / 1024).toFixed(1) + " KB");
}

buildDocument().catch(err => {
  console.error("❌ 生成失败：", err);
  process.exit(1);
});
