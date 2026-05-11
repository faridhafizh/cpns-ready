'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Target, TrendingUp, Calendar, CheckCircle, Clock, Award, LayoutDashboard, BarChart3 } from 'lucide-react'
import Timeline from './Timeline'
import Progress from './Progress'

type View = 'dashboard' | 'timeline' | 'progress'

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<View>('dashboard')
  const [currentWeek, setCurrentWeek] = useState(1)
  const [darkMode, setDarkMode] = useState(false)
  const [stats, setStats] = useState({
    completedTasks: 0,
    totalTasks: 84,
    activeWeeks: 0,
    overallProgress: 0,
    streak: 0
  })

  useEffect(() => {
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedDarkMode)
    if (savedDarkMode) {
      document.documentElement.classList.add('dark')
    }

    // Load progress from localStorage (migration from old app)
    loadProgress()
  }, [])

  const loadProgress = () => {
    try {
      const saved = localStorage.getItem('cpns-ready-progress')
      if (saved) {
        const progressData = JSON.parse(saved)
        const completedCount = Object.keys(progressData).length
        setStats(prev => ({
          ...prev,
          completedTasks: completedCount,
          overallProgress: Math.round((completedCount / 84) * 100),
          activeWeeks: Math.ceil(completedCount / 7)
        }))
      }
    } catch (e) {
      console.error('Error loading progress:', e)
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('darkMode', (!darkMode).toString())
  }

  const quotes = [
    "Orang sukses adalah orang yang melakukan kebiasaan kecil setiap hari menuju tujuan besarnya.",
    "Jangan berhenti ketika lelah. Berhentilah ketika selesai.",
    "Kesuksesan adalah hasil dari persiapan, kerja keras, dan belajar dari kegagalan.",
    "Mulailah dari mana kamu berada, gunakan apa yang kamu punya, lakukan apa yang kamu bisa."
  ]
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  const renderContent = () => {
    switch (currentView) {
      case 'timeline':
        return <Timeline />
      case 'progress':
        return <Progress />
      default:
        return (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Tugas Selesai</CardTitle>
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.completedTasks}</div>
                  <p className="text-xs text-muted-foreground">dari {stats.totalTasks} tugas</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Minggu Aktif</CardTitle>
                  <Calendar className="h-5 w-5 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeWeeks}</div>
                  <p className="text-xs text-muted-foreground">dari 12 minggu</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Progress Total</CardTitle>
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.overallProgress}%</div>
                  <p className="text-xs text-muted-foreground">keseluruhan</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Streak Hari</CardTitle>
                  <Award className="h-5 w-5 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.streak}</div>
                  <p className="text-xs text-muted-foreground">hari berturut-turut</p>
                </CardContent>
              </Card>
            </div>

            {/* Progress Bar */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Progress Keseluruhan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${stats.overallProgress}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-3 text-center">
                  {stats.overallProgress === 0 && "Mulai perjalanan belajarmu hari ini! 🚀"}
                  {stats.overallProgress > 0 && stats.overallProgress < 30 && "Awal yang bagus! Teruskan langkahmu! 💪"}
                  {stats.overallProgress >= 30 && stats.overallProgress < 60 && "Kamu di jalur yang tepat! Tetap konsisten! 🎯"}
                  {stats.overallProgress >= 60 && stats.overallProgress < 90 && "Hampir sampai! Jangan menyerah sekarang! 🔥"}
                  {stats.overallProgress >= 90 && "Sedikit lagi menuju 100%! Kamu luar biasa! 🌟"}
                </p>
              </CardContent>
            </Card>

            {/* Quote Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-950/50 dark:to-emerald-950/50 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-200 italic mb-3">
                    &ldquo;{randomQuote}&rdquo;
                  </p>
                  <p className="text-sm text-muted-foreground">— Motivasi CPNS</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView('timeline')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    Timeline 12 Minggu
                  </CardTitle>
                  <CardDescription>Lihat dan kelola rencana belajar per minggu</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Buka Timeline</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView('progress')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-emerald-500" />
                    Progress Tracker
                  </CardTitle>
                  <CardDescription>Lihat detail progress dan statistik belajar</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="secondary">Buka Progress</Button>
                </CardContent>
              </Card>
            </div>
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                CPNS-Ready CRM
              </h1>
              <p className="text-xs text-muted-foreground">Study Planner & Tracker</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={currentView === 'dashboard' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentView('dashboard')}
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant={currentView === 'timeline' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentView('timeline')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Timeline
            </Button>
            <Button
              variant={currentView === 'progress' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentView('progress')}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Progress
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleDarkMode}
              className="ml-2"
            >
              {darkMode ? <span className="text-lg">☀️</span> : <span className="text-lg">🌙</span>}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {currentView === 'dashboard' && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Selamat Datang! 👋</h2>
            <p className="text-muted-foreground">Pantau progres persiapan CPNS-mu secara real-time</p>
          </div>
        )}
        {renderContent()}
      </main>
    </div>
  )
}
