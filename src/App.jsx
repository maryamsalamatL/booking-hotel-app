import { Toaster } from "react-hot-toast";
import "./App.scss";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import HotelsLayout from "./components/HotelsLayout/HotelsLayout";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./components/context/HotelsProvider";
import BookmarksLayout from "./components/BookmarksLayout/BookmarksLayout";
import BookmarksProvider from "./components/context/BookmarksProvider";
import Bookmarks from "./components/Bookmarks/Bookmarks";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";
import Login from "./components/Login/Login";
import AuthProvider from "./components/context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import HeaderBackLayer from "./components/HeaderBackLayer/HeaderBackLayer";

export default function App() {
  return (
    <AuthProvider>
      <HotelsProvider>
        <BookmarksProvider>
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
        </BookmarksProvider>
      </HotelsProvider>
    </AuthProvider>
  );
}
