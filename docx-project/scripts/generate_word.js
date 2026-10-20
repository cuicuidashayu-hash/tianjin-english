// Word 打印版生成脚本：把 textbook_data.js 渲染成可打印的 Word 文档
// 用法：node /home/z/my-project/scripts/generate_word.js

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, HeadingLevel, WidthType,
  BorderStyle, ShadingType, PageOrientation, PageBreak, LevelFormat,
} = require("docx");
const fs = require("fs");

const TEXTBOOK_DATA = require("./textbook_data.js");

// 颜色和字体常量
const C = {
  title: "0B1220",
  body: "1F2937",
  section: "1E40AF",
  grey: "6B7280",
  light: "9CA3AF",
  accent: "1E40AF",
  warn: "DC2626",
  star: "F59E0B",
  headerBg: "F3F4F6",
  catBg: "EDE9FE",
  catText: "5B21B6",
  tipBg: "FEF3C7",
  tipText: "92400E",
};

const FONT = { ascii: "Times New Roman", eastAsia: "SimSun" };
const FONT_HEI = { ascii: "Times New Roman", eastAsia: "SimHei" };

// 难度星级
function renderStars(star) {
  return "★".repeat(star) + "☆".repeat(3 - star);
}

// ============================================================
//  基础段落构造
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
      font: FONT,
    })],
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.LEFT,
    spacing: { before: 400, after: 200, line: 312 },
    children: [new TextRun({ text, size: 32, bold: true, color: C.section, font: FONT_HEI })],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    alignment: AlignmentType.LEFT,
    spacing: { before: 320, after: 160, line: 312 },
    children: [new TextRun({ text, size: 28, bold: true, color: C.title, font: FONT_HEI })],
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    alignment: AlignmentType.LEFT,
    spacing: { before: 240, after: 120, line: 312 },
    children: [new TextRun({ text, size: 24, bold: true, color: C.title, font: FONT_HEI })],
  });
}

function h4(text) {
  return new Paragraph({
    spacing: { before: 200, after: 80, line: 312 },
    children: [new TextRun({
      text, size: 22, bold: true, color: C.section, font: FONT_HEI,
    })],
  });
}

// 富文本段落
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
    font: opts.font || FONT,
  });
}

// 段间空行
function spacer(h = 60) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 0, line: Math.max(h, 40), lineRule: "exact" },
    children: [new TextRun({ text: "·", size: 8, color: "FFFFFF", font: FONT })],
  });
}

