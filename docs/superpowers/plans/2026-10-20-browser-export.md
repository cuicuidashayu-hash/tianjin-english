# 浏览器习题导出 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 移除侧栏打印入口，仅保留习题导出；浏览器直接生成 Word/PDF，项目可纯静态部署到 Vercel。

**Architecture:** 共用题目合并、筛选、文件名规则；现有 docx 模板输出 Blob；pdfmake 独立排版 PDF。导出时动态加载文档库与站内中文字体，不调用后端接口。

**Tech Stack:** Next.js、TypeScript、docx、pdfmake、Node test runner + tsx。

**Spec:** 用户本轮三项要求与前文已确认的 docx + pdfmake 方案；保留按册合并和答案开关，PDF 不走打印窗口。

## Global Constraints
- 只保留习题模块的导出入口；保留现有页面风格。
- 浏览器直接下载 PDF 和可编辑 docx，无 LibreOffice、无导出服务器。
- 全部 6 册 360 题，支持单册、多册、含答案/无答案。
- 字体随站点提供，使用开源字体并保留许可；按需加载导出依赖。
- 当前目录不是 Git 仓库，直接修改本地文件，不创建 worktree 或提交。

## Review Focus
- 空范围必须导出全部，未知年级必须报错，重复范围不能重复导题。
- 无答案文件不能包含答案/解析，填空必须保留空白。
- 选项长短、中文与英语字符、年级和单元分页应保持可读。
- 字体请求失败需可重试；错误后不能卡在生成中。
- 静态产物应可在无 Node 后端时下载两种格式，不产生 /api 请求。

### Task 1: 文档生成
**Files:** src/lib/exercise-export.ts、src/lib/exercise-export-data.ts、src/lib/exercise-pdf.ts、tests/exercise-export.test.ts、public/fonts/。
**Interfaces:** selectExerciseGrades(grades, scope)、getExerciseExportInfo(grades, options)、generateExerciseDocx(grades, options): Promise<Blob>、createExercisePdfDefinition(grades, options): TDocumentDefinitions。
- [x] 先写并运行实际解压 Word、范围和答案开关、PDF 内容定义的失败测试。
- [x] 合并题目数据，校验范围，复用 Word 模板输出 Blob。
- [x] 编写 A4 PDF 模板，分组题目避免题干/选项拆页，嵌入中文字体。
- [x] 运行测试，生成单册和全册 PDF，提取文字并渲染代表页检查。

### Task 2: 浏览器下载与静态部署
**Files:** src/components/export-dialog.tsx、src/app/page.tsx、next.config.ts、package.json、README.md、vercel.json；移除 src/app/api/ 下无用接口及复制 standalone 资源脚本。
- [x] 移除侧栏打印入口；按需导入生成器，Blob 下载并延迟释放 URL，保留生成中与错误状态。
- [x] 设置 output: export，清理动态 API，生产脚本改为静态预览，提供 Vercel 配置与说明。
- [x] 完整运行测试、类型检查、lint、静态构建。
- [x] 浏览器在纯静态预览中实际下载 Word/PDF，核对范围、答案与无 /api 请求；完成独立代码审查。

## Execution ledger
- Ruling: 已有方案在前文说明，用户明确要求实施，直接执行，无新增审批。
- Task 1: complete — 8 项测试通过；Word 实际解压验证；PDF 实际生成、文字提取与代表页渲染检查。
- Ruling: 原始题库没有 version 字段，合并时补充人教精通版教材说明，避免输出 undefined。
- Ruling: 为启用生产类型检查，清除原数据中 4 个相同值的重复 answer 键和 Word 模板类型错误，不改变题目答案。
- Ruling: 抽查发现原始答案版填空会重复提示字母，新增先失败后通过的回归测试并统一 Word/PDF 规则。
- Validation: typecheck 与修改文件 eslint 通过。全量 lint 仍有原有 src/components/ui/carousel.tsx、src/hooks/use-mobile.ts 的 react-hooks/set-state-in-effect 两处错误，本次不改动这些组件。
- Browser: 在纯静态 localhost:3001 下载单册无答案 PDF（60 题/0 份答案）、合并 Word（120 份答案）、全册 PDF（360 题/360 份答案）；实际文件均无 undefined。静态服务日志只有资源与字体请求。
- Task 2: complete — 最终 npm test 8/8，typecheck、修改文件 eslint、npm run build 通过；独立审查与填空修复增量复核均通过，最终浏览器全册 PDF 已重下载验证。
