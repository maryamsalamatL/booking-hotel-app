import { Toaster } from "react-hot-toast";
import "./App.scss";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";

export default function App() {
  return (
    <div className="app">
      <Toaster />
      <div className="headerBackLayer"></div>
      <Header />
      <LocationList />
    </div>
  );
}
