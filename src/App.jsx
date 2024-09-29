import "./App.scss";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import HotelsLayout from "./components/HotelsLayout/HotelsLayout";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import Hotels from "./components/Hotels/Hotels";
import BookmarksLayout from "./components/BookmarksLayout/BookmarksLayout";
import Bookmarks from "./components/Bookmarks/Bookmarks";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import HeaderBackLayer from "./components/HeaderBackLayer/HeaderBackLayer";
import Providers from "./components/context/Providers";

export default function App() {
  return (
    <Providers>
      <div className="app">
        <Toaster />
        <HeaderBackLayer />
        <Header />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<HotelsLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
          <Route
            path="/bookmarks"
            element={
              <ProtectedRoute>
                <BookmarksLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Bookmarks />} />
            <Route path=":id" element={<SingleBookmark />} />
            <Route path="add" element={<AddNewBookmark />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Providers>
  );
}
