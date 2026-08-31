# Nord Portfolio

A luxury, modern web portfolio and Admin CMS built with Next.js, Three.js (React Three Fiber), GSAP, TailwindCSS, and Prisma.

## 🚀 Features

- **Luxury Design & 3D Visuals**: Three.js (React Three Fiber) interactive 3D components, procedural meshes, particle fields, and smooth custom cursor animations.
- **Dynamic Content & Video Showcase**: Interactive portfolio sectors, video showcase player, case studies, and testimonial carousels.
- **Integrated Admin CMS**: Full admin dashboard (`/admin`) to manage brand settings, videos, case studies, client inquiries, packages, and praises in real-time.
- **Modern Tech Stack**: Next.js App Router, TypeScript, TailwindCSS, Framer Motion, GSAP, and Prisma ORM.

---

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js (v18 or newer recommended)
- npm or yarn / pnpm

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Hariprasadh-P/Nord-Portfolio.git
cd Nord-Portfolio

# Install dependencies
npm install
```

### 3. Environment Variables
Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```
Default `.env` configuration:
```env
DATABASE_URL="file:./dev.db"
ADMIN_PASSCODE="admin1234"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Setup
```bash
# Generate Prisma Client & push database schema
npx prisma db push

# Seed initial showcase data
npx tsx prisma/seed.ts
```

### 5. Run Development Server
```bash
npm run dev
```

- **Portfolio**: [http://localhost:3000](http://localhost:3000)
- **Admin Portal**: [http://localhost:3000/admin](http://localhost:3000/admin) (Default passcode: `admin1234`)

---

## 📦 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to Vercel and configuring cloud databases (PostgreSQL, Supabase, Neon, Turso).
