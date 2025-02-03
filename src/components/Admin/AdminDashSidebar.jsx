import React from "react";
import style from "./AdminDashSidebar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/FirebaseDB";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const AdminDashSidebar = ({ setHideAndShowDisplay, hideAndShowDisplay }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDisplay = () => {
    setHideAndShowDisplay(!hideAndShowDisplay);
  };
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
    }
  };
  return (
    <>
      <div
        className={`${style["sidebar-container"]}  navbar bg-primary sticky-top`}
      >
        <h1 className={style.adminName}>Hello Admin</h1>
        <div className={style.actions}>
          <NavLink className={style.dashLinks} to={"/"}>
            <Button variant="outline-light"> Home</Button>
          </NavLink>

          {hideAndShowDisplay ? (
            <Button variant="outline-light" onClick={handleDisplay}>
              Hide Create Blog
            </Button>
          ) : (
            <Button variant="outline-light" onClick={handleDisplay}>
              Create Blog
            </Button>
          )}
          <Button variant="outline-light" onClick={handleShow}>
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
              <Button
                variant="primary"
                onClick={() => {
                  handleClose(), handleLogout();
                }}
              >
                Log Out
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default AdminDashSidebar;
