import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSetCurrentBookmarkId } from "../context/BookmarksProvider";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";

export default function SingleBookmark() {
  const { id } = useParams();
  const { isLoading, data } = useFetch(
    `${import.meta.env.VITE_BASE_URL}/bookmarks/${id}`
  );
  const { cityName, country, countryCode } = data;
  const setCurrentBookmarkId = useSetCurrentBookmarkId();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentBookmarkId(id);
  }, [id]);

  if (isLoading) return <Loader />;

  return (
    <div data-cy="single-bookmark">
      <div>
        <h2 className="centralize">
          <ReactCountryFlag countryCode={countryCode} svg /> &nbsp;
          {cityName} - {country}
        </h2>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="secondaryBtn"
        data-cy="single-bookmark-back-btn"
      >
        &larr; Back
      </button>
    </div>
  );
}
