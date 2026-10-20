'use client'

import { useState } from 'react'
import { getMergedExerciseGrades, getExerciseExportInfo } from '@/lib/exercise-export-data'

// 合并后的年级数据（用于显示年级列表）
const EXERCISE_GRADES = getMergedExerciseGrades()
const GRADES = EXERCISE_GRADES.map(g => ({
  id: g.id,
  name: g.name,
  version: g.version,
  unitCount: g.units.length,
  questionCount: g.units.reduce((sum, unit) => sum + unit.questions.length, 0),
}))

export function ExportDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [format, setFormat] = useState<'docx' | 'pdf'>('pdf')
  const [withAnswers, setWithAnswers] = useState(true)
  const [scope, setScope] = useState<string[]>([]) // 空 = 全部
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleToggleScope = (id: string) => {
    setScope(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      return [...prev, id]
    })
  }

  const handleExport = async () => {
    setLoading(true)
    setError(null)
    try {
      // 先让浏览器显示生成中状态，再按需加载导出库。
      await new Promise<void>(resolve => setTimeout(resolve, 0))
      const options = { format, withAnswers, scope }
      const { fileName } = getExerciseExportInfo(EXERCISE_GRADES, options)
      const blob = format === 'docx'
        ? await (await import('@/lib/exercise-export')).generateExerciseDocx(EXERCISE_GRADES, options)
        : await (await import('@/lib/exercise-pdf')).generateExercisePdf(EXERCISE_GRADES, options)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      try {
        a.click()
      } finally {
        a.remove()
        // 给浏览器足够时间接管下载，避免立即释放导致部分浏览器下载失败。
        setTimeout(() => URL.revokeObjectURL(url), 60_000)
      }

      onClose()
    } catch (e: any) {
      setError(e?.message || '导出失败')
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  // 计算预览信息
  const selectedGrades = scope.length === 0
    ? GRADES
    : GRADES.filter(g => scope.includes(g.id))
  const totalUnits = selectedGrades.reduce((s, g) => s + g.unitCount, 0)
  const totalQuestions = selectedGrades.reduce((s, g) => s + g.questionCount, 0)
  const scopeLabel = scope.length === 0
    ? '全部 6 册'
    : scope.length === 1
      ? selectedGrades[0]?.name
      : `${selectedGrades.length} 册合并`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 遮罩 */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={loading ? undefined : onClose}
      />

      {/* 对话框 */}
      <div className="glass-strong relative w-full max-w-2xl rounded-xl overflow-hidden max-h-[90vh] flex flex-col"
        style={{ background: 'rgba(19, 19, 24, 0.95)' }}>
        {/* 标题 */}
        <div className="px-6 py-4 border-b border-[var(--glass-border)] flex items-center gap-3">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--view-d)' }}></div>
          <h3 className="font-serif-display text-lg text-[var(--foreground)]">导出习题集</h3>
          <span className="label-uppercase text-[10px] text-[var(--foreground-muted)] opacity-70">Export Exercises</span>
          <button
            onClick={onClose}
            disabled={loading}
            className="ml-auto text-[var(--foreground-muted)] hover:text-[var(--foreground)] disabled:opacity-50 transition-colors text-xl leading-none px-2"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* 格式选择 */}
          <div>
            <div className="label-uppercase text-[10px] text-[var(--foreground-muted)] opacity-70 mb-2">① 文件格式 · Format</div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setFormat('pdf')}
                disabled={loading}
                className="p-4 rounded-lg text-left transition-all disabled:opacity-50"
                style={format === 'pdf' ? {
                  background: 'linear-gradient(180deg, rgba(200, 153, 104, 0.18) 0%, rgba(200, 153, 104, 0.05) 100%)',
                  border: '1px solid rgba(200, 153, 104, 0.5)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
                } : { background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)' }}
              >
                <div className="font-serif-display text-base text-[var(--foreground)] mb-1">📄 PDF 文档</div>
                <div className="text-xs text-[var(--foreground-muted)] leading-relaxed">适合打印、转发、归档<br />排版固定，跨设备一致</div>
              </button>
              <button
                onClick={() => setFormat('docx')}
                disabled={loading}
                className="p-4 rounded-lg text-left transition-all disabled:opacity-50"
                style={format === 'docx' ? {
                  background: 'linear-gradient(180deg, rgba(200, 153, 104, 0.18) 0%, rgba(200, 153, 104, 0.05) 100%)',
                  border: '1px solid rgba(200, 153, 104, 0.5)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
                } : { background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)' }}
              >
                <div className="font-serif-display text-base text-[var(--foreground)] mb-1">📝 Word 文档</div>
                <div className="text-xs text-[var(--foreground-muted)] leading-relaxed">适合编辑、二次加工<br />可调整题目顺序和样式</div>
              </button>
            </div>
          </div>

          {/* 答案模式 */}
          <div>
            <div className="label-uppercase text-[10px] text-[var(--foreground-muted)] opacity-70 mb-2">② 答案模式 · Answer Mode</div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setWithAnswers(true)}
                disabled={loading}
                className="p-4 rounded-lg text-left transition-all disabled:opacity-50"
                style={withAnswers ? {
                  background: 'linear-gradient(180deg, rgba(200, 153, 104, 0.18) 0%, rgba(200, 153, 104, 0.05) 100%)',
                  border: '1px solid rgba(200, 153, 104, 0.5)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
                } : { background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)' }}
              >
                <div className="font-serif-display text-base text-[var(--foreground)] mb-1">📘 含答案与解析</div>
                <div className="text-xs text-[var(--foreground-muted)] leading-relaxed">老师备课 / 家长辅导用<br />每题附【答案】【解析】</div>
              </button>
              <button
                onClick={() => setWithAnswers(false)}
                disabled={loading}
                className="p-4 rounded-lg text-left transition-all disabled:opacity-50"
                style={!withAnswers ? {
                  background: 'linear-gradient(180deg, rgba(200, 153, 104, 0.18) 0%, rgba(200, 153, 104, 0.05) 100%)',
                  border: '1px solid rgba(200, 153, 104, 0.5)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
                } : { background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)' }}
              >
                <div className="font-serif-display text-base text-[var(--foreground)] mb-1">✏️ 无答案版</div>
                <div className="text-xs text-[var(--foreground-muted)] leading-relaxed">直接打印给孩子做题<br />填空处留空白横线</div>
              </button>
            </div>
          </div>

          {/* 范围选择 */}
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <div className="label-uppercase text-[10px] text-[var(--foreground-muted)] opacity-70">③ 导出范围 · Scope</div>
              <div className="flex gap-2">
                <button
                  onClick={() => setScope([])}
                  disabled={loading}
                  className="text-[10px] label-uppercase text-[var(--foreground-muted)] hover:text-[var(--primary)] transition-colors disabled:opacity-50"
                >
                  全选 · All
                </button>
                <span className="text-[var(--foreground-muted)] opacity-30">|</span>
                <button
                  onClick={() => setScope(GRADES.map(g => g.id))}
                  disabled={loading}
                  className="text-[10px] label-uppercase text-[var(--foreground-muted)] hover:text-[var(--primary)] transition-colors disabled:opacity-50"
                >
                  全选列表 · Select All
                </button>
                <span className="text-[var(--foreground-muted)] opacity-30">|</span>
                <button
                  onClick={() => setScope([])}
                  disabled={loading}
                  className="text-[10px] label-uppercase text-[var(--foreground-muted)] hover:text-[var(--primary)] transition-colors disabled:opacity-50"
                >
                  清空 · Clear
                </button>
              </div>
            </div>
            <div className="text-xs text-[var(--foreground-muted)] mb-3 leading-relaxed">
              💡 不勾选 = 全部 6 册；勾选 1 个 = 单模块；勾选多个 = 合并导出（如 5上+5下+6上）
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {GRADES.map(g => {
                const isSelected = scope.includes(g.id)
                const isAllMode = scope.length === 0
                return (
                  <button
                    key={g.id}
                    onClick={() => handleToggleScope(g.id)}
                    disabled={loading}
                    className="p-3 rounded-lg text-left transition-all disabled:opacity-50"
                    style={isSelected || isAllMode ? {
                      background: 'linear-gradient(180deg, rgba(200, 153, 104, 0.15) 0%, rgba(200, 153, 104, 0.05) 100%)',
                      border: '1px solid rgba(200, 153, 104, 0.4)',
                    } : { background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)' }}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-serif-display text-sm text-[var(--foreground)]">{g.name}</span>
                      {(isSelected || isAllMode) && (
                        <span className="text-[var(--primary)] text-xs">✓</span>
                      )}
                    </div>
                    <div className="text-[10px] text-[var(--foreground-muted)] font-mono-code">
                      {g.unitCount} 单元 · {g.questionCount} 题
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 预览信息 */}
          <div className="glass rounded-lg p-4 border-l-2" style={{ borderLeftColor: 'var(--view-d)' }}>
            <div className="label-uppercase text-[10px] text-[var(--foreground-muted)] opacity-70 mb-2">📋 导出预览 · Preview</div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-xs text-[var(--foreground-muted)] mb-0.5">范围</div>
                <div className="font-serif-display text-[var(--foreground)]">{scopeLabel}</div>
              </div>
              <div>
                <div className="text-xs text-[var(--foreground-muted)] mb-0.5">格式</div>
                <div className="font-serif-display text-[var(--foreground)]">{format.toUpperCase()}</div>
              </div>
              <div>
                <div className="text-xs text-[var(--foreground-muted)] mb-0.5">答案模式</div>
                <div className="font-serif-display text-[var(--foreground)]">{withAnswers ? '含答案与解析' : '无答案（练习版）'}</div>
              </div>
              <div>
                <div className="text-xs text-[var(--foreground-muted)] mb-0.5">总题数</div>
                <div className="font-mono-code text-[var(--primary)] font-semibold">{totalQuestions} 题 · {totalUnits} 单元</div>
              </div>
            </div>
          </div>

          {/* 错误信息 */}
          {error && (
            <div className="rounded-lg p-3 text-sm" style={{ background: 'rgba(217, 119, 87, 0.1)', border: '1px solid rgba(217, 119, 87, 0.3)' }}>
              <div className="text-[var(--destructive)] font-semibold mb-1">❌ 导出失败</div>
              <div className="text-[var(--foreground-muted)] text-xs">{error}</div>
            </div>
          )}
        </div>

        {/* 底部操作 */}
        <div className="px-6 py-4 border-t border-[var(--glass-border)] flex items-center justify-between gap-3">
          <div className="text-xs text-[var(--foreground-muted)] leading-relaxed">
            {loading ? '⏳ 正在生成文档，首次 PDF 导出需加载字体...' : '🎯 文件生成后自动下载'}
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-lg text-sm text-[var(--foreground-muted)] hover:bg-white/[0.04] transition-colors disabled:opacity-50"
            >
              取消
            </button>
            <button
              onClick={handleExport}
              disabled={loading}
              className="btn-glow px-5 py-2 rounded-lg text-sm font-medium text-[var(--foreground)] flex items-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="inline-block w-3 h-3 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></span>
                  生成中...
                </>
              ) : (
                <>⬇ 导出 {format.toUpperCase()}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
