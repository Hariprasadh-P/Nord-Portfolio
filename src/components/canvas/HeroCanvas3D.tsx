"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Compass, Film, Package, Info, Mail, ArrowUpRight } from "lucide-react";

interface CompassPointProps {
  bearing: string;
  label: string;
  targetId: string;
  icon: React.ReactNode;
  position: [number, number, number];
}

function CompassPointBadge({ bearing, label, targetId, icon, position }: CompassPointProps) {
  const [hovered, setHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Float speed={1.8} rotationIntensity={0.08} floatIntensity={0.25}>
      <group position={position}>
        <Html distanceFactor={6.8} position={[0, 0, 0]} transform center>
          <button
            onClick={handleClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`group cursor-pointer pointer-events-auto select-none flex items-center gap-2.5 rounded-2xl px-4 py-2 backdrop-blur-xl transition-all duration-300 ${
              hovered
                ? "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 text-white shadow-xl shadow-purple-500/30 scale-110 border-purple-400"
                : "bg-white/90 text-slate-800 border-purple-200/90 shadow-md hover:border-purple-400 hover:shadow-lg"
            } border`}
          >
            <div
              className={`h-5 w-5 rounded-lg flex items-center justify-center transition-colors ${
                hovered ? "bg-white text-purple-700" : "bg-purple-100 text-purple-600"
              }`}
            >
              {icon}
            </div>

            <div className="flex flex-col text-left">
              <span className={`text-[9px] font-mono tracking-widest uppercase font-semibold ${hovered ? "text-purple-100" : "text-purple-600"}`}>
                {bearing}
              </span>
              <span className="font-display font-bold text-xs tracking-wide whitespace-nowrap flex items-center gap-1">
                {label}
                <ArrowUpRight className={`h-3 w-3 transition-transform ${hovered ? "translate-x-0.5 -translate-y-0.5" : "text-purple-500"}`} />
              </span>
            </div>
          </button>
        </Html>
      </group>
    </Float>
  );
}

