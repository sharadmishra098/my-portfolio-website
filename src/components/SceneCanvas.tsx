import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, MeshDistortMaterial, Points, PointMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { portfolioData } from '@/data/portfolio-data';

interface SceneCanvasProps {
  progress: number;
  activeSkill: string | null;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function ParticleField() {
  const points = useMemo(() => {
    const positions = new Float32Array(1800 * 3);

    for (let index = 0; index < positions.length; index += 3) {
      positions[index] = (Math.random() - 0.5) * 24;
      positions[index + 1] = (Math.random() - 0.5) * 16;
      positions[index + 2] = -Math.random() * 90;
    }

    return positions;
  }, []);

  return (
    <Points positions={points} stride={3}>
      <PointMaterial transparent color="#dff7ff" size={0.04} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

function CameraRig({ progress }: { progress: number }) {
  useFrame((state) => {
    const z = lerp(11, -46, progress);
    const x = Math.sin(progress * Math.PI * 1.8) * 1.2;
    const y = lerp(0.4, -0.8, progress);

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x, 0.06);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y, 0.06);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, z, 0.06);
    state.camera.lookAt(1.8, 0, z - 8);
  });

  return null;
}

function HeroStage({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;

    group.current.position.x = 3.8;
    group.current.position.y = 0.3;
    group.current.position.z = lerp(2, -6, progress);
    group.current.rotation.y = state.clock.elapsedTime * 0.28;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.16;
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.8}>
        <mesh rotation={[0.6, 0.2, 0.4]}>
          <torusGeometry args={[2.4, 0.08, 32, 220]} />
          <meshBasicMaterial color="#74f2ff" transparent opacity={0.9} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.18} floatIntensity={0.7}>
        <mesh rotation={[1.1, 0.3, 0.8]}>
          <torusGeometry args={[1.6, 0.14, 24, 180]} />
          <meshStandardMaterial color="#ff8a6c" emissive="#ff8a6c" emissiveIntensity={1} metalness={0.45} roughness={0.15} />
        </mesh>
      </Float>

      <Float speed={1.1} rotationIntensity={0.6} floatIntensity={1.1}>
        <Sphere args={[1.18, 64, 64]}>
          <MeshDistortMaterial
            color="#102944"
            emissive="#74f2ff"
            emissiveIntensity={1.2}
            distort={0.46}
            speed={2.4}
            roughness={0.08}
          />
        </Sphere>
      </Float>

      <Float speed={2.1} rotationIntensity={1.1} floatIntensity={1}>
        <mesh position={[2.25, 0.95, -0.8]} rotation={[0.4, 0.7, 0.3]}>
          <icosahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#ffd36a" emissive="#ffd36a" emissiveIntensity={1} />
        </mesh>
      </Float>

      <Float speed={1.7} rotationIntensity={1.1} floatIntensity={1}>
        <mesh position={[-2.15, -0.8, 0.7]} rotation={[0.9, 0.3, 0.8]}>
          <octahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial color="#6fffd2" emissive="#6fffd2" emissiveIntensity={1} />
        </mesh>
      </Float>
    </group>
  );
}

function TunnelRings() {
  const group = useRef<THREE.Group>(null);

  const rings = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        z: -4 - index * 4.2,
        radius: 1.6 + (index % 4) * 0.5,
        x: Math.sin(index * 0.55) * 1.4,
        y: Math.cos(index * 0.48) * 0.9,
        color: ['#74f2ff', '#ff8a6c', '#ffd36a'][index % 3],
      })),
    [],
  );

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.12) * 0.08;
  });

  return (
    <group ref={group}>
      {rings.map((ring, index) => (
        <mesh key={`${ring.z}-${index}`} position={[ring.x, ring.y, ring.z]} rotation={[Math.PI / 2, 0, index * 0.25]}>
          <torusGeometry args={[ring.radius, 0.03, 18, 120]} />
          <meshBasicMaterial color={ring.color} transparent opacity={0.45} />
        </mesh>
      ))}
    </group>
  );
}

