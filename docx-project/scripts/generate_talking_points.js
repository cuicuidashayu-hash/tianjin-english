// 与机构老板反馈沟通话术 - Word 文档生成脚本
// 用法：node /home/z/my-project/scripts/generate_talking_points.js

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, HeadingLevel, WidthType,
  BorderStyle, ShadingType, PageOrientation, PageBreak,
} = require("docx");
const fs = require("fs");

const H = require("./helpers.js");
const { C, FONT, FONT_HEI } = H;

// ============================================================
//  自定义构造函数（适合话术文档的风格）
// ============================================================

function bodyP(text, opts = {}) {
  return new Paragraph({
    alignment: opts.alignment || AlignmentType.LEFT,
    spacing: { before: opts.before || 60, after: opts.after || 60, line: 360 },
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
    spacing: { before: opts.before || 60, after: opts.after || 60, line: 360 },
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

// 强调引用块（蓝色边框，浅蓝底）
function quoteBlock(label, content) {
  const cell = new TableCell({
    width: { size: 100, type: WidthType.PERCENTAGE },
    margins: { top: 120, bottom: 120, left: 200, right: 200 },
    shading: { type: ShadingType.CLEAR, fill: "EFF6FF" },
    borders: {
      left: { style: BorderStyle.SINGLE, size: 24, color: "1E40AF" },
      top: { style: BorderStyle.SINGLE, size: 4, color: "BFDBFE" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "BFDBFE" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "BFDBFE" },
    },
    children: [
      richP([
        run(label, { bold: true, color: "1E40AF", size: 22 }),
      ], { before: 0, after: 60 }),
      richP([
        run(content, { size: 22, color: C.body }),
      ], { before: 0, after: 0 }),
    ],
  });
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [new TableRow({ cantSplit: true, children: [cell] })],
  });
}

// 警示块（红色边框，浅红底）
function warningBlock(label, content) {
  const cell = new TableCell({
    width: { size: 100, type: WidthType.PERCENTAGE },
    margins: { top: 120, bottom: 120, left: 200, right: 200 },
    shading: { type: ShadingType.CLEAR, fill: "FEF2F2" },
    borders: {
      left: { style: BorderStyle.SINGLE, size: 24, color: "DC2626" },
      top: { style: BorderStyle.SINGLE, size: 4, color: "FECACA" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "FECACA" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "FECACA" },
    },
    children: [
      richP([
        run(label, { bold: true, color: "DC2626", size: 22 }),
      ], { before: 0, after: 60 }),
      richP([
        run(content, { size: 22, color: C.body }),
      ], { before: 0, after: 0 }),
    ],
  });
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [new TableRow({ cantSplit: true, children: [cell] })],
  });
}

// 建议块（绿色边框，浅绿底）
function suggestionBlock(label, content) {
  const cell = new TableCell({
    width: { size: 100, type: WidthType.PERCENTAGE },
    margins: { top: 120, bottom: 120, left: 200, right: 200 },
    shading: { type: ShadingType.CLEAR, fill: "F0FDF4" },
    borders: {
      left: { style: BorderStyle.SINGLE, size: 24, color: "16A34A" },
      top: { style: BorderStyle.SINGLE, size: 4, color: "BBF7D0" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "BBF7D0" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "BBF7D0" },
    },
    children: [
      richP([
        run(label, { bold: true, color: "16A34A", size: 22 }),
      ], { before: 0, after: 60 }),
      richP([
        run(content, { size: 22, color: C.body }),
      ], { before: 0, after: 0 }),
    ],
  });
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [new TableRow({ cantSplit: true, children: [cell] })],
  });
}

// 话术块（黄色边框，浅黄底，模拟对话脚本）
function scriptBlock(title, content) {
  const cell = new TableCell({
    width: { size: 100, type: WidthType.PERCENTAGE },
    margins: { top: 120, bottom: 120, left: 200, right: 200 },
    shading: { type: ShadingType.CLEAR, fill: "FFFBEB" },
    borders: {
      left: { style: BorderStyle.SINGLE, size: 24, color: "D97706" },
      top: { style: BorderStyle.SINGLE, size: 4, color: "FDE68A" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "FDE68A" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "FDE68A" },
    },
    children: [
      richP([
        run(title, { bold: true, color: "92400E", size: 22 }),
      ], { before: 0, after: 80 }),
      richP([
        run(content, { size: 22, color: C.body, italics: false }),
      ], { before: 0, after: 0 }),
    ],
  });
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [new TableRow({ cantSplit: true, children: [cell] })],
  });
}

