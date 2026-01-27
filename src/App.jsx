import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import HomePage from "./pages/HomePage.jsx";
//import SearchPage from "./pages/SearchPage.jsx";
//import VocaPage from "./pages/VocaPage.jsx";

import Button from "@mui/material/Button";
import AppleIcon from "@mui/icons-material/Apple";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    /*{
        path: "search",
        element: <SearchPage />,
    },
    {
        path: "voca",
        element: <VocaPage />,
    },*/
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
