import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import useAuthStore from "./stores/authStore.js";
import { fetchWithAccess } from "./api/client";
import { CssVarsProvider } from "@mui/joy/styles";
import HomePage from "./pages/HomePage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
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
            {
                path: "/search",
                element: <SearchPage />, // 단어 검색 후 결과 화면
            },
        ],
    },
]);

function App() {
    const { isLoggedIn, logout, onLoginSuccess } = useAuthStore();

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                if (isLoggedIn) logout();
                return;
            }
            try {
                const response = await fetchWithAccess(
                    `${import.meta.env.VITE_BACKEND_API_BASE_URL}/me`,
                );
                const userData = await response.json();
                onLoginSuccess(userData);
            } catch (err) {
                console.error("인증 실패:", err);
                logout();
            }
        };

        verifyToken();
    }, []); // 앱이 처음 로드될 때 딱 한 번 실행

    return (
        <CssVarsProvider defaultMode="system">
            <RouterProvider router={router} />
            <LoginModal />
            <SignUpModal />
        </CssVarsProvider>
    );
}

export default App;