function spacer(h = 80) {
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

function mkHeaderCell(text, width) {
  return new TableCell({
    width: { size: width, type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, fill: C.headerBg },
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
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

// ============================================================
//  文档内容构建
// ============================================================

function buildTitleBlock() {
  const items = [];

  items.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 120, line: 480, lineRule: "atLeast" },
    children: [new TextRun({
      text: "与机构老板反馈沟通话术整理",
      size: 40, bold: true, color: C.title, font: FONT_HEI,
    })],
  }));

  items.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 80, line: 360, lineRule: "atLeast" },
    children: [new TextRun({
      text: "—— 4-6 年级混班校内同步诉求 · 体系性反馈 ——",
      size: 22, color: C.section, font: FONT_HEI,
    })],
  }));

  items.push(new Paragraph({
    spacing: { before: 120, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: "888888" } },
    children: [new TextRun({ text: " ", size: 4 })],
  }));

  // 核心结论一句话
  items.push(quoteBlock(
    "📌 一句话核心结论",
    "这不是我个人教学能力的问题，而是机构课程体系在 4-6 年级阶段存在结构性缺口。仅靠个别老师「上课时自行增加内容」无法持续承担，需要机构层面统一支持，否则会持续影响家长满意度和续费率。"
  ));

  items.push(spacer(120));

  // 使用说明
  items.push(bodyP(
    "【使用说明】本文档整理了与机构老板反馈该问题时的沟通话术，按「问题背景 → 事实数据 → 案例支撑 → 工作量分析 → 体系归因 → 建议方案 → 开口话术」7 个部分组织。建议正式沟通前先通读一遍，重点标记「事实数据」和「家长反馈案例」部分，沟通时直接引用具体数字和事件，让老板意识到问题的紧迫性和体系性。",
    { before: 60, after: 120, size: 21, color: C.grey }
  ));

  return items;
}

function buildSection1_Background() {
  const items = [];
  items.push(h1("一、问题背景说明"));

  items.push(h3("1.1 机构定位与课程体系"));
  items.push(bodyP(
    "咱们机构是「原版阅读」定位，从 A-K 级别阅读本起步，K 之后进入小说课。整体是扩展性、培养语感型的课程，不是 K12 硬式应试教育。这个定位本身是清晰的，也是家长选择我们的原因之一。",
    { before: 60, after: 100, size: 22 }
  ));
  items.push(bodyP(
    "但这里有一个客观情况：阅读本级别跟孩子年级没有强对应关系，跟孩子自身英语能力有关。所以同一个班级里，可能既有 3 年级、也有 4 年级、还有 5 年级 6 年级的学生。能力强的孩子 2 年级就能上到小说课，能力一般的孩子 4、5 年级才上到 G、H，甚至 6 年级才到 E 级别的也有。这种「年级混班 + 能力差异」的结构，本来就是咱们体系的特点。",
    { before: 0, after: 100, size: 22 }
  ));

  items.push(h3("1.2 4 年级开始的结构性矛盾"));
  items.push(bodyP(
    "问题出现在 4 年级这个节点。从 4 年级开始，校内英语难度明显提升：",
    { before: 60, after: 80, size: 22 }
  ));

  items.push(bodyP("• 1-2 年级：天津版新蕾快乐英语，校内难度低，机构扩展内容足以覆盖；", { before: 0, after: 40, size: 22, indent: { left: 240 } }));
  items.push(bodyP("• 3 年级：启用「人教精通版」三年级起点，孩子还能应付，机构辅导也能接受；", { before: 0, after: 40, size: 22, indent: { left: 240 } }));
  items.push(bodyP("• 4-6 年级：校内知识点（语法、句型、词汇）显著加重，家长发现孩子在机构学得好，但校内跟不上。", { before: 0, after: 80, size: 22, indent: { left: 240 } }));

  items.push(bodyP(
    "校内老师的普遍做法是：默认孩子会从课外补习获取知识，或者讲不深，单班 50+ 学生也无法照顾到个体差异。结果就是：4-6 年级家长的压力，事实上转移到了机构这边。",
    { before: 80, after: 120, size: 22 }
  ));

  items.push(warningBlock(
    "⚠️ 关键转折点",
    "我们机构课程体系本身是为「扩展提升」设计的，没有为 4-6 年级校内同步做标准化支持。这个缺口在低年级看不出问题（校内内容简单），但一到 4 年级就集中爆发——而恰好我承担的班级里有较多 4-6 年级学生，所以问题在我这边显现得最早、最集中。"
  ));

  items.push(spacer(80));
  return items;
}

