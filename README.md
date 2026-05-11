# CPNS-Ready CRM

Modern CRM-style CPNS study planner and tracker built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **CRM-Style Dashboard**: Professional interface with KPI cards and statistics
- **12-Week Study Plan**: Structured 12-week CPNS preparation program
- **Progress Tracking**: Real-time progress monitoring with visual indicators
- **Timeline View**: Interactive timeline to manage weekly study plans
- **Dark Mode**: Built-in dark mode support
- **Responsive Design**: Fully responsive for mobile and desktop
- **Data Persistence**: LocalStorage-based progress tracking (with migration support)
- **SQLite Database**: Prisma ORM with SQLite for future database integration

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: SQLite with Prisma ORM (configured, optional)
- **Icons**: Lucide React
- **Charts**: Recharts (for future analytics)

## Project Structure

```
cpns-ready-crm/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── dashboard/      # Dashboard components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Timeline.tsx
│   │   │   └── Progress.tsx
│   │   └── ui/             # UI components (shadcn/ui)
│   │       ├── card.tsx
│   │       └── button.tsx
│   └── lib/                # Utility functions
│       ├── utils.ts
│       ├── prisma.ts
│       └── study-plan.ts
├── prisma/                 # Prisma schema
│   └── schema.prisma
└── public/                 # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Database Setup (Optional)

The application currently uses localStorage for data persistence. To use SQLite database:

1. Generate Prisma client:
```bash
npx prisma generate
```

2. Run migrations:
```bash
npx prisma migrate dev --name init
```

3. The database file will be created at `prisma/dev.db`

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

Note: For production with SQLite, consider using a cloud database like PostgreSQL or MySQL.

## Features Overview

### Dashboard
- Overview statistics (completed tasks, active weeks, progress percentage, streak)
- Overall progress bar with motivational messages
- Quick action cards to navigate to Timeline and Progress sections

### Timeline
- 12-week interactive timeline
- Weekly study plan cards with progress indicators
- Task completion tracking with checkboxes
- Month-based color coding (Bulan 1: Dasar, Bulan 2: Pendalaman, Bulan 3: Tryout)

### Progress Tracker
- Detailed progress statistics
- Weekly progress bars
- Reset progress functionality
- Visual progress indicators

## Study Plan Structure

The 12-week program covers:
- **Week 1-4**: Basic material (TWK, TIU, TKP, CAT introduction)
- **Week 5-8**: Deep learning and intensive practice
- **Week 9-12**: Tryouts and final evaluation

Each week includes 7 daily tasks with:
- Subject material
- Learning objectives
- Duration estimates
- Subject type (TWK, TIU, TKP, CAT, Review)

## Data Migration

The application automatically migrates progress data from the original HTML version by reading from `cpns-ready-progress` localStorage key.

## Customization

### Study Plan
Modify `src/lib/study-plan.ts` to customize the study plan structure, subjects, and materials.

### Styling
Update `tailwind.config.ts` and `src/app/globals.css` for custom styling.

### Database Schema
Modify `prisma/schema.prisma` for database schema changes.

## Future Enhancements

- User authentication system
- Cloud database integration
- Advanced analytics and charts
- Export/import functionality
- Mobile app version
- Collaboration features

## License

This project is created for CPNS preparation purposes.

## Support

For issues and questions, please refer to the project documentation or create an issue in the repository.
