import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toastText = location.pathname.includes("add")
    ? "To bookmark any location, please login first."
    : "To access the bookmarks, please login first.";

  useEffect(() => {
    if (!isAuthenticated) {
      toast(toastText);
      navigate("/login");
    }
  }, [isAuthenticated]);

  return isAuthenticated ? children : null;
}
