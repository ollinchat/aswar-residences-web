"use client";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

const CENTER: [number, number] = [25.1868, 55.2658];

/** Light / silver Carto basemap with minimal gold pulse marker. */
export default function LightMap() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !(el instanceof HTMLElement)) return;

    setMapReady(true);
    return () => {
      setMapReady(false);
    };
  }, []);

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

  return (
    <div
      ref={rootRef}
      className="relative z-0 h-[min(480px,58vh)] w-full min-h-[360px] overflow-hidden md:h-[480px]"
    >
      {mapReady ? (
        <MapContainer
          key="aswar-light-map"
          center={CENTER}
          zoom={13}
          className="light-map-container z-0 h-full w-full min-h-[360px] overflow-hidden"
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
          className="flex h-full min-h-[360px] w-full items-center justify-center bg-[#f4f4f5]"
          aria-busy="true"
        />
      )}
    </div>
  );
}
