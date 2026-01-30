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
import useAuthStore from "../store/useAuthStore";
import SignUpModal from "./SignUpModal.jsx";

export default function LoginModal() {
    const { isLoginModalOpen, closeLoginModal, openSignUpModal } =
        useAuthStore();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const isEmpty = id.length < 1 || password.length < 1;
    const handleClose = () => {
        setId("");
        setPassword("");
        closeLoginModal();
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
                        event.preventDefault();
                        closeLoginModal();
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
                                    openSignUpModal();
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
