import React, { useEffect } from "react";
import AdminDashSidebar from "./AdminDashSidebar";
import { Footer } from "../../layouts/Footer";
import style from "./AdminDashboard.module.css";
import ManageBlogs from "./ManageBlogs";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      console.log("condition called");
      navigate("/");
    }
  }, []);
  return (
    <>
      <AdminDashSidebar />
      <ManageBlogs />

      <Footer />
    </>
  );
};

export default AdminDashboard;