function buildSection2_Data() {
  const items = [];
  items.push(h1("二、事实数据支撑"));

  items.push(h3("2.1 我目前负责的班级情况"));
  items.push(bodyP(
    "我目前带 4 个班级，其中 2 个班级存在 4-5-6 年级混班情况。这在咱们机构不是普遍现象——据我了解，其他老师带的高年级学生相对较少。换句话说，我不是因为教学能力问题被分到高年级班，而是恰好班级里有这些年级的学生，所以最先触碰到这个体系缺口。",
    { before: 60, after: 120, size: 22 }
  ));

  // 表格：4 个班级情况
  items.push(new Paragraph({
    keepNext: true,
    spacing: { before: 0, after: 80, line: 312 },
    children: [new TextRun({ text: "表 1  我负责的 4 个班级年级构成示意", bold: true, size: 21, font: FONT_HEI, color: C.section })],
  }));

  const classRows = [
    new TableRow({
      tableHeader: true,
      cantSplit: true,
      children: [
        mkHeaderCell("班级", 15),
        mkHeaderCell("学生数", 15),
        mkHeaderCell("年级构成", 40),
        mkHeaderCell("是否含 4-6 年级", 30),
      ],
    }),
    new TableRow({
      cantSplit: true,
      children: [
        mkDataCell("班级 A", { bold: true, color: C.accent, width: 15 }),
        mkDataCell("6 人", { width: 15 }),
        mkDataCell("3 年级 ×1、4 年级 ×2、5 年级 ×2、6 年级 ×1", { width: 40 }),
        mkDataCell("✅ 是（高年级 5 人）", { color: "DC2626", bold: true, width: 30 }),
      ],
    }),
    new TableRow({
      cantSplit: true,
      children: [
        mkDataCell("班级 B", { bold: true, color: C.accent, width: 15 }),
        mkDataCell("6 人", { width: 15 }),
        mkDataCell("4 年级 ×2、5 年级 ×2、6 年级 ×2", { width: 40 }),
        mkDataCell("✅ 是（高年级 6 人）", { color: "DC2626", bold: true, width: 30 }),
      ],
    }),
    new TableRow({
      cantSplit: true,
      children: [
        mkDataCell("班级 C", { bold: true, color: C.accent, width: 15 }),
        mkDataCell("6 人", { width: 15 }),
        mkDataCell("1-3 年级混班", { width: 40 }),
        mkDataCell("❌ 否", { color: "16A34A", bold: true, width: 30 }),
      ],
    }),
    new TableRow({
      cantSplit: true,
      children: [
        mkDataCell("班级 D", { bold: true, color: C.accent, width: 15 }),
        mkDataCell("6 人", { width: 15 }),
        mkDataCell("1-3 年级混班", { width: 40 }),
        mkDataCell("❌ 否", { color: "16A34A", bold: true, width: 30 }),
      ],
    }),
  ];
  items.push(makeTable(classRows));

  items.push(spacer(80));

  items.push(h3("2.2 单班级差异化需求场景（以班级 A 为例）"));
  items.push(bodyP(
    "以班级 A 为例，6 个学生来自 4 个不同年级，且每个学生的英语能力各不相同。这意味着我每次备课需要同时考虑：",
    { before: 60, after: 100, size: 22 }
  ));

  items.push(bodyP("① 6 个学生当前阅读本级别（A-K 中的哪一级）", { before: 0, after: 40, size: 22, indent: { left: 240 } }));
  items.push(bodyP("② 6 个学生所在年级对应的校内知识点（3 年级 vs 6 年级差异巨大）", { before: 0, after: 40, size: 22, indent: { left: 240 } }));
  items.push(bodyP("③ 同一年级不同学生的能力瓶颈（即使都是 4 年级，可能一个语法弱、一个词汇弱）", { before: 0, after: 40, size: 22, indent: { left: 240 } }));
  items.push(bodyP("④ 低年级但能力强 vs 高年级但能力一般的差异化方案", { before: 0, after: 80, size: 22, indent: { left: 240 } }));

  items.push(bodyP(
    "现在如果再加上「为高年级学生补充校内同步硬式教育内容」这一项，相当于在原有 4 个维度之上又叠加一层。这不是「上课时多讲一点」能解决的——它需要成体系的素材包、标准化课件、对应年级的练习题库，而目前机构层面没有提供这些。",
    { before: 80, after: 120, size: 22, color: C.body }
  ));

  items.push(spacer(80));
  return items;
}

