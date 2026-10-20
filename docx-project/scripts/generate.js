// 主生成脚本：构建六年级被动语态错题精讲与专项练习文档
// 用法：bun run /home/z/my-project/scripts/generate.js

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, HeadingLevel, WidthType,
  BorderStyle, ShadingType, PageOrientation, LevelFormat, PageBreak,
} = require("docx");
const fs = require("fs");

const H = require("./helpers.js");
const D = require("./data.js");

const { C, FONT, FONT_HEI } = H;

// ============================================================
//  顶部标题块
// ============================================================
function buildTitleBlock() {
  const items = [];

  // 主标题
  items.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 120, line: 480, lineRule: "atLeast" },
    children: [new TextRun({
      text: "六年级英语 · 被动语态专项",
      size: 40, bold: true, color: C.title, font: FONT_HEI,
    })],
  }));

  // 副标题
  items.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 120, line: 360, lineRule: "atLeast" },
    children: [new TextRun({
      text: "试卷错题精讲 · 专项练习 · 不规则动词表",
      size: 26, color: C.section, font: FONT_HEI,
    })],
  }));

  // 副副标题
  items.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 60, line: 312 },
    children: [new TextRun({
      text: "—— 家长辅导用 · 可直接打印 ——",
      size: 20, italics: true, color: C.light, font: FONT,
    })],
  }));

  // 分隔线
  items.push(new Paragraph({
    spacing: { before: 60, after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: "888888" } },
    children: [new TextRun({ text: " ", size: 4 })],
  }));

  // 文档说明
  items.push(H.bodyP(
    "本文档共分为七个部分：① 试卷错题作答情况一览 ② Task 3 第1-16题逐题精讲（学生答案 / 正确答案 / 错因分析 / 知识点延伸）③ 选择题第8-10题讲解 ④ 一般现在时被动语态专项练习（15题，含答案与解析）⑤ 一般过去时被动语态专项练习（15题，含答案与解析）⑥ 六年级被动语态常考不规则动词表（40个核心词）⑦ 被动语态学习小贴士。",
    { before: 80, after: 120, size: 21, color: C.grey }
  ));

  return items;
}

// ============================================================
//  Section 1：错题情况一览表
// ============================================================
function buildOverviewTable() {
  const items = [];
  items.push(H.h1("一、试卷错题作答情况一览"));

  items.push(H.bodyP(
    "本次试卷为 Task 3 Challenging Task，共 16 道被动语态填空题。学生 16 道题全部出现错误，主要错误类型集中在三类：① 完全没有加 be 动词（占 100%）② 用动词原形/过去式代替过去分词 ③ 拼写混淆（如 song/sung、sand/sent）。下表一目了然地呈现每道题的学生作答、正确答案与错误类型，便于家长先抓共性问题。",
    { before: 0, after: 160, size: 21 }
  ));

  // 表头：题号 | 学生答案 | 正确答案 | 错误类型
  const headerRow = new TableRow({
    tableHeader: true,
    cantSplit: true,
    children: ["题号", "学生答案", "正确答案", "错误类型"].map((t, i) => {
      const widths = [10, 25, 25, 40];
      return new TableCell({
        width: { size: widths[i], type: WidthType.PERCENTAGE },
        shading: { type: ShadingType.CLEAR, fill: C.headerBg },
        margins: { top: 60, bottom: 60, left: 100, right: 100 },
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 0, line: 312 },
          children: [new TextRun({ text: t, bold: true, size: 22, font: FONT_HEI, color: C.title })],
        })],
      });
    }),
  });

  // 数据行
  const dataRows = D.OVERVIEW_ROWS.map((row, idx) => new TableRow({
    cantSplit: true,
    children: row.map((cell, i) => {
      const widths = [10, 25, 25, 40];
      let color = C.body;
      let bold = false;
      if (i === 1) { color = C.studentAns; bold = true; }      // 学生答案
      if (i === 2) { color = C.correctAns; bold = true; }     // 正确答案
      return new TableCell({
        width: { size: widths[i], type: WidthType.PERCENTAGE },
        margins: { top: 60, bottom: 60, left: 100, right: 100 },
        children: [new Paragraph({
          alignment: i === 0 ? AlignmentType.CENTER : AlignmentType.LEFT,
          spacing: { before: 0, after: 0, line: 312 },
          children: [new TextRun({ text: cell, size: 21, color, bold, font: FONT })],
        })],
      });
    }),
  }));

  const table = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 6, color: "333333" },
      bottom: { style: BorderStyle.SINGLE, size: 6, color: "333333" },
      left: { style: BorderStyle.SINGLE, size: 4, color: "888888" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "888888" },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "BBBBBB" },
      insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "BBBBBB" },
    },
    rows: [headerRow, ...dataRows],
  });

  // 表前标题段
  items.push(new Paragraph({
    keepNext: true,
    spacing: { before: 0, after: 80, line: 312 },
    children: [new TextRun({ text: "表 1  Task 3 错题作答一览（共 16 题）", bold: true, size: 21, font: FONT_HEI, color: C.section })],
  }));
  items.push(table);

  // 共性问题小结
  items.push(H.bodyP(
    "共性问题小结：1) 16 道题 100% 没有写出 be 动词，说明学生完全没有掌握被动语态的\"be + 过去分词\"结构。2) 多次把动词原形（make/draw/show）直接当答案，说明对\"过去分词\"概念陌生。3) 用过去式代替过去分词（wrote 代替 written、took 代替 taken、broke 代替 broken），这是 ABC 型不规则动词最常见的错误。4) 拼写混淆（song 当 sung、sand 当 sent），说明不规则动词表未背熟。建议优先突破：被动语态基本公式 + ABC 型不规则动词记忆。",
    { before: 200, after: 80, size: 21 }
  ));

  return items;
}

