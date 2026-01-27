import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
const ariaLabel = { "aria-label": "description" };

export default function HomePage() {
    return (
        <Grid container spacing={3} direction="column">
            <Grid>
                <h1>LOREM IPSUM</h1>
            </Grid>
            <Grid>
                <Box component="form" noValidate autoComplete="off">
                    <Input
                        placeholder="공부할 단어를 입력해보세요"
                        inputProps={ariaLabel}
                        sx={{
                            maxWidth: "800px",
                            minWidth: "80%",
                            fontSize: "1.5rem",
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
            <Grid>
                <Button
                    variant="contained"
                    startIcon={<BookOutlinedIcon />}
                    size="large"
                    sx={{ mt: "50px" }}
                >
                    단어장 열어보기
                </Button>
            </Grid>
        </Grid>
    );
}