// ============================================================
//  视角 A：按年级顺叙
// ============================================================
function buildGrade(grade) {
  const items = [];
  items.push(h2(`${grade.name}（${grade.version}）`));

  grade.units.forEach(unit => {
    items.push(h3(`Unit ${unit.num}：${unit.title}`));
    items.push(bodyP(`主题：${unit.topic}`, { size: 20, color: C.grey, before: 0, after: 120 }));

    // 一、词汇
    items.push(h4("一、词汇"));
    const vocabRows = [
      new TableRow({
        tableHeader: true,
        cantSplit: true,
        children: ["英文", "中文", "难度"].map(t =>
          new TableCell({
            shading: { type: ShadingType.CLEAR, fill: C.headerBg },
            margins: { top: 60, bottom: 60, left: 100, right: 100 },
            children: [new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: t, bold: true, size: 20, font: FONT_HEI, color: C.title })],
            })],
          })
        ),
      }),
      ...unit.vocab.map(v => new TableRow({
        cantSplit: true,
        children: [
          new TableCell({
            margins: { top: 50, bottom: 50, left: 100, right: 100 },
            children: [new Paragraph({
              children: [new TextRun({ text: v.word, size: 21, font: FONT, color: C.accent, bold: true })],
            })],
          }),
          new TableCell({
            margins: { top: 50, bottom: 50, left: 100, right: 100 },
            children: [new Paragraph({
              children: [new TextRun({ text: v.cn, size: 21, font: FONT })],
            })],
          }),
          new TableCell({
            margins: { top: 50, bottom: 50, left: 100, right: 100 },
            children: [new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: renderStars(v.star), size: 21, font: FONT, color: C.star })],
            })],
          }),
        ],
      })),
    ];
    items.push(makeTable(vocabRows, [30, 50, 20]));

    // 二、句型
    items.push(h4("二、句型"));
    const sentRows = [
      new TableRow({
        tableHeader: true,
        cantSplit: true,
        children: ["英文句型", "中文翻译", "难度"].map(t =>
          new TableCell({
            shading: { type: ShadingType.CLEAR, fill: C.headerBg },
            margins: { top: 60, bottom: 60, left: 100, right: 100 },
            children: [new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: t, bold: true, size: 20, font: FONT_HEI, color: C.title })],
            })],
          })
        ),
      }),
      ...unit.sentences.map(s => new TableRow({
        cantSplit: true,
        children: [
          new TableCell({
            margins: { top: 50, bottom: 50, left: 100, right: 100 },
            children: [new Paragraph({
              children: [new TextRun({ text: s.en, size: 21, font: FONT, color: C.accent, bold: true })],
            })],
          }),
          new TableCell({
            margins: { top: 50, bottom: 50, left: 100, right: 100 },
            children: [new Paragraph({
              children: [new TextRun({ text: s.cn, size: 21, font: FONT })],
            })],
          }),
          new TableCell({
            margins: { top: 50, bottom: 50, left: 100, right: 100 },
            children: [new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: renderStars(s.star), size: 21, font: FONT, color: C.star })],
            })],
          }),
        ],
      })),
    ];
    items.push(makeTable(sentRows, [45, 40, 15]));

    // 三、语法点
    items.push(h4("三、语法点"));
    const gramRows = [
      new TableRow({
        tableHeader: true,
        cantSplit: true,
        children: ["语法点", "要点说明", "难度"].map(t =>
          new TableCell({
            shading: { type: ShadingType.CLEAR, fill: C.headerBg },
            margins: { top: 60, bottom: 60, left: 100, right: 100 },
            children: [new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: t, bold: true, size: 20, font: FONT_HEI, color: C.title })],
            })],
          })
        ),
      }),
      ...unit.grammar.map(g => new TableRow({
        cantSplit: true,
        children: [
          new TableCell({
            margins: { top: 50, bottom: 50, left: 100, right: 100 },
            children: [new Paragraph({
              children: [new TextRun({ text: g.point, size: 21, font: FONT_HEI, color: C.title, bold: true })],
            })],
          }),
          new TableCell({
            margins: { top: 50, bottom: 50, left: 100, right: 100 },
            children: [new Paragraph({
              children: [new TextRun({ text: g.detail, size: 21, font: FONT })],
            })],
          }),
          new TableCell({
            margins: { top: 50, bottom: 50, left: 100, right: 100 },
            children: [new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: renderStars(g.star), size: 21, font: FONT, color: C.star })],
            })],
          }),
        ],
      })),
    ];
    items.push(makeTable(gramRows, [25, 60, 15]));

    // 四、语音拼读
    items.push(h4("四、语音拼读"));
    const phonRows = [
      new TableRow({
        tableHeader: true,
        cantSplit: true,
        children: ["发音规则", "示例", "难度"].map(t =>
          new TableCell({
            shading: { type: ShadingType.CLEAR, fill: C.headerBg },
            margins: { top: 60, bottom: 60, left: 100, right: 100 },
            children: [new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: t, bold: true, size: 20, font: FONT_HEI, color: C.title })],
            })],
          })
        ),
      }),
      ...unit.phonetics.map(p => new TableRow({
        cantSplit: true,
        children: [
          new TableCell({
            margins: { top: 50, bottom: 50, left: 100, right: 100 },
            children: [new Paragraph({
              children: [new TextRun({ text: p.rule, size: 21, font: FONT_HEI, color: C.title, bold: true })],
            })],
          }),
          new TableCell({
            margins: { top: 50, bottom: 50, left: 100, right: 100 },
            children: [new Paragraph({
              children: [new TextRun({ text: p.examples, size: 21, font: FONT })],
            })],
          }),
          new TableCell({
            margins: { top: 50, bottom: 50, left: 100, right: 100 },
            children: [new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: renderStars(p.star), size: 21, font: FONT, color: C.star })],
            })],
          }),
        ],
      })),
    ];
    items.push(makeTable(phonRows, [35, 50, 15]));

    // 五、难点/易错点
    items.push(h4("五、难点 / 易错点"));
    const diffRows = [
      new TableRow({
        tableHeader: true,
        cantSplit: true,
        children: ["易错点", "错因分析", "难度"].map(t =>
          new TableCell({
            shading: { type: ShadingType.CLEAR, fill: "FEE2E2" },
            margins: { top: 60, bottom: 60, left: 100, right: 100 },
            children: [new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: t, bold: true, size: 20, font: FONT_HEI, color: C.warn })],
            })],
          })
        ),
      }),
      ...unit.difficulties.map(d => new TableRow({
        cantSplit: true,
        children: [
          new TableCell({
            margins: { top: 50, bottom: 50, left: 100, right: 100 },
            children: [new Paragraph({
              children: [new TextRun({ text: "❌ " + d.error, size: 21, font: FONT_HEI, color: C.warn, bold: true })],
            })],
          }),
          new TableCell({
            margins: { top: 50, bottom: 50, left: 100, right: 100 },
            children: [new Paragraph({
              children: [new TextRun({ text: d.detail, size: 21, font: FONT })],
            })],
          }),
          new TableCell({
            margins: { top: 50, bottom: 50, left: 100, right: 100 },
            children: [new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: renderStars(d.star), size: 21, font: FONT, color: C.star })],
            })],
          }),
        ],
      })),
    ];
    items.push(makeTable(diffRows, [25, 60, 15]));

    items.push(spacer(80));
  });

  return items;
}

