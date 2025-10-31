'use client';

import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Listing } from '@/data/listings';
import { Pin } from './Pin';

export type GlobeProps = {
  listings: Listing[];
  selectedListing?: Listing | null;
  onSelect: (listing: Listing) => void;
};

const EARTH_RADIUS = 1.8;

function latLongToVector3(latitude: number, longitude: number, radius: number) {
  const lat = THREE.MathUtils.degToRad(latitude);
  const lon = THREE.MathUtils.degToRad(longitude);
  const x = radius * Math.cos(lat) * Math.cos(lon);
  const y = radius * Math.sin(lat);
  const z = radius * Math.cos(lat) * Math.sin(lon);
  return new THREE.Vector3(x, y, z);
}

function GlobeScene({ listings, selectedListing, onSelect }: GlobeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const textures = useTexture({
    map: 'https://raw.githubusercontent.com/creativetimofficial/public-assets/master/threejs/earth_day.jpg',
    bumpMap: 'https://raw.githubusercontent.com/creativetimofficial/public-assets/master/threejs/earth_bump.jpg'
  });

  const targetPosition = useMemo(() => {
    if (!selectedListing) {
      return new THREE.Vector3(0, 0, 6);
    }
    const focusPoint = latLongToVector3(
      selectedListing.coordinates[1],
      selectedListing.coordinates[0],
      EARTH_RADIUS + 0.5
    );
    return focusPoint.clone().normalize().multiplyScalar(3.3);
  }, [selectedListing]);

  useFrame((state, delta) => {
    const lerpFactor = 1 - Math.pow(0.08, delta * 60);
    if (groupRef.current && !selectedListing) {
      groupRef.current.rotation.y += delta * 0.15;
    }
    camera.position.lerp(targetPosition, lerpFactor);
    camera.lookAt(0, 0, 0);
    if (typeof window !== 'undefined') {
      state.gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    }
  });

  return (
    <group ref={groupRef}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
        <meshStandardMaterial
          map={textures.map}
          bumpMap={textures.bumpMap}
          bumpScale={0.05}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {listings.map((listing) => {
        const position = latLongToVector3(
          listing.coordinates[1],
          listing.coordinates[0],
          EARTH_RADIUS + 0.1
        );
        return (
          <Pin
            key={listing.id}
            listing={listing}
            position={[position.x, position.y, position.z]}
            active={selectedListing?.id === listing.id}
            onClick={onSelect}
          />
        );
      })}
    </group>
  );
}

export function Globe(props: GlobeProps) {
  return (
    <div className="relative h-[55vh] w-full min-h-[320px] flex-1 overflow-hidden rounded-3xl bg-black/90 shadow-2xl">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]}>
        <color attach="background" args={[0x020617]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 4, 2]} intensity={1.2} castShadow />
        <Suspense fallback={null}>
          <GlobeScene {...props} />
          <Stars
            radius={100}
            depth={50}
            count={3000}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />
    </div>
  );
}
