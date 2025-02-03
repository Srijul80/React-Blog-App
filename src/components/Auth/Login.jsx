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
    <div className={`${style.mainOuterContainer} container-fluid`}>
      <div className={`${style.container}`}>
        <h2 id={style.loginHeading}>Login</h2>
        <form id={style["login_form"]} onSubmit={handleLogin}>
          <div className={`${style.email} mb-3`}>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className={`${style.password} mb-3 `}>
            <input
              type="password"
              className="form-control p-2"
              placeholder="Enter your password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className={style["login_signup_btn"]}>
            <button type="submit" className="btn btn-primary">
              Login
            </button>

            <NavLink to={"/signup"} className="btn btn-danger">
              Sign Up
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
