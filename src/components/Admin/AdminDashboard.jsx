import React, { useEffect, useState } from "react";
import AdminDashSidebar from "./AdminDashSidebar";
import { Footer } from "../../layouts/Footer";
import style from "./AdminDashboard.module.css";
import ManageBlogs from "./ManageBlogs";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  let token = localStorage.getItem("token");

  const [hideAndShowDisplay, setHideAndShowDisplay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <AdminDashSidebar
        setHideAndShowDisplay={setHideAndShowDisplay}
        hideAndShowDisplay={hideAndShowDisplay}
      />
      <ManageBlogs
        hideAndShowDisplay={hideAndShowDisplay}
        setHideAndShowDisplay={setHideAndShowDisplay}
      />
      <Footer />
    </>
  );
};

export default AdminDashboard;
