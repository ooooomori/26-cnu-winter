import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { CssVarsProvider } from "@mui/joy/styles";
import HomePage from "./pages/HomePage.jsx";
//import SearchPage from "./pages/SearchPage.jsx";
//import VocaPage from "./pages/VocaPage.jsx";
import LoginModal from "./components/LoginModal.jsx";
import SignUpModal from "./components/SignUpModal.jsx";
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
        <CssVarsProvider defaultMode="system">
            <RouterProvider router={router} />
            <LoginModal />
            <SignUpModal />
        </CssVarsProvider>
    );
}

export default App;
