import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationMarker({ formData, setFormData, onLocationChange }) {
  const map = useMapEvents({
    click(e) {
      setFormData((prev) => ({
        ...prev,
        latitude: e.latlng.lat.toFixed(6),
        longitude: e.latlng.lng.toFixed(6),
      }));
      onLocationChange?.(e.latlng.lat, e.latlng.lng);

      map.flyTo(e.latlng, 15);
    },
  });

  useEffect(() => {
    if (formData.latitude && formData.longitude) {
      map.setView([Number(formData.latitude), Number(formData.longitude)], 15);
    }
  }, [formData.latitude, formData.longitude]);

  if (!formData.latitude || !formData.longitude) return null;

  return (
    <Marker
      position={[Number(formData.latitude), Number(formData.longitude)]}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const pos = e.target.getLatLng();

          setFormData((prev) => ({
            ...prev,
            latitude: pos.lat.toFixed(6),
            longitude: pos.lng.toFixed(6),
          }));
          onLocationChange?.(pos.lat, pos.lng);
        },
      }}
    />
  );
}

export default function MapPicker({ formData, setFormData, onLocationChange }) {
  return (
    <MapContainer
      center={[26.9124, 75.7873]}
      zoom={13}
      style={{
        height: "250px",
        width: "100%",
        borderRadius: "18px",
      }}
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker
        formData={formData}
        setFormData={setFormData}
        onLocationChange={onLocationChange}
      />
    </MapContainer>
  );
}
