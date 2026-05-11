'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, RotateCcw } from 'lucide-react'
import { StudyWeek, defaultStudyPlan } from '@/lib/study-plan'

export default function Progress() {
  const [studyPlan, setStudyPlan] = useState<StudyWeek[]>(defaultStudyPlan)

  useEffect(() => {
    loadProgress()
  }, [])

  const loadProgress = useCallback(() => {
    try {
      const saved = localStorage.getItem('cpns-ready-progress')
      if (saved) {
        const progressData = JSON.parse(saved)
        const updatedPlan = studyPlan.map((week, wIdx) => ({
          ...week,
          days: week.days.map((day, dIdx) => ({
            ...day,
            completed: progressData[`${wIdx}-${dIdx}`] || false
          }))
        }))
        setStudyPlan(updatedPlan)
      }
    } catch (e) {
      console.error('Error loading progress:', e)
    }
  }, [studyPlan])

  const getTotalCompleted = () => {
    let count = 0
    studyPlan.forEach(w => w.days.forEach(d => { if (d.completed) count++ }))
    return count
  }

  const getTotalTasks = () => {
    return 12 * 7
  }

  const getOverallPercentage = () => {
    return Math.round((getTotalCompleted() / getTotalTasks()) * 100)
  }

  const getWeekPercentage = (weekIndex: number) => {
    const week = studyPlan[weekIndex]
    const completed = week.days.filter(d => d.completed).length
    return Math.round((completed / 7) * 100)
  }

  const getWeekCompletedCount = (weekIndex: number) => {
    return studyPlan[weekIndex].days.filter(d => d.completed).length
  }

  const getActiveWeeks = () => {
    let count = 0
    studyPlan.forEach(w => {
      if (w.days.some(d => d.completed)) count++
    })
    return count
  }

  const resetProgress = () => {
    if (confirm('Apakah Anda yakin ingin mereset semua progress? Data yang sudah dicentang akan hilang dan tidak bisa dikembalikan.')) {
      const resetPlan = studyPlan.map(week => ({
        ...week,
        days: week.days.map(day => ({ ...day, completed: false }))
      }))
      setStudyPlan(resetPlan)
      localStorage.removeItem('cpns-ready-progress')
    }
  }

  const getStreak = () => {
    let streak = 0
    const allDays: { completed: boolean }[] = []
    studyPlan.forEach(w => w.days.forEach(d => allDays.push({ completed: d.completed })))
    for (let i = allDays.length - 1; i >= 0; i--) {
      if (allDays[i].completed) streak++
      else break
    }
    return streak
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Progress Tracker</h2>
        <Button
          variant="destructive"
          size="sm"
          onClick={resetProgress}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Progress
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Selesai</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalCompleted()}</div>
            <p className="text-xs text-muted-foreground">dari {getTotalTasks()} tugas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Progress Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getOverallPercentage()}%</div>
            <p className="text-xs text-muted-foreground">keseluruhan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Minggu Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getActiveWeeks()}</div>
            <p className="text-xs text-muted-foreground">dari 12 minggu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Streak Hari</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStreak()}</div>
            <p className="text-xs text-muted-foreground">hari berturut-turut</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress Bars */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Progress per Minggu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {studyPlan.map((weekData, index) => {
              const pct = getWeekPercentage(index)
              const completed = getWeekCompletedCount(index)
              const barColor = pct === 100 ? 'from-green-400 to-green-600'
                : pct >= 50 ? 'from-blue-400 to-blue-600'
                : pct > 0 ? 'from-yellow-400 to-orange-500'
                : 'from-gray-300 to-gray-400'

              return (
                <div key={weekData.week} className="flex items-center gap-3">
                  <span className="text-xs font-semibold w-16 text-right">Mg {weekData.week}</span>
                  <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${barColor} rounded-full transition-all duration-600 ease-out`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold w-12">{completed}/7</span>
                  <span className={`text-xs font-semibold w-10 text-right ${
                    pct === 100 ? 'text-green-600 dark:text-green-400' : 'text-gray-500'
                  }`}>
                    {pct}%
                  </span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Progress Keseluruhan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-4"
              style={{ width: `${getOverallPercentage()}%` }}
            >
              <span className="text-white text-xs font-bold drop-shadow-md">
                {getOverallPercentage()}%
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            {getOverallPercentage() === 0 && "Mulai perjalanan belajarmu hari ini! 🚀"}
            {getOverallPercentage() > 0 && getOverallPercentage() < 30 && "Awal yang bagus! Teruskan langkahmu! 💪"}
            {getOverallPercentage() >= 30 && getOverallPercentage() < 60 && "Kamu di jalur yang tepat! Tetap konsisten! 🎯"}
            {getOverallPercentage() >= 60 && getOverallPercentage() < 90 && "Hampir sampai! Jangan menyerah sekarang! 🔥"}
            {getOverallPercentage() >= 90 && getOverallPercentage() < 100 && "Sedikit lagi menuju 100%! Kamu luar biasa! 🌟"}
            {getOverallPercentage() === 100 && "🎉 SELAMAT! Semua tugas selesai! Saatnya tryout final! 🏆"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
