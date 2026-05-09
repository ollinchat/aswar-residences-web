"use client";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

const CENTER: [number, number] = [25.1868, 55.2658];

/** Dark basemap (Carto) — same centre as light map for consistency. */
export default function DarkMap() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
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
  }, []);

  const pulseIcon = useMemo(
    () =>
      L.divIcon({
        className: "aswar-leaflet-icon",
        html: `<div class="aswar-marker-pulse-dark"><span class="aswar-marker-text-dark">ASWAR</span></div>`,
        iconSize: [84, 36],
        iconAnchor: [42, 18],
      }),
    [],
  );

  return (
    <div
      ref={rootRef}
      className="relative z-0 h-[300px] w-full min-h-[300px] overflow-hidden sm:h-[min(480px,58vh)] sm:min-h-[360px] md:h-[480px]"
    >
      {mapReady ? (
        <MapContainer
          key="aswar-dark-map"
          center={CENTER}
          zoom={13}
          className="dark-map-container z-0 h-full w-full min-h-[300px] overflow-hidden sm:min-h-[360px]"
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
          attributionControl
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            subdomains="abcd"
          />
          <Marker position={CENTER} icon={pulseIcon} />
        </MapContainer>
      ) : (
        <div
          className="flex h-[300px] w-full min-h-[300px] items-center justify-center bg-[#1a1a1a] sm:h-full sm:min-h-[360px]"
          aria-busy="true"
        />
      )}
    </div>
  );
}
