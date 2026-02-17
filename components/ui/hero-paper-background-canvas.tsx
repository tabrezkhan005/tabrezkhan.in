"use client";

import { Canvas } from "@react-three/fiber";
import { ShaderPlane } from "./background-paper-shaders";

const HERO_COLOR1 = "#0e0d0c";
const HERO_COLOR2 = "#1a1a1a";

export function HeroPaperBackgroundCanvas() {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{
        position: [0, 0, 5],
        fov: 75,
        near: 0.1,
        far: 100,
      }}
      dpr={[1, 2]}
      style={{ background: HERO_COLOR1 }}
    >
      <group scale={[5, 5, 1]} position={[0, 0, 0]}>
        <ShaderPlane
          position={[0, 0, 0]}
          color1={HERO_COLOR1}
          color2={HERO_COLOR2}
        />
      </group>
    </Canvas>
  );
}
