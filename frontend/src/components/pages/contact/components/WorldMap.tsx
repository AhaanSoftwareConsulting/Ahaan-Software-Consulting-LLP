import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

// World Map TopoJSON dataset URL
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface LocationMarker {
  name: string;
  coordinates: [number, number]; // [Longitude, Latitude]
}

const locations: LocationMarker[] = [
  { name: "United States", coordinates: [-95.7129, 37.0902] },
  { name: "India", coordinates: [78.9629, 20.5937] },
  { name: "Singapore", coordinates: [103.8198, 1.3521] },
];

export const WorldMap: React.FC = () => {
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [position, setPosition] = useState({ coordinates: [20, 20], zoom: 1 });

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((prev) => ({ ...prev, zoom: prev.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((prev) => ({ ...prev, zoom: prev.zoom / 1.5 }));
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#161616] p-0">
      {/* Reduced Height & Edge-to-Edge Container */}
      <div className="relative w-full h-[320px] sm:h-[400px] md:h-[450px]">
        {/* Zoom Controls */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 rounded-lg border border-slate-700 bg-slate-900/90 p-1 shadow-xl backdrop-blur-md">
          <button
            onClick={handleZoomIn}
            className="flex h-7 w-7 items-center justify-center rounded bg-slate-800 font-bold text-white transition hover:bg-slate-700 active:scale-95 text-xs"
            title="Zoom In"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            className="flex h-7 w-7 items-center justify-center rounded bg-slate-800 font-bold text-white transition hover:bg-slate-700 active:scale-95 text-xs"
            title="Zoom Out"
          >
            −
          </button>
        </div>

        {/* Active Hover Tooltip */}
        {tooltipContent && (
          <div className="absolute top-4 right-4 z-10 rounded-lg bg-[#FFD700] px-3 py-1.5 text-xs font-bold text-slate-950 shadow-xl backdrop-blur-sm">
            {tooltipContent}
          </div>
        )}

        {/* Full-Bleed Map Component */}
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{
            scale: 450, // Expanded Zoom Level to cover edges completely
            center: [20, 15], // Focused geographically to USA, India, Singapore center point
          }}
          className="w-full h-full object-cover"
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates as [number, number]}
            onMoveEnd={(pos: any) => setPosition(pos)}
          >
            {/* Dark Styled World Countries */}
            <Geographies geography={geoUrl}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo: any) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#434343" // Soft Slate Blue Country Color
                    stroke="#666666" // Subtle Light Border
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#929292", outline: "none" },
                      pressed: { fill: "#7a7a7a", outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Glowing Gold Markers */}
            {locations.map(({ name, coordinates }) => (
              <Marker key={name} coordinates={coordinates}>
                <g
                  className="group cursor-pointer"
                  onMouseEnter={() => setTooltipContent(name)}
                  onMouseLeave={() => setTooltipContent(null)}
                >
                  {/* Outer Pulsing Glow */}
                  <circle
                    r={12}
                    className="animate-ping opacity-80"
                    fill="#FFD700"
                  />

                  {/* Golden Outer Ring */}
                  <circle
                    r={8}
                    fill="#FFD700"
                    fillOpacity={0.35}
                    stroke="#FFD700"
                    strokeWidth={1.5}
                  />

                  {/* Solid Center Bright Gold Dot */}
                  <circle
                    r={4}
                    fill="#FFD700"
                    stroke="#000000"
                    strokeWidth={1.5}
                  />

                  {/* Always Visible Text Label */}
                  <text
                    textAnchor="middle"
                    y={-12}
                    className="pointer-events-none fill-[#FFD700] text-[16px] font-semibold drop-shadow-md"
                  >
                    {name}
                  </text>
                </g>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </section>
  );
};
