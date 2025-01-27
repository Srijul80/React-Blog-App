import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/Signup";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Layout from "./layouts/Layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <SignUp /> },
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
