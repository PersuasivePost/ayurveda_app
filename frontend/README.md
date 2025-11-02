# Ayurvedic Wellness App - React + Vite

This application has been converted from Next.js to a standard React app using Vite and React Router DOM.

## ✅ Conversion Complete

The application has been successfully migrated from Next.js to React with the following changes:

### Changes Made:

1. **Build Tool**: Migrated from Next.js to Vite
2. **Routing**: Replaced Next.js App Router with React Router DOM v6
3. **Project Structure**: 
   - Moved from `app/` directory to standard `src/` structure
   - Created `src/pages/` for all route components
   - Maintained `components/` and `lib/` directories
4. **Configuration**: 
   - Updated `package.json` with Vite and React Router dependencies
   - Created `vite.config.ts` for Vite configuration
   - Updated `tsconfig.json` for Vite/React
   - Created `index.html` as entry point
5. **Components**: 
   - Replaced all `import Link from "next/link"` with `import { Link } from "react-router-dom"`
   - Changed all `href=` props to `to=` for React Router
   - Replaced `usePathname()` from Next.js with `useLocation()` from React Router
   - Created custom `ThemeProvider` to replace `next-themes`
   - Removed all `"use client"` directives
   - Removed Next.js specific imports like `next/navigation`, `next/font`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000` (or the next available port).

### Build for Production

```bash
npm run build
```

This will create an optimized production build in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
v0-ayurvedic-app-frontend/
├── src/
│   ├── App.tsx                 # Main app component with routes
│   ├── main.tsx                # Entry point
│   ├── index.css               # Global styles
│   └── pages/                  # All page components
│       ├── Home.tsx
│       ├── About.tsx
│       ├── Login.tsx
│       ├── Signup.tsx
│       ├── Quiz.tsx
│       ├── Doctors.tsx
│       └── ... (other pages)
├── components/                 # Reusable components
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── page-layout.tsx
│   ├── forms/
│   ├── dashboard/
│   └── ui/                     # UI components
├── lib/                        # Utility functions
├── public/                     # Static assets
├── index.html                  # HTML entry point
├── vite.config.ts             # Vite configuration
└── package.json               # Dependencies

```

## 🛠️ Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM v6** - Client-side routing
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icons

## 📝 Available Routes

- `/` - Home page
- `/about` - About page
- `/login` - Login page
- `/signup` - Signup page
- `/quiz` - Body type quiz
- `/quiz/start` - Start quiz
- `/doctors` - Browse doctors
- `/find-doctors` - Find doctors by location
- `/booking/:doctorId` - Book appointment
- `/products` - Browse products
- `/learn-ayurveda` - Learn about Ayurveda
- `/quick-remedies` - Quick remedies
- `/dashboard` - User dashboard
- `/dashboard/appointments` - User appointments
- `/dashboard/profile` - User profile
- `/doctor/dashboard` - Doctor dashboard
- `/admin/dashboard` - Admin dashboard
- `/admin/users` - User management
- `/admin/content` - Content management

## ⚠️ Notes

- The old `app/` directory from Next.js is kept for reference but not used
- All components now use React Router's `Link` and `useLocation` instead of Next.js equivalents
- Theme switching now uses a custom implementation instead of `next-themes`
- No server-side rendering - this is now a pure client-side app

## 📄 License

This project was originally built with v0.app:

**[https://v0.app/chat/ityFEFkatxS](https://v0.app/chat/ityFEFkatxS)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository