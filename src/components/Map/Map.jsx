import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

export default function Map() {
  const { hotels } = useHotels();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const [mapCenter, setMapCenter] = useState([40, 30]);

  useEffect(() => {
    if ((lng, lat)) setMapCenter([lat, lng]);
  }, [lng, lat]);

  return (
    <MapContainer
      style={{ height: "100%" }}
      center={mapCenter}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      <ChangeCenter position={mapCenter} />
      {hotels.map((item) => (
        <Marker key={item.id} position={[item.latitude, item.longitude]}>
          <Popup>{item.smart_location}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
