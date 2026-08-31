"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { Film, Package, Info, Mail } from "lucide-react";

export type CardinalDirection = "hub" | "north" | "east" | "south" | "west";

interface CompassModel3DProps {
  activeDirection: CardinalDirection;
  onSelectDirection: (direction: CardinalDirection) => void;
  hoveredDirection?: CardinalDirection | null;
  onHoverDirection?: (direction: CardinalDirection | null) => void;
}

// Custom 3D Faceted Diamond Needle Point (Two-Tone Chrome & Deep Obsidian with Neon Shading)
function FacetedStarNeedle({
  length = 1.95,
  baseWidth = 0.3,
  depth = 0.16,
  isHighlighted = false,
}: {
  length?: number;
  baseWidth?: number;
  depth?: number;
  isHighlighted?: boolean;
}) {
  const { leftGeo, rightGeo } = useMemo(() => {
    // Left facet vertices
    const leftPositions = new Float32Array([
      0, length, 0,
      -baseWidth, 0, 0,
      0, 0, depth,
      0, length, 0,
      0, 0, -depth * 0.4,
      -baseWidth, 0, 0,
      0, 0, 0,
      -baseWidth, 0, 0,
      0, 0, depth,
    ]);

    // Right facet vertices
    const rightPositions = new Float32Array([
      0, length, 0,
      0, 0, depth,
      baseWidth, 0, 0,
      0, length, 0,
      baseWidth, 0, 0,
      0, 0, -depth * 0.4,
      0, 0, 0,
      0, 0, depth,
      baseWidth, 0, 0,
    ]);

    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute("position", new THREE.BufferAttribute(leftPositions, 3));
    lGeo.computeVertexNormals();

    const rGeo = new THREE.BufferGeometry();
    rGeo.setAttribute("position", new THREE.BufferAttribute(rightPositions, 3));
    rGeo.computeVertexNormals();

    return { leftGeo: lGeo, rightGeo: rGeo };
  }, [length, baseWidth, depth]);

  return (
    <group>
      {/* Light Platinum Chrome Facet (Left side) */}
      <mesh geometry={leftGeo}>
        <meshStandardMaterial
          color={isHighlighted ? "#FFFFFF" : "#E2E8F0"}
          emissive={isHighlighted ? "#C084FC" : "#9333EA"}
          emissiveIntensity={isHighlighted ? 1.0 : 0.45}
          roughness={0.1}
          metalness={0.95}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Dark Royal Obsidian Facet (Right side) */}
      <mesh geometry={rightGeo}>
        <meshStandardMaterial
          color={isHighlighted ? "#9333EA" : "#0F051D"}
          emissive={isHighlighted ? "#7E22CE" : "#3B0764"}
          emissiveIntensity={isHighlighted ? 0.8 : 0.3}
          roughness={0.15}
          metalness={0.98}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// 8-Point Compass Assembly
function CompassAssembly({
  activeDirection,
  hoveredDirection,
}: {
  activeDirection: CardinalDirection;
  hoveredDirection?: CardinalDirection | null;
}) {
  const rootGroupRef = useRef<THREE.Group>(null!);
  const pointerNeedleRef = useRef<THREE.Group>(null!);

  const targetAngle = useMemo(() => {
    const dir = hoveredDirection || activeDirection;
    switch (dir) {
      case "north":
        return 0;
      case "east":
        return -Math.PI / 2;
      case "south":
        return Math.PI;
      case "west":
        return Math.PI / 2;
      case "hub":
      default:
        return 0;
    }
  }, [activeDirection, hoveredDirection]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const { pointer } = state;

    if (rootGroupRef.current) {
      const targetRotY = pointer.x * 0.25 + Math.sin(t * 0.4) * 0.02;
      const targetRotX = -pointer.y * 0.18 + Math.cos(t * 0.5) * 0.02;

      rootGroupRef.current.rotation.y = THREE.MathUtils.damp(
        rootGroupRef.current.rotation.y,
        targetRotY,
        4,
        delta
      );
      rootGroupRef.current.rotation.x = THREE.MathUtils.damp(
        rootGroupRef.current.rotation.x,
        targetRotX,
        4,
        delta
      );
    }

    if (pointerNeedleRef.current) {
      let desired = targetAngle;
      if (activeDirection === "hub" && !hoveredDirection) {
        desired = Math.sin(t * 1.5) * 0.05 + pointer.x * 0.1;
      }

      pointerNeedleRef.current.rotation.z = THREE.MathUtils.damp(
        pointerNeedleRef.current.rotation.z,
        desired,
        6,
        delta
      );
    }
  });

  const isNorth = activeDirection === "north" || hoveredDirection === "north";
  const isEast = activeDirection === "east" || hoveredDirection === "east";
  const isSouth = activeDirection === "south" || hoveredDirection === "south";
  const isWest = activeDirection === "west" || hoveredDirection === "west";

  return (
    <group ref={rootGroupRef} position={[0, 0, 0]}>
      {/* 1. INTERSECTING COMPASS DIAL RINGS */}
      <group>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[1.35, 0.03, 16, 120]} />
          <meshStandardMaterial
            color="#1E0A3C"
            emissive="#7E22CE"
            emissiveIntensity={0.65}
            roughness={0.15}
            metalness={0.95}
          />
        </mesh>

        <mesh position={[0, 0, -0.02]}>
          <torusGeometry args={[1.5, 0.012, 16, 120]} />
          <meshStandardMaterial
            color="#C084FC"
            emissive="#A855F7"
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={0.98}
          />
        </mesh>

        <mesh position={[0, 0, 0.02]}>
          <torusGeometry args={[0.98, 0.008, 16, 96]} />
          <meshStandardMaterial
            color="#E9D5FF"
            emissive="#C084FC"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
      </group>

      {/* 2. BASE 8-POINT COMPASS ROSE */}
      <group>
        <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <FacetedStarNeedle length={1.95} baseWidth={0.3} depth={0.16} isHighlighted={isNorth} />
        </group>
        <group position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <FacetedStarNeedle length={1.95} baseWidth={0.3} depth={0.16} isHighlighted={isEast} />
        </group>
        <group position={[0, 0, 0]} rotation={[0, 0, Math.PI]}>
          <FacetedStarNeedle length={1.95} baseWidth={0.3} depth={0.16} isHighlighted={isSouth} />
        </group>
        <group position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <FacetedStarNeedle length={1.95} baseWidth={0.3} depth={0.16} isHighlighted={isWest} />
        </group>

        {/* 4 Diagonal Points */}
        <group position={[0, 0, -0.02]} rotation={[0, 0, -Math.PI / 4]}>
          <FacetedStarNeedle length={1.15} baseWidth={0.2} depth={0.09} />
        </group>
        <group position={[0, 0, -0.02]} rotation={[0, 0, -3 * Math.PI / 4]}>
          <FacetedStarNeedle length={1.15} baseWidth={0.2} depth={0.09} />
        </group>
        <group position={[0, 0, -0.02]} rotation={[0, 0, 3 * Math.PI / 4]}>
          <FacetedStarNeedle length={1.15} baseWidth={0.2} depth={0.09} />
        </group>
        <group position={[0, 0, -0.02]} rotation={[0, 0, Math.PI / 4]}>
          <FacetedStarNeedle length={1.15} baseWidth={0.2} depth={0.09} />
        </group>
      </group>

      {/* 3. DYNAMIC MAGNETIC POINTER NEEDLE */}
      <group ref={pointerNeedleRef} position={[0, 0, 0.12]}>
        <mesh position={[0, 1.05, 0]}>
          <coneGeometry args={[0.14, 0.75, 4]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#C084FC"
            emissiveIntensity={1.8}
            roughness={0.05}
            metalness={0.98}
          />
        </mesh>

        <mesh position={[0, -0.65, 0]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.1, 0.48, 4]} />
          <meshStandardMaterial
            color="#581C87"
            emissive="#7E22CE"
            emissiveIntensity={0.7}
            roughness={0.2}
            metalness={0.95}
          />
        </mesh>
      </group>

      {/* 4. CENTRAL JEWEL PIVOT */}
      <group position={[0, 0, 0.16]}>
        <mesh>
          <torusGeometry args={[0.26, 0.04, 16, 64]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#C084FC"
            emissiveIntensity={0.8}
            roughness={0.08}
            metalness={0.98}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.19, 32, 32]} />
          <meshStandardMaterial
            color="#7E22CE"
            emissive="#A855F7"
            emissiveIntensity={1.1}
            roughness={0.08}
            metalness={0.92}
          />
        </mesh>
      </group>
    </group>
  );
}

