'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const SPHERE_PARTICLE_COUNT = 2000;

function MorphingSphere() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  const { positions, basePositions, dummy } = useMemo(() => {
    const positions = new Float32Array(SPHERE_PARTICLE_COUNT * 3);
    const basePositions = new Float32Array(SPHERE_PARTICLE_COUNT * 3);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < SPHERE_PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      const phi = Math.acos(1 - (2 * (i + 0.5)) / SPHERE_PARTICLE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const radius = 2;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      basePositions[i3] = x;
      basePositions[i3 + 1] = y;
      basePositions[i3 + 2] = z;
    }

    return { positions, basePositions, dummy };
  }, []);

  useThree(({ gl }) => {
    const canvas = gl.domElement;
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    canvas.addEventListener('pointermove', handlePointerMove);
    return () => canvas.removeEventListener('pointermove', handlePointerMove);
  });

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('signature');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      scrollRef.current = progress;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const time = clock.getElapsedTime();
    const mouse = mouseRef.current;

    for (let i = 0; i < SPHERE_PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];
      const bz = basePositions[i3 + 2];

      const noiseX = Math.sin(time * 0.3 + bx * 2) * 0.15;
      const noiseY = Math.cos(time * 0.25 + by * 2) * 0.15;
      const noiseZ = Math.sin(time * 0.35 + bz * 2) * 0.15;

      const dist = Math.sqrt(
        Math.pow(bx - mouse.x * 3, 2) +
        Math.pow(by - mouse.y * 3, 2)
      );
      const mouseForce = Math.max(0, 1 - dist / 3) * 0.5;
      const mx = (bx - mouse.x * 3) * mouseForce;
      const my = (by - mouse.y * 3) * mouseForce;

      const scroll = scrollRef.current;
      const cubeSize = 1.5;
      const tx = (((i % 13) / 12) - 0.5) * cubeSize * 2;
      const ty = ((Math.floor(i / 13) % 13) / 12 - 0.5) * cubeSize * 2;
      const tz = ((Math.floor(i / 169) % 13) / 12 - 0.5) * cubeSize * 2;

      positions[i3] = bx + noiseX + mx + (tx - bx) * scroll * 0.3;
      positions[i3 + 1] = by + noiseY + my + (ty - by) * scroll * 0.3;
      positions[i3 + 2] = bz + noiseZ + (tz - bz) * scroll * 0.3;

      dummy.position.set(positions[i3], positions[i3 + 1], positions[i3 + 2]);

      const scale = 0.015 + Math.sin(time * 0.5 + i * 0.01) * 0.003;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.05;
    meshRef.current.rotation.x = Math.sin(time * 0.03) * 0.1;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, SPHERE_PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#818cf8" transparent opacity={0.7} />
    </instancedMesh>
  );
}

function AmbientParticles() {
  const count = 200;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const { positions, velocities, dummy } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      velocities[i3] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    return { positions, velocities, dummy };
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      for (let j = 0; j < 3; j++) {
        if (positions[i3 + j] > 5) positions[i3 + j] = -5;
        if (positions[i3 + j] < -5) positions[i3 + j] = 5;
      }

      dummy.position.set(positions[i3], positions[i3 + 1], positions[i3 + 2]);
      dummy.scale.setScalar(0.008);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#6366f1" transparent opacity={0.2} />
    </instancedMesh>
  );
}

export default function ThreeObject() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#818cf8" />
      <pointLight position={[-5, -5, 5]} intensity={0.3} color="#6366f1" />
      <MorphingSphere />
      <AmbientParticles />
    </>
  );
}
