import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import packageJson from "../../package.json";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import MainInput from "../components/MainInput";

import useAuthStore from "../store/useAuthStore";

const ariaLabel = { "aria-label": "description" };

export default function HomePage() {
    const { isLoggedIn, user, logout, openLoginModal } = useAuthStore();

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

            <Stack spacing={3}>
                <Button
                    variant="solid"
                    color="primary"
                    startDecorator={<BookOutlinedIcon />}
                    size="lg"
                    sx={{ flex: 1 }}
                    onClick={!isLoggedIn ? openLoginModal : undefined}
                >
                    내 단어장 열어보기
                </Button>

                <Button
                    variant="soft"
                    color="primary"
                    startDecorator={<ManageSearchOutlinedIcon />}
                    size="lg"
                    sx={{ flex: 1 }}
                >
                    다른 단어장 구경하기
                </Button>
            </Stack>
        </Stack>
    );
}
