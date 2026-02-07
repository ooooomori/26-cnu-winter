import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import useAuthStore from "./stores/authStore.js";
import API from "./api/axios";
import { CssVarsProvider } from "@mui/joy/styles";
import HomePage from "./pages/HomePage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import VocaPage from "./pages/VocaPage.jsx";
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
            {
                path: "/search",
                element: <SearchPage />, // 단어 검색 후 결과 화면
            },
            {
                path: "/wordbook",
                element: <VocaPage />, // 나의 단어장 화면
            }
        ],
    },
]);

function App() {

    return (
        <CssVarsProvider defaultMode="system">
            <RouterProvider router={router} />
        </CssVarsProvider>
    );
}

export default App;
