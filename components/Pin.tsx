'use client';

import { ThreeEvent } from '@react-three/fiber';
import { Listing } from '@/data/listings';

export type PinProps = {
  listing: Listing;
  active: boolean;
  position: [number, number, number];
  onClick: (listing: Listing) => void;
};

export function Pin({ listing, active, position, onClick }: PinProps) {
  return (
    <group position={position}>
      <mesh
        onClick={(event: ThreeEvent<MouseEvent>) => {
          event.stopPropagation();
          onClick(listing);
        }}
      >
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color={active ? '#ef4444' : '#f97316'}
          emissive={active ? '#ef4444' : '#ea580c'}
          emissiveIntensity={active ? 0.9 : 0.4}
        />
      </mesh>
      <mesh scale={active ? 1.4 : 1}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}
