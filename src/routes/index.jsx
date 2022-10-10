import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
} from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Home />,
  },
  {
    path: "/about/:id/:title",
    element: <About />,
  },
]);

const MyRoutes = () => {
  return <RouterProvider router={router} />;
};

export default MyRoutes;
