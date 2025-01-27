import React from "react";
import logo from "../Images/react_logo.png";
import style from "./Header.module.css";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header>
        <nav className={style.navbar}>
          <div className={style.logo}>
            <NavLink to={"/"}>
              <img id={style.logo} src={logo} alt="react logo" />
            </NavLink>

            <h3>App Name</h3>
          </div>
          <div className={style["action-btn"]}>
            <NavLink
              className={({ isActive }) =>
                `${style.btn} ${isActive ? style["active-link"] : style["btn"]}`
              }
              id="login"
              to={"/login"}
            >
              Login
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${style.btn} ${isActive ? style["active-link"] : style["btn"]}`
              }
              id={style.signup}
              to={"/signup"}
            >
              Sign Up
            </NavLink>
          </div>
        </nav>
      </header>
    </>
  );
};
