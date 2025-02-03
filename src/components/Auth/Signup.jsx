import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Signup.module.css";
import { NavLink } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/FirebaseDB";
import toast from "react-hot-toast";

const SignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassowrd, setConfirmPassword] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    if (password == confirmpassowrd) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          // Signed in
          const user = userCredential.user;
          toast.success("Signup Succesfully", 5000);
          console.log(user);

          navigate("/login");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          toast.error(errorMessage, { duration: 5000 });
          // ..
        });
    } else {
      toast.error("password doesn't Match");
    }
  };
  return (
    <div className={`${style.mainOuterContainer} container-fluid`}>
      {" "}
      <div className={style.container}>
        <h2 id={style.loginHeading}>Sign Up</h2>
        <form id={style["signup_form"]} onSubmit={handleSubmit}>
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
          <div className={`${style.password} mb-3 `}>
            <input
              type="password"
              className="form-control p-2"
              placeholder="Confirm your password"
              required
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>

          <div className={style["login_signup_btn"]}>
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>

            <NavLink to={"/login"} className="btn btn-danger">
              Login
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
