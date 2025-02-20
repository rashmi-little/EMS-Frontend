import React, { useRef, useState } from "react";
import styles from "../../css/LoginForm.module.css";
import { useNavigate } from "react-router-dom";
import { isAuthenticate } from "../../services/authservice";

const LoginPage = () => {
  const [error, setError] = useState("");
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    localStorage.setItem("username", username); 
    localStorage.setItem("password", password);

    if (isAuthenticate()) {
      navigate("/dashboard");
    } else {
      setError("invalid username or password");
    }
  }

  return (
    <div className={styles.login_container}>
      <div className={styles.login_card}>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.input_group}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              ref={usernameRef}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className={styles.input_group}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p>{error}</p>}
          <button type="submit" className={styles.btn}>
            Login
          </button>
        </form>
        <a href="#" className={styles.link}>
          Don't have an account? <span>Sign up</span>
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
