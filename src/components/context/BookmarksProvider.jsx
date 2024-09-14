import { createContext, useContext } from "react";
import useFetch from "../../hooks/useFetch";

const bookmarksContext = createContext();

export default function BookmarksProvider({ children }) {
  // TODO: BASEURL constant
  const { data: bookmarks, isLoading } = useFetch(
    "http://localhost:5000/bookmarks"
  );

  return (
    <bookmarksContext.Provider value={{ bookmarks, isLoading }}>
      {children}
    </bookmarksContext.Provider>
  );
}

export const useBookmarks = () => useContext(bookmarksContext);
