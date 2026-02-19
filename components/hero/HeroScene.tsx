'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 800;

function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const { positions, targets, velocities, dummy } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const targets = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 8;
      positions[i3 + 1] = (Math.random() - 0.5) * 6;
      positions[i3 + 2] = (Math.random() - 0.5) * 4;

      const cols = 32;
      const row = Math.floor(i / cols);
      const col = i % cols;
      targets[i3] = (col - cols / 2) * 0.18;
      targets[i3 + 1] = (row - PARTICLE_COUNT / cols / 2) * 0.18;
      targets[i3 + 2] = 0;

      velocities[i3] = 0;
      velocities[i3 + 1] = 0;
      velocities[i3 + 2] = 0;
    }

    return { positions, targets, velocities, dummy };
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

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const time = clock.getElapsedTime();
    const progress = Math.min(time * 0.15, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      const wave = Math.sin(time * 0.5 + i * 0.02) * 0.05 * (1 - eased * 0.5);
      const mouseInfluence = 0.3;

      positions[i3] += (targets[i3] + mouseRef.current.x * mouseInfluence - positions[i3]) * 0.02;
      positions[i3 + 1] += (targets[i3 + 1] + mouseRef.current.y * mouseInfluence + wave - positions[i3 + 1]) * 0.02;
      positions[i3 + 2] += (targets[i3 + 2] + Math.sin(time * 0.3 + i * 0.01) * 0.15 - positions[i3 + 2]) * 0.02;

      dummy.position.set(positions[i3], positions[i3 + 1], positions[i3 + 2]);

      const scale = 0.02 + Math.sin(time + i * 0.1) * 0.005;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#6366f1" transparent opacity={0.6} />
    </instancedMesh>
  );
}

function ConnectionLines() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const positionsRef = useRef<Float32Array>();

  const geometry = useMemo(() => {
    const lineCount = 200;
    const positions = new Float32Array(lineCount * 6);
    positionsRef.current = positions;

    for (let i = 0; i < lineCount; i++) {
      const i6 = i * 6;
      const cols = 32;
      const idx = Math.floor(Math.random() * PARTICLE_COUNT);
      const row = Math.floor(idx / cols);
      const col = idx % cols;

      const x1 = (col - cols / 2) * 0.18;
      const y1 = (row - PARTICLE_COUNT / cols / 2) * 0.18;

      const neighborOffset = Math.random() > 0.5 ? 1 : cols;
      const idx2 = idx + neighborOffset;
      const row2 = Math.floor(idx2 / cols);
      const col2 = idx2 % cols;

      const x2 = (col2 - cols / 2) * 0.18;
      const y2 = (row2 - PARTICLE_COUNT / cols / 2) * 0.18;

      positions[i6] = x1;
      positions[i6 + 1] = y1;
      positions[i6 + 2] = 0;
      positions[i6 + 3] = x2;
      positions[i6 + 4] = y2;
      positions[i6 + 5] = 0;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!lineRef.current || !positionsRef.current) return;
    const time = clock.getElapsedTime();

    const posAttr = lineRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < posAttr.count; i++) {
      const z = Math.sin(time * 0.3 + i * 0.05) * 0.15;
      posAttr.setZ(i, z);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#6366f1" transparent opacity={0.08} />
    </lineSegments>
  );
}

function FloatingGrid() {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
    ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.08) * 0.05;
  });

  return (
    <group ref={ref}>
      <Particles />
      <ConnectionLines />
    </group>
  );
}

export default function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#818cf8" />
      <FloatingGrid />
    </>
  );
}
