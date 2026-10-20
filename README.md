# 天津市武清区小学英语 4–6 年级知识点与习题

Next.js + TypeScript + Tailwind CSS 应用，包含按年级知识点、知识点分类、词汇总表和 6 册 36 单元 360 道习题。

## 本地运行

使用 Node.js 20.9+，推荐与本次验证环境一致的 Node.js 24。

```powershell
npm ci
npm run dev
```

打开 http://localhost:3000，保持终端运行，按 Ctrl+C 停止。已经安装依赖后，只需运行 `npm run dev`。

## 习题导出

进入「D 习题」，点击顶部「导出习题」。这是网站唯一的导出入口；已移除侧栏的整页打印/PDF 按钮。

- 支持 PDF 和可编辑 Word（.docx），在浏览器本地生成并下载，不使用打印窗口。
- 不勾选年级时导出全部 6 册 360 题；选择单册或多册可分别或合并导出。
- 支持含答案与解析、无答案练习版。
- 填空题的答案版会替换已有首字母提示，避免重复字母；无答案版保留提示与空白。
- Word 使用 docx；PDF 使用 pdfmake，生成可选择、搜索的文字，按 A4 排版，包含页码，题干与选项尽量保持在同一页。
- 不需要安装 LibreOffice，不需要 Node.js 导出接口，不调用第三方文档转换服务。
- 首次导出按需加载文档库；PDF 另加载站内中文字体（两种字重合计约 600 KB）。后续重复导出复用已加载字体。字体加载失败会显示错误，可重试。
- 字体文件、许可和维护说明位于 `public/fonts/`。新增题库文字后，请按其中说明重新生成字体子集，以免新字符缺字。
- 题目内容相同，但 Word 与 PDF 使用不同的排版引擎，分页可能不同。Word 打开时的字体和分页也会受到阅读软件影响。

## 生产构建与纯静态预览

```powershell
npm test
npm run typecheck
npm run build
npm run start
```

配置采用 `output: "export"`，构建生成 `out/`。`npm run start` 仅提供静态文件服务，默认端口 3000；运行前先停止开发服务器，避免端口冲突。

部署内容是 `out/` 中的全部文件，包括 `_next/` 和 `fonts/`；不是 `.next/standalone`。线上不需要 Node.js 或 LibreOffice，所有导出都在浏览器执行。

## 部署到 Vercel

1. 将源码上传到 GitHub 仓库，可以使用私有仓库。保留 `package-lock.json`，不要上传 `node_modules/`、`.next/`、`out/`、`tmp/` 或本地密钥。
2. 在 Vercel 选择 Add New → Project，导入仓库。
3. Framework Preset 选择 Next.js，Root Directory 选择根 `package.json` 所在目录，不要选择 `docx-project/`。
4. 选择 Node.js 24.x。根目录的 `vercel.json` 已配置：Install Command 为 `npm ci`，Build Command 为 `npm run build`，Output Directory 为 `out`。
5. 点击 Deploy。无需设置启动命令，也无需为当前静态页面配置数据库或环境变量。
6. 部署后验证首页、四个模块和 Word/PDF 下载；每次推送代码会触发重新构建发布。

当前没有动态 API 或数据库依赖。若未来增加登录、数据库读写、文件上传等服务端功能，需要重新评估纯静态配置。

## 验证与目录

```powershell
npm test          # 范围、答案开关、真实题库总数、字体失败重试、文件生成
npm run typecheck
npm run lint
npm run build
```

- `src/app/page.tsx`：主界面与四个模块
- `src/components/export-dialog.tsx`：导出设置、按需加载与浏览器下载
- `src/lib/exercise-export-data.ts`：合并题库、范围校验、文件名和统计
- `src/lib/exercise-export.ts`：Word 排版与 Blob 生成
- `src/lib/exercise-pdf.ts`：PDF 排版、字体加载与 Blob 生成
- `src/lib/data/`：教材、词汇、习题数据
- `public/fonts/`：随站部署的开源 PDF 字体与许可
- `docx-project/`：早期文档脚本参考，不属于线上导出流程

原项目还保留了未使用的 Prisma 模板文件。当前页面和导出无需执行任何数据库初始化、迁移或重置命令。

## 数据说明

教材版本为人教精通版（三年级起点）。原始内容标注 4上/4下/5上/5下/6上为已发布新版数据，6下为基于课标与衔接要点推断的内容。教材版本及题目正确性请结合学校实际教材核对；本次改造不代表对教材内容完成了审核。

原项目用途说明：仅供个人/机构备课使用，请勿商用。
