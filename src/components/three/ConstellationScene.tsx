"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { TECHNOLOGIES } from "@/lib/constants";

function TechNode({ position, label, index }: {
  position: [number, number, number];
  label: string;
  index: number;
}) {
  const ref = useRef<THREE.Group>(null);

  const time = useRef(0);
  useFrame((state, delta) => {
    time.current += delta;
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(time.current * 0.5 + index * 0.7) * 0.15;
      ref.current.position.x =
        position[0] + Math.cos(time.current * 0.3 + index * 0.5) * 0.08;
    }
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial
          color="#e8652b"
          emissive="#e8652b"
          emissiveIntensity={0.8}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial
          color="#e8652b"
          transparent
          opacity={0.1}
        />
      </mesh>
      <Text
        position={[0, -0.25, 0]}
        fontSize={0.1}
        color="#8a8a94"
        anchorX="center"
        anchorY="top"
      >
        {label}
      </Text>
    </group>
  );
}

function ConstellationLines({ positions }: { positions: [number, number, number][] }) {
  const linesRef = useRef<THREE.Group>(null);

  const lineObjects = useMemo(() => {
    const objects: THREE.Line[] = [];
    for (let i = 0; i < positions.length; i++) {
      const distances = positions
        .map((p, j) => ({
          index: j,
          dist: Math.sqrt(
            (p[0] - positions[i][0]) ** 2 +
            (p[1] - positions[i][1]) ** 2 +
            (p[2] - positions[i][2]) ** 2
          ),
        }))
        .filter((d) => d.index !== i)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 2);

      distances.forEach((d) => {
        if (d.index > i) {
          const geo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(...positions[i]),
            new THREE.Vector3(...positions[d.index]),
          ]);
          const material = new THREE.LineBasicMaterial({
            color: "#e8652b",
            transparent: true,
            opacity: 0.08,
          });
          objects.push(new THREE.Line(geo, material));
        }
      });
    }
    return objects;
  }, [positions]);

  return (
    <group ref={linesRef}>
      {lineObjects.map((obj, i) => (
        <primitive key={i} object={obj} />
      ))}
    </group>
  );
}

export default function ConstellationScene() {
  const groupRef = useRef<THREE.Group>(null);

  const positions = useMemo<[number, number, number][]>(() => {
    return TECHNOLOGIES.map((_, i) => {
      const angle = (i / TECHNOLOGIES.length) * Math.PI * 2;
      const radius = 1.5 + (i % 3) * 0.8;
      const y = (Math.random() - 0.5) * 1.5;
      return [
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius,
      ];
    });
  }, []);

  const time = useRef(0);
  useFrame((state, delta) => {
    time.current += delta;
    if (groupRef.current) {
      groupRef.current.rotation.y = time.current * 0.03;
      // Subtle mouse parallax
      groupRef.current.rotation.x = Math.sin(time.current * 0.2) * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[3, 3, 3]} intensity={0.4} color="#e8652b" />
      <pointLight position={[-3, -2, -3]} intensity={0.2} color="#4a90d9" />

      <group ref={groupRef}>
        {TECHNOLOGIES.map((tech, i) => (
          <TechNode
            key={tech}
            position={positions[i]}
            label={tech}
            index={i}
          />
        ))}
        <ConstellationLines positions={positions} />
      </group>

      <fog attach="fog" args={["#08080a", 3, 12]} />
    </>
  );
}
