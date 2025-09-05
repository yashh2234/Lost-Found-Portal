import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import ModeratorDashboard from "./pages/ModeratorDashboard";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/user", element: <UserDashboard /> },
  { path: "/moderator", element: <ModeratorDashboard /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
