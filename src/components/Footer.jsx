/**
 * @name Footer
 * @description 
 * 애플리케이션 하단에 위치하며 버전 정보, 약관 정보 및 깃허브 링크를 제공하는 컴포넌트
 * * @logic
 * - `policy` 상태를 통해 이용약관 또는 개인정보처리방침 모달의 활성화 여부 결정
 * - `package.json`의 description, version 필드를 불러와 하단에 서비스명 및 서비스 버전을 동적 출력
 * * @components
 * - PolicyModal: 이용약관 및 개인정보처리방침 내용을 보여주는 공통 모달
 */

import * as React from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import packageJson from "../../package.json";
import PolicyModal from "./PolicyModal";

export default function Footer() {
    const [policy, setPolicy] = React.useState(null);
    return (
        <Box component="footer" sx={{ pt: 5 }}>
            {policy !== null && (
                <PolicyModal type={policy} onClose={() => setPolicy(null)} />
            )}
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
                    component="button"
                    onClick={() => setPolicy("termsOfService")}
                >
                    이용약관
                </Link>
                <Link
                    underline="hover"
                    color="neutral"
                    level="body-xs"
                    component="button"
                    onClick={() => setPolicy("privacyPolicy")}
                >
                    개인정보처리방침
                </Link>
            </Stack>

            <Typography
                level="body-xs"
                sx={{ textAlign: "center", color: "text.tertiary" }}
            >
                © 2026 {packageJson.description} · v{packageJson.version}
            </Typography>
        </Box>
    );
}
