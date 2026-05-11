'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { StudyWeek, defaultStudyPlan } from '@/lib/study-plan'

export default function Timeline() {
  const [selectedWeek, setSelectedWeek] = useState(0)
  const [studyPlan, setStudyPlan] = useState<StudyWeek[]>(defaultStudyPlan)

  const getWeekProgress = (weekIndex: number) => {
    const week = studyPlan[weekIndex]
    const completed = week.days.filter(d => d.completed).length
    return Math.round((completed / 7) * 100)
  }

  const getWeekCompletedCount = (weekIndex: number) => {
    return studyPlan[weekIndex].days.filter(d => d.completed).length
  }

  const monthColors = [
    'border-blue-400 bg-blue-50 dark:bg-blue-900/20',
    'border-purple-400 bg-purple-50 dark:bg-purple-900/20',
    'border-green-400 bg-green-50 dark:bg-green-900/20',
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Timeline 12 Minggu</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSelectedWeek(Math.max(0, selectedWeek - 1))}
            disabled={selectedWeek === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSelectedWeek(Math.min(11, selectedWeek + 1))}
            disabled={selectedWeek === 11}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Month Labels */}
      <div className="flex justify-between gap-2">
        <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
          Bulan 1: Dasar Materi
        </span>
        <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
          Bulan 2: Pendalaman
        </span>
        <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
          Bulan 3: Tryout
        </span>
      </div>

      {/* Timeline Cards */}
      <div className="flex gap-3 overflow-x-auto pb-4">
        {studyPlan.map((weekData, index) => {
          const weekPct = getWeekProgress(index)
          const monthIndex = weekData.month - 1
          const borderColor = monthColors[monthIndex]
          const isActive = index === selectedWeek

          return (
            <div
              key={weekData.week}
              className={`flex-shrink-0 w-44 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${borderColor} ${
                isActive ? 'ring-4 ring-blue-500 shadow-xl scale-105' : 'shadow-md hover:shadow-lg'
              }`}
              onClick={() => setSelectedWeek(index)}
            >
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">
                Minggu {weekData.week}
              </div>
              <div className="text-sm font-semibold leading-tight mb-2">
                {weekData.focus}
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mb-1">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${weekPct}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {weekPct}% • {getWeekCompletedCount(index)}/7
              </div>
              {isActive && (
                <div className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                  📍 Dipilih
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Selected Week Details */}
      <Card>
        <CardHeader>
          <CardTitle>Minggu {studyPlan[selectedWeek].week} - {studyPlan[selectedWeek].focus}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {studyPlan[selectedWeek].days.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`p-4 rounded-lg border-2 transition-all ${
                  day.completed
                    ? 'border-green-400 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        {day.day}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                        {day.subjectType}
                      </span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{day.material}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{day.target}</p>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      ⏱️ {day.duration}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={day.completed}
                    onChange={(e) => {
                      const updatedPlan = [...studyPlan]
                      updatedPlan[selectedWeek].days[dayIndex].completed = e.target.checked
                      setStudyPlan(updatedPlan)
                      // Save to localStorage
                      const progress: Record<string, boolean> = {}
                      updatedPlan.forEach((w, wIdx) => {
                        w.days.forEach((d, dIdx) => {
                          if (d.completed) {
                            progress[`${wIdx}-${dIdx}`] = true
                          }
                        })
                      })
                      localStorage.setItem('cpns-ready-progress', JSON.stringify(progress))
                    }}
                    className="w-6 h-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
