/* eslint-disable react/no-unknown-property, react/prop-types */
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Billboard } from "@react-three/drei";
import { TextureLoader, BackSide, EquirectangularReflectionMapping, SRGBColorSpace, Color, Object3D, AdditiveBlending } from "three";
import { useReducedMotion } from "framer-motion";
import type { MeshStandardMaterial, Mesh, Texture } from "three";

function GlowSphere({ color = "#22D3EE", position = [0, 0, 0] as [number, number, number], radius = 0.4, label, texture, bump, rotateSpeed = 0.4, floatAmplitude = 0.06, lookAtTarget }: { color?: string; position?: [number, number, number]; radius?: number; label?: string; texture?: Texture | null; bump?: Texture | null; rotateSpeed?: number; floatAmplitude?: number; lookAtTarget?: [number, number, number] }) {
  const meshRef = useRef<Mesh | null>(null);
  const t = useRef(0);
  useFrame((_, delta) => {
    const m = meshRef.current;
    if (!m) return;
    t.current += delta;
    if (rotateSpeed !== 0 && !lookAtTarget) {
      m.rotation.y += delta * rotateSpeed;
    }
    const baseY = position[1];
    const amp = floatAmplitude ?? 0;
    m.position.y = baseY + (amp ? Math.sin(t.current * 1.2) * amp : 0);
  });
  useEffect(() => {
    const m = meshRef.current;
    if (!m || !lookAtTarget) return;
    m.lookAt(lookAtTarget[0], lookAtTarget[1], lookAtTarget[2]);
  }, [lookAtTarget]);
  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial
        map={texture ?? undefined}
        emissiveMap={texture ?? undefined}
        emissive={color}
        emissiveIntensity={0.28}
        normalMap={bump ?? undefined}
        normalScale={[0.55, 0.55] as any}
        color="#f0f0f0"
        roughness={0.4}
        metalness={0.42}
      />
      {label ? (
        <Billboard position={[0, 0.7, 0]} follow lockX lockY>
          <Html center wrapperClass="text-xs font-medium text-neutral-100 bg-[rgba(26,31,43,0.7)] px-2 py-1 rounded-md border border-charcoal">
            {label}
          </Html>
        </Billboard>
      ) : null}
    </mesh>
  );
}

type ParticleStreamProps = {
  from: [number, number, number];
  to: [number, number, number];
  control1?: [number, number, number];
  control2?: [number, number, number];
  colorStart: string;
  colorEnd?: string;
  num?: number;
  size?: number;
  spread?: number;
  speed?: [number, number];
  disintegrateAtEnd?: boolean;
  glowLightsCount?: number;
  glowIntensity?: number;
  glowDistance?: number;
};