function buildSection3_Cases() {
  const items = [];
  items.push(h1("三、家长反馈案例（近期真实事件）"));

  items.push(h3("3.1 案例一：4 年级班级家长集体反馈"));
  items.push(bodyP(
    "昨天（周一），我带的一个 4 年级为主、含 5-6 年级混班班级的家长，主动跟我反馈了一个重要情况：",
    { before: 60, after: 100, size: 22 }
  ));

  items.push(quoteBlock(
    "家长原话要点",
    "「不是她一个人的想法，是这个班级几乎所有家长都这么想。大家觉得机构之前做扩展提升是好的，但从 4 年级开始校内内容加重了，希望机构也能把校内硬式教育的内容融入到平时讲课当中。如果机构不能改变，就要走了。但对我（老师）的能力和表现是很认可的。」"
  ));

  items.push(spacer(80));

  items.push(bodyP(
    "⚠️ 注意三个关键信号：",
    { before: 0, after: 80, size: 22, bold: true, color: "DC2626" }
  ));
  items.push(bodyP("① 不是单个家长意见，是集体不满（家长用了「几乎所有家长都这么想」）；", { before: 0, after: 40, size: 22, indent: { left: 240 } }));
  items.push(bodyP("② 已经明确给出最后通牒：「不能改变就要走了」——这是直接的续费/退费风险信号；", { before: 0, after: 40, size: 22, indent: { left: 240 } }));
  items.push(bodyP("③ 家长认可老师个人能力——说明问题不在老师，在体系。家长只是希望机构调整课程结构，而不是换老师。", { before: 0, after: 100, size: 22, indent: { left: 240 } }));

  items.push(h3("3.2 案例二：可乐妈妈转班事件"));
  items.push(bodyP(
    "今天（周二），同班级另一名家长（可乐妈妈）也通过微信正式提出转班。她直接说明了原因：「4 年级后语法和单词量吃力」，并感谢老师长期教导，态度友好但明确要走。",
    { before: 60, after: 100, size: 22 }
  ));

  items.push(bodyP(
    "我在微信里已经应急回应：「已根据班级情况调整课程，本周起新增针对校内同步单词、语法考点的板块，专为四年级设计，可解决家长担心的问题，欢迎再沟通」——但这只是临时应急的挽留话术，背后没有机构层面的标准化素材支撑。如果机构不能真正投入资源做这件事，类似事件会持续发生，我和另一位老师会持续被动应对。",
    { before: 60, after: 120, size: 22, color: C.body }
  ));

  items.push(warningBlock(
    "🚨 紧迫性提醒",
    "两个案例发生在连续两天内，且来自同一个班级的不同家长。这不是孤立事件，而是集体情绪已经开始转化为实际行动（转班/退费）的信号。如果机构不迅速回应，损失将不可逆——而且这种负面口碑会扩散到其他班级和其他家长。"
  ));

  items.push(spacer(80));
  return items;
}