// 通用表格构造
function makeTable(rows, widths) {
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
    columnWidths: widths.map(w => Math.floor(8800 * w / 100)),
  });
}

// ============================================================
//  视角 B：按知识点纵贯
// ============================================================
function buildViewB() {
  const items = [];
  const cat = TEXTBOOK_DATA.byCategory;

  items.push(h1("视角 B：按知识点纵贯"));
  items.push(bodyP(
    "本节按知识点分类纵贯整理，便于查看每个语法/句型/语音规则在 4-6 年级 6 册教材中的演化轨迹。词汇、句型按主题分类列表；语法、难点按知识点分类并标注难度星级。",
    { size: 21, color: C.grey, before: 0, after: 200 }
  ));

  // 词汇体系
  items.push(h2("📚 词汇体系（按主题分类）"));
  const vocabRows = [
    mkHeaderRow(["主题分类", "出现年级单元", "核心词汇"], [22, 18, 60]),
    ...cat.vocabulary.map(v => new TableRow({
      cantSplit: true,
      children: [
        mkCell(v.category, { bold: true, color: C.accent, width: 22 }),
        mkCell(v.grades, { color: C.grey, size: 20, width: 18 }),
        mkCell(v.items.join("　"), { size: 20, width: 60 }),
      ],
    })),
  ];
  items.push(makeTable(vocabRows, [22, 18, 60]));

  // 句型体系
  items.push(h2("💬 句型体系（按交际功能分类）"));
  const sentRows = [
    mkHeaderRow(["句型分类", "出现年级", "核心句型"], [22, 18, 60]),
    ...cat.sentences.map(s => new TableRow({
      cantSplit: true,
      children: [
        mkCell(s.category, { bold: true, color: C.accent, width: 22 }),
        mkCell(s.grades, { color: C.grey, size: 20, width: 18 }),
        mkCell(s.items.join("　"), { size: 20, width: 60 }),
      ],
    })),
  ];
  items.push(makeTable(sentRows, [22, 18, 60]));

  // 语法体系
  items.push(h2("📐 语法体系（按知识点纵贯）"));
  const gramRows = [
    mkHeaderRow(["语法点", "出现年级", "要点", "难度"], [22, 18, 50, 10]),
    ...cat.grammar.map(g => new TableRow({
      cantSplit: true,
      children: [
        mkCell(g.category, { bold: true, color: C.accent, width: 22 }),
        mkCell(g.grades, { color: C.grey, size: 20, width: 18 }),
        mkCell(g.detail, { size: 20, width: 50 }),
        mkCell(renderStars(g.star), { color: C.star, align: AlignmentType.CENTER, size: 22, width: 10 }),
      ],
    })),
  ];
  items.push(makeTable(gramRows, [22, 18, 50, 10]));

  // 语音体系
  items.push(h2("🔊 语音体系（自然拼读规则）"));
  const phonRows = [
    mkHeaderRow(["阶段", "出现年级", "字母/字母组合发音规则"], [20, 18, 62]),
    ...cat.phonetics.map(p => new TableRow({
      cantSplit: true,
      children: [
        mkCell(p.category, { bold: true, color: C.accent, width: 20 }),
        mkCell(p.grades, { color: C.grey, size: 20, width: 18 }),
        mkCell(p.items.join("　"), { size: 20, width: 62 }),
      ],
    })),
  ];
  items.push(makeTable(phonRows, [20, 18, 62]));

  // 难点纵贯
  items.push(h2("⚠️ 难点纵贯（高频易错点）"));
  const diffRows = [
    mkHeaderRow(["易错点", "高频年级", "常见错误", "难度"], [22, 18, 50, 10], true),
    ...cat.difficulties.map(d => new TableRow({
      cantSplit: true,
      children: [
        mkCell(d.category, { bold: true, color: C.warn, width: 22 }),
        mkCell(d.grades, { color: C.grey, size: 20, width: 18 }),
        mkCell(d.detail, { size: 20, width: 50 }),
        mkCell(renderStars(d.star), { color: C.star, align: AlignmentType.CENTER, size: 22, width: 10 }),
      ],
    })),
  ];
  items.push(makeTable(diffRows, [22, 18, 50, 10]));

  return items;
}

