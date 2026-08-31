# Nord Portfolio

A luxury, modern web portfolio and Admin CMS built with Next.js, Three.js (React Three Fiber), GSAP, TailwindCSS, and Prisma.

## 🚀 Features

- **Luxury Design & 3D Visuals**: Three.js (React Three Fiber) interactive 3D components, procedural meshes, particle fields, and smooth custom cursor animations.
- **Dynamic Content & Video Showcase**: Interactive portfolio sectors, video showcase player, case studies, and testimonial carousels.
- **Isolated Studio Admin CMS**: A dedicated, fully isolated Admin application (`Nord-Admin` on port `3001`) with passkey authentication to manage agency settings, videos, services, case studies, packages, and inquiries.
- **Modern Tech Stack**: Next.js App Router, TypeScript, TailwindCSS, Framer Motion, GSAP, and Prisma ORM.

---

## 🏗️ Architecture & Database

Both applications run independently and share a **common SQLite database** managed via Prisma:
- **Nord-Portfolio** (`http://localhost:3000`): The public-facing client portfolio app.
- **Nord-Admin** (`http://localhost:3001`): The isolated studio management portal.
- **Common Database**: SQLite database file at `Nord-Portfolio/prisma/dev.db`.

---

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js (v18 or newer recommended)
- npm or yarn / pnpm

### 2. Environment Setup
In `Nord-Portfolio/.env`:
```env
DATABASE_URL="file:./dev.db"
ADMIN_PASSCODE="admin1234"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_ADMIN_URL="http://localhost:3001"
```

In `Nord-Admin/.env`:
```env
DATABASE_URL="file:../Nord-Portfolio/prisma/dev.db"
ADMIN_PASSCODE="admin1234"
NEXT_PUBLIC_PORTFOLIO_URL="http://localhost:3000"
```

### 3. Database Setup
```bash
# In Nord-Portfolio directory:
npx prisma db push
npx tsx prisma/seed.ts
```

### 4. Running the Applications
Run both applications in separate terminals:

**Terminal 1 (Portfolio):**
```bash
cd Nord-Portfolio
npm run dev
# Running on http://localhost:3000
```

**Terminal 2 (Admin):**
```bash
cd Nord-Admin
npm run dev
# Running on http://localhost:3001
```

- **Portfolio**: [http://localhost:3000](http://localhost:3000)
- **Admin Portal**: [http://localhost:3001](http://localhost:3001) (Passcode: `admin1234`)

---

## 📦 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to Vercel and configuring cloud databases (PostgreSQL, Supabase, Neon, Turso).
