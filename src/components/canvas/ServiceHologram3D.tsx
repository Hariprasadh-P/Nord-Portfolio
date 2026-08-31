"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface ServiceMeshProps {
  type: string;
}

function MorphingServiceMesh({ type }: ServiceMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const outerRingRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.8;
      meshRef.current.rotation.x += delta * 0.4;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * 0.6;
      outerRingRef.current.rotation.y += delta * 0.3;
    }
  });

  const renderGeometry = () => {
    switch (type) {
      case "algorithmic-paid-acquisition":
      case "Target":
        return <octahedronGeometry args={[1.1, 0]} />;
      case "cinematic-3d-creative-production":
      case "Sparkles":
        return <torusKnotGeometry args={[0.7, 0.22, 100, 16]} />;
      case "hyper-performance-seo-content":
      case "Globe":
        return <icosahedronGeometry args={[1.0, 1]} />;
      case "conversion-rate-optimization":
      case "TrendingUp":
        return <dodecahedronGeometry args={[1.0, 0]} />;
      case "ai-marketing-automation-crm":
      case "Cpu":
        return <boxGeometry args={[1.2, 1.2, 1.2]} />;
      default:
        return <torusGeometry args={[0.9, 0.3, 16, 100]} />;
    }
  };

  return (
    <group>
      <mesh ref={meshRef}>
        {renderGeometry()}
        <meshStandardMaterial
          color="#00FFA3"
          emissive="#00F0FF"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.85}
          wireframe
        />
      </mesh>
      <mesh ref={outerRingRef}>
        <torusGeometry args={[1.6, 0.02, 16, 80]} />
        <meshStandardMaterial
          color="#9D00FF"
          emissive="#9D00FF"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

export default function ServiceHologram3D({ serviceKey }: { serviceKey: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full bg-surface-subtle/50 rounded-2xl animate-pulse" />;
  }

  return (
    <div className="w-full h-48 md:h-64 relative">
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[-3, -3, -2]} color="#00FFA3" intensity={2} />
        <pointLight position={[3, 3, 2]} color="#00F0FF" intensity={2} />
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
          <MorphingServiceMesh type={serviceKey} />
        </Float>
      </Canvas>
    </div>
  );
}
