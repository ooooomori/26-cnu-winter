/**
 * @name LoginModal
 * @description 
 * 서비스 전역에서 사용되는 로그인 인터페이스 모달 컴포넌트
 * 로그인 성공 시 토큰 저장
 * 회원가입 인터페이스 바로가기 링크 제공
 * * @logic
 * - State Management: `useAuthStore`를 통해 모달 노출 여부와 토큰(JWT)을 관리합니다.
 * - UX Detail: 모달이 열리면 `useRef`와 `useEffect`를 사용하여 아이디 입력창에 자동 포커스를 줍니다.
 * - Security: 로그인 성공 시 `setTokens`를 통해 Access/Refresh 토큰을 Zustand 스토어에 저장합니다.
 * - Navigation: 계정이 없는 사용자를 위해 '회원가입하기' 버튼을 제공하며, 클릭 시 회원가입 모달로 전환합니다.
 * * @requires
 * - useAuthStore: 인증 관련 전역 상태 및 액션
 * - API: Axios 인스턴스로 서버와 통신 (`/login`)
 * - packageJson: 모달 타이틀에 서비스명 표출
 */

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import API from "../api/axios";

export default function LoginModal() {
    const {
        isLoginModalOpen,
        setAuthModal,
        onLoginSuccess,
    } = useAuthStore();
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const isEmpty = id.length < 1 || password.length < 1;
    const handleClose = () => {
        setId("");
        setPassword("");
        setAuthModal(null);
    }; // 모달 종료 시 입력된 아이디 및 패스워드 초기화, 모달 닫기

    const inputRef = useRef(null);
    useEffect(() => {
        if (isLoginModalOpen) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isLoginModalOpen]); // 로그인 모달 오픈 시 50ms 후 아이디 입력창에 포커스 줌

    const handleLogin = async (e) => {
        e.preventDefault();

        const {
            setTokens,
            onLoginSuccess,
            setAuthModal,
        } = useAuthStore.getState();

        try {
            
            const res = await API.post("/login", {
                username: id,
                password: password,
            });
            const { accessToken, refreshToken } = res.data;

            /** 프론트 테스트용 코드
            const res = {
                accessToken: "accessToken123",
                refreshToken: "refreshToken123"
            };
            const { accessToken, refreshToken } = res;
            */

            setTokens(accessToken, refreshToken); //Zustand 이용 토큰 저장
            onLoginSuccess(id);
            alert(`${id}님, 환영합니다!`);
            setAuthModal(null);
        } catch (err) {
            alert("아이디 또는 비밀번호가 틀렸습니다.");
            console.error("로그인 에러:", err);
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
