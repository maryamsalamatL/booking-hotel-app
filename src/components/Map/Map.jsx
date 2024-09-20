import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import useGeolocation from "../../hooks/useGeolocation";
import useUrlLocation from "../../hooks/useUrlLocation";

export default function Map({ markerLocations }) {
  const { lat, lng } = useUrlLocation();
  const [mapCenter, setMapCenter] = useState([40, 30]);
  const {
    getPosition,
    isLoading: isGeoLocationLoading,
    position: getLocationPosition,
  } = useGeolocation();

  useEffect(() => {
    if (lng && lat) setMapCenter([lat, lng]);
  }, [lng, lat]);

  useEffect(() => {
    if (getLocationPosition?.lng && getLocationPosition?.lat)
      setMapCenter([getLocationPosition.lat, getLocationPosition.lng]);
  }, [getLocationPosition]);

  return (
    <MapContainer
      style={{ height: "100%" }}
      center={mapCenter}
      zoom={13}
      scrollWheelZoom={true}
    >
      <button className="map-button" onClick={getPosition}>
        {isGeoLocationLoading ? "Loading ..." : "use your location"}
      </button>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      <ChangeCenter position={mapCenter} />
      <DetectClick />
      {markerLocations.map((item) => (
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

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click(e) {
      navigate(`/bookmarks/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });

  return null;
}
