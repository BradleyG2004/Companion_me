// src/components/ThreeBackground.tsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Box: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  );
};

const ThreeBackground: React.FC = () => {
  return (
    <Canvas style={{ position: 'absolute', top: 200, left: 100, width: '100%', height: '100%', zIndex: -1 }}>
      <ambientLight intensity={0.5} />
      <directionalLight />
      {/* <pointLight position={[10, 10, 10]} /> */}
      <Box />
    </Canvas>
  );
};

export default ThreeBackground;
