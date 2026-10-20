// HTML 生成脚本：把 textbook_data.js + vocab_data.js + exercises_data.js 渲染成可浏览的 HTML 页面
// 用法：node /home/z/my-project/scripts/generate_html.js

const TEXTBOOK_DATA = require("./textbook_data.js");
const VOCAB = require("./vocab_data.js");
const EX = require("./exercises_data.js");
const fs = require("fs");
const path = require("path");

// 难度星级渲染
function renderStars(star) {
  return "★".repeat(star) + "☆".repeat(3 - star);
}

// 单个单元卡片
function renderUnit(unit, gradeId) {
  const unitId = `${gradeId}-u${unit.num}`;
  let html = `
    <div class="unit-card" id="${unitId}">
      <div class="unit-header" onclick="toggleUnit('${unitId}')">
        <span class="unit-num">Unit ${unit.num}</span>
        <span class="unit-title">${unit.title}</span>
        <span class="unit-topic">主题：${unit.topic}</span>
        <span class="toggle-icon">▼</span>
      </div>
      <div class="unit-body" style="display:none;">
        <div class="dim-block">
          <h4 class="dim-title">一、词汇</h4>
          <ul class="vocab-list">
            ${unit.vocab.map(v => `
              <li>
                <span class="word-en">${v.word}</span>
                <span class="word-cn">${v.cn}</span>
                <span class="stars">${renderStars(v.star)}</span>
              </li>
            `).join("")}
          </ul>
        </div>
        <div class="dim-block">
          <h4 class="dim-title">二、句型</h4>
          <ul class="sentence-list">
            ${unit.sentences.map(s => `
              <li>
                <div class="sentence-en">${s.en}</div>
                <div class="sentence-cn">${s.cn}</div>
                <span class="stars">${renderStars(s.star)}</span>
              </li>
            `).join("")}
          </ul>
        </div>
        <div class="dim-block">
          <h4 class="dim-title">三、语法点</h4>
          <ul class="grammar-list">
            ${unit.grammar.map(g => `
              <li>
                <div class="grammar-point">${g.point}</div>
                <div class="grammar-detail">${g.detail}</div>
                <span class="stars">${renderStars(g.star)}</span>
              </li>
            `).join("")}
          </ul>
        </div>
        <div class="dim-block">
          <h4 class="dim-title">四、语音拼读</h4>
          <ul class="phonetics-list">
            ${unit.phonetics.map(p => `
              <li>
                <div class="phon-rule">${p.rule}</div>
                <div class="phon-examples">例：${p.examples}</div>
                <span class="stars">${renderStars(p.star)}</span>
              </li>
            `).join("")}
          </ul>
        </div>
        <div class="dim-block difficulty-block">
          <h4 class="dim-title">五、难点/易错点</h4>
          <ul class="difficulty-list">
            ${unit.difficulties.map(d => `
              <li>
                <div class="diff-error">❌ ${d.error}</div>
                <div class="diff-detail">${d.detail}</div>
                <span class="stars">${renderStars(d.star)}</span>
              </li>
            `).join("")}
          </ul>
        </div>
      </div>
    </div>
  `;
  return html;
}

// 单个年级卡片
function renderGrade(grade) {
  let html = `
    <section class="grade-section" id="${grade.id}">
      <h2 class="grade-title" onclick="toggleGrade('${grade.id}')">
        <span class="grade-name">${grade.name}</span>
        <span class="grade-version">${grade.version}</span>
        <span class="toggle-icon">▼</span>
      </h2>
      <div class="grade-body">
  `;
  grade.units.forEach(unit => {
    html += renderUnit(unit, grade.id);
  });
  html += `
      </div>
    </section>
  `;
  return html;
}

// 视角 A：按年级顺叙
function renderViewA() {
  let html = `<section id="view-a"><h2 class="view-title">视角 A：按年级顺叙</h2>`;
  TEXTBOOK_DATA.grades.forEach(grade => {
    html += renderGrade(grade);
  });
  html += `</section>`;
  return html;
}

