import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Link from "@mui/joy/Link";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import packageJson from "../../package.json";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import MainInput from "../components/MainInput";

import useAuthStore from "../stores/authStore";
import useVocaStore from "../stores/VocaStore";
import API from "../api/axios";

export default function HomePage() {
    const { isLoggedIn, user, logout, setAuthModal } = useAuthStore();
    const { openMyVocaList } = useVocaStore();

    const handleVocaClick = () => {
        if (!isLoggedIn) {
            setAuthModal("login");
        } else {
            openMyVocaList(null, "open");
        }
    };

    const handleRemove = async () => {
        if (
            window.confirm(
                "정말 탈퇴하시겠습니까? 탈퇴 시 회원 정보가 모두 삭제되며 복구 불가능합니다.",
            )
        ) {
            try {
                await API.get("/user/remove");
                alert("회원 탈퇴되었습니다.");
                logout();
            } catch (err) {
                alert("회원 탈퇴 시도 중 문제가 생겼습니다.");
                console.error("회원 탈퇴 오류:", err);
            }
        }
    };

    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
                minHeight: "80dvh",
                width: "100%",
                boxSizing: "border-box",
            }}
        >
            <Typography level="h1" component="h1">
                {packageJson.description}
            </Typography>

            <Box
                component="form"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    my: 8,
                }}
            >
                <MainInput />
            </Box>

            <Stack spacing={3} sx={{ alignItems: "center" }}>
                <Button
                    variant="solid"
                    color="primary"
                    startDecorator={<BookOutlinedIcon />}
                    size="lg"
                    sx={{ flex: 1 }}
                    onClick={() => handleVocaClick()}
                >
                    내 단어장 열어보기
                </Button>

                <Button
                    disabled
                    variant="soft"
                    color="primary"
                    startDecorator={<ManageSearchOutlinedIcon />}
                    size="lg"
                    sx={{ flex: 1 }}
                >
                    다른 단어장 구경하기
                </Button>

                {isLoggedIn && <Link onClick={() => logout()}>로그아웃</Link>}
                {isLoggedIn && (
                    <Link onClick={() => handleRemove()}>회원 탈퇴</Link>
                )}
            </Stack>
        </Stack>
    );
}
