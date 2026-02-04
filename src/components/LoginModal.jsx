import { useState, useEffect, useRef } from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import packageJson from "../../package.json";
import useAuthStore from "../stores/authStore.js";

export default function LoginModal() {
    const { isLoginModalOpen, setAuthModal, onLoginSuccess } = useAuthStore();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const isEmpty = id.length < 1 || password.length < 1;
    const handleClose = () => {
        setId("");
        setPassword("");
        setAuthModal(null);
    };

    const inputRef = useRef(null);
    useEffect(() => {
        if (isLoginModalOpen) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isLoginModalOpen]);

    const handleLogin = async (e) => {
        e.preventDefault();

        // API 요청
        try {
            /**
            const res = await fetch(`${BACKEND_API_BASE_URL}/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json",},
                credentials: "include",
                body: JSON.stringify({ id, password }),
            });

            if (!res.ok) throw new Error("로그인 실패");

            const data = await res.json();
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            */

            const fakeResponse = {
                accessToken: "fake-access-token-123",
                refreshToken: "fake-refresh-token-456",
            };

            // 2. 기존에 짠 로직 그대로 실행
            localStorage.setItem("accessToken", fakeResponse.accessToken);
            localStorage.setItem("refreshToken", fakeResponse.refreshToken);
  

            onLoginSuccess(id);
            alert(`${id}님, 환영합니다!`);
            setAuthModal(null);
        } catch (err) {
            alert("아이디 또는 비밀번호가 틀렸습니다.");
        }
    };

    return (
        <Modal open={isLoginModalOpen} onClose={() => handleClose()}>
            <ModalDialog variant="soft">
                <ModalClose variant="outlined" />
                <DialogTitle>
                    <Typography>{packageJson.description}</Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        내 단어장을 보려면 로그인이 필요해요.
                    </Typography>
                </DialogContent>
                <form
                    onSubmit={(event) => {
                        handleLogin(event);
                    }}
                >
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>아이디</FormLabel>
                            <Input
                                slotProps={{ input: { ref: inputRef } }}
                                required
                                onChange={(e) => setId(e.target.value)}
                                value={id}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>비밀번호</FormLabel>
                            <Input
                                required
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </FormControl>
                        <Button type="submit" disabled={isEmpty}>
                            로그인
                        </Button>
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            justifyContent="center"
                            sx={{ mt: 2 }}
                        >
                            <Typography variant="soft" level="body-sm">
                                아직 계정이 없으신가요?
                            </Typography>
                            <Link
                                component="button"
                                type="button"
                                variant="soft"
                                level="body-sm"
                                onClick={() => {
                                    handleClose();
                                    setAuthModal("signup");
                                }}
                            >
                                회원가입하기
                            </Link>
                        </Stack>
                    </Stack>
                </form>
            </ModalDialog>
        </Modal>
    );
}
