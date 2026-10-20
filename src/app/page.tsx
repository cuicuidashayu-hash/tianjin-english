'use client'

import { useState, useEffect } from 'react'
import { TEXTBOOK_DATA } from '@/lib/data/textbook'
import { VOCABULARY } from '@/lib/data/vocab'
import { EXERCISES } from '@/lib/data/exercises'
import { EXERCISES_EXTRA } from '@/lib/data/exercises_extra'
import { ExportDialog } from '@/components/export-dialog'

// 合并习题：原 5 题 + 扩展 5 题 = 每单元 10 题
function getMergedExercises() {
  return {
    ...EXERCISES,
    grades: EXERCISES.grades.map(g => ({
      ...g,
      units: g.units.map(u => {
        const key = `${g.id}-u${u.num}`
        const extra = EXERCISES_EXTRA[key] || []
        return { ...u, questions: [...u.questions, ...extra] }
      }),
    })),
  }
}
const EX = getMergedExercises()

// ============================================================
//  类型 & 工具
// ============================================================
type ViewId = 'A' | 'B' | 'C' | 'D'
function renderStars(star: number) {
  return '★'.repeat(star) + '☆'.repeat(3 - star)
}

// ============================================================
//  视角标题
// ============================================================
function ViewTitle({ index, title, subtitle }: { index: string; title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline gap-4 mb-2">
        <span className="font-serif-display text-5xl text-gradient-gold opacity-60">{index}</span>
        <div>
          <h2 className="font-serif-display text-3xl text-gradient-silver leading-tight">
            {title}
          </h2>
          <p className="text-sm text-[var(--foreground-muted)] mt-1 label-uppercase">
            {subtitle}
          </p>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--glass-border)] to-transparent"></div>
    </div>
  )
}

