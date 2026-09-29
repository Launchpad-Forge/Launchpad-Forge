"use client";
import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function useNodeCount() {
  const [count, setCount] = useState(40);
  useEffect(() => {
    const update = () => setCount(window.innerWidth < 768 ? 20 : 40);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return count;
}

/* ─── Energy Core ─── */
function EnergyCore({ progress = 0 }: { progress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const time = useRef(0);
  useFrame((state, delta) => {
    time.current += delta;
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.008;
      meshRef.current.rotation.x = Math.sin(time.current * 0.5) * 0.1;
      const s = 1 + progress * 0.3;
      meshRef.current.scale.setScalar(s);
    }
    if (glowRef.current) {
      glowRef.current.rotation.y -= 0.005;
      const gs = 1.5 + Math.sin(time.current * 2) * 0.1 + progress * 0.5;
      glowRef.current.scale.setScalar(gs);
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial
          color="#e8652b"
          emissive="#e8652b"
          emissiveIntensity={0.8 + progress * 0.5}
          wireframe
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#e8652b"
          emissive="#e8652b"
          emissiveIntensity={0.3}
          transparent
          opacity={0.08 + progress * 0.05}
        />
      </mesh>
    </group>
  );
}

/* ─── Orbital Rings ─── */
function OrbitalRing({ radius, speed, opacity, progress }: {
  radius: number; speed: number; opacity: number; progress: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  const time = useRef(0);
  useFrame((state, delta) => {
    time.current += delta;
    if (ref.current) {
      ref.current.rotation.z += speed;
      ref.current.rotation.x = Math.sin(time.current * 0.3) * 0.2;
    }
  });

  const visible = progress > 0.15;

  return (
    <mesh ref={ref} visible={visible}>
      <torusGeometry args={[radius, 0.008, 16, 100]} />
      <meshStandardMaterial
        color="#e8652b"
        emissive="#e8652b"
        emissiveIntensity={0.5}
        transparent
        opacity={opacity * Math.min(1, (progress - 0.15) * 3)}
      />
    </mesh>
  );
}

/* ─── Floating Nodes ─── */
function FloatingNodes({ count, progress }: { count: number; progress: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2 + Math.random() * 3;
      pos.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        speed: 0.2 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return pos;
  }, [count]);

  const time = useRef(0);
  useFrame((state, delta) => {
    if (!ref.current) return;
    time.current += delta;
    const t = time.current;
    positions.forEach((pos, i) => {
      const visProgress = Math.min(1, Math.max(0, (progress - 0.3) * 2.5));
      dummy.position.set(
        pos.x * visProgress + Math.sin(t * pos.speed + pos.offset) * 0.2,
        pos.y * visProgress + Math.cos(t * pos.speed + pos.offset) * 0.2,
        pos.z * visProgress
      );
      const s = 0.03 + Math.sin(t + pos.offset) * 0.01;
      dummy.scale.setScalar(s * visProgress);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#e8652b"
        emissive="#e8652b"
        emissiveIntensity={1}
        transparent
        opacity={0.8}
      />
    </instancedMesh>
  );
}

/* ─── Grid Platform ─── */
function GridPlatform({ progress }: { progress: number }) {
  const ref = useRef<THREE.GridHelper>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.y = -2 + progress * 0.5;
      ref.current.material.opacity = 0.1 + progress * 0.1;
    }
  });

  return (
    <gridHelper
      ref={ref}
      args={[20, 30, "#e8652b", "#1a1a2e"]}
      position={[0, -2, 0]}
      material-transparent
      material-opacity={0.1}
    />
  );
}

/* ─── Geometric Modules ─── */
function GeometricModules({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);

  const time = useRef(0);
  useFrame((state, delta) => {
    time.current += delta;
    if (group.current) {
      group.current.rotation.y += 0.002;
      group.current.children.forEach((child, i) => {
        const moduleProgress = Math.max(0, (progress - 0.3 - i * 0.05) * 5);
        child.scale.setScalar(Math.min(1, moduleProgress));
        child.position.y = Math.sin(time.current * 0.5 + i) * 0.1;
      });
    }
  });

  const modulePositions = [
    [2.5, 0.5, 1],
    [-2.5, -0.3, -1],
    [1.5, -1, -2],
    [-1.5, 1, 2],
    [0, 1.5, -2.5],
    [-2, -1.5, 0.5],
  ];

  return (
    <group ref={group}>
      {modulePositions.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial
            color="#e8652b"
            emissive="#e8652b"
            emissiveIntensity={0.3}
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Connection Lines ─── */
function ConnectionLines({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const lineObjects = useMemo(() => {
    const objects: THREE.Line[] = [];
    for (let i = 0; i < 12; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 5
      );
      const end = new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 5
      );
      const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
      const material = new THREE.LineBasicMaterial({
        color: "#e8652b",
        transparent: true,
        opacity: 0.15,
      });
      objects.push(new THREE.Line(geometry, material));
    }
    return objects;
  }, []);

  useFrame(() => {
    const connProgress = Math.max(0, (progress - 0.5) * 3);
    lineObjects.forEach((line) => {
      (line.material as THREE.LineBasicMaterial).opacity = 0.15 * connProgress;
    });
  });

  return (
    <group ref={groupRef}>
      {lineObjects.map((obj, i) => (
        <primitive key={i} object={obj} />
      ))}
    </group>
  );
}

/* ─── Main Hero Scene ─── */
export default function HeroScene({ scrollProgress = 0 }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const nodeCount = useNodeCount();

  const time = useRef(0);
  useFrame((state, delta) => {
    time.current += delta;
    if (groupRef.current) {
      groupRef.current.rotation.y = time.current * 0.05;
      // Camera zoom based on progress
      const camZ = 7 - scrollProgress * 3;
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, camZ, 0.05);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, scrollProgress * 1, 0.05);
    }
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#e8652b" />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#4a90d9" />
      <pointLight position={[0, 0, 0]} intensity={0.5 + scrollProgress * 0.5} color="#e8652b" distance={8} />

      <group ref={groupRef}>
        <EnergyCore progress={scrollProgress} />
        <OrbitalRing radius={1.8} speed={0.003} opacity={0.4} progress={scrollProgress} />
        <OrbitalRing radius={2.5} speed={-0.002} opacity={0.25} progress={scrollProgress} />
        <OrbitalRing radius={3.2} speed={0.001} opacity={0.15} progress={scrollProgress} />
        <FloatingNodes count={nodeCount} progress={scrollProgress} />
        <GeometricModules progress={scrollProgress} />
        <ConnectionLines progress={scrollProgress} />
      </group>

      <GridPlatform progress={scrollProgress} />

      <fog attach="fog" args={["#08080a", 5, 20]} />
    </>
  );
}
