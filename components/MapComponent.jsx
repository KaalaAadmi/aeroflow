"use client";
import mapboxgl from "mapbox-gl";
import { useEffect } from "react";
import { MapPin } from "lucide-react";
import ReactDOM from "react-dom";

export default function MapComponent({ id, classname, longitude, latitude }) {
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

    // Destroy previous map instance before creating a new one
    const existingMap = document
      .getElementById(id)
      ?.querySelector(".mapboxgl-map");
    if (existingMap) existingMap.remove();

    const map = new mapboxgl.Map({
      container: id, // Ensure this container is unique
      style: "mapbox://styles/mapbox/dark-v11",
      center: [longitude, latitude],
      zoom: 12,
      attributionControl: false,
      //   boxZoom: true,
      pitch: 0,
    });

    // Create a custom HTML marker element
    const markerElement = document.createElement("div");
    markerElement.className = "custom-marker";

    // Render the MapPin component into the custom marker element
    ReactDOM.render(<MapPin color="blue" size={32} />, markerElement);

    // Attach the marker to the map at the specified coordinates
    new mapboxgl.Marker({ element: markerElement, anchor: "center" })
      .setLngLat([longitude, latitude])
      .addTo(map);

    // Clean up on unmount to avoid multiple map instances
    return () => map.remove();
  }, []);

  return (
    <div
      id={id}
      //   className={classname}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
