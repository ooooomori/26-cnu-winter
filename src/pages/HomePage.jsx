import Box from "@mui/joy/Box";
import Grid from "@mui/joy/Grid";
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
        <Grid
            container
            direction="column"
            spacing={3}
            justifyContent="center"
            alignItems="center"
            sx={{
                minHeight: "80dvh",
                width: "100%",
                paddingY: 4,
            }}
        >
            <Box sx={{ flexGrow: 1 }} />
            <Grid>
                <Typography level="h1" component="h1" sx={{color: "text.primary"}}>
                    {packageJson.description}
                </Typography>
            </Grid>

            <Box sx={{ flexGrow: 1 }} />
            <Grid>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        width: { xs: "95vw", sm: "500px" },
                    }}
                >
                    <MainInput />
                </Box>
            </Grid>
            <Stack spacing={3} sx={{ mt: "50px" }}>
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
                    startDecorator={<ManageSearchOutlinedIcon />} // startIcon -> startDecorator
                    size="lg" // large -> lg
                    sx={{ flex: 1 }}
                >
                    다른 단어장 구경하기
                </Button>
            </Stack>
        </Grid>
    );
}
