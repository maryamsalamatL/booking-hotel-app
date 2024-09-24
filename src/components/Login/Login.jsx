import { useEffect, useState } from "react";
import Input from "../Input/Input";
import styles from "./Login.module.scss";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated]);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <Input label="email" value={email} onChange={setEmail} />
          <Input label="password" value={password} onChange={setPassword} />
          <button
            disabled={!email || !password}
            type="submit"
            className="primaryBtn"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
