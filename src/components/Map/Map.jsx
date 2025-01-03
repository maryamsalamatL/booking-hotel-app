import styles from "./Map.module.scss";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [singleMarker, setSingleMarker] = useState(null);
  const {
    getPosition,
    isLoading: isGeoLocationLoading,
    position: getLocationPosition,
  } = useGeolocation();

  useEffect(() => {
    if (lng && lat) {
      setMapCenter([lat, lng]);
      setSingleMarker({ lng, lat });
    }
  }, [lng, lat]);

  useEffect(() => {
    if (getLocationPosition?.lng && getLocationPosition?.lat)
      setMapCenter([getLocationPosition.lat, getLocationPosition.lng]);
  }, [getLocationPosition]);

  return (
    <>
      <Tip />
      <MapContainer
        style={{ height: "100%" }}
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <button
          className={styles.mapButton}
          onClick={(e) => {
            e.preventDefault();
            getPosition();
          }}
          data-cy="map-user-location-btn"
        >
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
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
        {singleMarker && (
          <Marker position={[singleMarker.lat, singleMarker.lng]}></Marker>
        )}
      </MapContainer>
    </>
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

function Tip() {
  const [isTipSeen, setIsTipSeen] = useState(!!localStorage.getItem("tip"));

  const handleTip = () => {
    setIsTipSeen(true);

    localStorage.setItem("tip", JSON.stringify(true));
  };

  return (
    <div
      className={`${styles.mapTip} ${isTipSeen ? styles.hide : styles.show}`}
      data-cy="map-tip"
    >
      <p>Click on map to bookmark any location.</p>
      <button className="primaryBtn" onClick={handleTip} data-cy="map-tip-btn">
        Ok
      </button>
    </div>
  );
}
