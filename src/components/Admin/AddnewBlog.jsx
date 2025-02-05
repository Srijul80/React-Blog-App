import React, { useEffect, useState } from "react";
import style from "./AddnewBlog.module.css";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../utils/FirebaseDB";

const AddnewBlog = ({
  fetchData,
  editBlog,
  editButtonClicked,
  hideAndShowDisplay,
}) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
    if (editBlog) {
      setBlogTitle(editBlog[0]?.title || "");
      setBlogContent(editBlog[0]?.content || "");
      setImagePath(editBlog[0]?.image || "");
    }
  }, [editBlog]);

  const handleBlogPublish = async (e) => {
    e.preventDefault();
    console.log(imagePath);
    try {
      if (editButtonClicked && editBlog) {
        // Update existing blog
        const blogRef = doc(db, "blogs", editBlog[0].id);
        await updateDoc(blogRef, {
          title: blogTitle.slice(0, 50),
          content: blogContent.slice(0, 5000),
          image: imagePath,
        });
      } else {
        // Add new blog
        await addDoc(collection(db, "blogs"), {
          title: blogTitle.slice(0, 50),
          content: blogContent.slice(0, 5000),
          image: imagePath,
        });
      }

      setBlogTitle("");
      setBlogContent("");
      setImagePath("");
      fetchData();
    } catch (err) {
      console.error("Error adding/updating document: ", err);
      alert("Error processing request.");
    }
  };

  return (
    <>
      {hideAndShowDisplay ? (
        <form onSubmit={handleBlogPublish}>
          <div className={style.container}>
            <div className={style.blogTitle}>
              <h2>Add Blog Title</h2>
              <input
                type="text"
                placeholder="Add Blog Title"
                onChange={(e) => setBlogTitle(e.target.value)}
                value={blogTitle}
                required
              />
            </div>

            <div className={style.blogText}>
              <h2>Add Blog Content</h2>
              <textarea
                name="blogContent"
                id={style.blogContent}
                rows={10}
                onChange={(e) => setBlogContent(e.target.value)}
                required
                value={blogContent}
              ></textarea>
            </div>

            <div className={style.blogimage}>
              <h2>Enter Image path</h2>
              <input
                type="text"
                placeholder="paste you input path here.."
                className="w-100 p-2"
                onChange={(e) => {
                  setImagePath(e.target.value);
                }}
                value={imagePath}
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className={
                  editButtonClicked
                    ? "btn btn-danger container-fluid"
                    : "btn btn-primary  container-fluid"
                }
              >
                {editButtonClicked ? "Update" : "Publish"}
              </button>
            </div>
          </div>
        </form>
      ) : null}
    </>
  );
};

export default AddnewBlog;
