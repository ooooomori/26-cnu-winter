import * as React from "react";
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
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import useAuthStore from "../store/useAuthStore";
export default function LoginModal() {
    const { isModalOpen, closeModal, login } = useAuthStore();

    if (!isModalOpen) return null;

    return (
        <Modal open={isModalOpen} onClose={() => closeModal()}>
            {isModalOpen && (
                <ModalDialog variant="soft">
                    <ModalClose variant="outlined" />
                    <DialogTitle>LOREM IPSUM</DialogTitle>
                    <DialogContent
                        sx={{
                            fontSize: "0.9rem",
                            textAlign: "center"
                        }}
                    >
                        내 단어장을 보려면 로그인이 필요해요.
                    </DialogContent>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            closeModal();
                        }}
                    >
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>아이디</FormLabel>
                                <Input autoFocus required />
                            </FormControl>
                            <FormControl>
                                <FormLabel>비밀번호</FormLabel>
                                <Input required type="password" />
                            </FormControl>
                            <Button type="submit">로그인</Button>
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                justifyContent="center"
                                sx={{ mt: 2 }} // 위쪽 여백 살짝
                            >
                                <Typography
                                    sx={{
                                        fontSize: "0.8rem",
                                        color: "text.secondary",
                                    }}
                                >
                                    아직 계정이 없으신가요?
                                </Typography>
                                <Link
                                    component="button" // 버튼처럼 작동하게 함
                                    sx={{
                                        fontSize: "0.8rem",
                                        fontWeight: "bold",
                                        textDecoration: "none",
                                    }}
                                    onClick={() => {
                                        /* 회원가입 모달로 전환하거나 페이지 이동 */
                                    }}
                                >
                                    회원가입하기
                                </Link>
                            </Stack>
                        </Stack>
                    </form>
                </ModalDialog>
            )}
        </Modal>
    );
}
