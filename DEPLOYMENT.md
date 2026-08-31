# Hyperion Digital: Deployment & Architecture Guide

A Next.js, Three.js (React Three Fiber), GSAP, and Prisma-powered Luxury Portfolio and Admin CMS for Digital Marketing Agencies.

---

## 🚀 Quick Start (Local Development)

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Initialize Database & Seed Data**:
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   - **Public Portfolio**: [http://localhost:3000](http://localhost:3000)
   - **Admin CMS Portal**: [http://localhost:3000/admin](http://localhost:3000/admin) (Default Passcode: `admin1234`)

---

## 🌐 Deploying to Vercel & Production

### 1. Database Configuration
By default, the local app uses SQLite (`file:./dev.db`). For cloud deployment on Vercel:

1. Create a serverless PostgreSQL or LibSQL database (e.g., [Neon.tech](https://neon.tech), [Supabase](https://supabase.com), [Turso](https://turso.tech), or [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)).
2. Update `prisma/schema.prisma` datasource provider from `"sqlite"` to `"postgresql"` (or `"postgres"`):
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Set the environment variables in your Vercel Project Settings:
   - `DATABASE_URL`: Your production database connection string.
   - `ADMIN_PASSCODE`: Your secure admin password for `/admin`.
   - `NEXT_PUBLIC_APP_URL`: Your custom domain (e.g. `https://youragency.com`).

4. Deploy directly with Git push or Vercel CLI:
   ```bash
   vercel --prod
   ```

---

## 🎨 Blender 3D Workflow & Asset Optimization

The site is built with **Three.js** and **React Three Fiber (R3F)** to render interactive 3D elements, procedural meshes, and imported 3D models.

### Recommended Pipeline for Blender:
1. **Modeling & Lighting**:
   - Create your 3D branding, kinetic typography, or product meshes in Blender.
   - Keep polygon counts optimized (aim for < 30k vertices for web performance).
2. **Exporting from Blender**:
   - Export as **`glTF Binary (.glb)`**.
   - Enable **Mesh Compression (Draco)** or use `@gltf-transform/cli`:
     ```bash
     npx gltf-transform optimize input.glb public/models/output.glb --draco.compress
     ```
3. **Loading in React Three Fiber**:
   - Use `@react-three/drei`'s `useGLTF`:
     ```tsx
     import { useGLTF } from "@react-three/drei";

     export function Model() {
       const { scene } = useGLTF("/models/output.glb");
       return <primitive object={scene} scale={1.5} />;
     }

     useGLTF.preload("/models/output.glb");
     ```

---

## 🔒 Security & Admin Access
- The Admin CMS is available at `/admin`.
- Authentication is verified against `ADMIN_PASSCODE` in `.env`.
- Real-time synchronization updates the public portfolio immediately upon saving.
