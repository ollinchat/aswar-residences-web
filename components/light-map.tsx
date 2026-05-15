"use client";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { ASWAR_SITE } from "@/lib/site-location";

const CENTER = ASWAR_SITE.center;

/** Light / silver Carto basemap — init deferred until container has real dimensions (Leaflet / Strict Mode safe). */
export default function LightMap() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const el = rootRef.current;
    if (!el || !(el instanceof HTMLElement)) return;

    let cancelled = false;

    const tryInit = () => {
      if (cancelled) return false;
      const r = el.getBoundingClientRect();
      if (r.width >= 32 && r.height >= 32) {
        setMapReady(true);
        return true;
      }
      return false;
    };

    const ro = new ResizeObserver(() => {
      if (tryInit()) ro.disconnect();
    });
    ro.observe(el);

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      if (tryInit()) {
        ro.disconnect();
        return;
      }
      raf2 = requestAnimationFrame(() => {
        if (tryInit()) ro.disconnect();
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      ro.disconnect();
      setMapReady(false);
    };
  }, [mounted]);

  const pulseIcon = useMemo(
    () =>
      L.divIcon({
        className: "aswar-leaflet-icon",
        html: `<div class="aswar-marker-pulse-light"><span class="aswar-marker-text-light">ASWAR</span></div>`,
        iconSize: [84, 36],
        iconAnchor: [42, 18],
      }),
    [],
  );

  const shellClass =
    "relative z-0 h-[300px] min-h-[300px] w-full overflow-hidden sm:h-[480px] md:h-[600px]";

  return (
    <div ref={rootRef} className={shellClass}>
      {mounted && mapReady ? (
        <MapContainer
          key="aswar-light-map"
          center={CENTER}
          zoom={ASWAR_SITE.mapZoom}
          className="light-map-container z-0 h-full w-full min-h-[300px] overflow-hidden sm:min-h-[480px] md:min-h-[600px]"
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
          attributionControl
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            subdomains="abcd"
          />
          <Marker position={CENTER} icon={pulseIcon} />
        </MapContainer>
      ) : (
        <div
          className="flex h-[300px] w-full min-h-[300px] items-center justify-center bg-[#f4f4f5] sm:h-[480px] sm:min-h-[480px] md:h-[600px] md:min-h-[600px]"
          aria-busy="true"
        />
      )}
    </div>
  );
}
