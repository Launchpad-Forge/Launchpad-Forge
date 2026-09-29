"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function RotatingStructure() {
  const ref = useRef<THREE.Group>(null);

  const time = useRef(0);
  useFrame((state, delta) => {
    time.current += delta;
    if (ref.current) {
      ref.current.rotation.y += 0.003;
      ref.current.rotation.x = Math.sin(time.current * 0.2) * 0.1;
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <torusKnotGeometry args={[1.2, 0.15, 128, 16, 2, 3]} />
        <meshStandardMaterial
          color="#e8652b"
          emissive="#e8652b"
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
      <mesh>
        <torusGeometry args={[2, 0.01, 16, 100]} />
        <meshStandardMaterial
          color="#e8652b"
          emissive="#e8652b"
          emissiveIntensity={0.5}
          transparent
          opacity={0.2}
        />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.5, 0.01, 16, 100]} />
        <meshStandardMaterial
          color="#e8652b"
          emissive="#e8652b"
          emissiveIntensity={0.3}
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
}

export default function ContactScene() {
  return (
    <>
      <ambientLight intensity={0.08} />
      <pointLight position={[3, 3, 3]} intensity={0.3} color="#e8652b" />
      <pointLight position={[-3, -2, -3]} intensity={0.15} color="#4a90d9" />
      <RotatingStructure />
      <fog attach="fog" args={["#08080a", 3, 10]} />
    </>
  );
}
