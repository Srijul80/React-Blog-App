import React from "react";
import style from "./Footer.module.css";

export const Footer = () => {
  return (
    <>
      <div id={style.footer} className="bg-primary">
        <p id={style["footer-text"]}>@Copyrigth 2025 Rijul sharma</p>
      </div>
    </>
  );
};
