import { EXERCISES } from './data/exercises'
import { EXERCISES_EXTRA } from './data/exercises_extra'
import type { ExerciseGrade, ExerciseQuestion, ExportOptions } from './exercise-export'

export function getFillBefore(question: Pick<ExerciseQuestion, 'before' | 'answer'>, withAnswers: boolean): string {
  const before = question.before || ''
  const prefix = before.match(/\b([a-z]+)$/i)?.[1]
  // 题库中的 before 可能以 d、Th 等提示字母结尾；答案已经是完整单词。
  if (withAnswers && prefix && prefix.length < question.answer.length && question.answer.toLowerCase().startsWith(prefix.toLowerCase())) {
    return before.slice(0, -prefix.length)
  }
  return before
}

export function getMergedExerciseGrades(): ExerciseGrade[] {
  return EXERCISES.grades.map(grade => ({
    ...grade,
    version: grade.version || '人教精通版（三年级起点）',
    units: grade.units.map(unit => ({
      ...unit,
      questions: [...unit.questions, ...(EXERCISES_EXTRA[`${grade.id}-u${unit.num}`] || [])],
    })),
  }))
}

export function selectExerciseGrades(grades: ExerciseGrade[], scope: string[]): ExerciseGrade[] {
  if (scope.some(id => !grades.some(grade => grade.id === id))) {
    throw new Error('导出范围包含未知年级，请重新选择')
  }
  const selected = scope.length ? grades.filter(grade => scope.includes(grade.id)) : grades
  if (!selected.length) throw new Error('导出范围内没有习题')
  return selected
}

export function getExerciseExportInfo(grades: ExerciseGrade[], options: ExportOptions) {
  const selected = selectExerciseGrades(grades, options.scope)
  const totalUnits = selected.reduce((sum, grade) => sum + grade.units.length, 0)
  const totalQuestions = selected.reduce((sum, grade) => sum + grade.units.reduce((s, unit) => s + unit.questions.length, 0), 0)
  const names = selected.map(grade => grade.name).join('+')
  const scopeText = options.scope.length ? names : `全部 ${selected.length} 册 ${totalUnits} 单元`
  const answerTag = options.withAnswers ? '含答案' : '无答案'
  return {
    grades: selected,
    totalUnits,
    totalQuestions,
    scopeText,
    fileName: `小学英语配套习题集_${options.scope.length ? names : '全部'}_${answerTag}.${options.format}`,
  }
}
