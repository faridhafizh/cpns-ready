import { render, screen, fireEvent } from '@testing-library/react'
import Dashboard from '../Dashboard'

// Mock the Timeline and Progress components
jest.mock('../Timeline', () => {
  return function MockTimeline() {
    return <div data-testid="timeline-component">Timeline Component</div>
  }
})

jest.mock('../Progress', () => {
  return function MockProgress() {
    return <div data-testid="progress-component">Progress Component</div>
  }
})

describe('Dashboard Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    // Reset all mocks
    jest.clearAllMocks()
  })

  it('renders dashboard view by default', () => {
    render(<Dashboard />)
    
    // Check if main title is present
    expect(screen.getByText('CPNS-Ready CRM')).toBeInTheDocument()
    expect(screen.getByText('Study Planner & Tracker')).toBeInTheDocument()
    
    // Check if navigation buttons are present
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Timeline')).toBeInTheDocument()
    expect(screen.getByText('Progress')).toBeInTheDocument()
  })

  it('switches to timeline view when Timeline button is clicked', () => {
    render(<Dashboard />)
    
    const timelineButton = screen.getByText('Timeline')
    fireEvent.click(timelineButton)
    
    expect(screen.getByTestId('timeline-component')).toBeInTheDocument()
  })

  it('switches to progress view when Progress button is clicked', () => {
    render(<Dashboard />)
    
    const progressButton = screen.getByText('Progress')
    fireEvent.click(progressButton)
    
    expect(screen.getByTestId('progress-component')).toBeInTheDocument()
  })

  it('displays welcome message in dashboard view', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('Selamat Datang! 👋')).toBeInTheDocument()
    expect(screen.getByText('Pantau progres persiapan CPNS-mu secara real-time')).toBeInTheDocument()
  })

  it('shows stats cards in dashboard view', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('Tugas Selesai')).toBeInTheDocument()
    expect(screen.getByText('Minggu Aktif')).toBeInTheDocument()
    expect(screen.getByText('Progress Total')).toBeInTheDocument()
    expect(screen.getByText('Streak Hari')).toBeInTheDocument()
  })

  it('toggles dark mode when moon/sun icon is clicked', () => {
    render(<Dashboard />)
    
    const darkModeButton = screen.getByRole('button', { name: /🌙|☀️/ })
    expect(darkModeButton).toBeInTheDocument()
    
    // Check if localStorage is called when toggling
    fireEvent.click(darkModeButton)
    expect(localStorage.setItem).toHaveBeenCalledWith('darkMode', 'true')
  })

  it('loads progress from localStorage on mount', () => {
    // Mock localStorage data
    const mockProgress = {
      '0-0': true,
      '0-1': true,
      '1-0': false
    }
    localStorage.setItem('cpns-ready-progress', JSON.stringify(mockProgress))
    
    render(<Dashboard />)
    
    expect(localStorage.getItem).toHaveBeenCalledWith('cpns-ready-progress')
  })

  it('displays quick action cards', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('Timeline 12 Minggu')).toBeInTheDocument()
    expect(screen.getByText('Progress Tracker')).toBeInTheDocument()
    expect(screen.getByText('Buka Timeline')).toBeInTheDocument()
    expect(screen.getByText('Buka Progress')).toBeInTheDocument()
  })
})