function ParticleStream({ from, to, control1, control2, colorStart, colorEnd, num = 220, size = 0.04, spread = 0.12, speed = [0.12, 0.24], disintegrateAtEnd = false, glowLightsCount = 3, glowIntensity = 0.35, glowDistance = 1.6 }: ParticleStreamProps) {
  const instCoreRef = useRef<any>(null);
  const instGlowRef = useRef<any>(null);
  const progress = useRef<number[]>([]);
  const velocity = useRef<number[]>([]);
  const offsets = useRef<[number, number, number][]>([]);
  const lightRefs = useRef<any[]>([]);
  const lightData = useRef<{ t: number; speed: number }[]>([]);
  const c1 = control1 ?? [from[0], from[1] + 0.4, from[2]];
  const c2 = control2 ?? [to[0], to[1] + 0.4, to[2]];

  useMemo(() => {
    progress.current = new Array(num).fill(0).map(() => Math.random());
    velocity.current = new Array(num).fill(0).map(() => speed[0] + Math.random() * (speed[1] - speed[0]));
    offsets.current = new Array(num)
      .fill(0)
      .map(() => [
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
      ]);
    lightData.current = new Array(glowLightsCount).fill(0).map(() => ({ t: Math.random(), speed: speed[0] + Math.random() * (speed[1] - speed[0]) }));
  }, [num, spread, speed]);

  const colorA = useMemo(() => new Color(colorStart), [colorStart]);
  const colorB = useMemo(() => new Color(colorEnd ?? colorStart), [colorEnd, colorStart]);
  const dummy = useMemo(() => new Object3D(), []);
  const lightColors = useMemo(() =>
    new Array(glowLightsCount).fill(0).map((_, i) => colorA.clone().lerp(colorB, glowLightsCount <= 1 ? 0 : i / (glowLightsCount - 1)).getHex()),
  [glowLightsCount, colorA, colorB]);

  const getPoint = (t: number) => {
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const uuu = uu * u;
    const ttt = tt * t;
    const p: [number, number, number] = [
      uuu * from[0] + 3 * uu * t * c1[0] + 3 * u * tt * c2[0] + ttt * to[0],
      uuu * from[1] + 3 * uu * t * c1[1] + 3 * u * tt * c2[1] + ttt * to[1],
      uuu * from[2] + 3 * uu * t * c1[2] + 3 * u * tt * c2[2] + ttt * to[2],
    ];
    return p;
  };

  useFrame((_, delta) => {
    if (!instCoreRef.current || !instGlowRef.current) return;
    for (let i = 0; i < num; i++) {
      let t = progress.current[i];
      t += velocity.current[i] * delta * 0.15;
      if (t > 1) t = 0;
      progress.current[i] = t;
      const p = getPoint(t);
      const off = offsets.current[i];
      dummy.position.set(p[0] + off[0], p[1] + off[1], p[2] + off[2]);
      const scalar = disintegrateAtEnd && t > 0.75 ? size * (1 - (t - 0.75) / 0.25) : size;
      const coreScale = Math.max(0.001, scalar);
      const glowScale = Math.max(0.001, scalar * 1.6);
      dummy.scale.setScalar(coreScale);
      dummy.updateMatrix();
      instCoreRef.current.setMatrixAt(i, dummy.matrix);
      dummy.scale.setScalar(glowScale);
      dummy.updateMatrix();
      instGlowRef.current.setMatrixAt(i, dummy.matrix);
      // Color interpolate along path
      const c = colorA.clone().lerp(colorB, t);
      instCoreRef.current.setColorAt(i, c);
      instGlowRef.current.setColorAt(i, c);
    }
    instCoreRef.current.instanceMatrix.needsUpdate = true;
    if (instCoreRef.current.instanceColor) instCoreRef.current.instanceColor.needsUpdate = true;
    instGlowRef.current.instanceMatrix.needsUpdate = true;
    if (instGlowRef.current.instanceColor) instGlowRef.current.instanceColor.needsUpdate = true;

    // Move glow lights along the same curve
    for (let i = 0; i < lightData.current.length; i++) {
      const ld = lightData.current[i];
      ld.t += ld.speed * delta * 0.15;
      if (ld.t > 1) ld.t = 0;
      const p = getPoint(ld.t);
      const l = lightRefs.current[i];
      if (l) l.position.set(p[0], p[1], p[2]);
    }
  });

  return (
    <group>
      {/* Core metallic tokens */}
      <instancedMesh ref={instCoreRef} args={[undefined as any, undefined as any, num]} castShadow receiveShadow>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial vertexColors metalness={0.85} roughness={0.25} envMapIntensity={1.0} />
      </instancedMesh>
      {/* Outer glow shell */}
      <instancedMesh ref={instGlowRef} args={[undefined as any, undefined as any, num]} castShadow={false} receiveShadow={false}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial vertexColors toneMapped={false} transparent opacity={0.8} blending={AdditiveBlending} depthWrite={false} />
      </instancedMesh>
      {Array.from({ length: glowLightsCount }).map((_, i) => (
        <pointLight
          key={`pl-${i}`}
          ref={(el) => (lightRefs.current[i] = el)}
          color={lightColors[i]}
          intensity={glowIntensity}
          distance={glowDistance}
        />
      ))}
    </group>
  );
}

