"use client";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useMemo } from "react";
import "leaflet/dist/leaflet.css";

const CENTER: [number, number] = [25.1868, 55.2658];

export default function DarkMap() {
  const pulseIcon = useMemo(
    () =>
      L.divIcon({
        className: "aswar-leaflet-icon",
        html: `<div class="aswar-marker-pulse"><span class="aswar-marker-text">ASWAR</span></div>`,
        iconSize: [88, 40],
        iconAnchor: [44, 20],
      }),
    [],
  );

  return (
    <MapContainer
      center={CENTER}
      zoom={13}
      className="z-0 h-[min(480px,58vh)] w-full min-h-[360px] overflow-hidden md:h-[480px]"
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
  );
}
