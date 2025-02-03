import React, { useState } from "react";
import logo from "../Images/react_logo.png";
import style from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "../utils/FirebaseDB";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export const Header = () => {
  let isLoggedIn = localStorage.getItem("token") ? true : false;
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = async () => {
    if (show) {
      await signOut(auth)
        .then(() => {
          toast.success("Signout Succesful");
          localStorage.removeItem("token");
          navigate("/");
          console.log("Signed out successfully");
        })
        .catch((error) => {
          toast.error(error.message);
        });
      handleClose();
    }
  };

  return (
    <>
      <header className="sticky-top">
        <nav className={`${style.navbar} bg-primary`}>
          <div className={style.logo}>
            <NavLink to={"/"}>
              <img id={style.logo} src={logo} alt="react logo" />
            </NavLink>

            <h3>React Blog App</h3>
          </div>
          <div className={style["action-btn"]}>
            {isLoggedIn ? (
              <>
                <NavLink id={style.signup} to={"/"}>
                  <Button variant="outline-light  px-3">Home</Button>
                </NavLink>
                <NavLink
                  // className={({ isActive }) =>
                  //   `${style.btn} ${
                  //     isActive ? style["active-link"] : style["btn"]
                  //   }`
                  // }
                  id={style.signup}
                  to={"/dashboard"}
                >
                  <Button variant="outline-light">Dashboard</Button>
                </NavLink>
                <NavLink className={style.btn} id="login" to={"/"}>
                  <Button variant="outline-light px-3" onClick={handleShow}>
                    Log Out
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Log out</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you wanna Logout?</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleLogout}>
                        Log Out
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  className={({ isActive }) =>
                    `${style.btn} ${
                      isActive ? style["active-link"] : style["btn"]
                    }`
                  }
                  id={style.signup}
                  to={"/"}
                >
                  <Button variant="outline-light">Home</Button>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `${style.btn}  ${
                      isActive ? style["active-link"] : style["btn"]
                    }`
                  }
                  id="login"
                  to={"/login"}
                >
                  <Button variant="outline-light">Login</Button>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `${style.btn} ${
                      isActive ? style["active-link"] : style["btn"]
                    }`
                  }
                  id={style.signup}
                  to={"/signup"}
                >
                  <Button variant="outline-light">Sign Up</Button>
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};