function LinkBeam({ from = [0, 0, 0] as [number, number, number], to = [1, 0, 0] as [number, number, number], color = "#D4AF37", active = false }) {
  const [mid, len, rot] = useMemo(() => {
    const start = new Float32Array(from);
    const end = new Float32Array(to);
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const dz = end[2] - start[2];
    const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const midpoint: [number, number, number] = [start[0] + dx / 2, start[1] + dy / 2, start[2] + dz / 2];
    const rotY = Math.atan2(dx, dz);
    const rotX = Math.atan2(dy, Math.sqrt(dx * dx + dz * dz));
    return [midpoint, length, [rotX, rotY, 0]] as const;
  }, [from, to]);
  const materialRef = useRef<MeshStandardMaterial | null>(null);
  // Animate emissiveIntensity to simulate a subtle pulse
  useFrame((_, delta) => {
    const m = materialRef.current;
    if (!m) return;
    const target = active ? 0.8 : 0.18;
    const rate = Math.min(1, delta * 8);
    m.emissiveIntensity += (target - m.emissiveIntensity) * rate;
  });
  return (
    <mesh position={mid as any} rotation={rot as any} receiveShadow castShadow>
      <cylinderGeometry args={[0.02, 0.02, len, 16]} />
      <meshStandardMaterial ref={materialRef as any} color={color} emissive={color} emissiveIntensity={0.18} metalness={0.7} roughness={0.35} />
    </mesh>
  );
}

type GuardianBridgeSceneProps = {
  height?: number;
  autoRotateSpeed?: number;
  showLegend?: boolean;
  colors?: {
    operator?: string;
    bridge?: string;
    guardian?: string;
    linkA?: string;
    linkB?: string;
  };
};

