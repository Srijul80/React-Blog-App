import React from "react";
import style from "./AdminDashSidebar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/FirebaseDB";

const AdminDashSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    let confirmLogout = confirm("Are you sure to Logout");
    console.log(confirmLogout);
    if (confirmLogout) {
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
      <div className={style["sidebar-container"]}>
        <h1 className={style.adminName}>Hello Admin</h1>
        <div className={style.actions}>
          <NavLink className={style.dashLinks} to={"/"}>
            Home
          </NavLink>
          <NavLink className={style.dashLinks} onClick={handleLogout}>
            Logout
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminDashSidebar;