function buildSection4_Workload() {
  const items = [];
  items.push(h1("四、工作量分析"));

  items.push(h3("4.1 现行备课工作量"));
  items.push(bodyP(
    "先说明目前的备课情况。机构原本希望老师针对班级每个学生当前阅读本级别，制定差异化学习计划和内容——虽然讲的是同样的内容，但要为 6 个学生考虑各自的级别和能力瓶颈。这本身就是一份相当重的工作量。",
    { before: 60, after: 100, size: 22 }
  ));

  items.push(bodyP(
    "换句话说，我现在每个班级的备课，已经包含了「6 个学生 × 4 个维度」的差异化设计：",
    { before: 0, after: 80, size: 22 }
  ));

  // 工作量维度表
  const workloadRows = [
    new TableRow({
      tableHeader: true,
      cantSplit: true,
      children: [
        mkHeaderCell("差异化维度", 25),
        mkHeaderCell("具体考虑内容", 50),
        mkHeaderCell("工作量级", 25),
      ],
    }),
    new TableRow({
      cantSplit: true,
      children: [
        mkDataCell("① 阅读本级别", { bold: true, color: C.accent, width: 25 }),
        mkDataCell("6 个学生各自当前在 A-K 哪一级", { width: 50 }),
        mkDataCell("中", { align: AlignmentType.CENTER, width: 25 }),
      ],
    }),
    new TableRow({
      cantSplit: true,
      children: [
        mkDataCell("② 校内年级对应", { bold: true, color: C.accent, width: 25 }),
        mkDataCell("3/4/5/6 年级各自校内人教精通版知识点（单元、词汇、句型、语法）", { width: 50 }),
        mkDataCell("高", { align: AlignmentType.CENTER, color: "DC2626", bold: true, width: 25 }),
      ],
    }),
    new TableRow({
      cantSplit: true,
      children: [
        mkDataCell("③ 同年级能力差异", { bold: true, color: C.accent, width: 25 }),
        mkDataCell("同为 4 年级，但语法弱 vs 词汇弱的不同方案", { width: 50 }),
        mkDataCell("中", { align: AlignmentType.CENTER, width: 25 }),
      ],
    }),
    new TableRow({
      cantSplit: true,
      children: [
        mkDataCell("④ 跨年级能力反转", { bold: true, color: C.accent, width: 25 }),
        mkDataCell("3 年级能力强 vs 6 年级能力一般的应对方案", { width: 50 }),
        mkDataCell("中", { align: AlignmentType.CENTER, width: 25 }),
      ],
    }),
    new TableRow({
      cantSplit: true,
      children: [
        mkDataCell("⑤ 新增：校内同步硬式教育", { bold: true, color: "DC2626", width: 25 }),
        mkDataCell("为 4-6 年级学生补充校内同步单词、语法、句型考点（无标准化素材）", { width: 50 }),
        mkDataCell("极高", { align: AlignmentType.CENTER, color: "DC2626", bold: true, width: 25 }),
      ],
    }),
  ];
  items.push(makeTable(workloadRows));

  items.push(spacer(80));

  items.push(h3("4.2 不可持续的现状"));
  items.push(bodyP(
    "老板之前给的方案是「让老师在上课时间自行增加内容满足家长需求」。这个方案表面上给了老师灵活性，但实际上有几个不可持续的问题：",
    { before: 60, after: 100, size: 22 }
  ));

  items.push(bodyP(
    "① 素材零散不可复用：每位老师自己找素材、自己出题、自己讲，没法形成体系化的课件库，下次类似情况还得从头再来；",
    { before: 0, after: 60, size: 22, indent: { left: 240 } }
  ));
  items.push(bodyP(
    "② 标准不一致：A 老师讲的「4 年级校内同步」和 B 老师讲的完全不一样，家长对比后会发现差异，反而引发新的不满；",
    { before: 0, after: 60, size: 22, indent: { left: 240 } }
  ));
  items.push(bodyP(
    "③ 老师负担不可见：每位老师为了应对 4-6 年级同步需求，每节课需要额外 1-2 小时备课，这部分时间不在原课时工资核算内；",
    { before: 0, after: 60, size: 22, indent: { left: 240 } }
  ));
  items.push(bodyP(
    "④ 单点风险：哪天老师请假、离职、生病，这套自建的「校内同步」内容就断了，班级立刻回到原点，家长会更不满。",
    { before: 0, after: 100, size: 22, indent: { left: 240 } }
  ));

  items.push(spacer(80));
  return items;
}