// ============================================================
//  Section 2：Task 3 逐题精讲（16题）
// ============================================================
function buildTask3Analysis() {
  const items = [];
  items.push(H.h1("二、Task 3 第 1-16 题逐题精讲"));

  items.push(H.bodyP(
    "本节对 Task 3 的 16 道被动语态填空题进行逐题精讲。每道题给出：原题（含学生答案）→ 学生答案（红色标注）→ 正确答案（蓝色加粗）→ 错因分析 → 知识点延伸。建议家长先让孩子自己看每题的\"错因分析\"和\"知识点延伸\"，再让孩子合上文档复述一遍，检验是否真正理解。",
    { before: 0, after: 160, size: 21 }
  ));

  // 每题用一个 errorAnalysisBlock
  D.TASK3_ERRORS.forEach((q, idx) => {
    items.push(H.errorAnalysisBlock(q.num, q.original, q.studentAns, q.correctAns, q.analysis, q.knowledge));
    items.push(H.spacer(60));
  });

  return items;
}

// ============================================================
//  Section 3：选择题第 8-10 题讲解
// ============================================================
function buildMCAnalysis() {
  const items = [];
  items.push(H.h1("三、选择题第 8-10 题讲解"));

  items.push(H.bodyP(
    "试卷图片中只能看到选择题第 8、9、10 三道题的选项（A/B/C/D）以及学生的选择（B/A/B），看不到完整的题干和上下文段落（应为一篇完形填空或阅读选择题）。下面基于可见的选项和参考答案版图片中给出的正确答案进行讲解。如家长有完整试卷，建议对照原文段落核对每题答案。",
    { before: 0, after: 160, size: 21 }
  ));

  D.MC_ERRORS.forEach((q) => {
    // 题目段
    items.push(H.questionP(q.num, "（图片上仅可见以下选项）"));
    items.push(H.mcOptionsTable(q.options));
    // 答案解析块
    items.push(H.answerBlock(
      `学生选择：${q.studentAns}（参考答案版图片中第 ${q.num} 题正确答案为 C）`,
      q.note + "\n\n" + q.knowledge
    ));
    items.push(H.spacer(80));
  });

  return items;
}

