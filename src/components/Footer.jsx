import Stack from "@mui/material/Stack";
import Link from "@mui/joy/Link";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
    return (
        <Stack
            direction={"row"}
            justifyContent={"center"}
            spacing={3}
            sx={{ textDecoration: "none", paddingBottom: "20px" }}
        >
            <Link
                href="https://github.com/ooooomori/26-cnu-winter"
                target="_blank"
                underline="hover"
                color="neutral"
                level="body-sm"
                sx={{
                    display: "inline-flex", // Flexbox 모드 활성화
                    alignItems: "center", // 세로 중앙 정렬
                    gap: 0.5, // 아이콘과 글자 사이 간격
                    textDecoration: "none",
                }}
            >
                <GitHubIcon />
                Github
            </Link>
            <Link underline="hover" color="neutral" level="body-sm">
                이용약관
            </Link>
            <Link underline="hover" color="neutral" level="body-sm">
                개인정보처리방침
            </Link>
        </Stack>
    );
}