export default function GuardianBridgeScene({ height = 420, autoRotateSpeed = 0.6, showLegend = true, colors }: GuardianBridgeSceneProps) {
  const prefersReducedMotion = useReducedMotion();
  // Preload texture assets that live in public/3d/textures
  const skyboxTexture = useMemo(() => {
    const t = new TextureLoader().load("/3d/textures/SKYBOX.png");
    t.colorSpace = SRGBColorSpace;
    return t;
  }, []);
  const cssVars = useMemo(() => {
    if (typeof window === "undefined") return {} as Record<string, string | undefined>;
    const styles = getComputedStyle(document.documentElement);
    const get = (name: string) => styles.getPropertyValue(name).trim() || undefined;
    return {
      aqua: get("--color-aqua"),
      gold: get("--color-gold"),
      magenta: get("--color-magenta"),
    } as const;
  }, []);
  const theme = {
    operator: colors?.operator ?? "#9CA3AF", // gray-400
    bridge: colors?.bridge ?? "#A3A3A3",   // neutral-400
    guardian: colors?.guardian ?? "#B0B0B0",
    linkA: colors?.linkA ?? "#9CA3AF",
    linkB: colors?.linkB ?? "#A3A3A3",
  } as const;
  const [isActive, setIsActive] = useState(true);
  const [activeLink, setActiveLink] = useState<"A" | "B" | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Textures for nodes (albedo reused for emissive/bump to enhance details)
  const textureLoader = useMemo(() => new TextureLoader(), []);
  const operatorTexture = useMemo(() => {
    const t = textureLoader.load("/3d/textures/OPERATOR_SPHERICAL_ALBEDO.png");
    t.colorSpace = SRGBColorSpace;
    return t;
  }, [textureLoader]);
  const operatorBump = useMemo(() => textureLoader.load("/3d/textures/OPERATOR_BUMP.png"), [textureLoader]);
  const bridgeTexture = useMemo(() => {
    const t = textureLoader.load("/3d/textures/BRIDGE_SPHERICAL_ALBEDO.png");
    t.colorSpace = SRGBColorSpace;
    return t;
  }, [textureLoader]);
  const bridgeBump = useMemo(() => textureLoader.load("/3d/textures/BRIDGE_BUMP.png"), [textureLoader]);
  const guardianTexture = useMemo(() => {
    const t = textureLoader.load("/3d/textures/GUARDIAN_SPHERICAL_ALBEDO.png");
    t.colorSpace = SRGBColorSpace;
    return t;
  }, [textureLoader]);
  const guardianBump = useMemo(() => textureLoader.load("/3d/textures/GUARDIAN_BUMP.png"), [textureLoader]);

  // Environment reflections derived from the skybox
  const environmentTexture = useMemo(() => {
    const t = new TextureLoader().load("/3d/textures/SKYBOX.png");
    t.mapping = EquirectangularReflectionMapping;
    t.colorSpace = SRGBColorSpace;
    return t;
  }, []);

  // Pause animations on tab blur to save resources
  useEffect(() => {
    const onVisibility = () => setIsActive(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Mount only when in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setIsActive(entry.isIntersecting);
        }
      },
      { rootMargin: "-80px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Burn pulse sequence: Operator -> Bridge -> Guardian links
  useEffect(() => {
    if (prefersReducedMotion || !isActive) return;
    let intervalId: number | undefined;
    let t1: number | undefined;
    let t2: number | undefined;
    const tick = () => {
      setActiveLink("A");
      t1 = window.setTimeout(() => setActiveLink("B"), 600) as unknown as number;
      t2 = window.setTimeout(() => setActiveLink(null), 1200) as unknown as number;
    };
    tick();
    intervalId = window.setInterval(tick, 7000) as unknown as number;
    return () => {
      if (intervalId) window.clearInterval(intervalId);
      if (t1) window.clearTimeout(t1);
      if (t2) window.clearTimeout(t2);
    };
  }, [prefersReducedMotion, isActive]);

  function SceneEnvironment({ texture }: { texture: any }) {
    const { scene } = useThree();
    useEffect(() => {
      const prev = scene.environment;
      scene.environment = texture;
      return () => {
        scene.environment = prev;
      };
    }, [scene, texture]);
    return null;
  }
  return (
    <div ref={containerRef} className="relative w-full overflow-hidden rounded-md border border-charcoal bg-black" style={{ height }}>
      {isActive && (
        <Canvas dpr={[1, 1.5]} shadows camera={{ position: [2.5, 1.8, 3.5], fov: 50 }}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 2]} intensity={1.6} castShadow />
        <Suspense
          fallback={
            <Html center wrapperClass="text-neutral-300 text-sm">
              Loading 3D…
            </Html>
          }
        >
          {/* Skybox */}
          <mesh scale={[50, 50, 50]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial map={skyboxTexture as any} side={BackSide} />
          </mesh>
          {/* Nodes: Operator, Guardian, Bridge */}
          <SceneEnvironment texture={environmentTexture} />
          {/* Enlarge Bridge and reposition nodes (Incoming → Bridge → Operator → Guardians → Outgoing) */}
          <GlowSphere color={theme.bridge} radius={0.68} position={[-1.0, -0.25, 0.2]} label="Bridge" texture={bridgeTexture} bump={bridgeBump} rotateSpeed={0} floatAmplitude={0.02} />
          <GlowSphere color={theme.operator} position={[0.2, 0.25, 0.2]} label="Operator" texture={operatorTexture} bump={operatorBump} />
          {/* Remove single big guardian sphere; guardians will be a row of small watchers */}

          {/* User cylinders (incoming/outgoing) */}
          <mesh position={[-2.6, 0.0, 0.6]} rotation={[0, 0.2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.16, 0.16, 0.6, 20]} />
            <meshStandardMaterial color="#d1d5db" metalness={0.2} roughness={0.5} />
            <Billboard position={[0, 0.5, 0]} follow lockX lockY>
              <Html center wrapperClass="text-xs font-medium text-neutral-100 bg-[rgba(26,31,43,0.7)] px-2 py-1 rounded-md border border-charcoal">
                Incoming Users
              </Html>
            </Billboard>
          </mesh>
          <mesh position={[2.6, 0.0, -0.2]} rotation={[0, -0.2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.16, 0.16, 0.6, 20]} />
            <meshStandardMaterial color="#e5e7eb" metalness={0.2} roughness={0.5} />
            <Billboard position={[0, 0.5, 0]} follow lockX lockY>
              <Html center wrapperClass="text-xs font-medium text-neutral-100 bg-[rgba(26,31,43,0.7)] px-2 py-1 rounded-md border border-charcoal">
                Outgoing Users
              </Html>
            </Billboard>
          </mesh>

          {/* Streams: users -> bridge -> operator */}
          {/* Incoming to Bridge: neutral */}
          <ParticleStream from={[-2.6, 0.2, 0.6]} to={[-1.0, -0.25, 0.2]} colorStart="#94a3b8" colorEnd="#94a3b8" num={260} size={0.03} spread={0.18} speed={[0.25, 0.45]} />

          {/* Bridge to Operator: neutral */}
          <ParticleStream from={[-1.0, -0.25, 0.2]} to={[0.2, 0.25, 0.2]} colorStart="#94a3b8" colorEnd="#94a3b8" num={240} size={0.035} spread={0.18} speed={[0.18, 0.32]} />

          {/* Split at operator */}
          {/* Approve queue (yellow) through guardians, then turn green to outgoing */}
          <ParticleStream from={[0.2, 0.25, 0.2]} to={[1.2, 0.3, 0.2]} control1={[0.6, 0.9, 0.1]} control2={[0.9, 0.9, 0.15]} colorStart="#f59e0b" colorEnd="#f59e0b" num={320} size={0.03} spread={0.14} speed={[0.22, 0.38]} />
          {/* Reject (red) with disintegration */}
          <ParticleStream from={[0.2, 0.25, 0.2]} to={[0.0, -0.4, -0.2]} control1={[0.15, 0, 0]} control2={[0.05, -0.3, -0.1]} colorStart="#ef4444" colorEnd="#b91c1c" num={40} size={0.03} spread={0.10} speed={[0.18, 0.28]} disintegrateAtEnd />

          {/* Guardian watchers along approve stream (10 small eyes using guardian texture) */}
          {Array.from({ length: 10 }).map((_, i) => {
            const t = i / 9;
            // Spread guardians more in depth (z) and a bit vertically, and space slightly along x
            const xBase = 0.6 * (1 - t) + 1.5 * t;
            const x = xBase + (i - 4.5) * 0.04;
            const y = 0.35 * (1 - t) + 0.4 * t + Math.sin(t * Math.PI) * 0.32 + (i % 3 === 0 ? 0.06 : -0.04);
            const z = 0.12 * (1 - t) + 0.22 * t + (i % 2 === 0 ? 0.18 : -0.18) + Math.sin(i * 1.2) * 0.04;
            return (
              <GlowSphere key={`g-${i}`} color={theme.guardian} position={[x, y, z]} radius={0.18} texture={guardianTexture} bump={guardianBump} rotateSpeed={0.15} floatAmplitude={0.03} lookAtTarget={[1.2, 0.3, 0.2]} />
            );
          })}
          {/* Guardians group label */}
          <Billboard position={[0.7, 1.0, 0.0]} follow lockX lockY>
            <Html center wrapperClass="text-xs font-medium text-neutral-100 bg-[rgba(26,31,43,0.7)] px-2 py-1 rounded-md border border-charcoal">
              Guardians
            </Html>
          </Billboard>

          {/* Far users receiving green stream (success) */}
          <ParticleStream from={[1.2, 0.3, 0.2]} to={[2.6, 0.25, -0.2]} colorStart="#22c55e" colorEnd="#22c55e" num={280} size={0.028} spread={0.18} speed={[0.26, 0.46]} />

          {/* Removed thin cylinder link beams per design */}

          {/* Ground removed per design for space ambience */}
        </Suspense>
        {!prefersReducedMotion && isActive && (
          <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={autoRotateSpeed} />
        )}
      </Canvas>
      )}
      <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_0_1px_rgba(212,175,55,0.12)]" />
      {showLegend ? (
        <div className="absolute bottom-3 left-3 rounded-md border border-charcoal bg-[rgba(26,31,43,0.7)] px-3 py-1.5 text-xs text-neutral-100">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: theme.operator }} /> Operator
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: theme.bridge }} /> Bridge
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: theme.guardian }} /> Guardian
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
