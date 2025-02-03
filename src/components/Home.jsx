import React, { useEffect } from "react";
import style from "../components/Home.module.css";
import Blogs from "./Blogs";

export const Home = ({ data, fetchData }) => {
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className={`${style.homeContainer} container-fluid`}>
        {data.map((item) => (
          <Blogs key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};
