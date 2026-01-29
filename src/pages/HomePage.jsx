import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

import IconButton from "@mui/material/IconButton";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import MainInput from "../components/MainInput";
const ariaLabel = { "aria-label": "description" };

export default function HomePage() {
    return (
        <Grid
            container
            direction="column"
            spacing={3}
            justifyContent="center"
            alignItems="center"
            sx={{
                overflow: "hidden",
                height: "100dvh",
            }}
        >
            <Grid>
                <h1>LOREM IPSUM</h1>
            </Grid>
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
                        width: { xs: 300, sm: 400 },
                    }}
                >
                    <MainInput />
                </Box>
            </Grid>
            <Stack spacing={3} sx={{ mt: "50px" }}>
                <Button
                    variant="contained"
                    startIcon={<BookOutlinedIcon />}
                    size="large"
                    sx={{ flex: 1 }}
                >
                    내 단어장 열어보기
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<ManageSearchOutlinedIcon />}
                    size="large"
                    sx={{ flex: 1 }}
                >
                    다른 단어장 구경하기
                </Button>
            </Stack>
        </Grid>
    );
}
