<div align="center">
  
  ![CPNS-Ready CRM](https://img.shields.io/badge/CPNS-Ready%20CRM-blue?style=for-the-badge&logo=bookstack&logoColor=white)
  
  **A Modern CRM-Style Study Management System for CPNS Exam Preparation**
  
  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

  [Features](#-features) • [Installation](#-installation) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 🎯 Overview

**CPNS-Ready CRM** is a comprehensive study management platform designed specifically for Indonesian Civil Service (CPNS) exam preparation. Built with modern web technologies, it provides a structured 12-week study program with professional CRM-style tracking and analytics.

### Why CPNS-Ready CRM?

- **Structured Learning Path**: Pre-configured 12-week curriculum covering TWK, TIU, TKP, and CAT simulation
- **Professional Interface**: CRM-inspired dashboard with real-time KPI tracking
- **Progress Analytics**: Visual progress monitoring with detailed statistics and insights
- **Flexible & Customizable**: Easily adaptable to different study plans and subjects
- **Offline-First**: LocalStorage persistence with optional database integration

---

## ✨ Features

### 📊 **CRM-Style Dashboard**
- Real-time KPI cards (completed tasks, active weeks, progress %, study streak)
- Overall progress visualization with motivational milestones
- Quick navigation to key sections

### 📅 **Interactive Timeline**
- 12-week structured study program
- Daily task breakdown with checkboxes
- Visual progress indicators per week
- Color-coded monthly phases (Foundation → Deep Learning → Mock Exams)

### 📈 **Progress Tracking**
- Detailed weekly progress statistics
- Completion rate analytics
- Study streak monitoring
- Progress reset functionality

### 🎨 **Modern UI/UX**
- Dark mode support
- Fully responsive design (mobile, tablet, desktop)
- Professional shadcn/ui components
- Smooth animations and transitions

### 💾 **Data Management**
- LocalStorage-based persistence
- Automatic data migration from legacy versions
- Optional SQLite database integration via Prisma ORM

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Database** | [Prisma ORM](https://www.prisma.io/) + SQLite |
| **Charts** | [Recharts](https://recharts.org/) |
| **State Management** | React Hooks + LocalStorage |

---

## 📦 Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** 18.17 or higher
- **npm** or **yarn** or **pnpm**

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/cpns-ready-crm.git
cd cpns-ready-crm

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Database Setup (Optional)

To enable SQLite database:

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Database file will be created at prisma/dev.db
```

---

## 📁 Project Structure

```
cpns-ready-crm/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Home page (dashboard)
│   │   └── globals.css         # Global styles & Tailwind imports
│   ├── components/
│   │   ├── dashboard/          # Feature components
│   │   │   ├── Dashboard.tsx   # Main dashboard view
│   │   │   ├── Timeline.tsx    # Study timeline component
│   │   │   └── Progress.tsx    # Progress tracker
│   │   └── ui/                 # Reusable UI components (shadcn)
│   │       ├── card.tsx
│   │       ├── button.tsx
│   │       └── ...
│   └── lib/                    # Utilities & configurations
│       ├── utils.ts            # Helper functions
│       ├── prisma.ts           # Prisma client singleton
│       └── study-plan.ts       # CPNS study plan data
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── dev.db                  # SQLite database (generated)
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies
```

---

## 📖 Documentation

### Study Plan Structure

The 12-week CPNS preparation program:

| Phase | Weeks | Focus | Subjects |
|-------|-------|-------|----------|
| **Foundation** | 1-4 | Basic concepts | TWK, TIU, TKP, CAT Introduction |
| **Deep Learning** | 5-8 | Intensive practice | Advanced topics, problem-solving |
| **Mock Exams** | 9-12 | Exam simulation | Full tryouts, time management |

Each week contains:
- **7 daily tasks** with specific learning objectives
- **Subject categorization** (TWK/TIU/TKP/CAT/Review)
- **Duration estimates** for time management
- **Completion tracking** with persistent storage

### Customization Guide

#### Modify Study Plan

Edit `src/lib/study-plan.ts`:

```typescript
export const studyPlan = [
  {
    week: 1,
    month: "Bulan 1: Dasar",
    tasks: [
      {
        id: "week1-day1",
        day: 1,
        subject: "Your Custom Subject",
        material: "Your learning material",
        type: "TWK" // or TIU, TKP, CAT, Review
      },
      // ... more tasks
    ]
  },
  // ... more weeks
];
```

#### Customize Styling

Update `tailwind.config.ts` for theme customization:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          // Your custom color palette
        }
      }
    }
  }
}
```

#### Database Schema

Modify `prisma/schema.prisma` for custom data models:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  progress  Progress[]
  createdAt DateTime @default(now())
}

model Progress {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  weekId    Int
  completed Boolean  @default(false)
  // ... more fields
}
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/cpns-ready-crm)

**Manual Deployment:**

```bash
# Push to GitHub
git push origin main

# Import project in Vercel Dashboard
# 1. Go to vercel.com/new
# 2. Import your repository
# 3. Click Deploy

# Your app will be live at: https://your-app.vercel.app
```

### Environment Variables

For production with database:

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use conventional commits
- Write meaningful commit messages
- Add tests for new features
- Update documentation

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Lucide Icons](https://lucide.dev/) for the icon set
- Indonesian CPNS community for feedback and support

---

<div align="center">
  
  **Made with ❤️ for CPNS aspirants**
  
  ⭐ Star this repo if you find it helpful!

</div>
