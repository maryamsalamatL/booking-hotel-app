import { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const hotelsContext = createContext();

export default function HotelsProvider({ children }) {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const options = JSON.parse(searchParams.get("options"));
  const room = options?.room;
  const requiredBeds = options?.adult + options?.children;

  const { isLoading, data: hotels } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${room}&beds_gte=${requiredBeds}`
  );

  return (
    <hotelsContext.Provider value={{ hotels, isLoading }}>
      {children}
    </hotelsContext.Provider>
  );
}

export const useHotels = () => useContext(hotelsContext);
