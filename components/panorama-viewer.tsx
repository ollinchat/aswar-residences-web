"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { X } from "lucide-react";
import { useLang } from "@/components/language-provider";

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
  const { t } = useLang();

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
          className="fixed inset-0 z-[102] flex items-center justify-center p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-charcoal/45 backdrop-blur-[6px]"
            aria-label="Close overlay"
            onClick={onClose}
          />
          <motion.div
            className="relative z-10 flex max-h-[min(88vh,920px)] w-full max-w-5xl flex-col overflow-hidden rounded-[2px] bg-charcoal shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.99 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between px-5 py-4 md:px-7">
              <p className="max-w-[80%] font-serif text-base font-normal tracking-wide text-white/95 md:text-lg">
                {title}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-[2px] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" strokeWidth={1.25} />
              </button>
            </div>
            <div className="relative min-h-0 flex-1 bg-charcoal">
              <Canvas
                key={imageSrc}
                camera={{ position: [0, 0, 0.01], fov: 72, near: 0.1, far: 2000 }}
                gl={{
                  antialias: true,
                  alpha: false,
                  powerPreference: "high-performance",
                }}
                dpr={[1, Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 2)]}
                className="h-[min(72vh,640px)] w-full touch-none md:h-[min(68vh,720px)]"
              >
                <Scene url={imageSrc} />
              </Canvas>
              <p className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-center font-mono text-[9px] uppercase tracking-[0.28em] text-white/40">
                {t("dragPanorama")}
              </p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
