# PDF 字体

WuqingExport-Regular.otf / WuqingExport-Bold.otf 是 Noto Sans SC 的改名、子集化版本，仅保留本站源码使用的字形和常用拉丁文、音标、标点。

- 来源：https://github.com/notofonts/noto-cjk/tree/main/Sans/SubsetOTF/SC
- 许可：SIL Open Font License 1.1，见 OFL.txt；版权记录保留在字体内。
- 用途：浏览器生成 PDF 时按需加载，不依赖用户安装字体或外部字体 CDN。
- 更新题库文字后，可安装 Python 的 fonttools 并运行 `python scripts/prepare-pdf-fonts.py` 重新生成；生成后的文件随网站部署，线上不需要 Python。
