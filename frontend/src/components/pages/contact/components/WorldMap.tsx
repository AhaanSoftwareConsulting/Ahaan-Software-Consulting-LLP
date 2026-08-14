import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const WorldMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Custom red marker icon
    const redIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // Create map
    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
    });

    mapInstanceRef.current = map;

    // OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Locations
    const markers = [
      L.marker([22.5744, 88.3629], {
        icon: redIcon,
      }).bindPopup("<strong>India</strong>"),

      L.marker([1.3521, 103.8198], {
        icon: redIcon,
      }).bindPopup("<strong>Singapore</strong>"),

      L.marker([39.8283, -98.5795], {
        icon: redIcon,
      }).bindPopup("<strong>USA</strong>"),
    ];

    // Add markers
    const group = L.featureGroup(markers).addTo(map);

    // Fit all markers
    const fitMap = () => {
      if (!mapInstanceRef.current) return;

      mapInstanceRef.current.invalidateSize();

      mapInstanceRef.current.fitBounds(group.getBounds(), {
        padding: [50, 50],
        maxZoom: 4,
      });
    };

    // Initial map sizing
    setTimeout(() => {
      fitMap();
    }, 100);

    // Responsive resize
    const handleResize = () => {
      fitMap();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);

      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div className="flex w-full justify-center">
      <div
        ref={mapRef}
        className="
          w-full
          h-[50vh]
          min-h-[320px]
          max-h-[700px]
          overflow-hidden
          rounded-xl

          sm:h-[55vh]

          md:h-[60vh]

          lg:h-[60vh]

          xl:h-[65vh]
        "
      />
    </div>
  );
};

export default WorldMap;