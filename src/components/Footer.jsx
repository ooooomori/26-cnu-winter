import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import packageJson from "../../package.json";

export default function Footer() {
    return (
        <Box component="footer" sx={{ pt: 5 }}>
            <Stack
                direction="row"
                justifyContent="center"
                spacing={1}
                divider={
                    <Typography
                        sx={{ color: "neutral.300", alignSelf: "center" }}
                    >
                        ·
                    </Typography>
                }
            >
                <Link
                    href="https://github.com/ooooomori/26-cnu-winter"
                    target="_blank"
                    rel="noopener"
                    underline="hover"
                    color="neutral"
                    level="body-xs"
                    sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        textDecoration: "none",
                    }}
                >
                    <GitHubIcon sx={{ fontSize: "0.9rem" }} />
                    Github
                </Link>
                <Link
                    underline="hover"
                    color="neutral"
                    level="body-xs"
                    href="#"
                >
                    이용약관
                </Link>
                <Link
                    underline="hover"
                    color="neutral"
                    level="body-xs"
                    href="#"
                >
                    개인정보처리방침
                </Link>
            </Stack>

            <Typography
                level="body-xs"
                sx={{ textAlign: "center", color: "text.tertiary" }}
            >
                © 2026 두바이쫀득쿠키 · v{packageJson.version}
            </Typography>
        </Box>
    );
}
