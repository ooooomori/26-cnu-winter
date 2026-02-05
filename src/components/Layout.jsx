import { Outlet } from "react-router-dom";
import { Box } from "@mui/joy";
import Footer from "./Footer.jsx";

export default function Layout() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100dvh", // 화면 전체 높이 확보
                padding: 2,
                boxSizing: "border-box",
                width: { xs: "100%", sm: "500px" },
            }}
        >
            {/* <Navbar /> 여기에 네비바가 있다면 추가 */}

            <Box component="main" sx={{ flexGrow: 1 }}>
                <Outlet /> {/* 각 페이지가 렌더링되는 지점 */}
            </Box>

            <Footer />
        </Box>
    );
}
