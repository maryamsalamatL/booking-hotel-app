import { useNavigate } from "react-router-dom";
import styles from "./AddNewBookmark.module.scss";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useBookmarks } from "../context/BookmarksProvider";
import Input from "../Input/Input";

const BASE_GEOCODING_URL = "https://us1.locationiq.com/v1/reverse";

export default function AddNewBookmark() {
  const navigate = useNavigate();
  const { lat, lng } = useUrlLocation();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState(null);
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(null);
  const { createBookmark } = useBookmarks();
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (!lat && !lng) return;

    const getLocationData = async () => {
      setIsLoadingGeoCoding(true);
      setGeoCodingError(null);

      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?key=${API_KEY}&lat=${lat}&lon=${lng}&format=json&`
        );

        setCity(
          data.address.city ||
            data.address.town ||
            data.address.municipality ||
            data.address.state
        );
        setCountry(data.address.country);
        setCountryCode(data.address.country_code);
      } catch (error) {
        if (error?.response?.status === 404) {
          setGeoCodingError(
            "This location is not a city, please click somewhere else."
          );
        } else {
          setGeoCodingError(error.message);
        }
      } finally {
        setIsLoadingGeoCoding(false);
      }
    };
    getLocationData();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!city || !country) return;

    const newBookmark = {
      cityName: city,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: `${city} - ${country}`,
    };

    await createBookmark(newBookmark);
    navigate("/bookmarks");
  };

  if (isLoadingGeoCoding) return <Loader />;
  if (geoCodingError) return <p>{geoCodingError}</p>;

  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form onSubmit={handleSubmit} data-cy="add-bookmark-form">
        <Input label="city" value={city} onChange={setCity} />
        <Input label="country" value={country} onChange={setCountry} />
        <div className={styles.buttons}>
          <button
            className="secondaryBtn"
            data-cy="bookmark-back-btn"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr; Back
          </button>
          <button
            className="primaryBtn"
            type="submit"
            data-cy="add-bookmark-btn"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
