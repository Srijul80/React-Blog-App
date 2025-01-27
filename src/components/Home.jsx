import React from "react";
import Layout from "../layouts/Layout";
import "../components/Home.css";
import Blogs from "./Blogs";

export const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        padding: "50px",
        justifyContent: "space-evenly",
      }}
    >
      <Blogs />
      <Blogs />
      <Blogs />
      <Blogs />
    </div>
  );
};
