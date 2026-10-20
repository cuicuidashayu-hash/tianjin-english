import assert from 'node:assert/strict'
import { test } from 'node:test'
import JSZip from 'jszip'
import { generateExerciseDocx, type ExerciseGrade } from '../src/lib/exercise-export'

const grades: ExerciseGrade[] = [
  { id: 'g4up', name: '四年级上册', version: '测试版', units: [
    { num: 1, title: 'First unit', topic: '测试主题', questions: [
      { type: '选择', stem: 'PICK_APPLE', options: ['APPLE', 'PEAR'], answer: 'A', analysis: 'APPLE_ANALYSIS' },
      { type: '填空', before: 'FILL_BEFORE ', after: ' FILL_AFTER', answer: 'SECRET_FILL', analysis: 'FILL_ANALYSIS' },
    ] },
  ] },
  { id: 'g5up', name: '五年级上册', version: '测试版', units: [
    { num: 1, title: 'Second unit', topic: '另一主题', questions: [
      { type: '选择', stem: 'PICK_CAT', options: ['CAT', 'DOG'], answer: 'B', analysis: 'DOG_ANALYSIS' },
    ] },
  ] },
]

async function wordXml(withAnswers: boolean, scope: string[]) {
  const blob = await generateExerciseDocx(grades, { format: 'docx', withAnswers, scope })
  assert.ok(blob instanceof Blob, '浏览器导出必须返回 Blob')
  const zip = await JSZip.loadAsync(await blob.arrayBuffer())
  return zip.file('word/document.xml')!.async('string')
}

test('Word 单册无答案：保留题目与空白，排除其他册和答案解析', async () => {
  const xml = await wordXml(false, ['g4up'])
  assert.match(xml, /PICK_APPLE/)
  assert.match(xml, /FILL_BEFORE/)
  assert.match(xml, /____________/)
  assert.doesNotMatch(xml, /SECRET_FILL|APPLE_ANALYSIS|FILL_ANALYSIS|PICK_CAT/)
  assert.match(xml, /共 2 题/)
})

test('Word 空范围包含全部；答案版包含填空答案和解析', async () => {
  const xml = await wordXml(true, [])
  assert.match(xml, /PICK_APPLE/)
  assert.match(xml, /PICK_CAT/)
  assert.match(xml, /SECRET_FILL/)
  assert.match(xml, /APPLE_ANALYSIS/)
  assert.match(xml, /共 3 题/)
})

test('含答案填空去掉已有首字母提示，无答案版保留提示字母', async () => {
  const { createExercisePdfDefinition } = await import('../src/lib/exercise-pdf')
  const prefixGrades: ExerciseGrade[] = [{ id: 'prefix', name: '填空测试', version: '测试', units: [{
    num: 1, title: 'Fill', topic: '提示字母', questions: [
      { type: '填空', before: 'We eat d', after: ' today.', answer: 'dumplings', analysis: '测试解析' },
    ],
  }] }]
  const text = (value: unknown): string => {
    if (typeof value === 'string') return value
    if (Array.isArray(value)) return value.map(text).join('')
    if (value && typeof value === 'object') {
      if ('text' in value) return text(value.text)
      return Object.values(value).map(text).join('')
    }
    return ''
  }
  for (const withAnswers of [true, false]) {
    const options = { format: 'docx' as const, withAnswers, scope: [] }
    const blob = await generateExerciseDocx(prefixGrades, options)
    const zip = await JSZip.loadAsync(await blob.arrayBuffer())
    const xml = (await zip.file('word/document.xml')!.async('string')).replace(/<[^>]+>/g, '')
    const pdfText = text(createExercisePdfDefinition(prefixGrades, options).content)
    const expected = withAnswers ? 'We eat dumplings today.' : 'We eat d____________ today.'
    assert.ok(xml.includes(expected), `Word 应包含 ${expected}`)
    assert.ok(pdfText.includes(expected), `PDF 应包含 ${expected}`)
  }
})

test('重复范围按教材顺序合并一次；未知范围明确报错', async () => {
  const { getExerciseExportInfo } = await import('../src/lib/exercise-export-data')
  const info = getExerciseExportInfo(grades, { format: 'pdf', withAnswers: false, scope: ['g5up', 'g4up', 'g4up'] })
  assert.deepEqual(info.grades.map(g => g.id), ['g4up', 'g5up'])
  assert.equal(info.totalQuestions, 3)
  assert.equal(info.totalUnits, 2)
  assert.equal(info.fileName, '小学英语配套习题集_四年级上册+五年级上册_无答案.pdf')
  assert.throws(() => getExerciseExportInfo(grades, { format: 'pdf', withAnswers: false, scope: ['unknown'] }), /导出范围/)
})