// 表头单元格构造
function mkHeaderRow(labels, widths, isWarn = false) {
  const bgColor = isWarn ? "FEE2E2" : C.headerBg;
  const textColor = isWarn ? C.warn : C.title;
  return new TableRow({
    tableHeader: true,
    cantSplit: true,
    children: labels.map((t, i) => new TableCell({
      shading: { type: ShadingType.CLEAR, fill: bgColor },
      margins: { top: 60, bottom: 60, left: 100, right: 100 },
      children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: t, bold: true, size: 21, font: FONT_HEI, color: textColor })],
      })],
    })),
  });
}

// 数据单元格构造
function mkCell(text, opts = {}) {
  return new TableCell({
    margins: { top: 50, bottom: 50, left: 100, right: 100 },
    children: [new Paragraph({
      alignment: opts.align || AlignmentType.LEFT,
      children: [new TextRun({
        text: String(text),
        size: opts.size || 21,
        bold: opts.bold || false,
        color: opts.color || C.body,
        font: FONT,
      })],
    })],
  });
}

// ============================================================
//  组装文档
// ============================================================
async function buildDocument() {
  // 标题块
  const titleBlock = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 120, line: 480, lineRule: "atLeast" },
      children: [new TextRun({
        text: "天津市武清区小学英语 4-6 年级知识点调研",
        size: 40, bold: true, color: C.title, font: FONT_HEI,
      })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80, line: 360, lineRule: "atLeast" },
      children: [new TextRun({
        text: "人教精通版（三年级起点） · 6 册 36 单元全维度梳理",
        size: 24, color: C.section, font: FONT_HEI,
      })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 120, line: 312 },
      children: [new TextRun({
        text: "—— 机构备课参考 · 可直接打印 ——",
        size: 20, italics: true, color: C.light, font: FONT,
      })],
    }),
    new Paragraph({
      spacing: { before: 60, after: 120 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: "888888" } },
      children: [new TextRun({ text: " ", size: 4 })],
    }),
    bodyP(
      `整理范围：四年级上册 → 六年级下册（共 6 册 36 单元）\n整理维度：每个单元按「词汇 / 句型 / 语法 / 语音拼读 / 难点易错」五大维度展开\n难度标注：★ 课本要求　★★ 考试重点　★★★ 拓题难度\n组织方式：第一部分按年级顺叙（视角 A），第二部分按知识点纵贯（视角 B）`,
      { before: 60, after: 120, size: 21, color: C.grey }
    ),
    bodyP(
      `📌 说明：${TEXTBOOK_DATA.meta.note}`,
      { before: 60, after: 120, size: 20, color: C.tipText }
    ),
  ];

  // 视角 A
  const viewABlock = [h1("视角 A：按年级顺叙")];
  TEXTBOOK_DATA.grades.forEach(grade => {
    viewABlock.push(...buildGrade(grade));
  });

  // 视角 B
  const viewBBlock = buildViewB();

  // 页脚说明
  const footerBlock = [
    h2("📋 调研说明"),
    bodyP(
      "本调研报告基于网络公开教学资源整理，4 上 / 4 下 / 5 上 / 5 下 / 6 上为已发布新版数据；6 下为新版 2027 春待发布，内容为基于 2022 课标与小升初衔接要点的合理推断。建议结合学校实际使用的纸质课本核对后用于教学设计。",
      { size: 21, color: C.grey, before: 0, after: 120 }
    ),
    bodyP(
      "🔄 后续可基于本数据出练习题（按单元 / 按知识点 / 按难度），欢迎继续提出需求。",
      { size: 21, color: C.grey }
    ),
  ];

  // 分页符段落
  const pbPara = () => new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({ text: "·", size: 1, color: "FFFFFF", font: FONT }),
      new PageBreak(),
    ],
  });

  const allChildren = [
    ...titleBlock,
    pbPara(),
    ...viewABlock,
    pbPara(),
    ...viewBBlock,
    pbPara(),
    ...footerBlock,
  ];

  const doc = new Document({
    creator: "机构备课参考",
    title: "天津武清区小学英语4-6年级知识点调研",
    description: "人教精通版 4上→6下 共6册36单元全维度知识点梳理",
    styles: {
      default: {
        document: {
          run: { font: FONT, size: 22, color: C.body },
          paragraph: { spacing: { line: 312 } },
        },
        heading1: {
          run: { font: FONT_HEI, size: 32, bold: true, color: C.section },
          paragraph: { spacing: { before: 400, after: 200, line: 312 } },
        },
        heading2: {
          run: { font: FONT_HEI, size: 28, bold: true, color: C.title },
          paragraph: { spacing: { before: 320, after: 160, line: 312 } },
        },
        heading3: {
          run: { font: FONT_HEI, size: 24, bold: true, color: C.title },
          paragraph: { spacing: { before: 240, after: 120, line: 312 } },
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
              text: "天津武清区小学英语 4-6 年级知识点调研（人教精通版）",
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
  const outPath = "/home/z/my-project/download/天津武清区小学英语4-6年级知识点调研.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("✅ Word 文档已生成：" + outPath);
  console.log("📊 大小：" + (buffer.length / 1024).toFixed(1) + " KB");
}

buildDocument().catch(err => {
  console.error("❌ 生成失败：", err);
  process.exit(1);
});
