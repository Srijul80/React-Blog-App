import React from "react";
import style from "../components/Blogs.module.css";
import demoImg from "../Images/blogimg.jpg";
const Blogs = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style.blogImg}>
          <img src={demoImg} alt="blogimg" />
        </div>
        <div className={style.blogData}>
          <h3 className={style.blogHeading}>Blog Title</h3>

          <p className={style.blogText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
            mollitia quod similique autem eaque nihil dolor alias tenetur
            aliquid ut
          </p>
          <button className={style.readMore}>Readmore</button>
        </div>
      </div>
    </>
  );
};

export default Blogs;
