import { Toaster } from "react-hot-toast";
import "./App.scss";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import HotelsLayout from "./components/HotelsLayout/HotelsLayout";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import Hotels from "./components/Hotels/Hotels";

export default function App() {
  return (
    <div className="app">
      <Toaster />
      {/* TODO : before for header insted */}
      <div className="headerBackLayer"></div>
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<HotelsLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<SingleHotel />} />
        </Route>
      </Routes>
    </div>
  );
}
