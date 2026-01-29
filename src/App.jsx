import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage.jsx";
//import SearchPage from "./pages/SearchPage.jsx";
//import VocaPage from "./pages/VocaPage.jsx";
import LoginModal from "./components/LoginModal.jsx";
import Layout from "./components/Layout.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />, // 메인 화면
            },
        ],
    },
]);

function App() {
    return (
        <>
            <RouterProvider router={router} />
            <LoginModal />
        </>
    );
}

export default App;