// ============================================================
//  Section 4 / 5：练习题（一般现在时 / 一般过去时）
// ============================================================
function buildPracticeSection(title, introText, practiceData) {
  const items = [];
  items.push(H.h1(title));
  items.push(H.bodyP(introText, { before: 0, after: 160, size: 21 }));

  // 子标题：填空题
  items.push(H.h2("第一部分：填空题（5 题）"));
  items.push(H.bodyP(
    "请用括号中所给动词的正确被动形式填空。注意判断时态（看时间标志词）和主语单复数（决定 be 动词）。",
    { before: 0, after: 120, size: 21, color: C.grey }
  ));
  practiceData.slice(0, 5).forEach((q) => {
    items.push(H.fillBlankP(q.num, q.before, q.after));
    items.push(H.answerBlock(q.answer, q.analysis));
    items.push(H.spacer(80));
  });

  // 子标题：句型转换
  items.push(H.h2("第二部分：句型转换（5 题）"));
  items.push(H.bodyP(
    "请将下列主动语态句子改为被动语态。注意：原句的宾语变成新主语，主语变成 by 后的执行者（可省略），动词变成 be + 过去分词。",
    { before: 0, after: 120, size: 21, color: C.grey }
  ));
  practiceData.slice(5, 10).forEach((q) => {
    items.push(H.questionP(q.num, q.transform));
    items.push(H.answerBlock(q.answer, q.analysis));
    items.push(H.spacer(80));
  });

  // 子标题：选择题
  items.push(H.h2("第三部分：单项选择（5 题）"));
  items.push(H.bodyP(
    "从 A、B、C、D 四个选项中选出最佳答案。",
    { before: 0, after: 120, size: 21, color: C.grey }
  ));
  practiceData.slice(10, 15).forEach((q) => {
    items.push(H.questionP(q.num, q.stem));
    // 选项较短，用4列布局
    const maxLen = Math.max(...q.options.map(o => o.length));
    if (maxLen <= 8) {
      items.push(H.mcOptionsTable(q.options));
    } else {
      items.push(H.mcOptionsTable2col(q.options));
    }
    items.push(H.answerBlock(q.answer, q.analysis));
    items.push(H.spacer(80));
  });

  return items;
}