function buildSection5_Systemic() {
  const items = [];
  items.push(h1("五、为什么这是体系问题，不是个人问题"));

  items.push(bodyP(
    "这一部分是最关键的，希望老板能重点听一听。目前的舆论倾向是「这是某某老师班级里发生的事，是个人需求」——但实际上不是。",
    { before: 60, after: 120, size: 22 }
  ));

  items.push(h3("5.1 「仅 2 位老师有此问题」≠ 个人问题"));
  items.push(bodyP(
    "目前只有我和另一位老师承担较多 4-6 年级学生的班级，所以问题最先在我们这边显现。但这并不意味着这是「我们俩的特殊需求」——而是意味着：",
    { before: 60, after: 100, size: 22 }
  ));

  items.push(bodyP("• 其他老师班级暂时没有大量 4-6 年级学生，不是因为他们教学方式更好，而是因为学生构成还没轮到；", { before: 0, after: 40, size: 22, indent: { left: 240 } }));
  items.push(bodyP("• 随着时间推移，其他老师班级里的低年级学生也会升到 4 年级，问题会陆续在他们那边爆发；", { before: 0, after: 40, size: 22, indent: { left: 240 } }));
  items.push(bodyP("• 现在的问题是我们提前撞到的「体系性预警」，如果不解决，将来整个机构都会面临同样问题，且损失已经发生。", { before: 0, after: 100, size: 22, indent: { left: 240 } }));

  items.push(h3("5.2 机构课程体系缺一环"));
  items.push(bodyP(
    "咱们机构的课程体系目前是这样的：",
    { before: 60, after: 80, size: 22 }
  ));
  items.push(bodyP("A-K 阅读本 → 小说课（核心体系）", { before: 0, after: 40, size: 22, indent: { left: 240 } }));
  items.push(bodyP("❌ 缺失：「4-6 年级校内同步」标准化支持板块", { before: 0, after: 40, size: 22, color: "DC2626", bold: true, indent: { left: 240 } }));
  items.push(bodyP(
    "这一环的缺失，导致 4 年级开始，家长的需求和机构的供给出现错位。低年级时错位不明显（校内简单），4 年级开始错位放大，6 年级达到顶峰。",
    { before: 80, after: 100, size: 22 }
  ));

  items.push(h3("5.3 「自行增加内容」的不可持续性"));
  items.push(bodyP(
    "把体系缺口的补救责任压在单个老师身上，会出现以下连锁反应：",
    { before: 60, after: 80, size: 22 }
  ));

  items.push(bodyP("① 老师工作超负荷 → 教学质量下降 → 家长更不满 → 老师压力更大（恶性循环）；", { before: 0, after: 40, size: 22, indent: { left: 240 } }));
  items.push(bodyP("② 老师个人精力有限 → 只能浅层补充 → 解决不了校内真痛点 → 家长觉得机构「敷衍了事」；", { before: 0, after: 40, size: 22, indent: { left: 240 } }));
  items.push(bodyP("③ 长期无体系支持 → 老师流失风险（这种压力下，老师可能选择去更支持的机构）；", { before: 0, after: 40, size: 22, indent: { left: 240 } }));
  items.push(bodyP("④ 一旦老师流失 → 班级学生断层 → 家长集体不满爆发 → 续费率断崖式下跌。", { before: 0, after: 100, size: 22, indent: { left: 240 } }));

  items.push(warningBlock(
    "🎯 核心归因",
    "这不是「老师不够努力」，是「机构没给老师武器」。让老师在没有标准化素材、没有体系化课件、没有额外课时补贴的情况下，独自应对家长压力和校内同步需求——这种安排本身就不可持续。"
  ));

  items.push(spacer(80));
  return items;
}

function buildSection6_Suggestions() {
  const items = [];
  items.push(h1("六、建议方案（短中长期）"));

  items.push(bodyP(
    "下面是我能想到的几个可行方案，按落地难度排序，老板可以根据机构资源情况选择：",
    { before: 60, after: 120, size: 22 }
  ));

  items.push(h3("方案 A（短期 / 1-2 周可落地）：标准化素材包"));
  items.push(suggestionBlock(
    "✅ 建议内容",
    "由机构层面统一整理一份「4-6 年级校内同步标准化素材包」，覆盖人教精通版 4 上、4 下、5 上、5 下、6 上、6 下 6 册的核心知识点（词汇、句型、语法点、配套练习）。素材包给到所有带 4-6 年级学生的老师统一使用，避免每位老师各自为战。我这边已经有一份现成的「天津武清区小学英语 4-6 年级知识点调研」文档（HTML + Word 版），可以直接作为素材包的基础。"
  ));

  items.push(spacer(60));

  items.push(h3("方案 B（中期 / 1-2 个月）：建立课件库 + 教研机制"));
  items.push(suggestionBlock(
    "✅ 建议内容",
    "在素材包基础上，建立「校内同步课件库」，按年级、按单元组织。每周固定一次教研时间，由我和另一位承担高年级的老师牵头，把当周要讲的校内同步内容标准化，沉淀到课件库里给其他老师复用。这样既能保证质量一致，也能让其他老师将来带高年级时有现成的东西可用，避免同样的问题再次在别人身上发生。"
  ));

  items.push(spacer(60));

  items.push(h3("方案 C（配套机制）：工作量补贴 + 课时调整"));
  items.push(suggestionBlock(
    "✅ 建议内容",
    "对于承担 4-6 年级混班的老师，建议给予一定的工作量补贴（按高年级学生人数计算），或调整课时单价。这不是为了钱，而是认可这部分额外付出的合理性，避免老师长期「无偿加码」导致流失。同时建议这类班级的招生数量适当控制（如不超过 6 人），保证老师能照顾到每个学生。"
  ));

  items.push(spacer(60));

  items.push(h3("方案 D（长期）：课程体系升级"));
  items.push(suggestionBlock(
    "✅ 建议内容",
    "在机构主课程（A-K + 小说）基础上，新增一条「校内同步」辅助线，专门服务 4 年级以上的学生。这条辅助线可以独立招生、独立定价，作为机构「扩展提升」主线的补充产品。这样既保住了机构「原版阅读」的定位，又回应了家长对校内同步的诉求，且老师有清晰的备课边界，不会无限承担。"
  ));

  items.push(spacer(80));
  return items;
}