// Construct a 3D 8-point compass star mesh with Orchid Violet against Soft Lilac background
function CompassRose({ scrollProgress }: { scrollProgress: number }) {
  const compassGroupRef = useRef<THREE.Group>(null!);
  const starRef = useRef<THREE.Group>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);

  const handlePointClick = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "auto";
  };

  // Create geometry for cardinal star needle
  const { cardinalGeo, diagonalGeo } = useMemo(() => {
    const cardGeo = new THREE.ConeGeometry(0.32, 2.2, 4);
    cardGeo.rotateX(Math.PI / 2);

    const diagGeo = new THREE.ConeGeometry(0.24, 1.4, 4);
    diagGeo.rotateX(Math.PI / 2);

    return { cardinalGeo: cardGeo, diagonalGeo: diagGeo };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const { pointer } = state;

    if (compassGroupRef.current) {
      const targetRotY = pointer.x * 0.5 + Math.sin(t * 0.3) * 0.1;
      const targetRotX = -pointer.y * 0.4 + Math.cos(t * 0.4) * 0.08;
      
      compassGroupRef.current.rotation.y = THREE.MathUtils.damp(
        compassGroupRef.current.rotation.y,
        targetRotY,
        4,
        delta
      );
      compassGroupRef.current.rotation.x = THREE.MathUtils.damp(
        compassGroupRef.current.rotation.x,
        targetRotX,
        4,
        delta
      );

      const targetScale = Math.max(0.85, 1 - scrollProgress * 0.25);
      compassGroupRef.current.scale.setScalar(
        THREE.MathUtils.damp(compassGroupRef.current.scale.x, targetScale, 3, delta)
      );
    }

    if (starRef.current) {
      starRef.current.rotation.z += delta * (0.08 + scrollProgress * 0.3);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z -= delta * (0.06 + scrollProgress * 0.2);
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.15;
      ring2Ref.current.rotation.x = Math.sin(t * 0.5) * 0.2 + scrollProgress * 0.5;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * 0.03;
    }
  });

  return (
    <group ref={compassGroupRef} position={[0, 0, 0]}>
      {/* 3D 8-Point Compass Star */}
      <group ref={starRef}>
        {/* NORTH POINT: Vivid Orchid Purple */}
        <mesh
          position={[0, 1.1, 0]}
          geometry={cardinalGeo}
          onClick={() => handlePointClick("showreel")}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <meshStandardMaterial
            color="#A855F7"
            emissive="#9333EA"
            emissiveIntensity={0.65}
            roughness={0.15}
            metalness={0.92}
          />
        </mesh>

        {/* SOUTH POINT: Orchid Fuchsia */}
        <mesh
          position={[0, -1.1, 0]}
          rotation={[0, 0, Math.PI]}
          geometry={cardinalGeo}
          onClick={() => handlePointClick("about")}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <meshStandardMaterial
            color="#C084FC"
            emissive="#A855F7"
            emissiveIntensity={0.55}
            roughness={0.18}
            metalness={0.9}
          />
        </mesh>

        {/* EAST POINT: Electric Violet */}
        <mesh
          position={[1.1, 0, 0]}
          rotation={[0, 0, -Math.PI / 2]}
          geometry={cardinalGeo}
          onClick={() => handlePointClick("packages")}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <meshStandardMaterial
            color="#9333EA"
            emissive="#7E22CE"
            emissiveIntensity={0.6}
            roughness={0.16}
            metalness={0.92}
          />
        </mesh>

        {/* WEST POINT: Electric Violet */}
        <mesh
          position={[-1.1, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
          geometry={cardinalGeo}
          onClick={() => handlePointClick("contact")}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <meshStandardMaterial
            color="#9333EA"
            emissive="#7E22CE"
            emissiveIntensity={0.6}
            roughness={0.16}
            metalness={0.92}
          />
        </mesh>

        {/* Diagonal Points (NE, NW, SE, SW): Soft Lilac Chrome */}
        <mesh position={[0.7, 0.7, 0]} rotation={[0, 0, -Math.PI / 4]} geometry={diagonalGeo}>
          <meshStandardMaterial
            color="#D8B4FE"
            emissive="#C084FC"
            emissiveIntensity={0.45}
            roughness={0.2}
            metalness={0.88}
          />
        </mesh>

        <mesh position={[-0.7, 0.7, 0]} rotation={[0, 0, Math.PI / 4]} geometry={diagonalGeo}>
          <meshStandardMaterial
            color="#D8B4FE"
            emissive="#C084FC"
            emissiveIntensity={0.45}
            roughness={0.2}
            metalness={0.88}
          />
        </mesh>

        <mesh position={[0.7, -0.7, 0]} rotation={[0, 0, -3 * Math.PI / 4]} geometry={diagonalGeo}>
          <meshStandardMaterial
            color="#D8B4FE"
            emissive="#C084FC"
            emissiveIntensity={0.45}
            roughness={0.2}
            metalness={0.88}
          />
        </mesh>

        <mesh position={[-0.7, -0.7, 0]} rotation={[0, 0, 3 * Math.PI / 4]} geometry={diagonalGeo}>
          <meshStandardMaterial
            color="#D8B4FE"
            emissive="#C084FC"
            emissiveIntensity={0.45}
            roughness={0.2}
            metalness={0.88}
          />
        </mesh>

        {/* Central Core Bezel / Orchid Halo Orb */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.38, 32, 32]} />
          <meshStandardMaterial
            color="#7E22CE"
            emissive="#A855F7"
            emissiveIntensity={0.85}
            roughness={0.1}
            metalness={0.98}
          />
        </mesh>

        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[0.48, 0.03, 16, 64]} />
          <meshStandardMaterial
            color="#C084FC"
            emissive="#D8B4FE"
            emissiveIntensity={0.7}
            roughness={0.12}
            metalness={0.95}
          />
        </mesh>
      </group>

      {/* Navigational Azimuth Degree Ring 1 (Inner - Orchid Violet) */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.7, 0.02, 16, 120]} />
        <meshStandardMaterial
          color="#9333EA"
          emissive="#A855F7"
          emissiveIntensity={0.65}
          roughness={0.18}
          metalness={0.92}
        />
      </mesh>

      {/* Outer Navigational Coordinate Dial Ring (Purple Chrome) */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[2.2, 0.025, 16, 120]} />
        <meshStandardMaterial
          color="#A855F7"
          emissive="#C084FC"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.95}
        />
      </mesh>

      {/* Floating Gimbal Axis Ring (Lavender Chrome Glow) */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.55, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#E9D5FF"
          emissive="#C084FC"
          emissiveIntensity={0.5}
          roughness={0.22}
          metalness={0.88}
        />
      </mesh>

      {/* 4 INTERACTIVE CARDINAL POINTS WITH CLICK NAVIGATION */}
      <CompassPointBadge
        bearing="000° NORTH"
        label="View Our Works"
        targetId="showreel"
        icon={<Film className="h-3 w-3" />}
        position={[0, 2.55, 0]}
      />

      <CompassPointBadge
        bearing="090° EAST"
        label="Our Services & Plans"
        targetId="packages"
        icon={<Package className="h-3 w-3" />}
        position={[2.85, 0, 0]}
      />

      <CompassPointBadge
        bearing="180° SOUTH"
        label="About Our Service"
        targetId="about"
        icon={<Info className="h-3 w-3" />}
        position={[0, -2.55, 0]}
      />

      <CompassPointBadge
        bearing="270° WEST"
        label="Contact"
        targetId="contact"
        icon={<Mail className="h-3 w-3" />}
        position={[-2.85, 0, 0]}
      />
    </group>
  );
}

function AmbientParticles({ count = 100 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 6 + 1.8;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.025;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#A855F7"
        transparent
        opacity={0.5}
      />
    </points>
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[6, 8, 5]} intensity={2.5} color="#FFFFFF" />
      <directionalLight position={[-6, -4, -2]} intensity={1.8} color="#F3E8FF" />
      <pointLight position={[-6, -6, -4]} intensity={2.5} color="#A855F7" />
      <pointLight position={[6, -4, 4]} intensity={2.5} color="#C084FC" />
      <pointLight position={[0, 6, 2]} intensity={2.2} color="#FFFFFF" />
    </>
  );
}

export default function HeroCanvas3D() {
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const maxScroll = window.innerHeight;
      const progress = Math.min(Math.max(currentScroll / maxScroll, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="h-28 w-28 animate-spin rounded-full border-2 border-purple-500 border-t-transparent opacity-40" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[520px] lg:h-[600px] cursor-grab active:cursor-grabbing">
      {/* Background Subtle Radial Glow & Lilac Aura */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-80" />
      <div className="absolute inset-0 bg-radial-white pointer-events-none opacity-70 blur-3xl" />

      <Canvas
        camera={{ position: [0, 0, 6.4], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <SceneLighting />
        <AmbientParticles count={100} />
        <Float speed={1.5} rotationIntensity={0.12} floatIntensity={0.3}>
          <CompassRose scrollProgress={scrollProgress} />
        </Float>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.6}
          minPolarAngle={Math.PI / 2.6}
          rotateSpeed={0.5}
          dampingFactor={0.06}
        />
      </Canvas>
    </div>
  );
}