function FloatingConstellations() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 100;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 4.2 + 1.8;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
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
        size={0.035}
        color="#C084FC"
        transparent
        opacity={0.65}
      />
    </points>
  );
}

export default function CompassModel3D({
  activeDirection,
  onSelectDirection,
  hoveredDirection,
  onHoverDirection,
}: CompassModel3DProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isNorth = activeDirection === "north" || hoveredDirection === "north";
  const isEast = activeDirection === "east" || hoveredDirection === "east";
  const isSouth = activeDirection === "south" || hoveredDirection === "south";
  const isWest = activeDirection === "west" || hoveredDirection === "west";

  return (
    <div className="relative w-full max-w-[430px] h-[320px] sm:h-[350px] mx-auto flex items-center justify-center select-none">
      {/* 3D Canvas */}
      {mounted && (
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 7.5], fov: 38 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            className="w-full h-full"
          >
            <ambientLight intensity={1.5} />
            <directionalLight position={[6, 8, 6]} intensity={3.0} color="#FFFFFF" />
            <directionalLight position={[-6, -4, -3]} intensity={1.8} color="#C084FC" />
            <pointLight position={[0, 4, 3]} intensity={2.8} color="#A855F7" />
            <pointLight position={[0, -4, 3]} intensity={2.4} color="#38BDF8" />
            <pointLight position={[5, 0, 4]} intensity={2.4} color="#10B981" />
            <pointLight position={[-5, 0, 4]} intensity={2.4} color="#EC4899" />

            <FloatingConstellations />

            <Float speed={1.5} rotationIntensity={0.04} floatIntensity={0.12}>
              <CompassAssembly
                activeDirection={activeDirection}
                hoveredDirection={hoveredDirection}
              />
            </Float>
          </Canvas>
        </div>
      )}

      {/* OVERLAY INTERACTIVE 4 CARDINAL BUTTONS (Dark Obsidian Glass) */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
        
        {/* NORTH BUTTON ('N') */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-auto">
          <button
            onClick={() => onSelectDirection("north")}
            onMouseEnter={() => onHoverDirection?.("north")}
            onMouseLeave={() => onHoverDirection?.(null)}
            className={`group flex flex-col items-center cursor-pointer transition-all duration-300 ${
              isNorth ? "scale-110" : "scale-100 hover:scale-105"
            }`}
          >
            <span
              className={`font-display font-black text-2xl sm:text-3xl tracking-widest leading-none drop-shadow-md transition-all ${
                isNorth
                  ? "text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.9)]"
                  : "text-white group-hover:text-sky-400"
              }`}
            >
              N
            </span>
            <div
              className={`mt-0.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase border transition-all ${
                isNorth
                  ? "bg-gradient-to-r from-sky-600 to-cyan-600 text-white border-sky-400 shadow-md shadow-sky-500/30"
                  : "bg-slate-900/90 text-slate-200 border-slate-700 shadow-sm group-hover:border-sky-400 group-hover:bg-slate-800"
              }`}
            >
              <Film className="h-2.5 w-2.5 text-sky-400" />
              <span>000° WORKS</span>
            </div>
          </button>
        </div>

        {/* EAST BUTTON ('E') */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-auto">
          <button
            onClick={() => onSelectDirection("east")}
            onMouseEnter={() => onHoverDirection?.("east")}
            onMouseLeave={() => onHoverDirection?.(null)}
            className={`group flex flex-col items-center cursor-pointer transition-all duration-300 ${
              isEast ? "scale-110" : "scale-100 hover:scale-105"
            }`}
          >
            <span
              className={`font-display font-black text-2xl sm:text-3xl tracking-widest leading-none drop-shadow-md transition-all ${
                isEast
                  ? "text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.9)]"
                  : "text-white group-hover:text-emerald-400"
              }`}
            >
              E
            </span>
            <div
              className={`mt-0.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase border transition-all ${
                isEast
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400 shadow-md shadow-emerald-500/30"
                  : "bg-slate-900/90 text-slate-200 border-slate-700 shadow-sm group-hover:border-emerald-400 group-hover:bg-slate-800"
              }`}
            >
              <Package className="h-2.5 w-2.5 text-emerald-400" />
              <span>090° TARIFF</span>
            </div>
          </button>
        </div>

        {/* SOUTH BUTTON ('S') */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-auto">
          <button
            onClick={() => onSelectDirection("south")}
            onMouseEnter={() => onHoverDirection?.("south")}
            onMouseLeave={() => onHoverDirection?.(null)}
            className={`group flex flex-col items-center cursor-pointer transition-all duration-300 ${
              isSouth ? "scale-110" : "scale-100 hover:scale-105"
            }`}
          >
            <div
              className={`mb-0.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase border transition-all ${
                isSouth
                  ? "bg-gradient-to-r from-amber-600 to-rose-600 text-white border-amber-400 shadow-md shadow-amber-500/30"
                  : "bg-slate-900/90 text-slate-200 border-slate-700 shadow-sm group-hover:border-amber-400 group-hover:bg-slate-800"
              }`}
            >
              <Info className="h-2.5 w-2.5 text-amber-400" />
              <span>180° ABOUT</span>
            </div>
            <span
              className={`font-display font-black text-2xl sm:text-3xl tracking-widest leading-none drop-shadow-md transition-all ${
                isSouth
                  ? "text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.9)]"
                  : "text-white group-hover:text-amber-400"
              }`}
            >
              S
            </span>
          </button>
        </div>

        {/* WEST BUTTON ('W') */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-auto">
          <button
            onClick={() => onSelectDirection("west")}
            onMouseEnter={() => onHoverDirection?.("west")}
            onMouseLeave={() => onHoverDirection?.(null)}
            className={`group flex flex-col items-center cursor-pointer transition-all duration-300 ${
              isWest ? "scale-110" : "scale-100 hover:scale-105"
            }`}
          >
            <span
              className={`font-display font-black text-2xl sm:text-3xl tracking-widest leading-none drop-shadow-md transition-all ${
                isWest
                  ? "text-pink-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.9)]"
                  : "text-white group-hover:text-pink-400"
              }`}
            >
              W
            </span>
            <div
              className={`mt-0.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase border transition-all ${
                isWest
                  ? "bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white border-pink-400 shadow-md shadow-pink-500/30"
                  : "bg-slate-900/90 text-slate-200 border-slate-700 shadow-sm group-hover:border-pink-400 group-hover:bg-slate-800"
              }`}
            >
              <Mail className="h-2.5 w-2.5 text-pink-400" />
              <span>270° CONTACT</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
