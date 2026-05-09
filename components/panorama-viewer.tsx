"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { X } from "lucide-react";

function PanoramaSphere({ url }: { url: string }) {
  const [map, setMap] = useState<THREE.Texture | null>(null);
  const mapRef = useRef<THREE.Texture | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loader = new THREE.TextureLoader();
    loader.load(url, (texture) => {
      if (cancelled) {
        texture.dispose();
        return;
      }
      if (mapRef.current) {
        mapRef.current.dispose();
      }
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.generateMipmaps = true;
      texture.needsUpdate = true;
      mapRef.current = texture;
      setMap(texture);
    });
    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.dispose();
        mapRef.current = null;
      }
      setMap(null);
    };
  }, [url]);

  if (!map) return null;

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, 96, 64]} />
      <meshBasicMaterial map={map} side={THREE.BackSide} />
    </mesh>
  );
}

function Scene({ url }: { url: string }) {
  return (
    <>
      <Suspense fallback={null}>
        <PanoramaSphere url={url} />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={-0.38}
        minPolarAngle={Math.PI / 2.35}
        maxPolarAngle={Math.PI / 1.78}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
}

type PanoramaViewerModalProps = {
  open: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
};

export function PanoramaViewerModal({
  open,
  onClose,
  imageSrc,
  title,
}: PanoramaViewerModalProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-charcoal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-parchment/10 px-6 py-4 md:px-10">
            <p className="font-serif text-lg font-medium tracking-wide text-parchment md:text-xl">
              {title}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-parchment/20 text-parchment transition-colors hover:border-champagne hover:text-champagne"
              aria-label="Close"
            >
              <X className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>
          <div className="relative min-h-0 flex-1">
            <Canvas
              key={imageSrc}
              camera={{ position: [0, 0, 0.01], fov: 72, near: 0.1, far: 2000 }}
              gl={{
                antialias: true,
                alpha: false,
                powerPreference: "high-performance",
              }}
              dpr={[1, Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 2)]}
              className="h-full w-full touch-none"
            >
              <Scene url={imageSrc} />
            </Canvas>
            <p className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center font-mono text-[9px] uppercase tracking-[0.3em] text-parchment/45">
              Drag to look around · WebGL panorama
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
