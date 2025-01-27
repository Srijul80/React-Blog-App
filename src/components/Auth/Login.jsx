import React, { useState } from "react";
import style from "./Login.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/FirebaseDB";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const token = user?.accessToken;
        localStorage.setItem("token", token);
        navigate("/dashboard");
        toast.success("Login Successfully");
        // console.log(token, userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <div className={style.container}>
      <h2 id={style.loginHeading}>Login</h2>
      <form id={style.login_form} onSubmit={handleLogin}>
        <div className={style.email}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className={style.password}>
          <input
            type="password"
            placeholder="Enter your password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className={style["login_signup_btn"]}>
          <button type="submit" className={style.loginButton}>
            Login
          </button>

          <NavLink to={"/signup"} className={style.signUpButton}>
            Sign Up
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