// ============================================================
//  Section 6：不规则动词表
// ============================================================
function buildVerbTable() {
  const items = [];
  items.push(H.h1("六、六年级被动语态常考不规则动词表（40 词）"));

  items.push(H.bodyP(
    "下表整理了小学六年级被动语态中最常考的 40 个不规则动词，按变化模式分为 5 类：AAA 型（三者同形）、AAB 型（原形 = 过去式）、ABA 型（原形 = 过去分词）、ABB 型（过去式 = 过去分词）、ABC 型（三者皆不同）。表格中标 ★ 的为本次试卷涉及到的动词，建议优先背诵。注意：被动语态中要用的是动词的过去分词（即表格中第三列），不是过去式！",
    { before: 0, after: 160, size: 21 }
  ));

  items.push(H.tipBlock(
    "★ 关键提示：被动语态永远使用动词的\"过去分词\"（第三列），不能用\"过去式\"（第二列）。例如：The window was broken（√），不能写成 The window was broke（×）。"
  ));
  items.push(H.spacer(120));

  // 每组一张表
  D.VERB_GROUPS.forEach((group) => {
    // 组标题
    items.push(new Paragraph({
      keepNext: true,
      spacing: { before: 240, after: 80, line: 312 },
      children: [
        new TextRun({ text: group.pattern + "  ", bold: true, size: 24, color: C.correctAns, font: FONT_HEI }),
        new TextRun({ text: group.desc, size: 21, color: C.grey, font: FONT }),
      ],
    }));

    // 组说明（小贴士）
    items.push(H.bodyP("【记忆提示】" + group.tip, { before: 0, after: 80, size: 20, color: C.grey }));

    // 表头
    const headerRow = new TableRow({
      tableHeader: true,
      cantSplit: true,
      children: ["原形", "过去式", "过去分词", "中文"].map((t, i) => {
        const widths = [22, 22, 22, 34];
        return new TableCell({
          width: { size: widths[i], type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.CLEAR, fill: C.headerBg },
          margins: { top: 60, bottom: 60, left: 100, right: 100 },
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 0, line: 312 },
            children: [new TextRun({ text: t, bold: true, size: 21, font: FONT_HEI, color: C.title })],
          })],
        });
      }),
    });

    // 数据行
    const dataRows = group.verbs.map((v) => new TableRow({
      cantSplit: true,
      children: v.map((cell, i) => {
        const widths = [22, 22, 22, 34];
        let color = C.body;
        let bold = false;
        if (i === 2) { color = C.correctAns; bold = true; }  // 过去分词高亮
        return new TableCell({
          width: { size: widths[i], type: WidthType.PERCENTAGE },
          margins: { top: 60, bottom: 60, left: 100, right: 100 },
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 0, line: 312 },
            children: [new TextRun({ text: cell, size: 21, color, bold, font: FONT })],
          })],
        });
      }),
    }));

    const table = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 6, color: "333333" },
        bottom: { style: BorderStyle.SINGLE, size: 6, color: "333333" },
        left: { style: BorderStyle.SINGLE, size: 4, color: "888888" },
        right: { style: BorderStyle.SINGLE, size: 4, color: "888888" },
        insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "BBBBBB" },
        insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "BBBBBB" },
      },
      rows: [headerRow, ...dataRows],
    });

    items.push(table);
    items.push(H.spacer(80));
  });

  // 表后说明：哪些是规则动词
  items.push(H.bodyP(
    "补充说明：本次试卷出现的 plant, repair, cook, love 都是规则动词（过去分词加 -ed/-d），不在不规则动词表中，但同样适用于被动语态。例如： Trees are planted every spring.（每年春天种树。）The cake was cooked by my mum.（蛋糕是妈妈做的。）规则动词的过去分词只需在原形后加 -ed（以 e 结尾只加 -d），不在此表中重复列出。",
    { before: 200, after: 80, size: 21 }
  ));

  return items;
}

// ============================================================
//  Section 7：被动语态学习小贴士
// ============================================================
function buildTips() {
  const items = [];
  items.push(H.h1("七、被动语态学习小贴士"));

  // 核心公式
  items.push(H.h2("1. 核心公式：be + 过去分词"));
  items.push(H.bodyP(
    "被动语态永远由\"be 动词 + 过去分词\"构成，缺一不可。本次试卷学生 100% 的错误都是漏写 be 动词，这是被动语态的核心。无论题目给什么动词、什么时态，被动结构永远是：be 动词 + 过去分词。务必让孩子牢记这个公式。",
    { before: 0, after: 120, size: 21 }
  ));

  // be 动词选择口诀
  items.push(H.h2("2. be 动词选择口诀"));
  items.push(H.bodyP(
    "时态决定 be 动词的形式，主语单复数决定用 am/is/are 还是 was/were。一般现在时被动：am / is / are + 过去分词；一般过去时被动：was / were + 过去分词。口诀：\"单数 is / was，复数 are / were；现在时用 is/are，过去时用 was/were。\"举例：The book is written（现在被写）/ The book was written（过去被写）。",
    { before: 0, after: 120, size: 21 }
  ));

  // 时态判断
  items.push(H.h2("3. 时态判断看时间标志词"));
  items.push(H.bodyP(
    "做题先抓时间标志词：every day / every spring / every morning / these days / now / in the world → 一般现在时；yesterday / last week / last night / two days ago / in 1990 / when we were... → 一般过去时。本次试卷中每一道题都有明确的时间标志词，先圈出来再选 be 动词，就不会出错。",
    { before: 0, after: 120, size: 21 }
  ));

  // 避坑指南
  items.push(H.h2("4. 避坑指南：5 大常见错误"));
  const tips = [
    "❌ 只写动词原形（make / draw / show）—— 缺 be 动词 + 没变过去分词。✅ 必须 be + 过去分词。",
    "❌ 用过去式当过去分词（wrote 代替 written、took 代替 taken、broke 代替 broken）—— ABC 型动词最易错。✅ 背熟 ABC 型不规则动词表。",
    "❌ 主语单复数判断错误（用 was 代替 were、用 is 代替 are）—— 看到复数主语（trees / photos / letters / gifts）要用 are / were。",
    "❌ 拼写混淆（song 当 sung、sand 当 sent）—— 名词和过去分词长得很像。✅ 把不规则动词表抄写 5 遍。",
    "❌ 看到 now 就用进行时（speaking）—— now 在被动句中常指\"现在的状态\"，用一般现在时被动（is spoken），不是现在进行时被动。",
  ];
  tips.forEach(t => {
    items.push(H.bodyP(t, { before: 40, after: 40, size: 21 }));
  });

  items.push(H.spacer(120));
  items.push(H.tipBlock(
    "💡 学习建议：1) 每天背诵 5 个不规则动词，按 ABC 型优先。2) 重做 Task 3 的 16 道题，对照本文档的解析订正。3) 完成 30 道专项练习题，做完后核对答案，错的题再读一遍解析。4) 一周后再做一遍同样的题，检验是否真正掌握。"
  ));

  return items;
}

