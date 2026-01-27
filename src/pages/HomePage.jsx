import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
const ariaLabel = { "aria-label": "description" };

export default function HomePage() {
    return (
        <Grid container spacing={3} direction="column">
            <Grid>
                <h1>LOREM IPSUM</h1>
            </Grid>
            <Grid>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{ display: "flex", alignItems: "center" }}
                >
                    <Input
                        placeholder="공부할 단어를 입력해보세요"
                        inputProps={ariaLabel}
                        sx={{
                            fontSize: "1.5rem",
                            flexGrow: 1,
                            mr: 1,
                        }}
                    />
                    <IconButton
                        type="button"
                        sx={{ p: "10px" }}
                        aria-label="search"
                    >
                        <SearchIcon />
                    </IconButton>
                </Box>
            </Grid>
            <Stack sx={{ mt: "50px" }}>
                <Button
                    variant="contained"
                    startIcon={<BookOutlinedIcon />}
                    size="large"
                    sx={{ m: "10px", flex: 1 }}
                >
                    내 단어장 열어보기
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<ManageSearchOutlinedIcon />}
                    size="large"
                    sx={{ m: "10px", flex: 1 }}
                >
                    다른 단어장 구경하기
                </Button>
            </Stack>
        </Grid>
    );
}