function ExperiencePath() {
  const points = useMemo(
    () => [
      new THREE.Vector3(-1.2, 0.4, -16),
      new THREE.Vector3(1.8, 0.1, -22),
      new THREE.Vector3(4.2, -0.5, -30),
      new THREE.Vector3(2.4, -0.3, -38),
    ],
    [],
  );

  return (
    <group>
      <Line points={points} color="#74f2ff" lineWidth={2.2} transparent opacity={0.55} />
      {portfolioData.experience.map((item, index) => {
        const point = points[index];
        if (!point) return null;

        return (
          <group key={item.company} position={[point.x, point.y, point.z]}>
            <mesh>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial color={item.accent} emissive={item.accent} emissiveIntensity={1.4} />
            </mesh>
            <mesh position={[0, 0, -0.1]}>
              <ringGeometry args={[0.75, 0.92, 48]} />
              <meshBasicMaterial color={item.accent} transparent opacity={0.45} side={THREE.DoubleSide} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function SkillConstellation({ activeSkill }: { activeSkill: string | null }) {
  const group = useRef<THREE.Group>(null);
  const skills = useMemo(
    () =>
      portfolioData.skills.flatMap((groupItem, groupIndex) =>
        groupItem.items.map((skill, skillIndex) => ({
          label: skill,
          color: groupItem.color,
          radius: 2.8 + groupIndex * 0.4,
          angle:
            (groupIndex / portfolioData.skills.length) * Math.PI * 2 +
            (skillIndex / groupItem.items.length) * 1.2,
          y: 0.8 - groupIndex * 0.45,
        })),
      ),
    [],
  );

  useFrame((state) => {
    if (!group.current) return;
    group.current.position.set(1.6, 0, -34);
    group.current.rotation.y = state.clock.elapsedTime * 0.16;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.06;
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshStandardMaterial color="#102944" emissive="#0f2840" emissiveIntensity={1} />
      </mesh>
      {skills.map((skill) => {
        const active = activeSkill === skill.label;
        return (
          <mesh
            key={skill.label}
            position={[
              Math.cos(skill.angle) * skill.radius,
              skill.y,
              Math.sin(skill.angle) * skill.radius,
            ]}
            scale={active ? 1.55 : 1}
          >
            <sphereGeometry args={[0.18, 18, 18]} />
            <meshStandardMaterial color={skill.color} emissive={skill.color} emissiveIntensity={active ? 2.4 : 1.1} />
          </mesh>
        );
      })}
    </group>
  );
}

function ProjectMonolith() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.position.set(2.6, 0, -46);
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.18;
    group.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.28) * 0.06;
  });

  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[3.2, 2.1, 0.2]} />
        <meshStandardMaterial color="#10253c" emissive="#10253c" emissiveIntensity={0.9} metalness={0.35} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.15]}>
        <planeGeometry args={[2.6, 1.5]} />
        <meshBasicMaterial color="#6fffd2" transparent opacity={0.16} />
      </mesh>
      <mesh position={[0, 0, -0.2]}>
        <ringGeometry args={[1.6, 2.05, 64]} />
        <meshBasicMaterial color="#74f2ff" transparent opacity={0.28} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function ContactBeacon() {
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ring.current) return;
    ring.current.position.set(1.4, -0.3, -60);
    ring.current.rotation.z += 0.006;
    const scale = 1 + Math.sin(state.clock.elapsedTime * 1.7) * 0.08;
    ring.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={ring}>
      <ringGeometry args={[1.2, 2.8, 80]} />
      <meshBasicMaterial color="#dff7ff" transparent opacity={0.55} side={THREE.DoubleSide} />
    </mesh>
  );
}

export function SceneCanvas({ progress, activeSkill }: SceneCanvasProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0.4, 11], fov: 38 }} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={['#04111f']} />
        <fog attach="fog" args={['#04111f', 18, 72]} />
        <ambientLight intensity={1.1} />
        <directionalLight position={[6, 8, 5]} intensity={2.3} color="#ffffff" />
        <pointLight position={[4, 1, 7]} intensity={42} color="#74f2ff" distance={40} />
        <pointLight position={[7, -2, -10]} intensity={34} color="#ff8a6c" distance={38} />
        <pointLight position={[-4, 3, -28]} intensity={24} color="#ffd36a" distance={34} />
        <ParticleField />
        <TunnelRings />
        <HeroStage progress={progress} />
        <CameraRig progress={progress} />
        <ExperiencePath />
        <SkillConstellation activeSkill={activeSkill} />
        <ProjectMonolith />
        <ContactBeacon />
      </Canvas>
    </div>
  );
}