// 视角 B：按知识点纵贯
function renderViewB() {
  const cat = TEXTBOOK_DATA.byCategory;
  let html = `<section id="view-b"><h2 class="view-title">视角 B：按知识点纵贯</h2>`;

  // 词汇
  html += `
    <div class="category-card" id="cat-vocab">
      <h3 class="category-title" onclick="toggleCategory('cat-vocab-body')">
        📚 词汇体系（按主题分类）
        <span class="toggle-icon">▼</span>
      </h3>
      <div class="category-body" id="cat-vocab-body">
        <table class="category-table">
          <thead><tr><th width="20%">主题分类</th><th width="20%">出现年级单元</th><th width="60%">核心词汇</th></tr></thead>
          <tbody>
            ${cat.vocabulary.map(v => `
              <tr>
                <td class="cat-name">${v.category}</td>
                <td class="cat-grades">${v.grades}</td>
                <td class="cat-items">${v.items.map(i => `<span class="tag">${i}</span>`).join("")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // 句型
  html += `
    <div class="category-card" id="cat-sentences">
      <h3 class="category-title" onclick="toggleCategory('cat-sentences-body')">
        💬 句型体系（按交际功能分类）
        <span class="toggle-icon">▼</span>
      </h3>
      <div class="category-body" id="cat-sentences-body">
        <table class="category-table">
          <thead><tr><th width="20%">句型分类</th><th width="20%">出现年级单元</th><th width="60%">核心句型</th></tr></thead>
          <tbody>
            ${cat.sentences.map(s => `
              <tr>
                <td class="cat-name">${s.category}</td>
                <td class="cat-grades">${s.grades}</td>
                <td class="cat-items">${s.items.map(i => `<span class="tag">${i}</span>`).join("")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // 语法
  html += `
    <div class="category-card" id="cat-grammar">
      <h3 class="category-title" onclick="toggleCategory('cat-grammar-body')">
        📐 语法体系（按知识点纵贯）
        <span class="toggle-icon">▼</span>
      </h3>
      <div class="category-body" id="cat-grammar-body">
        <table class="category-table">
          <thead><tr><th width="22%">语法点</th><th width="18%">出现年级</th><th width="50%">要点</th><th width="10%">难度</th></tr></thead>
          <tbody>
            ${cat.grammar.map(g => `
              <tr>
                <td class="cat-name">${g.category}</td>
                <td class="cat-grades">${g.grades}</td>
                <td class="cat-detail">${g.detail}</td>
                <td class="cat-stars">${renderStars(g.star)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // 语音
  html += `
    <div class="category-card" id="cat-phonetics">
      <h3 class="category-title" onclick="toggleCategory('cat-phonetics-body')">
        🔊 语音体系（自然拼读规则）
        <span class="toggle-icon">▼</span>
      </h3>
      <div class="category-body" id="cat-phonetics-body">
        <table class="category-table">
          <thead><tr><th width="20%">阶段</th><th width="20%">出现年级</th><th width="60%">字母/字母组合发音规则</th></tr></thead>
          <tbody>
            ${cat.phonetics.map(p => `
              <tr>
                <td class="cat-name">${p.category}</td>
                <td class="cat-grades">${p.grades}</td>
                <td class="cat-items">${p.items.map(i => `<span class="tag">${i}</span>`).join("")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // 难点
  html += `
    <div class="category-card" id="cat-difficulties">
      <h3 class="category-title" onclick="toggleCategory('cat-difficulties-body')">
        ⚠️ 难点纵贯（高频易错点）
        <span class="toggle-icon">▼</span>
      </h3>
      <div class="category-body" id="cat-difficulties-body">
        <table class="category-table">
          <thead><tr><th width="22%">易错点</th><th width="18%">高频年级</th><th width="50%">常见错误</th><th width="10%">难度</th></tr></thead>
          <tbody>
            ${cat.difficulties.map(d => `
              <tr>
                <td class="cat-name">${d.category}</td>
                <td class="cat-grades">${d.grades}</td>
                <td class="cat-detail">${d.detail}</td>
                <td class="cat-stars">${renderStars(d.star)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;

  html += `</section>`;
  return html;
}

// ============================================================
//  视角 C：词汇总表（按主题分类）
// ============================================================
function renderViewC() {
  let html = `<section id="view-c"><h2 class="view-title">视角 C：核心词汇总表（按主题分类）</h2>`;

  html += `
    <div class="view-intro">
      <p>📋 覆盖小学 1-6 年级核心词汇约 <strong>500 词</strong>，按 <strong>21 大主题</strong>分类。每个词标注中文释义、出现年级、是否四会（★ 标记四会：听说读写；无标记为三会：听说读）。</p>
      <p>💡 <strong>使用建议</strong>：按主题集中复习比按年级顺序背更高效；高频词（带★）优先掌握。</p>
    </div>
  `;

  VOCAB.categories.forEach(cat => {
    html += `
      <div class="category-card vocab-cat-card" id="cat-vocab-${cat.id}">
        <h3 class="category-title vocab-cat-title" onclick="toggleCategory('cat-vocab-${cat.id}-body')">
          📚 ${cat.name}
          <span class="vocab-meta">适用年级：${cat.grades} · 共 ${cat.words.length} 词</span>
          <span class="toggle-icon">▼</span>
        </h3>
        <div class="category-body" id="cat-vocab-${cat.id}-body">
          <table class="category-table vocab-table">
            <thead>
              <tr>
                <th width="35%">英文</th>
                <th width="35%">中文</th>
                <th width="18%">出现年级</th>
                <th width="12%">四会</th>
              </tr>
            </thead>
            <tbody>
              ${cat.words.map(w => `
                <tr>
                  <td class="word-en">${w.word}</td>
                  <td class="word-cn">${w.cn}</td>
                  <td class="cat-grades">${w.grade}</td>
                  <td class="cat-stars">${w.star || "—"}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  });

  html += `</section>`;
  return html;
}

// ============================================================
//  视角 D：36 单元配套习题集（可切换显示/隐藏答案）
// ============================================================
function renderViewD() {
  let html = `<section id="view-d"><h2 class="view-title">视角 D：36 单元配套习题集（180 题）</h2>`;

  // 控制栏：显示/隐藏答案切换
  html += `
    <div class="ex-control-bar">
      <div class="ex-control-left">
        <label class="ex-toggle">
          <input type="checkbox" id="showAnswersToggle" onchange="toggleAllAnswers()" checked>
          <span class="toggle-slider"></span>
          <span class="toggle-label">显示答案与解析</span>
        </label>
      </div>
      <div class="ex-control-right">
        <span class="ex-hint">💡 不勾选 = 隐藏答案（可打印给孩子做）；勾选 = 显示答案与解析（老师/家长备课用）</span>
      </div>
    </div>
    <style>
      body.hide-answers .ex-answer { display: none !important; }
      body.hide-answers .ex-fill-answer { color: #9CA3AF !important; font-weight: normal !important; }
      body.hide-answers .ex-fill-answer { display: none !important; }
      body.hide-answers .ex-fill-blank { display: inline-block; min-width: 100px; border-bottom: 1px solid #9CA3AF; }
      body.hide-answers .ex-correct-mark { display: none !important; }
    </style>
  `;

  // 各年级习题
  EX.grades.forEach(grade => {
    html += `
      <section class="grade-section ex-grade-section" id="ex-${grade.id}">
        <h2 class="grade-title ex-grade-title" onclick="toggleGrade('ex-${grade.id}')">
          <span class="grade-name">${grade.name} · 习题集</span>
          <span class="grade-version">${grade.units.length} 单元 × 5 题 = ${grade.units.length * 5} 题</span>
          <span class="toggle-icon">▼</span>
        </h2>
        <div class="grade-body">
    `;

    grade.units.forEach(unit => {
      const unitId = `ex-${grade.id}-u${unit.num}`;
      html += `
        <div class="unit-card ex-unit-card" id="${unitId}">
          <div class="unit-header" onclick="toggleUnit('${unitId}')">
            <span class="unit-num">Unit ${unit.num}</span>
            <span class="unit-title">${unit.title}</span>
            <span class="unit-topic">主题：${unit.topic} · 共 ${unit.questions.length} 题</span>
            <span class="toggle-icon">▼</span>
          </div>
          <div class="unit-body ex-unit-body" style="display:none;">
      `;

      unit.questions.forEach((q, idx) => {
        const qNum = idx + 1;
        if (q.type === "选择") {
          const correctLetter = q.answer;
          html += `
            <div class="ex-question ex-choice-q">
              <div class="ex-q-stem"><span class="ex-q-num">(${qNum})</span> ${q.stem}</div>
              <div class="ex-options">
                ${q.options.map((opt, i) => {
                  const letter = String.fromCharCode(65 + i);
                  const isCorrect = letter === correctLetter;
                  return `
                    <div class="ex-option ${isCorrect ? 'ex-correct' : ''}">
                      <span class="ex-correct-mark">★</span>
                      <span class="ex-opt-letter">${letter}.</span>
                      <span class="ex-opt-text">${opt}</span>
                    </div>
                  `;
                }).join("")}
              </div>
              <div class="ex-answer">
                <div class="ex-answer-row"><span class="ex-answer-label">【答案】</span><span class="ex-answer-text">${correctLetter}. ${q.options[correctLetter.charCodeAt(0) - 65]}</span></div>
                <div class="ex-answer-row"><span class="ex-analysis-label">【解析】</span><span class="ex-analysis-text">${q.analysis}</span></div>
              </div>
            </div>
          `;
        } else {
          html += `
            <div class="ex-question ex-fill-q">
              <div class="ex-q-stem">
                <span class="ex-q-num">(${qNum})</span> ${q.before}<span class="ex-fill-answer">${q.answer}</span><span class="ex-fill-blank" style="display:none;">____________</span>${q.after}
              </div>
              <div class="ex-answer">
                <div class="ex-answer-row"><span class="ex-answer-label">【答案】</span><span class="ex-answer-text">${q.answer}</span></div>
                <div class="ex-answer-row"><span class="ex-analysis-label">【解析】</span><span class="ex-analysis-text">${q.analysis}</span></div>
              </div>
            </div>
          `;
        }
      });

      html += `</div></div>`;
    });

    html += `</div></section>`;
  });

  html += `</section>`;
  return html;
}

// 侧边栏
function renderSidebar() {
  let html = `
    <aside class="sidebar">
      <div class="sidebar-section">
        <h4>视角 A：按年级</h4>
        <ul>
          ${TEXTBOOK_DATA.grades.map(g => `
            <li class="sidebar-grade">
              <a href="#${g.id}" onclick="expandGrade('${g.id}')">${g.name}</a>
              <ul class="sidebar-units">
                ${g.units.map(u => `<li><a href="#${g.id}-u${u.num}" onclick="expandUnit('${g.id}-u${u.num}')">U${u.num}. ${u.title}</a></li>`).join("")}
              </ul>
            </li>
          `).join("")}
        </ul>
      </div>
      <div class="sidebar-section">
        <h4>视角 B：按知识点</h4>
        <ul>
          <li><a href="#cat-vocab" onclick="expandCategory('cat-vocab-body')">📚 词汇体系</a></li>
          <li><a href="#cat-sentences" onclick="expandCategory('cat-sentences-body')">💬 句型体系</a></li>
          <li><a href="#cat-grammar" onclick="expandCategory('cat-grammar-body')">📐 语法体系</a></li>
          <li><a href="#cat-phonetics" onclick="expandCategory('cat-phonetics-body')">🔊 语音体系</a></li>
          <li><a href="#cat-difficulties" onclick="expandCategory('cat-difficulties-body')">⚠️ 难点纵贯</a></li>
        </ul>
      </div>
      <div class="sidebar-section">
        <h4>视角 C：词汇总表</h4>
        <ul>
          <li><a href="#view-c" onclick="expandAllVocab()">📚 全部 21 大主题速览</a></li>
          ${VOCAB.categories.slice(0, 8).map(cat => `<li><a href="#cat-vocab-${cat.id}" onclick="expandCategory('cat-vocab-${cat.id}-body')">${cat.name} (${cat.words.length})</a></li>`).join("")}
          <li><a href="#view-c" onclick="expandAllVocab()">… 查看更多主题（共 ${VOCAB.categories.length} 类）</a></li>
        </ul>
      </div>
      <div class="sidebar-section">
        <h4>视角 D：配套习题集</h4>
        <ul>
          <li><a href="#view-d" onclick="expandAllEx()">📝 全部 6 册 36 单元 180 题</a></li>
          ${EX.grades.map(g => `<li><a href="#ex-${g.id}" onclick="expandGrade('ex-${g.id}')">${g.name} 习题 (${g.units.length * 5} 题)</a></li>`).join("")}
        </ul>
      </div>
      <div class="sidebar-section">
        <h4>操作</h4>
        <ul>
          <li><a href="javascript:expandAll()">展开全部</a></li>
          <li><a href="javascript:collapseAll()">收起全部</a></li>
          <li><a href="javascript:window.print()">🖨️ 打印 / 导出 PDF</a></li>
        </ul>
      </div>
      <div class="sidebar-legend">
        <h4>难度星级</h4>
        <div class="legend-item"><span class="stars">★☆☆</span> 课本要求</div>
        <div class="legend-item"><span class="stars">★★☆</span> 考试重点</div>
        <div class="legend-item"><span class="stars">★★★</span> 拓题难度</div>
      </div>
    </aside>
  `;
  return html;
}

// 完整 HTML 页面
function buildHTML() {
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>天津市武清区小学英语 4-6 年级知识点调研（人教精通版）</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: "PingFang SC", "Microsoft YaHei", "Noto Sans SC", "Helvetica Neue", Arial, sans-serif;
      font-size: 14px;
      line-height: 1.6;
      color: #1f2937;
      background: #f7f7f9;
      display: flex;
      min-height: 100vh;
    }
    
    /* 侧边栏 */
    .sidebar {
      width: 280px;
      background: #fff;
      border-right: 1px solid #e5e7eb;
      padding: 20px 16px;
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      overflow-y: auto;
      z-index: 10;
    }
    .sidebar h4 {
      font-size: 14px;
      color: #1e40af;
      margin: 16px 0 8px 0;
      padding-bottom: 6px;
      border-bottom: 2px solid #dbeafe;
    }
    .sidebar-section > ul {
      list-style: none;
    }
    .sidebar-grade > a {
      font-weight: 600;
      color: #1f2937;
      display: block;
      padding: 6px 8px;
      border-radius: 4px;
      text-decoration: none;
      font-size: 13px;
    }
    .sidebar-grade > a:hover { background: #f0f9ff; }
    .sidebar-units {
      list-style: none;
      padding-left: 16px;
      margin-top: 4px;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s;
    }
    .sidebar-grade:hover .sidebar-units { max-height: 500px; }
    .sidebar-units li a {
      color: #4b5563;
      font-size: 12px;
      padding: 3px 6px;
      display: block;
      text-decoration: none;
      border-radius: 3px;
    }
    .sidebar-units li a:hover { background: #fef3c7; color: #92400e; }
    .sidebar-section li a {
      color: #4b5563;
      font-size: 13px;
      padding: 4px 6px;
      display: block;
      text-decoration: none;
      border-radius: 3px;
    }
    .sidebar-section li a:hover { background: #f0f9ff; color: #1e40af; }
    
    .sidebar-legend {
      margin-top: 24px;
      padding: 12px;
      background: #fef3c7;
      border-radius: 6px;
    }
    .sidebar-legend h4 {
      color: #92400e;
      border-bottom: 1px dashed #d97706;
    }
    .legend-item {
      font-size: 12px;
      color: #78350f;
      margin: 4px 0;
    }
    
    /* 主内容 */
    .main {
      margin-left: 280px;
      flex: 1;
      padding: 30px 40px;
      max-width: 1100px;
    }
    
    header.doc-header {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white;
      padding: 24px 30px;
      border-radius: 8px;
      margin-bottom: 24px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }
    header.doc-header h1 {
      font-size: 22px;
      margin-bottom: 8px;
    }
    header.doc-header p {
      font-size: 13px;
      opacity: 0.9;
      line-height: 1.7;
    }
    header.doc-header .meta {
      margin-top: 12px;
      font-size: 12px;
      color: rgba(255,255,255,0.85);
    }
    
    .view-title {
      font-size: 20px;
      color: #1e40af;
      margin: 32px 0 16px 0;
      padding-bottom: 8px;
      border-bottom: 3px solid #1e40af;
    }
    
    /* 年级卡片 */
    .grade-section {
      background: white;
      border-radius: 8px;
      margin: 16px 0;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    }
    .grade-title {
      font-size: 18px;
      color: white;
      background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
      padding: 14px 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 12px;
      user-select: none;
    }
    .grade-name { font-weight: 600; }
    .grade-version {
      font-size: 12px;
      font-weight: normal;
      opacity: 0.9;
      background: rgba(255,255,255,0.2);
      padding: 2px 8px;
      border-radius: 4px;
    }
    .toggle-icon {
      margin-left: auto;
      font-size: 14px;
      transition: transform 0.3s;
    }
    .grade-section.collapsed .toggle-icon { transform: rotate(-90deg); }
    .grade-section.collapsed .grade-body { display: none; }
    .grade-body {
      padding: 16px;
    }
    
    /* 单元卡片 */
    .unit-card {
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      margin: 10px 0;
      overflow: hidden;
      background: #fafbfc;
    }
    .unit-header {
      background: #f0f9ff;
      padding: 12px 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 12px;
      user-select: none;
      border-left: 4px solid #3b82f6;
    }
    .unit-header:hover { background: #e0f2fe; }
    .unit-num {
      background: #1e40af;
      color: white;
      font-weight: 600;
      font-size: 12px;
      padding: 2px 8px;
      border-radius: 4px;
    }
    .unit-title {
      font-weight: 600;
      color: #1f2937;
      font-size: 15px;
    }
    .unit-topic {
      font-size: 12px;
      color: #6b7280;
      margin-left: auto;
    }
    .unit-body {
      padding: 16px 20px;
      background: white;
    }
    
    .dim-block {
      margin: 14px 0;
      padding-bottom: 12px;
      border-bottom: 1px dashed #e5e7eb;
    }
    .dim-block:last-child { border-bottom: none; }
    .dim-title {
      font-size: 14px;
      color: #1e40af;
      margin-bottom: 8px;
      padding-left: 8px;
      border-left: 3px solid #1e40af;
    }
    
    .difficulty-block {
      background: #fef2f2;
      padding: 12px;
      border-radius: 6px;
      border: 1px solid #fecaca;
    }
    .difficulty-block .dim-title {
      color: #dc2626;
      border-left-color: #dc2626;
    }
    
    ul.vocab-list, ul.sentence-list, ul.grammar-list, ul.phonetics-list, ul.difficulty-list {
      list-style: none;
    }
    
    .vocab-list li {
      padding: 6px 0;
      border-bottom: 1px dashed #f3f4f6;
      display: grid;
      grid-template-columns: 200px 1fr 80px;
      gap: 12px;
      align-items: center;
      font-size: 13px;
    }
    .vocab-list li:hover { background: #f9fafb; }
    .word-en {
      font-family: "Consolas", "Monaco", monospace;
      color: #1e3a8a;
      font-weight: 600;
    }
    .word-cn { color: #4b5563; }
    
    .sentence-list li {
      padding: 8px 0;
      border-bottom: 1px dashed #f3f4f6;
      position: relative;
    }
    .sentence-en {
      font-family: "Consolas", "Monaco", monospace;
      color: #1e3a8a;
      font-size: 13px;
      margin-bottom: 2px;
    }
    .sentence-cn {
      color: #4b5563;
      font-size: 12px;
    }
    .sentence-list .stars {
      position: absolute;
      right: 0;
      top: 8px;
      font-size: 11px;
      color: #f59e0b;
    }
    
    .grammar-list li, .phonetics-list li, .difficulty-list li {
      padding: 8px 0;
      border-bottom: 1px dashed #f3f4f6;
      position: relative;
    }
    .grammar-point, .phon-rule, .diff-error {
      font-weight: 600;
      color: #1f2937;
      font-size: 13px;
      margin-bottom: 2px;
    }
    .diff-error { color: #dc2626; }
    .grammar-detail, .phon-examples, .diff-detail {
      color: #4b5563;
      font-size: 12px;
      padding-left: 8px;
    }
    .grammar-list .stars, .phonetics-list .stars, .difficulty-list .stars {
      position: absolute;
      right: 0;
      top: 8px;
      font-size: 11px;
      color: #f59e0b;
    }
    
    /* 星级 */
    .stars {
      color: #f59e0b;
      letter-spacing: 1px;
      font-size: 12px;
    }
    
    /* 视角 B 类别卡片 */
    .category-card {
      background: white;
      border-radius: 8px;
      margin: 16px 0;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
      scroll-margin-top: 20px;
    }
    .grade-section { scroll-margin-top: 20px; }
    .unit-card { scroll-margin-top: 20px; }
    .category-title {
      font-size: 16px;
      color: white;
      background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
      padding: 12px 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      user-select: none;
    }
    .category-title:hover { opacity: 0.95; }
    .category-body {
      padding: 16px;
      overflow-x: auto;
    }
    
    .category-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }
    .category-table th {
      background: #f3f4f6;
      color: #1f2937;
      padding: 10px 12px;
      text-align: left;
      font-weight: 600;
      border: 1px solid #e5e7eb;
    }
    .category-table td {
      padding: 10px 12px;
      border: 1px solid #e5e7eb;
      vertical-align: top;
    }
    .category-table tr:hover { background: #f9fafb; }
    .cat-name {
      font-weight: 600;
      color: #1e3a8a;
    }
    .cat-grades {
      color: #6b7280;
      font-size: 12px;
    }
    .cat-detail {
      color: #4b5563;
      font-size: 12px;
      line-height: 1.6;
    }
    .cat-stars {
      color: #f59e0b;
      font-size: 11px;
      text-align: center;
    }
    .cat-items {
      font-size: 12px;
    }
    .tag {
      display: inline-block;
      background: #ede9fe;
      color: #5b21b6;
      padding: 2px 8px;
      margin: 2px 4px 2px 0;
      border-radius: 12px;
      font-size: 12px;
      font-family: "Consolas", "Monaco", monospace;
    }
    
    /* 打印样式 */
    @media print {
      body { background: white; }
      .sidebar { display: none; }
      .main { margin-left: 0; padding: 0; max-width: 100%; }
      .unit-body, .grade-body, .category-body { display: block !important; }
      .grade-section, .category-card { page-break-inside: avoid; }
      header.doc-header { color: black; background: white; border: 2px solid #1e40af; }
    }
    
    /* 视角 C 词汇总表 */
    .view-intro {
      background: linear-gradient(135deg, #ecfdf5 0%, #f0f9ff 100%);
      padding: 16px 20px;
      border-radius: 8px;
      margin: 16px 0;
      border-left: 4px solid #10b981;
    }
    .view-intro p { font-size: 13px; color: #1f2937; line-height: 1.7; margin: 4px 0; }
    .vocab-cat-card { border-left: 4px solid #10b981; }
    .vocab-cat-title { background: linear-gradient(135deg, #047857 0%, #10b981 100%) !important; }
    .vocab-meta {
      font-size: 12px;
      font-weight: normal;
      opacity: 0.95;
      background: rgba(255,255,255,0.2);
      padding: 2px 10px;
      border-radius: 4px;
      margin-left: 12px;
    }
    .vocab-table .word-en {
      font-family: "Consolas", "Monaco", monospace;
      color: #047857;
      font-weight: 600;
      font-size: 14px;
    }
    .vocab-table .word-cn { font-size: 13px; color: #1f2937; }
    
    /* 视角 D 习题集 */
    .ex-control-bar {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      padding: 16px 20px;
      border-radius: 8px;
      margin: 16px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      border-left: 4px solid #d97706;
    }
    .ex-toggle {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      user-select: none;
    }
    .ex-toggle input[type="checkbox"] {
      width: 22px;
      height: 22px;
      cursor: pointer;
      accent-color: #d97706;
    }
    .toggle-label {
      font-size: 14px;
      font-weight: 600;
      color: #78350f;
    }
    .ex-hint {
      font-size: 12px;
      color: #78350f;
      font-style: italic;
    }
    
    .ex-grade-title { background: linear-gradient(135deg, #b45309 0%, #f59e0b 100%) !important; }
    .ex-unit-card { border-left: 4px solid #f59e0b; }
    .ex-unit-body { background: #fffbeb; }
    
    .ex-question {
      margin: 12px 0;
      padding: 12px 14px;
      background: white;
      border-radius: 6px;
      border: 1px solid #fde68a;
    }
    .ex-q-stem {
      font-size: 14px;
      color: #1f2937;
      margin-bottom: 8px;
      line-height: 1.7;
    }
    .ex-q-num {
      font-weight: bold;
      color: #b45309;
      margin-right: 6px;
    }
    .ex-options {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 6px 16px;
      margin: 8px 0;
    }
    .ex-option {
      padding: 6px 10px;
      border-radius: 4px;
      background: #fef3c7;
      font-size: 13px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .ex-option.ex-correct {
      background: #d1fae5;
      border: 1px solid #10b981;
    }
    .ex-correct-mark {
      color: #10b981;
      font-size: 14px;
      font-weight: bold;
    }
    .ex-opt-letter {
      font-weight: bold;
      color: #1f2937;
    }
    .ex-opt-text { font-family: "Consolas", "Monaco", monospace; }
    
    .ex-answer {
      margin-top: 8px;
      padding: 8px 12px;
      background: #eff6ff;
      border-left: 3px solid #1e40af;
      border-radius: 4px;
      font-size: 13px;
    }
    .ex-answer-row { margin: 4px 0; line-height: 1.6; }
    .ex-answer-label {
      color: #1e40af;
      font-weight: bold;
      margin-right: 6px;
    }
    .ex-answer-text {
      color: #1e40af;
      font-weight: bold;
      font-family: "Consolas", "Monaco", monospace;
    }
    .ex-analysis-label {
      color: #6b7280;
      font-weight: bold;
      margin-right: 6px;
    }
    .ex-analysis-text { color: #4b5563; }
    
    .ex-fill-answer {
      color: #1e40af;
      font-weight: bold;
      font-family: "Consolas", "Monaco", monospace;
      padding: 0 4px;
      border-bottom: 1px dashed #1e40af;
    }
    
    @media (max-width: 768px) {
      .ex-options { grid-template-columns: 1fr; }
      .ex-control-bar { flex-direction: column; align-items: flex-start; }
    }
    
    @media (max-width: 768px) {
      .sidebar { display: none; }
      .main { margin-left: 0; padding: 16px; }
    }
  </style>
</head>
<body>
${renderSidebar()}
<main class="main">
  <header class="doc-header">
    <h1>天津市武清区小学英语 4-6 年级知识点调研与素材包</h1>
    <p>教材版本：${TEXTBOOK_DATA.meta.publisher}　|　适用地区：${TEXTBOOK_DATA.meta.region}　|　整理范围：四年级上册 → 六年级下册（共 6 册 36 单元）</p>
    <p>四大视角：A 按年级顺叙知识点 ｜ B 按知识点纵贯 ｜ C 核心词汇总表（21 主题约 500 词）｜ D 36 单元配套习题集（180 题，可切换显示/隐藏答案）</p>
    <p class="meta">📌 ${TEXTBOOK_DATA.meta.note}　|　🎨 机构备课标准素材包，含答案切换功能，可直接打印</p>
  </header>
  ${renderViewA()}
  ${renderViewB()}
  ${renderViewC()}
  ${renderViewD()}
  <footer style="margin-top: 40px; padding: 16px; background: #f3f4f6; border-radius: 6px; font-size: 12px; color: #6b7280;">
    <p>📋 本调研报告基于网络公开教学资源整理，4 上/4 下/5 上/5 下/6 上为已发布新版数据；6 下为新版 2027 春待发布，内容为基于 2022 课标与小升初衔接要点的合理推断。建议结合学校实际使用的纸质课本核对后用于教学设计。</p>
    <p style="margin-top: 6px;">🔄 后续可基于本数据出练习题（按单元/按知识点/按难度），欢迎继续提出需求。</p>
  </footer>
</main>
<script>
  function toggleUnit(id) {
    const body = document.querySelector('#' + id + ' .unit-body');
    if (body) body.style.display = body.style.display === 'none' ? 'block' : 'none';
  }
  function toggleGrade(id) {
    const grade = document.getElementById(id);
    if (grade) grade.classList.toggle('collapsed');
  }
  function toggleCategory(bodyId) {
    const body = document.getElementById(bodyId);
    if (body) body.style.display = body.style.display === 'none' ? 'block' : 'none';
  }
  function expandGrade(id) {
    const grade = document.getElementById(id);
    if (grade && grade.classList.contains('collapsed')) grade.classList.remove('collapsed');
  }
  function expandUnit(id) {
    const body = document.querySelector('#' + id + ' .unit-body');
    if (body) body.style.display = 'block';
  }
  function expandAll() {
    document.querySelectorAll('.grade-section').forEach(g => g.classList.remove('collapsed'));
    document.querySelectorAll('.unit-body').forEach(b => b.style.display = 'block');
    document.querySelectorAll('.category-body').forEach(b => b.style.display = 'block');
  }
  function collapseAll() {
    document.querySelectorAll('.grade-section').forEach(g => g.classList.add('collapsed'));
    document.querySelectorAll('.unit-body').forEach(b => b.style.display = 'none');
    document.querySelectorAll('.category-body').forEach(b => b.style.display = 'none');
  }
  function expandAllCategories() {
    document.querySelectorAll('.category-body').forEach(b => b.style.display = 'block');
  }
  function expandCategory(bodyId) {
    const body = document.getElementById(bodyId);
    if (body) body.style.display = 'block';
  }
  function expandAllVocab() {
    document.querySelectorAll('[id^="cat-vocab-"][id$="-body"]').forEach(b => b.style.display = 'block');
  }
  function expandAllEx() {
    document.querySelectorAll('.ex-grade-section').forEach(g => g.classList.remove('collapsed'));
    document.querySelectorAll('.ex-unit-body').forEach(b => b.style.display = 'block');
  }
  function toggleAllAnswers() {
    const t = document.getElementById('showAnswersToggle');
    if (t.checked) {
      document.body.classList.remove('hide-answers');
    } else {
      document.body.classList.add('hide-answers');
    }
  }
</script>
</body>
</html>`;

  return html;
}

const html = buildHTML();
const outPath = "/home/z/my-project/download/天津武清区小学英语4-6年级知识点调研.html";
fs.writeFileSync(outPath, html, "utf-8");
console.log("✅ HTML 已生成：" + outPath);
console.log("📊 大小：" + (Buffer.byteLength(html, "utf-8") / 1024).toFixed(1) + " KB");
