import { HiBookmark, HiLogout } from "react-icons/hi";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

export default function HeaderBackLayer() {
  return (
    <div className="headerBackLayer">
      <Link to={"/bookmarks"} className="box">
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
    <>
      {isAuthenticated ? (
        <div className="box">
          <p>{user.name}</p>&nbsp;
          <button onClick={logout} style={{display:'flex'}}>
            <HiLogout />
          </button>
        </div>
      ) : (
        <Link to="/login">
          <p>Login</p>
        </Link>
      )}
    </>
  );
}
