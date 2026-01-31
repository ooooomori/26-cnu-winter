import { useState, useEffect, useRef } from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import ModalOverflow from "@mui/joy/ModalOverflow";
import DialogTitle from "@mui/joy/DialogTitle";
import FormHelperText from "@mui/joy/FormHelperText";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlined from "@mui/icons-material/CheckCircleOutlined";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import packageJson from "../../package.json";
import useAuthStore from "../store/useAuthStore";
export default function SignUpModal() {
    const { isSignUpModalOpen, closeSignUpModal } = useAuthStore();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [isIdAvailable, setIsIdAvailable] = useState(null); // TODO: 실제 아이디 중복 확인 로직으로 교체
    const handleClose = () => {
        setId("");
        setIsIdAvailable(null);
        setPassword("");
        setPassword2("");
        closeSignUpModal();
    };

    const inputRef = useRef(null);
    useEffect(() => {
        if (isSignUpModalOpen) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isSignUpModalOpen]);

    const checkIdAvailable = () => {
        setIsIdAvailable((prev) => !prev);
    };

    const isPasswordMatch = password.length > 0 && password === password2;
    const isPasswordValid = password.length >= 8;
    const isIdValid = id.length > 4 && id.length <= 15 && /^[a-zA-Z0-9_]+$/.test(id);

    return (
        <Modal open={isSignUpModalOpen} onClose={() => handleClose()}>
            <ModalOverflow>
            <ModalDialog variant="soft">
                <ModalClose variant="outlined" />
                <DialogTitle>
                    <Typography>{packageJson.description} 회원가입</Typography>
                </DialogTitle>

                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        closeSignUpModal();
                    }}
                >
                    <Stack spacing={2}>
                        <FormControl
                            color={
                                isIdAvailable
                                      ? "success"
                                      : "neutral"
                            }
                        >
                            <FormLabel>아이디</FormLabel>
                            <Input
                            type="url"
                                slotProps={{ input: { ref: inputRef } }}
                                required
                                onChange={(e) => {setId(e.target.value); setIsIdAvailable(null);}}
                                value={id}
                                endDecorator={
                                    <Button
                                        variant="soft"
                                        color="neutral"
                                        onClick={checkIdAvailable}
                                        disabled={id.length === 0 || !isIdValid}
                                    >
                                        중복 확인
                                    </Button>
                                }
                            />
                            {
                                isIdAvailable === null && id.length > 0 && (
                                    <FormHelperText>
                                        아이디는 5~15자의 영문, 숫자, 밑줄(_)만
                                        사용 가능해요.
                                    </FormHelperText>
                                )
                            }
                            {isIdAvailable === false && (
                                <FormHelperText>
                                    <InfoOutlined />
                                    이미 사용중인 아이디에요.
                                </FormHelperText>
                            )}
                            {isIdAvailable === true && (
                                <FormHelperText>
                                    <CheckCircleOutlined color="success" />
                                    사용 가능한 아이디에요!
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl color={
                                isPasswordValid
                                      ? "success"
                                      : "neutral"
                            }>
                            <FormLabel>비밀번호</FormLabel>
                            <Input
                                required
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            {!isPasswordValid && password.length > 0 && (
                                <FormHelperText>
                                    <InfoOutlined /> 비밀번호는 8자 이상으로 설정해주세요.
                                </FormHelperText>
                            )}
                            {isPasswordValid && (
                                <FormHelperText>
                                    <CheckCircleOutlined color="success" />{" "}
                                    사용 가능한 비밀번호에요!
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            color={
                                isPasswordMatch
                                      ? "success"
                                      : "neutral"
                            }
                        >
                            <FormLabel>비밀번호 확인</FormLabel>
                            <Input
                                required
                                type="password"
                                onChange={(e) => setPassword2(e.target.value)}
                                value={password2}
                            />
                            {!isPasswordMatch && password2.length > 0 && (
                                <FormHelperText>
                                    <InfoOutlined /> 비밀번호가
                                    일치하지 않아요.
                                </FormHelperText>
                            )}
                            {isPasswordMatch && password2.length > 0 && (
                                <FormHelperText>
                                    <CheckCircleOutlined color="success" />{" "}
                                    비밀번호가 일치해요!
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Button type="submit" disabled={!isIdAvailable || !isPasswordMatch || !isPasswordValid}>
                            가입하기
                        </Button>
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            justifyContent="center"
                            sx={{ mt: 2 }}
                        ></Stack>
                        <Typography variant="soft" level="body-xs">
                        가입 시{" "}
                            <Link underline="hover" level="body-xs" href="#">
                                이용약관
                            </Link>{" "}
                            및{" "}
                            <Link underline="hover" level="body-xs" href="#">
                                개인정보처리방침
                            </Link>
                            에 동의한 것으로 간주됩니다.
                        </Typography>
                    </Stack>
                </form>
            </ModalDialog>
            </ModalOverflow>
        </Modal>
    );
}
