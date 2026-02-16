/**
 * @name Layout
 * @description 
 * 애플리케이션의 공통 레이아웃을 정의하는 루트 컴포넌트
 * 전체 화면의 중앙 정렬과 모바일 대응, 모달 및 푸터 출력
 * * @layout_info
 * - Width: 모바일(xs)에서는 100%, 태블릿 이상(sm)에서는 500px 고정
 * - Height: 100dvh를 사용하여 동적 뷰포트 높이 확보
 */

import { Outlet } from "react-router-dom";
import { Box } from "@mui/joy";
import Footer from "./Footer.jsx";
import LoginModal from "./LoginModal.jsx";
import SignUpModal from "./SignUpModal.jsx";
import MyVocaListModal from "./MyVocaListModal.jsx";

export default function Layout() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100dvh",
                padding: 2,
                boxSizing: "border-box",
                width: { xs: "100%", sm: "500px" },
            }}
        >
            <Box component="main" sx={{ flexGrow: 1 }}>
            <LoginModal />
            <SignUpModal />
            <MyVocaListModal />
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
}