// ============================================================
//  组装文档
// ============================================================
async function buildDocument() {
  const sections = [];

  // 第一节：标题块 + Section 1
  const introChildren = [
    ...buildTitleBlock(),
    ...buildOverviewTable(),
  ];

  // 后续大节用 section break 隔开
  const task3Children = buildTask3Analysis();
  const mcChildren = buildMCAnalysis();
  const presentChildren = buildPracticeSection(
    "四、一般现在时的被动语态专项练习（15 题）",
    "本节针对一般现在时的被动语态（am / is / are + 过去分词）设计 15 道混合题型练习，包括填空、句型转换和单项选择。每题下方紧跟【答案】与【解析】，建议孩子先自己做一遍，再对照解析订正。题目覆盖学生常错场景（every spring / every day / now / these days 等一般现在时标志词）。",
    D.PRACTICE_PRESENT
  );
  const pastChildren = buildPracticeSection(
    "五、一般过去时的被动语态专项练习（15 题）",
    "本节针对一般过去时的被动语态（was / were + 过去分词）设计 15 道混合题型练习。题目覆盖 yesterday / last week / two days ago / in 1990 等一般过去时标志词，重点训练学生判断时态和主语单复数的能力。",
    D.PRACTICE_PAST
  );
  const verbChildren = buildVerbTable();
  const tipsChildren = buildTips();

  // 全部放在同一个 section，自然分页
  // 用 PageBreak 在大节之间分隔（带不可见字符避免被检测为空段落）
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
    ...task3Children,
    pbPara(),
    ...mcChildren,
    pbPara(),
    ...presentChildren,
    pbPara(),
    ...pastChildren,
    pbPara(),
    ...verbChildren,
    pbPara(),
    ...tipsChildren,
  ];

  sections.push({
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
            text: "六年级英语 · 被动语态专项（错题精讲与练习）",
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
  });

  const doc = new Document({
    creator: "家长辅导用",
    title: "六年级英语被动语态专项",
    description: "试卷错题精讲 + 30道专项练习 + 40个不规则动词表",
    styles: {
      default: {
        document: {
          run: {
            font: FONT,
            size: 22,
            color: C.body,
          },
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
    sections: sections,
  });

  const buffer = await Packer.toBuffer(doc);
  const outPath = "/home/z/my-project/download/六年级被动语态_错题精讲与专项练习.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("✅ 文档已生成：" + outPath);
  console.log("📊 大小：" + (buffer.length / 1024).toFixed(1) + " KB");
}

buildDocument().catch(err => {
  console.error("❌ 生成失败：", err);
  process.exit(1);
});