test('真实题库合并为 6 册 36 单元 360 题，来源数据保持原样', async () => {
  const { getMergedExerciseGrades, getExerciseExportInfo } = await import('../src/lib/exercise-export-data')
  const { EXERCISES } = await import('../src/lib/data/exercises')
  const original = JSON.stringify(EXERCISES)
  const merged = getMergedExerciseGrades()
  const info = getExerciseExportInfo(merged, { format: 'pdf', withAnswers: false, scope: [] })
  assert.equal(info.grades.length, 6)
  assert.equal(info.totalUnits, 36)
  assert.equal(info.totalQuestions, 360)
  assert.ok(merged.every(g => g.units.every(u => u.questions.length === 10)))
  assert.ok(merged.every(g => typeof g.version === 'string' && g.version.length > 0), '真实题库缺少版本字段时也不能导出 undefined')
  assert.equal(JSON.stringify(EXERCISES), original)
})

test('PDF 字体加载失败可重试，恢复后生成真正的 PDF Blob', async () => {
  const { createServer } = await import('node:http')
  const { readFileSync } = await import('node:fs')
  const { once } = await import('node:events')
  const { generateExercisePdf } = await import('../src/lib/exercise-pdf')
  let healthy = false
  const server = createServer((request, response) => {
    if (!healthy) { response.writeHead(503).end(); return }
    const file = request.url === '/fonts/WuqingExport-Regular.otf'
      ? 'WuqingExport-Regular.otf' : 'WuqingExport-Bold.otf'
    response.writeHead(200, { 'Content-Type': 'font/otf' }).end(readFileSync(new URL(`../public/fonts/${file}`, import.meta.url)))
  })
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  const address = server.address() as import('node:net').AddressInfo
  const originalFetch = globalThis.fetch
  globalThis.fetch = (input, init) => originalFetch(new URL(String(input), `http://127.0.0.1:${address.port}`), init)
  const options = { format: 'pdf' as const, withAnswers: false, scope: ['g4up'] }
  try {
    await assert.rejects(generateExercisePdf(grades, options), /字体加载失败/)
    healthy = true
    const blob = await generateExercisePdf(grades, options)
    assert.ok(blob instanceof Blob)
    assert.equal(blob.type, 'application/pdf')
    assert.equal(await blob.slice(0, 5).text(), '%PDF-')
    assert.ok(blob.size > 1000)
  } finally {
    globalThis.fetch = originalFetch
    server.closeAllConnections()
    server.close()
  }
})

test('PDF 单册无答案：使用 A4、中文字体，题干选项保留而答案解析排除', async () => {
  const { createExercisePdfDefinition } = await import('../src/lib/exercise-pdf')
  const definition = createExercisePdfDefinition(grades, { format: 'pdf', withAnswers: false, scope: ['g4up'] })
  const content = JSON.stringify(definition.content)
  assert.equal(definition.pageSize, 'A4')
  assert.ok(definition.defaultStyle?.font)
  assert.match(content, /PICK_APPLE/)
  assert.match(content, /APPLE/)
  assert.match(content, /FILL_BEFORE/)
  assert.match(content, /____________/)
  assert.match(content, /共 2 题/)
  assert.doesNotMatch(content, /SECRET_FILL|APPLE_ANALYSIS|FILL_ANALYSIS|PICK_CAT/)
})

test('PDF 多册答案版包含所有所选题目和解析，空范围也可导出全部', async () => {
  const { createExercisePdfDefinition } = await import('../src/lib/exercise-pdf')
  for (const scope of [[], ['g5up', 'g4up']]) {
    const definition = createExercisePdfDefinition(grades, { format: 'pdf', withAnswers: true, scope })
    const content = JSON.stringify(definition.content)
    assert.match(content, /PICK_APPLE/)
    assert.match(content, /PICK_CAT/)
    assert.match(content, /SECRET_FILL/)
    assert.match(content, /APPLE_ANALYSIS/)
    assert.match(content, /共 3 题/)
    assert.equal(typeof definition.footer, 'function')
  }
})