function buildSection7_Scripts() {
  const items = [];
  items.push(h1("七、关键沟通话术（开口时可直接这样说）"));

  items.push(bodyP(
    "下面是建议的开口话术，按沟通节奏分阶段组织。重点是：先陈述事实和数据，再分析归因，最后给方案——不要一上来就抱怨，让老板感受到我们是在理性地解决问题。",
    { before: 60, after: 120, size: 22, color: C.grey }
  ));

  items.push(h3("话术 1：开场白（30 秒）"));
  items.push(scriptBlock(
    "🎬 开场",
    "「老板，今天想占用您 15 分钟，跟您同步一个最近在我班级里集中出现的情况。不是我个人教学上的事，是关于咱们机构在 4-6 年级阶段课程体系的一个缺口，已经影响到家长满意度和续费了，想跟您一起商量下怎么从机构层面解决。」"
  ));

  items.push(spacer(60));

  items.push(h3("话术 2：陈述事实数据（1-2 分钟）"));
  items.push(scriptBlock(
    "📊 数据陈述",
    "「我目前带 4 个班，其中 2 个班有 4-6 年级混班情况——班级 A 有 3、4、5、6 四个年级，班级 B 全部是 4-6 年级。其他老师目前带的高年级学生相对较少，所以这个问题最先在我这边显现。但这不是偶然——其他老师班级的低年级孩子，再过 1-2 年也会升到 4 年级，到时同样的问题会陆续爆发。」"
  ));

  items.push(spacer(60));

  items.push(h3("话术 3：摆家长案例（2-3 分钟，重点）"));
  items.push(scriptBlock(
    "⚠️ 案例陈述",
    "「最近两天连续发生了两件事，我想让您重点关注一下。昨天，我班上一名 4 年级家长主动反馈，说不是她一个人的意见，是这个班几乎所有家长都认为机构需要补充校内硬式教育内容，如果机构不改变就要走了——但她特别说明对我个人能力是认可的，问题在体系不在老师。今天，同班另一名家长可乐妈妈，已经正式通过微信提出要转班，原因是『4 年级后语法和单词量吃力』。这两个事件连续两天发生，来自同一个班的不同家长，我判断这是集体情绪开始转化为实际行动的信号，如果不迅速回应，损失会不可逆，而且负面口碑会扩散。」"
  ));

  items.push(spacer(60));

  items.push(h3("话术 4：分析归因（1-2 分钟，核心）"));
  items.push(scriptBlock(
    "🎯 归因陈述",
    "「我想重点说明的是，这不是我个人能力的问题，也不是『某某老师班级的特殊需求』。问题在于咱们机构的课程体系从设计上是『原版阅读扩展』，没有为 4-6 年级校内同步做标准化支持。低年级时这个缺口不明显（校内简单），一到 4 年级就集中爆发。您之前建议『老师在上课时自行增加内容』——这个方向是对的，但靠老师个人承担不可持续：素材零散不可复用、老师之间标准不一致、备课工作量翻倍但不在工资核算内、老师一旦请假或流失整套内容就断了。我现在每节课为了应对 4-6 年级同步需求，已经额外多花 1-2 小时备课，长期下去我和另一位老师的精力会跟不上。」"
  ));

  items.push(spacer(60));

  items.push(h3("话术 5：提出建议（1-2 分钟）"));
  items.push(scriptBlock(
    "💡 方案陈述",
    "「我整理了几个可行方案，您看哪个适合咱们机构落地。短期方案：机构层面统一整理一份『4-6 年级校内同步标准化素材包』给所有相关老师用——我手上已经有一份现成的『天津武清区小学英语 4-6 年级知识点调研』文档（HTML + Word），可以直接作为素材包基础。中期方案：建立校内同步课件库 + 每周固定教研时间，由我和另一位老师牵头标准化，沉淀给其他老师复用。配套机制：对于承担高年级混班的老师，给予工作量补贴或课时单价调整，认可这部分额外付出。长期方案：在主课程外新增一条『校内同步』辅助线，独立定价独立招生。我建议先从短期方案 A 落地，1-2 周内就能让家长看到变化、稳住续费率，然后再讨论中长期。」"
  ));

  items.push(spacer(60));

  items.push(h3("话术 6：收尾 + 请求支持（30 秒）"));
  items.push(scriptBlock(
    "✅ 收尾",
    "「老板，我之所以花时间整理这些跟您反馈，是因为我看到家长情绪已经在转变为退费行动，再不处理可能就来不及了。我个人的工作量我可以承担一段时间，但希望机构能从体系层面给一些支持——哪怕是先确认要不要做短期素材包这个方案。如果老板觉得有道理，我们可以本周内碰一次细化方案；如果您觉得时机不到，我也希望您能理解为什么我会在班内做一些临时补救——这是为了让家长先稳住。请老板考虑。」"
  ));

  items.push(spacer(80));
  return items;
}

