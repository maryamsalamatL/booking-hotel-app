import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSetCurrentBookmarkId } from "../context/BookmarksProvider";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";

export default function SingleBookmark() {
  const { id } = useParams();
  const { isLoading, data } = useFetch(`http://localhost:5000/bookmarks/${id}`);
  const { cityName } = data;
  const setCurrentBookmarkId = useSetCurrentBookmarkId();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentBookmarkId(id);
  }, [id]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <h2>{cityName}</h2>
      <button onClick={() => navigate(-1)}>&larr; Back</button>
      {/* TODO: implement this component */}
    </div>
  );
}