// ============================================================
//  横向卡片网格 - 视角 A 入口卡片
// ============================================================
function GradeCardGrid({ items, activeId, onSelect }: {
  items: { id: string; name: string; version: string; count: string }[]
  activeId: string | null
  onSelect: (id: string) => void
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(item => {
        const isActive = activeId === item.id
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className="glass hover-lift rounded-xl p-5 text-left cursor-pointer transition-all duration-300"
            style={isActive ? {
              borderColor: 'var(--view-a)',
              boxShadow: '0 0 0 1px var(--view-a), 0 12px 40px rgba(0,0,0,0.5)'
            } : {}}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-serif-display text-lg font-bold"
                style={{ background: 'rgba(139, 157, 195, 0.15)', color: 'var(--view-a)', border: '1px solid rgba(139, 157, 195, 0.3)' }}>
                {item.name.charAt(0)}
              </div>
              {isActive && (
                <span className="text-xs label-uppercase text-[var(--view-a)] opacity-80">● viewing</span>
              )}
            </div>
            <div className="font-serif-display text-base text-[var(--foreground)] leading-tight mb-1">
              {item.name}
            </div>
            <div className="text-xs text-[var(--foreground-muted)] leading-relaxed">
              {item.version}
            </div>
            <div className="mt-3 pt-3 border-t border-[var(--glass-border)] flex items-baseline gap-2">
              <span className="font-mono-code text-lg text-gradient-gold">{item.count}</span>
              <span className="label-uppercase text-[10px] text-[var(--foreground-muted)] opacity-70">units</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}

// ============================================================
//  视角 A：按年级顺叙
// ============================================================
function ViewA({ activeGradeId, activeUnitId, onSelectGrade, onSelectUnit, onJumpToExercises }: {
  activeGradeId: string | null
  activeUnitId: string | null
  onSelectGrade: (id: string) => void
  onSelectUnit: (id: string) => void
  onJumpToExercises: (unitId: string) => void
}) {
  const gradeItems = TEXTBOOK_DATA.grades.map(g => ({
    id: g.id,
    name: g.name,
    version: g.version,
    count: String(g.units.length),
  }))

  if (!activeGradeId) {
    return (
      <section id="view-a" className="scroll-mt-8">
        <ViewTitle index="A" title="按年级顺叙" subtitle="Select a grade to explore · Sequence by Grade" />
        <GradeCardGrid items={gradeItems} activeId={null} onSelect={onSelectGrade} />
      </section>
    )
  }

  const grade = TEXTBOOK_DATA.grades.find(g => g.id === activeGradeId)!
  return (
    <section id="view-a" className="scroll-mt-8">
      <ViewTitle index="A" title={grade.name} subtitle={grade.version} />
      <button onClick={() => onSelectGrade('')} className="text-xs label-uppercase text-[var(--foreground-muted)] hover:text-[var(--primary)] mb-4 transition-colors">
        ← Back to all grades
      </button>

      {/* 单元网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {grade.units.map(unit => {
          const unitId = `${grade.id}-u${unit.num}`
          const isActive = activeUnitId === unitId
          return (
            <button
              key={unit.num}
              onClick={() => onSelectUnit(isActive ? '' : unitId)}
              className="glass hover-lift rounded-lg p-4 text-left cursor-pointer transition-all"
              style={isActive ? {
                borderColor: 'var(--view-a)',
                boxShadow: '0 0 0 1px var(--view-a)'
              } : {}}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono-code text-xs font-bold px-2 py-0.5 rounded"
                  style={{ background: 'var(--view-a)', color: '#0a0a0f' }}>
                  U{unit.num}
                </span>
                {isActive && <span className="text-xs label-uppercase text-[var(--view-a)] opacity-80">● open</span>}
              </div>
              <div className="font-serif-display text-sm text-[var(--foreground)] leading-tight">
                {unit.title}
              </div>
              <div className="text-xs text-[var(--foreground-muted)] mt-1 truncate">
                {unit.topic}
              </div>
            </button>
          )
        })}
      </div>

      {/* 单元详情 */}
      {activeUnitId && (() => {
        const unit = grade.units.find(u => `${grade.id}-u${u.num}` === activeUnitId)
        if (!unit) return null
        const unitFullId = `${grade.id}-u${unit.num}`
        return (
          <div id={unitFullId} className="glass-strong rounded-xl p-6 scroll-mt-8">
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-mono-code text-xs font-bold px-3 py-1 rounded"
                style={{ background: 'var(--view-a)', color: '#0a0a0f' }}>
                Unit {unit.num}
              </span>
              <h3 className="font-serif-display text-2xl text-gradient-silver">{unit.title}</h3>
              <span className="text-sm text-[var(--foreground-muted)] ml-auto">{unit.topic}</span>
            </div>

            <div className="space-y-6">
              <DimensionBlock title="词汇" label="Vocabulary" index="一">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                  {unit.vocab.map((v, i) => (
                    <div key={i} className="grid grid-cols-[1fr_60px] gap-3 items-baseline text-sm py-2 border-b border-white/[0.04]">
                      <div>
                        <span className="font-mono-code text-[var(--primary)] font-medium">{v.word}</span>
                        <span className="text-[var(--foreground-muted)] ml-3 text-xs">{v.cn}</span>
                      </div>
                      <span className="text-[var(--star-color)] text-xs text-right">{renderStars(v.star)}</span>
                    </div>
                  ))}
                </div>
              </DimensionBlock>

              <DimensionBlock title="句型" label="Sentences" index="二">
                <ul className="space-y-3">
                  {unit.sentences.map((s, i) => (
                    <li key={i} className="relative pr-16">
                      <div className="font-mono-code text-sm text-[var(--foreground)] leading-relaxed">{s.en}</div>
                      <div className="text-xs text-[var(--foreground-muted)] mt-1 leading-relaxed">{s.cn}</div>
                      <span className="absolute right-0 top-0 text-[var(--star-color)] text-xs">{renderStars(s.star)}</span>
                    </li>
                  ))}
                </ul>
              </DimensionBlock>

              <DimensionBlock title="语法点" label="Grammar" index="三">
                <ul className="space-y-3">
                  {unit.grammar.map((g, i) => (
                    <li key={i} className="relative pr-16">
                      <div className="font-serif-display text-sm text-[var(--foreground)] font-semibold">{g.point}</div>
                      <div className="text-xs text-[var(--foreground-muted)] mt-1 leading-relaxed pl-3 border-l border-[var(--glass-border)]">{g.detail}</div>
                      <span className="absolute right-0 top-0 text-[var(--star-color)] text-xs">{renderStars(g.star)}</span>
                    </li>
                  ))}
                </ul>
              </DimensionBlock>

              <DimensionBlock title="语音拼读" label="Phonetics" index="四">
                <ul className="space-y-2">
                  {unit.phonetics.map((p, i) => (
                    <li key={i} className="relative pr-16">
                      <div className="font-mono-code text-sm text-[var(--accent)] font-medium">{p.rule}</div>
                      <div className="text-xs text-[var(--foreground-muted)] mt-1">
                        <span className="label-uppercase">examples</span> · {p.examples}
                      </div>
                      <span className="absolute right-0 top-0 text-[var(--star-color)] text-xs">{renderStars(p.star)}</span>
                    </li>
                  ))}
                </ul>
              </DimensionBlock>

              <DimensionBlock title="难点 / 易错点" label="Common Pitfalls" index="五" isWarn>
                <ul className="space-y-3">
                  {unit.difficulties.map((d, i) => (
                    <li key={i} className="relative pr-16 p-3 rounded-lg"
                      style={{ background: 'rgba(217, 119, 87, 0.06)', border: '1px solid rgba(217, 119, 87, 0.15)' }}>
                      <div className="font-serif-display text-sm text-[var(--destructive)] font-semibold flex items-center gap-2">
                        <span className="text-base">✕</span>{d.error}
                      </div>
                      <div className="text-xs text-[var(--foreground-muted)] mt-1.5 leading-relaxed pl-5">{d.detail}</div>
                      <span className="absolute right-2 top-2 text-[var(--star-color)] text-xs">{renderStars(d.star)}</span>
                    </li>
                  ))}
                </ul>
              </DimensionBlock>
            </div>

            {/* 配套习题联动 */}
            <ExerciseInline
              gradeId={grade.id}
              unitNum={unit.num}
              onJumpToExercises={() => onJumpToExercises(unitFullId)}
            />
          </div>
        )
      })()}
    </section>
  )
}

// 联动习题块（在视角 A 单元详情下方嵌入习题）
function ExerciseInline({ gradeId, unitNum, onJumpToExercises }: {
  gradeId: string
  unitNum: number
  onJumpToExercises: () => void
}) {
  const [showAnswers, setShowAnswers] = useState(true)
  const exGrade = EX.grades.find(g => g.id === gradeId)
  if (!exGrade) return null
  const unit = exGrade.units.find(u => u.num === unitNum)
  if (!unit) return null

  // 只显示前 5 题（联动预览），完整习题在视角 D
  const previewQuestions = unit.questions.slice(0, 5)

  return (
    <div className="mt-8 pt-6 border-t border-[var(--glass-border)]">
      <div className="flex items-baseline gap-3 mb-4">
        <div className="w-1 h-4 rounded-full" style={{ background: 'var(--view-d)' }}></div>
        <h4 className="font-serif-display text-base text-[var(--foreground)]">配套习题</h4>
        <span className="label-uppercase text-[10px] text-[var(--foreground-muted)] opacity-70">Linked Exercises · Preview {previewQuestions.length} of {unit.questions.length}</span>
        <div className="flex-1 h-px" style={{ background: 'var(--glass-border)' }}></div>
        <button onClick={onJumpToExercises}
          className="text-xs label-uppercase text-[var(--view-d)] hover:text-[var(--primary)] transition-colors flex items-center gap-1">
          查看完整习题 →
        </button>
      </div>

      {/* mini 答案切换 */}
      <div className="flex items-center justify-between mb-3">
        <label className="inline-flex items-center gap-2 cursor-pointer select-none">
          <div className="relative">
            <input type="checkbox" checked={showAnswers} onChange={(e) => setShowAnswers(e.target.checked)} className="sr-only peer" />
            <div className="w-10 h-5 rounded-full transition-colors duration-300"
              style={{ background: showAnswers ? 'rgba(200, 153, 104, 0.4)' : 'rgba(255,255,255,0.1)' }}></div>
            <div className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow-lg transition-transform duration-300"
              style={{ transform: showAnswers ? 'translateX(20px)' : 'none' }}></div>
          </div>
          <span className="text-xs text-[var(--foreground-muted)]">
            {showAnswers ? '显示答案' : '隐藏答案'}
          </span>
        </label>
      </div>

      <div className="space-y-2">
        {previewQuestions.map((q, idx) => (
          <MiniQuestion key={idx} q={q} idx={idx} showAnswers={showAnswers} />
        ))}
      </div>
    </div>
  )
}

function MiniQuestion({ q, idx, showAnswers }: { q: any; idx: number; showAnswers: boolean }) {
  const qNum = idx + 1
  if (q.type === '选择') {
    const correctLetter = q.answer
    return (
      <div className="p-3 rounded-lg border border-[var(--glass-border)]" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="text-xs text-[var(--foreground)] mb-2 leading-relaxed flex items-baseline gap-2">
          <span className="font-mono-code text-[10px] text-[var(--view-d)] font-bold flex-shrink-0">({qNum})</span>
          <span className="font-mono-code">{q.stem}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pl-5">
          {q.options.map((opt: string, i: number) => {
            const letter = String.fromCharCode(65 + i)
            const isCorrect = letter === correctLetter
            return (
              <div key={i} className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-all ${showAnswers && isCorrect ? 'ex-correct-glow' : ''}`}
                style={!showAnswers || !isCorrect ? { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' } : {}}>
                {showAnswers && isCorrect && <span className="text-[var(--primary)] font-bold text-xs">★</span>}
                <span className="font-mono-code font-bold text-[var(--foreground)]">{letter}.</span>
                <span className="font-mono-code text-[var(--foreground)]">{opt}</span>
              </div>
            )
          })}
        </div>
        {showAnswers && (
          <div className="mt-2 px-2.5 py-1.5 rounded-md text-xs"
            style={{ background: 'rgba(126, 154, 184, 0.06)', borderLeft: '2px solid var(--accent)' }}>
            <span className="label-uppercase text-[9px] font-bold" style={{ color: 'var(--accent)' }}>答案</span>
            <span className="font-mono-code font-bold ml-2" style={{ color: 'var(--accent)' }}>{correctLetter}. {q.options[correctLetter.charCodeAt(0) - 65]}</span>
            <span className="text-[var(--foreground-muted)] ml-2">· {q.analysis}</span>
          </div>
        )}
      </div>
    )
  } else {
    return (
      <div className="p-3 rounded-lg border border-[var(--glass-border)]" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="text-xs text-[var(--foreground)] leading-relaxed flex items-baseline gap-2">
          <span className="font-mono-code text-[10px] text-[var(--view-d)] font-bold flex-shrink-0">({qNum})</span>
          <span className="font-mono-code">
            {q.before}
            {showAnswers ? (
              <span className="text-[var(--primary)] font-bold font-mono-code px-1.5 py-0.5 rounded mx-1"
                style={{ background: 'rgba(201, 169, 97, 0.15)' }}>{q.answer}</span>
            ) : (
              <span className="inline-block min-w-[100px] border-b border-[var(--foreground-muted)] mx-1">&nbsp;</span>
            )}
            {q.after}
          </span>
        </div>
        {showAnswers && (
          <div className="mt-2 px-2.5 py-1.5 rounded-md text-xs"
            style={{ background: 'rgba(126, 154, 184, 0.06)', borderLeft: '2px solid var(--accent)' }}>
            <span className="label-uppercase text-[9px] font-bold" style={{ color: 'var(--accent)' }}>答案</span>
            <span className="font-mono-code font-bold ml-2" style={{ color: 'var(--accent)' }}>{q.answer}</span>
            <span className="text-[var(--foreground-muted)] ml-2">· {q.analysis}</span>
          </div>
        )}
      </div>
    )
  }
}

function DimensionBlock({ title, label, index, children, isWarn }: {
  title: string; label: string; index: string; children: React.ReactNode; isWarn?: boolean
}) {
  const color = isWarn ? 'var(--destructive)' : 'var(--primary)'
  return (
    <div>
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-serif-display text-xs text-[var(--foreground-muted)] opacity-60">{index}</span>
        <h4 className="font-serif-display text-base font-semibold" style={{ color }}>{title}</h4>
        <span className="label-uppercase text-[10px] text-[var(--foreground-muted)] opacity-50">{label}</span>
        <div className="flex-1 h-px" style={{ background: 'var(--glass-border)' }}></div>
      </div>
      {children}
    </div>
  )
}

// ============================================================
//  视角 B：按知识点纵贯
// ============================================================
function ViewB({ activeCatId, onSelectCat }: {
  activeCatId: string | null
  onSelectCat: (id: string) => void
}) {
  const cat = TEXTBOOK_DATA.byCategory
  const cards = [
    { id: 'vocab', name: '词汇体系', label: 'Vocabulary System', emoji: '📚', count: cat.vocabulary.length, color: 'var(--view-b)' },
    { id: 'sentences', name: '句型体系', label: 'Sentence Patterns', emoji: '💬', count: cat.sentences.length, color: 'var(--view-b)' },
    { id: 'grammar', name: '语法体系', label: 'Grammar System', emoji: '📐', count: cat.grammar.length, color: 'var(--view-b)' },
    { id: 'phonetics', name: '语音体系', label: 'Phonetics System', emoji: '🔊', count: cat.phonetics.length, color: 'var(--view-b)' },
    { id: 'difficulties', name: '难点纵贯', label: 'High-Frequency Pitfalls', emoji: '⚠', count: cat.difficulties.length, color: 'var(--destructive)' },
  ]

  if (!activeCatId) {
    return (
      <section id="view-b" className="scroll-mt-8">
        <ViewTitle index="B" title="按知识点纵贯" subtitle="Select a category · Cross-Grade Knowledge Map" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map(card => (
            <button key={card.id} onClick={() => onSelectCat(card.id)}
              className="glass hover-lift rounded-xl p-5 text-left cursor-pointer transition-all"
              style={{ borderColor: card.color }}>
              <div className="text-3xl mb-3 opacity-80">{card.emoji}</div>
              <div className="font-serif-display text-base text-[var(--foreground)] leading-tight mb-1">{card.name}</div>
              <div className="label-uppercase text-[10px] text-[var(--foreground-muted)] opacity-70 mb-3">{card.label}</div>
              <div className="pt-3 border-t border-[var(--glass-border)] flex items-baseline gap-2">
                <span className="font-mono-code text-lg text-gradient-gold">{card.count}</span>
                <span className="label-uppercase text-[10px] text-[var(--foreground-muted)] opacity-70">items</span>
              </div>
            </button>
          ))}
        </div>
      </section>
    )
  }

  const active = cards.find(c => c.id === activeCatId)!
  const renderTable = () => {
    switch (activeCatId) {
      case 'vocab':
        return (
          <CategoryTable headers={['主题分类', '出现年级', '核心词汇']} widths={['22%', '18%', '60%']}>
            {cat.vocabulary.map((v, i) => (
              <tr key={i} className="table-row-hover transition-colors">
                <td className="border border-[var(--glass-border)] px-4 py-3 font-serif-display text-sm font-semibold text-[var(--primary)]">{v.category}</td>
                <td className="border border-[var(--glass-border)] px-4 py-3 text-xs text-[var(--foreground-muted)]">{v.grades}</td>
                <td className="border border-[var(--glass-border)] px-4 py-3 text-xs">
                  {v.items.map((item, j) => (
                    <span key={j} className="inline-block font-mono-code text-[11px] px-2 py-0.5 mr-1 mb-1 rounded-full"
                      style={{ background: 'rgba(201, 169, 97, 0.08)', color: 'var(--primary)', border: '1px solid rgba(201, 169, 97, 0.15)' }}>{item}</span>
                  ))}
                </td>
              </tr>
            ))}
          </CategoryTable>
        )
      case 'sentences':
        return (
          <CategoryTable headers={['句型分类', '出现年级', '核心句型']} widths={['22%', '18%', '60%']}>
            {cat.sentences.map((s, i) => (
              <tr key={i} className="table-row-hover transition-colors">
                <td className="border border-[var(--glass-border)] px-4 py-3 font-serif-display text-sm font-semibold text-[var(--primary)]">{s.category}</td>
                <td className="border border-[var(--glass-border)] px-4 py-3 text-xs text-[var(--foreground-muted)]">{s.grades}</td>
                <td className="border border-[var(--glass-border)] px-4 py-3 text-xs">
                  {s.items.map((item, j) => (
                    <span key={j} className="inline-block font-mono-code text-[11px] px-2 py-0.5 mr-1 mb-1 rounded-full"
                      style={{ background: 'rgba(201, 169, 97, 0.08)', color: 'var(--primary)', border: '1px solid rgba(201, 169, 97, 0.15)' }}>{item}</span>
                  ))}
                </td>
              </tr>
            ))}
          </CategoryTable>
        )
      case 'grammar':
        return (
          <CategoryTable headers={['语法点', '出现年级', '要点', '难度']} widths={['22%', '18%', '50%', '10%']}>
            {cat.grammar.map((g, i) => (
              <tr key={i} className="table-row-hover transition-colors">
                <td className="border border-[var(--glass-border)] px-4 py-3 font-serif-display text-sm font-semibold text-[var(--primary)]">{g.category}</td>
                <td className="border border-[var(--glass-border)] px-4 py-3 text-xs text-[var(--foreground-muted)]">{g.grades}</td>
                <td className="border border-[var(--glass-border)] px-4 py-3 text-xs text-[var(--foreground-muted)] leading-relaxed">{g.detail}</td>
                <td className="border border-[var(--glass-border)] px-4 py-3 text-center text-[var(--star-color)] text-xs">{renderStars(g.star)}</td>
              </tr>
            ))}
          </CategoryTable>
        )
      case 'phonetics':
        return (
          <CategoryTable headers={['阶段', '出现年级', '字母/字母组合发音规则']} widths={['20%', '18%', '62%']}>
            {cat.phonetics.map((p, i) => (
              <tr key={i} className="table-row-hover transition-colors">
                <td className="border border-[var(--glass-border)] px-4 py-3 font-serif-display text-sm font-semibold text-[var(--primary)]">{p.category}</td>
                <td className="border border-[var(--glass-border)] px-4 py-3 text-xs text-[var(--foreground-muted)]">{p.grades}</td>
                <td className="border border-[var(--glass-border)] px-4 py-3 text-xs">
                  {p.items.map((item, j) => (
                    <span key={j} className="inline-block font-mono-code text-[11px] px-2 py-0.5 mr-1 mb-1 rounded-full"
                      style={{ background: 'rgba(201, 169, 97, 0.08)', color: 'var(--primary)', border: '1px solid rgba(201, 169, 97, 0.15)' }}>{item}</span>
                  ))}
                </td>
              </tr>
            ))}
          </CategoryTable>
        )
      case 'difficulties':
        return (
          <CategoryTable headers={['易错点', '高频年级', '常见错误', '难度']} widths={['22%', '18%', '50%', '10%']} isWarn>
            {cat.difficulties.map((d, i) => (
              <tr key={i} className="table-row-hover transition-colors">
                <td className="border border-[var(--glass-border)] px-4 py-3 font-serif-display text-sm font-semibold text-[var(--destructive)]">{d.category}</td>
                <td className="border border-[var(--glass-border)] px-4 py-3 text-xs text-[var(--foreground-muted)]">{d.grades}</td>
                <td className="border border-[var(--glass-border)] px-4 py-3 text-xs text-[var(--foreground-muted)] leading-relaxed">{d.detail}</td>
                <td className="border border-[var(--glass-border)] px-4 py-3 text-center text-[var(--star-color)] text-xs">{renderStars(d.star)}</td>
              </tr>
            ))}
          </CategoryTable>
        )
      default: return null
    }
  }

  return (
    <section id="view-b" className="scroll-mt-8">
      <ViewTitle index="B" title={active.name} subtitle={active.label} />
      <button onClick={() => onSelectCat('')} className="text-xs label-uppercase text-[var(--foreground-muted)] hover:text-[var(--primary)] mb-4 transition-colors">
        ← Back to all categories
      </button>
      <div className="glass-strong rounded-xl p-5 overflow-x-auto">
        {renderTable()}
      </div>
    </section>
  )
}

function CategoryTable({ headers, widths, children, isWarn }: {
  headers: string[]; widths: string[]; children: React.ReactNode; isWarn?: boolean
}) {
  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr style={{ background: isWarn ? 'rgba(217, 119, 87, 0.08)' : 'rgba(255, 255, 255, 0.03)' }}>
          {headers.map((h, i) => (
            <th key={i} className="border border-[var(--glass-border)] px-4 py-3 text-left font-serif-display text-xs font-semibold label-uppercase"
              style={{ width: widths[i], color: isWarn ? 'var(--destructive)' : 'var(--foreground-muted)' }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  )
}

// ============================================================
//  视角 C：核心词汇总表
// ============================================================
function ViewC({ activeCatId, onSelectCat }: {
  activeCatId: string | null
  onSelectCat: (id: string) => void
}) {
  if (!activeCatId) {
    return (
      <section id="view-c" className="scroll-mt-8">
        <ViewTitle index="C" title="核心词汇总表" subtitle="500 Vocabulary · 21 Themes · Click a theme" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {VOCABULARY.categories.map(cat => (
            <button key={cat.id} onClick={() => onSelectCat(cat.id)}
              className="glass hover-lift rounded-lg p-4 text-left cursor-pointer transition-all"
              style={{ borderColor: 'var(--view-c)' }}>
              <div className="flex items-start justify-between mb-2">
                <div className="w-8 h-8 rounded flex items-center justify-center"
                  style={{ background: 'rgba(136, 168, 126, 0.15)', border: '1px solid rgba(136, 168, 126, 0.3)' }}>
                  <span className="text-base">📚</span>
                </div>
                <span className="font-mono-code text-base text-gradient-gold">{cat.words.length}</span>
              </div>
              <div className="font-serif-display text-sm text-[var(--foreground)] leading-tight mb-1">{cat.name}</div>
              <div className="text-[10px] text-[var(--foreground-muted)] label-uppercase">{cat.grades}</div>
            </button>
          ))}
        </div>
      </section>
    )
  }

  const cat = VOCABULARY.categories.find(c => c.id === activeCatId)!
  return (
    <section id="view-c" className="scroll-mt-8">
      <ViewTitle index="C" title={cat.name} subtitle={`适用年级 · ${cat.grades} · 共 ${cat.words.length} 词`} />
      <button onClick={() => onSelectCat('')} className="text-xs label-uppercase text-[var(--foreground-muted)] hover:text-[var(--primary)] mb-4 transition-colors">
        ← Back to all themes
      </button>
      <div className="glass-strong rounded-xl p-5 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
              <th className="border border-[var(--glass-border)] px-4 py-3 text-left font-serif-display text-xs font-semibold label-uppercase text-[var(--foreground-muted)]" style={{ width: '35%' }}>English</th>
              <th className="border border-[var(--glass-border)] px-4 py-3 text-left font-serif-display text-xs font-semibold label-uppercase text-[var(--foreground-muted)]" style={{ width: '35%' }}>中文</th>
              <th className="border border-[var(--glass-border)] px-4 py-3 text-center font-serif-display text-xs font-semibold label-uppercase text-[var(--foreground-muted)]" style={{ width: '18%' }}>出现年级</th>
              <th className="border border-[var(--glass-border)] px-4 py-3 text-center font-serif-display text-xs font-semibold label-uppercase text-[var(--foreground-muted)]" style={{ width: '12%' }}>四会</th>
            </tr>
          </thead>
          <tbody>
            {cat.words.map((w, i) => (
              <tr key={i} className="table-row-hover transition-colors">
                <td className="border border-[var(--glass-border)] px-4 py-2.5 font-mono-code text-sm font-medium" style={{ color: 'var(--view-c)' }}>{w.word}</td>
                <td className="border border-[var(--glass-border)] px-4 py-2.5 text-[var(--foreground)]">{w.cn}</td>
                <td className="border border-[var(--glass-border)] px-4 py-2.5 text-center text-xs text-[var(--foreground-muted)] font-mono-code">{w.grade}</td>
                <td className="border border-[var(--glass-border)] px-4 py-2.5 text-center text-[var(--star-color)]">{w.star || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

// ============================================================
//  视角 D：36 单元配套习题集
// ============================================================
function ViewD({ activeGradeId, activeUnitId, onSelectGrade, onSelectUnit, showAnswers, setShowAnswers }: {
  activeGradeId: string | null
  activeUnitId: string | null
  onSelectGrade: (id: string) => void
  onSelectUnit: (id: string) => void
  showAnswers: boolean
  setShowAnswers: (v: boolean) => void
}) {
  if (!activeGradeId) {
    const cards = EX.grades.map(g => ({
      id: g.id,
      name: g.name,
      count: g.units.length * 10, // 每单元 10 题
      totalUnits: g.units.length,
    }))
    return (
      <section id="view-d" className="scroll-mt-8">
        <ViewTitle index="D" title="配套习题集" subtitle="360 Questions · 36 Units · Select a grade" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map(card => (
            <button key={card.id} onClick={() => onSelectGrade(card.id)}
              className="glass hover-lift rounded-xl p-5 text-left cursor-pointer transition-all"
              style={{ borderColor: 'var(--view-d)' }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center font-serif-display text-lg font-bold"
                  style={{ background: 'rgba(200, 153, 104, 0.15)', color: 'var(--view-d)', border: '1px solid rgba(200, 153, 104, 0.3)' }}>
                  {card.name.charAt(0)}
                </div>
                <span className="text-xs label-uppercase text-[var(--view-d)] opacity-80">● ready</span>
              </div>
              <div className="font-serif-display text-base text-[var(--foreground)] leading-tight mb-1">
                {card.name} <span className="text-[var(--foreground-muted)] font-normal text-sm">习题集</span>
              </div>
              <div className="mt-3 pt-3 border-t border-[var(--glass-border)] flex items-baseline gap-2">
                <span className="font-mono-code text-lg text-gradient-gold">{card.count}</span>
                <span className="label-uppercase text-[10px] text-[var(--foreground-muted)] opacity-70">questions</span>
                <span className="ml-auto text-xs text-[var(--foreground-muted)]">{card.totalUnits} units</span>
              </div>
            </button>
          ))}
        </div>
      </section>
    )
  }

  const grade = EX.grades.find(g => g.id === activeGradeId)!
  return (
    <section id="view-d" className="scroll-mt-8">
      <ViewTitle index="D" title={`${grade.name} · 习题集`} subtitle={`${grade.units.length} units × 10 questions = ${grade.units.length * 10} questions`} />
      <button onClick={() => onSelectGrade('')} className="text-xs label-uppercase text-[var(--foreground-muted)] hover:text-[var(--primary)] mb-4 transition-colors">
        ← Back to all grades
      </button>

      {/* 答案切换开关 */}
      <div className="glass-strong rounded-xl p-4 mb-5 flex flex-wrap items-center justify-between gap-4 border-l-2"
        style={{ borderLeftColor: 'var(--view-d)' }}>
        <label className="inline-flex items-center gap-3 cursor-pointer select-none">
          <div className="relative">
            <input type="checkbox" checked={showAnswers} onChange={(e) => setShowAnswers(e.target.checked)} className="sr-only peer" />
            <div className="w-12 h-6 rounded-full transition-colors duration-300"
              style={{ background: showAnswers ? 'rgba(200, 153, 104, 0.4)' : 'rgba(255,255,255,0.1)' }}></div>
            <div className="absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow-lg transition-transform duration-300"
              style={{ transform: showAnswers ? 'translateX(24px)' : 'none' }}></div>
          </div>
          <div>
            <div className="font-serif-display text-sm font-semibold text-[var(--foreground)]">
              {showAnswers ? '显示答案与解析' : '隐藏答案（练习模式）'}
            </div>
            <div className="label-uppercase text-[10px] text-[var(--foreground-muted)] opacity-70">
              {showAnswers ? 'Teacher Mode' : 'Student Mode · Print Ready'}
            </div>
          </div>
        </label>
        <div className="text-xs text-[var(--foreground-muted)] max-w-md leading-relaxed">
          <span className="text-[var(--primary)]">💡</span> 不勾选 = 隐藏答案（可打印给孩子做）；勾选 = 显示答案与解析（老师/家长备课用）
        </div>
      </div>

      {/* 单元网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {grade.units.map(unit => {
          const unitId = `${grade.id}-u${unit.num}`
          const isActive = activeUnitId === unitId
          return (
            <button key={unit.num} onClick={() => onSelectUnit(isActive ? '' : unitId)}
              className="glass hover-lift rounded-lg p-4 text-left cursor-pointer transition-all"
              style={isActive ? { borderColor: 'var(--view-d)', boxShadow: '0 0 0 1px var(--view-d)' } : {}}>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono-code text-xs font-bold px-2 py-0.5 rounded"
                  style={{ background: 'var(--view-d)', color: '#0a0a0f' }}>U{unit.num}</span>
                {isActive && <span className="text-xs label-uppercase text-[var(--view-d)] opacity-80">● open</span>}
                <span className="ml-auto text-xs text-[var(--foreground-muted)] font-mono-code">{unit.questions.length} 题</span>
              </div>
              <div className="font-serif-display text-sm text-[var(--foreground)] leading-tight">{unit.title}</div>
              <div className="text-xs text-[var(--foreground-muted)] mt-1 truncate">{unit.topic}</div>
            </button>
          )
        })}
      </div>

      {/* 单元习题详情 */}
      {activeUnitId && (() => {
        const unit = grade.units.find(u => `${grade.id}-u${u.num}` === activeUnitId)
        if (!unit) return null
        return (
          <div id={activeUnitId} className="glass-strong rounded-xl p-6 scroll-mt-8">
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-mono-code text-xs font-bold px-3 py-1 rounded"
                style={{ background: 'var(--view-d)', color: '#0a0a0f' }}>Unit {unit.num}</span>
              <h3 className="font-serif-display text-2xl text-gradient-silver">{unit.title}</h3>
              <span className="text-sm text-[var(--foreground-muted)] ml-auto">{unit.topic}</span>
            </div>
            <div className="space-y-3">
              {unit.questions.map((q, idx) => (
                <FullQuestion key={idx} q={q} idx={idx} showAnswers={showAnswers} />
              ))}
            </div>
          </div>
        )
      })()}
    </section>
  )
}

function FullQuestion({ q, idx, showAnswers }: { q: any; idx: number; showAnswers: boolean }) {
  const qNum = idx + 1
  if (q.type === '选择') {
    const correctLetter = q.answer
    return (
      <div className="p-4 rounded-lg border border-[var(--glass-border)]" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="text-sm text-[var(--foreground)] mb-3 leading-relaxed flex items-baseline gap-2">
          <span className="font-mono-code text-xs text-[var(--view-d)] font-bold flex-shrink-0">({qNum})</span>
          <span className="font-mono-code">{q.stem}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3 pl-6">
          {q.options.map((opt: string, i: number) => {
            const letter = String.fromCharCode(65 + i)
            const isCorrect = letter === correctLetter
            return (
              <div key={i} className={`px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-all duration-300 ${showAnswers && isCorrect ? 'ex-correct-glow' : ''}`}
                style={!showAnswers || !isCorrect ? { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' } : {}}>
                {showAnswers && isCorrect && <span className="text-[var(--primary)] font-bold text-sm">★</span>}
                <span className="font-mono-code font-bold text-[var(--foreground)]">{letter}.</span>
                <span className="font-mono-code text-[var(--foreground)]">{opt}</span>
              </div>
            )
          })}
        </div>
        {showAnswers && <AnswerBlock answer={`${correctLetter}. ${q.options[correctLetter.charCodeAt(0) - 65]}`} analysis={q.analysis} />}
      </div>
    )
  } else {
    return (
      <div className="p-4 rounded-lg border border-[var(--glass-border)]" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="text-sm text-[var(--foreground)] leading-relaxed flex items-baseline gap-2">
          <span className="font-mono-code text-xs text-[var(--view-d)] font-bold flex-shrink-0">({qNum})</span>
          <span className="font-mono-code">
            {q.before}
            {showAnswers ? (
              <span className="text-[var(--primary)] font-bold font-mono-code px-1.5 py-0.5 rounded mx-1"
                style={{ background: 'rgba(201, 169, 97, 0.15)' }}>{q.answer}</span>
            ) : (
              <span className="inline-block min-w-[120px] border-b border-[var(--foreground-muted)] mx-1">&nbsp;</span>
            )}
            {q.after}
          </span>
        </div>
        {showAnswers && <AnswerBlock answer={q.answer} analysis={q.analysis} />}
      </div>
    )
  }
}

function AnswerBlock({ answer, analysis }: { answer: string; analysis: string }) {
  return (
    <div className="mt-3 px-4 py-2.5 rounded-md text-sm"
      style={{ background: 'rgba(126, 154, 184, 0.06)', borderLeft: '3px solid var(--accent)' }}>
      <div className="flex items-baseline gap-3 my-1 leading-relaxed">
        <span className="label-uppercase text-[10px] font-bold" style={{ color: 'var(--accent)' }}>答案</span>
        <span className="font-mono-code font-bold" style={{ color: 'var(--accent)' }}>{answer}</span>
      </div>
      <div className="flex items-baseline gap-3 my-1 leading-relaxed">
        <span className="label-uppercase text-[10px] font-bold text-[var(--foreground-muted)]">解析</span>
        <span className="text-xs text-[var(--foreground-muted)]">{analysis}</span>
      </div>
    </div>
  )
}

// ============================================================
//  侧边栏 - 一级 tab 模式
// ============================================================
function Sidebar({ activeView, onSwitchView, activeSubLabel, subItems, onSelectSub }: {
  activeView: ViewId
  onSwitchView: (v: ViewId) => void
  activeSubLabel: string
  subItems: { id: string; label: string; sub?: string }[]
  onSelectSub: (id: string) => void
}) {
  const views: { id: ViewId; name: string; label: string; color: string }[] = [
    { id: 'A', name: '按年级', label: 'By Grade', color: 'var(--view-a)' },
    { id: 'B', name: '知识点纵贯', label: 'Cross-Grade', color: 'var(--view-b)' },
    { id: 'C', name: '词汇总表', label: 'Vocabulary', color: 'var(--view-c)' },
    { id: 'D', name: '配套习题', label: 'Exercises', color: 'var(--view-d)' },
  ]

  return (
    <aside className="w-72 fixed left-0 top-0 bottom-0 overflow-y-auto z-30 hidden md:block"
      style={{ background: 'rgba(19, 19, 24, 0.7)', backdropFilter: 'blur(24px) saturate(180%)', borderRight: '1px solid var(--glass-border)' }}>
      <div className="p-6">
        {/* Logo */}
        <div className="mb-6 pb-6 border-b border-[var(--glass-border)]">
          <div className="font-serif-display text-base text-gradient-gold leading-tight">武清区小学英语</div>
          <div className="label-uppercase text-[10px] text-[var(--foreground-muted)] opacity-70 mt-1">Knowledge Base · v2.0</div>
        </div>

        {/* 4 一级 tab */}
        <div className="mb-6">
          <div className="label-uppercase text-[10px] text-[var(--foreground-muted)] opacity-60 mb-3 px-3">视角切换 · Views</div>
          <div className="space-y-1">
            {views.map(v => {
              const isActive = activeView === v.id
              return (
                <button key={v.id} onClick={() => onSwitchView(v.id)}
                  className="w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 cursor-pointer transition-all"
                  style={isActive ? {
                    background: `linear-gradient(135deg, ${v.color}25 0%, transparent 100%)`,
                    border: `1px solid ${v.color}40`,
                  } : { border: '1px solid transparent' }}>
                  <span className="font-mono-code text-sm font-bold w-6 h-6 rounded flex items-center justify-center"
                    style={isActive ? { background: v.color, color: '#0a0a0f' } : { background: 'rgba(255,255,255,0.06)', color: 'var(--foreground-muted)' }}>
                    {v.id}
                  </span>
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${isActive ? 'text-[var(--foreground)]' : 'text-[var(--foreground-muted)]'}`}>{v.name}</div>
                    <div className="label-uppercase text-[9px] opacity-60">{v.label}</div>
                  </div>
                  {isActive && <span className="w-1 h-6 rounded-full" style={{ background: v.color }}></span>}
                </button>
              )
            })}
          </div>
        </div>

        {/* 二级子项 */}
        {subItems.length > 0 && (
          <div className="mb-6">
            <div className="label-uppercase text-[10px] text-[var(--foreground-muted)] opacity-60 mb-2 px-3 flex items-center justify-between">
              <span>{activeSubLabel}</span>
              <button onClick={() => onSelectSub('')} className="text-[var(--foreground-muted)] hover:text-[var(--primary)] transition-colors normal-case tracking-normal text-[10px]">← 返回</button>
            </div>
            <ul className="space-y-0.5">
              {subItems.map(item => (
                <li key={item.id}>
                  <button onClick={() => onSelectSub(item.id)}
                    className="w-full text-left px-3 py-1.5 rounded text-xs text-[var(--foreground-muted)] hover:bg-white/[0.04] hover:text-[var(--primary)] transition-colors flex items-center gap-2">
                    <span className="text-[10px] opacity-60">›</span>
                    <span className="flex-1">{item.label}</span>
                    {item.sub && <span className="font-mono-code text-[10px] text-[var(--foreground-muted)] opacity-70">{item.sub}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Legend */}
        <div className="p-4 rounded-lg" style={{ background: 'rgba(201, 169, 97, 0.06)', border: '1px solid rgba(201, 169, 97, 0.15)' }}>
          <div className="label-uppercase text-[10px] text-[var(--primary)] opacity-80 mb-2">难度星级</div>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-[var(--foreground-muted)]">
              <span className="text-[var(--star-color)]">★☆☆</span> <span>课本要求</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--foreground-muted)]">
              <span className="text-[var(--star-color)]">★★☆</span> <span>考试重点</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--foreground-muted)]">
              <span className="text-[var(--star-color)]">★★★</span> <span>拓题难度</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

// ============================================================
//  主页面
// ============================================================
export default function Home() {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)
  const [activeView, setActiveView] = useState<ViewId>('A')
  const [activeGradeId, setActiveGradeId] = useState<string | null>(null)  // 视角 A 和 D 共用
  const [activeUnitId, setActiveUnitId] = useState<string | null>(null)
  const [activeBCatId, setActiveBCatId] = useState<string | null>(null)
  const [activeVCatId, setActiveVCatId] = useState<string | null>(null)
  const [showAnswers, setShowAnswers] = useState(true)
  const [exportDialogOpen, setExportDialogOpen] = useState(false)

  // 切换视角时清空子项
  const switchView = (v: ViewId) => {
    setActiveView(v)
    setActiveGradeId(null)
    setActiveUnitId(null)
    setActiveBCatId(null)
    setActiveVCatId(null)
    setShowMobileSidebar(false)
  }

  // 跳转到视角 D 的某单元
  const jumpToExercises = (unitFullId: string) => {
    // unitFullId 形如 "g4up-u1"
    const match = unitFullId.match(/^(g\d\w+)-u(\d+)$/)
    if (match) {
      setActiveView('D')
      setActiveGradeId(match[1])
      setActiveUnitId(unitFullId)
    }
  }

  // 侧边栏二级菜单数据
  const subItems: { id: string; label: string; sub?: string }[] = []
  let subLabel = ''
  if (activeView === 'A') {
    subLabel = activeGradeId ? '单元 · Units' : '年级 · Grades'
    if (activeGradeId) {
      const grade = TEXTBOOK_DATA.grades.find(g => g.id === activeGradeId)
      if (grade) {
        grade.units.forEach(u => subItems.push({ id: `${grade.id}-u${u.num}`, label: `U${u.num}. ${u.title}`, sub: `${u.vocab.length} 词` }))
      }
    } else {
      TEXTBOOK_DATA.grades.forEach(g => subItems.push({ id: g.id, label: g.name, sub: `${g.units.length} 单元` }))
    }
  } else if (activeView === 'B') {
    subLabel = '类别 · Categories'
    const cat = TEXTBOOK_DATA.byCategory
    subItems.push(
      { id: 'vocab', label: '词汇体系', sub: `${cat.vocabulary.length}` },
      { id: 'sentences', label: '句型体系', sub: `${cat.sentences.length}` },
      { id: 'grammar', label: '语法体系', sub: `${cat.grammar.length}` },
      { id: 'phonetics', label: '语音体系', sub: `${cat.phonetics.length}` },
      { id: 'difficulties', label: '难点纵贯', sub: `${cat.difficulties.length}` },
    )
  } else if (activeView === 'C') {
    subLabel = '主题 · Themes'
    VOCABULARY.categories.forEach(c => subItems.push({ id: c.id, label: c.name, sub: `${c.words.length}` }))
  } else if (activeView === 'D') {
    subLabel = activeGradeId ? '单元 · Units' : '年级 · Grades'
    if (activeGradeId) {
      const grade = EX.grades.find(g => g.id === activeGradeId)
      if (grade) {
        grade.units.forEach(u => subItems.push({ id: `${grade.id}-u${u.num}`, label: `U${u.num}. ${u.title}`, sub: `${u.questions.length} 题` }))
      }
    } else {
      EX.grades.forEach(g => subItems.push({ id: g.id, label: g.name, sub: `${g.units.length * 10} 题` }))
    }
  }

  // 子项点击逻辑
  const handleSelectSub = (id: string) => {
    if (!id) {
      if (activeView === 'A' || activeView === 'D') {
        setActiveGradeId(null)
        setActiveUnitId(null)
      } else if (activeView === 'B') setActiveBCatId(null)
      else if (activeView === 'C') setActiveVCatId(null)
      return
    }
    if (activeView === 'A') {
      if (id.startsWith('g') && !id.includes('-u')) {
        setActiveGradeId(id)
        setActiveUnitId(null)
      } else if (id.includes('-u')) {
        const gradeId = id.split('-u')[0]
        setActiveGradeId(gradeId)
        setActiveUnitId(id)
      }
    } else if (activeView === 'B') {
      setActiveBCatId(id)
    } else if (activeView === 'C') {
      setActiveVCatId(id)
    } else if (activeView === 'D') {
      if (id.startsWith('g') && !id.includes('-u')) {
        setActiveGradeId(id)
        setActiveUnitId(null)
      } else if (id.includes('-u')) {
        const gradeId = id.split('-u')[0]
        setActiveGradeId(gradeId)
        setActiveUnitId(id)
      }
    }
  }

  return (
    <div className="min-h-screen">
      {showMobileSidebar && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm" onClick={() => setShowMobileSidebar(false)} />
      )}

      <div className={`fixed left-0 top-0 bottom-0 w-72 z-50 transform transition-transform duration-300 md:hidden ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full'}`} style={{ overflowY: 'auto' }}>
        <Sidebar activeView={activeView} onSwitchView={switchView} activeSubLabel={subLabel} subItems={subItems} onSelectSub={handleSelectSub} />
      </div>

      <div className="hidden md:block">
        <Sidebar activeView={activeView} onSwitchView={switchView} activeSubLabel={subLabel} subItems={subItems} onSelectSub={handleSelectSub} />
      </div>

      <main className="md:ml-72 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-12 md:px-12 md:py-16">
          {/* 移动端菜单 */}
          <button onClick={() => setShowMobileSidebar(true)}
            className="md:hidden mb-6 px-4 py-2 glass rounded-lg text-sm text-[var(--foreground)]">
            ☰ 菜单
          </button>

          {/* Hero */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-[var(--primary)]"></div>
              <span className="label-uppercase text-[var(--primary)]">机构备课素材包 · v2.0</span>
            </div>
            <h1 className="font-serif-display text-3xl md:text-5xl text-gradient-silver leading-tight mb-3">
              天津市武清区
              <br />
              小学英语 4-6 年级
              <br />
              <span className="text-gradient-gold">知识点调研</span>
            </h1>
            <p className="font-serif-display text-base text-[var(--foreground-muted)] leading-relaxed max-w-2xl mb-6">
              人教精通版（三年级起点） · 6 册 36 单元全维度梳理 · 500 词词汇总表 · 360 题配套习题
            </p>
            <div className="glass rounded-lg p-3 text-xs text-[var(--foreground-muted)] leading-relaxed">
              <span className="text-[var(--primary)]">📌</span> {TEXTBOOK_DATA.meta.note}
            </div>
          </header>

          {/* 4 个 tab 切换按钮 + 导出按钮（顶部） */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {([
              { id: 'A', name: '按年级', color: 'var(--view-a)' },
              { id: 'B', name: '知识点', color: 'var(--view-b)' },
              { id: 'C', name: '词汇', color: 'var(--view-c)' },
              { id: 'D', name: '习题', color: 'var(--view-d)' },
            ] as const).map(v => {
              const isActive = activeView === v.id
              return (
                <button key={v.id} onClick={() => switchView(v.id)}
                  className="btn-glow inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all"
                  style={isActive ? { background: `linear-gradient(180deg, ${v.color}30 0%, ${v.color}10 100%)`, borderColor: `${v.color}80` } : {}}>
                  <span className="font-mono-code text-xs font-bold px-1.5 py-0.5 rounded"
                    style={isActive ? { background: v.color, color: '#0a0a0f' } : { background: 'rgba(255,255,255,0.06)', color: 'var(--foreground-muted)' }}>
                    {v.id}
                  </span>
                  <span className={isActive ? 'text-[var(--foreground)]' : 'text-[var(--foreground-muted)]'}>{v.name}</span>
                </button>
              )
            })}
            {/* 导出按钮：仅在视角 D 显示 */}
            {activeView === 'D' && (
              <button
                onClick={() => setExportDialogOpen(true)}
                className="btn-glow inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm ml-auto transition-all"
                style={{ background: 'linear-gradient(180deg, rgba(201, 169, 97, 0.25) 0%, rgba(201, 169, 97, 0.08) 100%)', borderColor: 'rgba(201, 169, 97, 0.6)' }}
              >
                <span className="text-base">⬇</span>
                <span className="text-[var(--foreground)] font-medium">导出习题</span>
                <span className="label-uppercase text-[10px] text-[var(--foreground-muted)] opacity-70">PDF / Word</span>
              </button>
            )}
          </div>

          {/* 当前视角内容 */}
          {activeView === 'A' && (
            <ViewA
              activeGradeId={activeGradeId}
              activeUnitId={activeUnitId}
              onSelectGrade={(id) => { setActiveGradeId(id || null); setActiveUnitId(null) }}
              onSelectUnit={(id) => setActiveUnitId(id || null)}
              onJumpToExercises={jumpToExercises}
            />
          )}
          {activeView === 'B' && (
            <ViewB activeCatId={activeBCatId} onSelectCat={(id) => setActiveBCatId(id || null)} />
          )}
          {activeView === 'C' && (
            <ViewC activeCatId={activeVCatId} onSelectCat={(id) => setActiveVCatId(id || null)} />
          )}
          {activeView === 'D' && (
            <ViewD
              activeGradeId={activeGradeId}
              activeUnitId={activeUnitId}
              onSelectGrade={(id) => { setActiveGradeId(id || null); setActiveUnitId(null) }}
              onSelectUnit={(id) => setActiveUnitId(id || null)}
              showAnswers={showAnswers}
              setShowAnswers={setShowAnswers}
            />
          )}

          <footer className="mt-16 pt-8 border-t border-[var(--glass-border)]">
            <div className="flex items-baseline gap-3 mb-3">
              <div className="w-1 h-3 rounded-full bg-[var(--primary)]"></div>
              <h4 className="font-serif-display text-sm text-[var(--foreground)]">调研说明</h4>
              <span className="label-uppercase text-[10px] text-[var(--foreground-muted)] opacity-60">About</span>
            </div>
            <p className="text-xs text-[var(--foreground-muted)] leading-relaxed max-w-3xl">
              📋 本调研报告基于网络公开教学资源整理。建议结合学校实际使用的纸质课本核对后用于教学设计。
              <br />
              🔄 后续可基于本数据出练习题（按单元/按知识点/按难度），欢迎继续提出需求。
            </p>
          </footer>
        </div>
      </main>

      {/* 导出习题对话框 */}
      <ExportDialog open={exportDialogOpen} onClose={() => setExportDialogOpen(false)} />
    </div>
  )
}