function buildFooter() {
  const items = [];
  items.push(h1("附：沟通前小贴士"));

  items.push(bodyP(
    "1. 沟通时机：建议选在老板相对不忙的时间段（如周一上午或周末前），避免被打断；",
    { before: 60, after: 60, size: 22 }
  ));
  items.push(bodyP("2. 沟通方式：建议面对面或视频会议，避免文字沟通（容易产生误解）；", { before: 0, after: 60, size: 22 }));
  items.push(bodyP("3. 准备材料：带上本文档打印版 + 已有的「知识点调研」文档作为方案 A 的素材包示例；", { before: 0, after: 60, size: 22 }));
  items.push(bodyP("4. 情绪管理：陈述事实和数据，避免情绪化表达（不要说『我都累死了』『老板不重视我』之类）；", { before: 0, after: 60, size: 22 }));
  items.push(bodyP("5. 倾听反馈：陈述完事实后，停下来听老板的反应和顾虑，不要一口气讲完所有话术；", { before: 0, after: 60, size: 22 }));
  items.push(bodyP("6. 留有余地：方案 ABCD 都列出来，让老板有选择空间，而不是『要么按我说的做，要么我就不干了』；", { before: 0, after: 60, size: 22 }));
  items.push(bodyP("7. 跟进约定：沟通结束时约定下一步行动（『本周五前给个答复』『下周教研时讨论』），避免悬而未决。", { before: 0, after: 60, size: 22 }));

  items.push(spacer(120));

  items.push(bodyP(
    "📌 一句话总结：让老板感受到，我们不是来抱怨的，是来一起解决问题的——而且方案都已经准备好了，只差老板拍板。",
    { before: 60, after: 60, size: 22, bold: true, color: C.accent }
  ));

  return items;
}

// ============================================================
//  组装文档
// ============================================================

async function buildDocument() {
  const allChildren = [
    ...buildTitleBlock(),
    ...buildSection1_Background(),
    ...buildSection2_Data(),
    ...buildSection3_Cases(),
    ...buildSection4_Workload(),
    ...buildSection5_Systemic(),
    ...buildSection6_Suggestions(),
    ...buildSection7_Scripts(),
    ...buildFooter(),
  ];

  const doc = new Document({
    creator: "机构反馈话术",
    title: "与机构老板反馈沟通话术整理",
    description: "4-6 年级校内同步诉求体系性反馈",
    styles: {
      default: {
        document: {
          run: { font: FONT, size: 22, color: C.body },
          paragraph: { spacing: { line: 360 } },
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
            children: [new TextRun({
              text: "与机构老板反馈沟通话术整理（4-6 年级校内同步诉求）",
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
  const outPath = "/home/z/my-project/download/与机构老板反馈沟通话术整理.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("✅ 文档已生成：" + outPath);
  console.log("📊 大小：" + (buffer.length / 1024).toFixed(1) + " KB");
}

buildDocument().catch(err => {
  console.error("❌ 生成失败：", err);
  process.exit(1);
});
