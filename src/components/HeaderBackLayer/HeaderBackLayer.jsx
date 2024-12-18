import { HiBookmark, HiHome, HiLogout } from "react-icons/hi";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

export default function HeaderBackLayer() {
  return (
    <div className="headerBackLayer" data-cy="header-back-layer">
      <Link to="/" className="box" data-cy="header-home-link">
        <HiHome />
        <p>Home</p>
      </Link>
      <Link to="/bookmarks" className="box" data-cy="header-bookmark-link">
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
          <p data-cy="user-name">{user.name}</p>&nbsp;
          <button
            onClick={logout}
            style={{ display: "flex" }}
            data-cy="logout-btn"
          >
            <HiLogout />
          </button>
        </>
      ) : (
        <Link to="/login" data-cy="login-link">
          <p>Login</p>
        </Link>
      )}
    </div>
  );
}
