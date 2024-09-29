import { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";

const authContext = createContext({});

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!JSON.parse(localStorage.getItem("user")),
};

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case "login":
      return { user: payload, isAuthenticated: true };
    case "logout":
      return { user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action type !");
  }
};

const FAKE_USER = {
  name: "Maryam",
  email: "test@gmail.com",
  password: "1234",
};

export default function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
      localStorage.setItem("user", JSON.stringify(FAKE_USER));
    } else toast.error("wrong email or password !");
  };

  const logout = () => {
    dispatch({ type: "logout" });
    localStorage.removeItem("user");
  };

  return (
    <authContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
