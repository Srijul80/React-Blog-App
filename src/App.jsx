import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/Signup";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Layout from "./layouts/Layout";
import DisplayBlog from "./components/DisplayBlog";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./utils/FirebaseDB";

function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(items);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home data={data} fetchData={fetchData} /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/displayblog/:id", element: <DisplayBlog data={data} /> },
      ],
    },
    {
      path: "/dashboard",
      element: <AdminDashboard />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
