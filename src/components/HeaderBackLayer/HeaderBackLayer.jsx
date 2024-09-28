import { HiBookmark, HiHome, HiLogout } from "react-icons/hi";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

export default function HeaderBackLayer() {
  return (
    <div className="headerBackLayer">
      <Link to="/" className="box">
        <HiHome />
        <p>Home</p>
      </Link>
      <Link to="/bookmarks" className="box">
        <HiBookmark />
        <p>Bookmarks</p>
      </Link>
      <User />
    </div>
  );
}

function User() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="box user">
      {isAuthenticated ? (
        <>
          <p>{user.name}</p>&nbsp;
          <button onClick={logout} style={{ display: "flex" }}>
            <HiLogout />
          </button>
        </>
      ) : (
        <Link to="/login">
          <p>Login</p>
        </Link>
      )}
    </div>
  );
}
