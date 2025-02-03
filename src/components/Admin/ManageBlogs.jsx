import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/FirebaseDB";
import style from "./ManageBlogs.module.css";
import AddnewBlog from "./AddnewBlog";
import FetchData from "./FetchData";

const ManageBlogs = ({ hideAndShowDisplay, setHideAndShowDisplay }) => {
  const [data, setData] = useState([]);
  const [editBlog, setEditBlog] = useState();
  const [editButtonClicked, setEditButtonClicked] = useState(false);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(items); // Set fetched data
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <header className={style.blogHeader}>
        <AddnewBlog
          fetchData={fetchData}
          editBlog={editBlog}
          editButtonClicked={editButtonClicked}
          hideAndShowDisplay={hideAndShowDisplay}
        />
        <FetchData
          data={data}
          fetchData={fetchData}
          setEditBlog={setEditBlog}
          setEditButtonClicked={setEditButtonClicked}
          setHideAndShowDisplay={setHideAndShowDisplay}
        />
      </header>
    </>
  );
};

export default ManageBlogs;
