/**
 * @name SignUpModal
 * @description 
 * 신규 사용자를 위한 회원가입 모달 컴포넌트
 * 아이디 중복 확인, 비밀번호 유효성 및 확인 검사 로직, 약관 확인 링크 등
 * * @logic
 * - Validation: 
 * 1. 아이디: 5~15자, 영문/숫자/_ 조합 (`isIdValid`)
 * 2. 비밀번호: 8자 이상 (`isPasswordValid`)
 * 3. 비밀번호 확인: 일치 여부 검토 (`isPasswordMatch`)
 * - Duplicate Check: `/user/exist` API를 호출하여 아이디 중복 여부 확인
 * - UX: 모달 오픈 시 50ms 후 아이디 필드 자동 포커싱 및 유효성 상태에 따른 HelperText 가이드 제공
 * - Policy: `PolicyModal`을 중첩 호출하여 이용약관 및 개인정보처리방침 출력
 * * @requires
 * - useAuthStore: 모달 상태 확인 및 제어
 * - API: Axios 인스턴스로 서버와 통신: 회원가입(`POST /user`) 및 중복 확인(`POST /user/exist`)
 */

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
import useAuthStore from "../stores/authStore.js";
import API from "../api/axios";
import PolicyModal from "./PolicyModal.jsx";

export default function SignUpModal() {
    const { isSignUpModalOpen, setAuthModal } = useAuthStore();

    const [id, setId] = useState(""); // 아이디
    const [password, setPassword] = useState(""); // 비밀번호
    const [password2, setPassword2] = useState(""); // 비밀번호 확인 칸의 비밀번호
    const [isIdAvailable, setIsIdAvailable] = useState(null); // 아이디 이용가능(=미중복) 여부
    const [policy, setPolicy] = useState(null); // 이용약관, 개인정보 처리방침 모달 표시 상태 (null: 모달 미표시, "termsOfService": 이용약관 모달 표시, "privacyPolicy": 개인정보 처리방침 묘달 표시)

    const handleClose = () => {
        setId("");
        setIsIdAvailable(null);
        setPassword("");
        setPassword2("");
        setAuthModal(null);
    };

    const inputRef = useRef(null);
    useEffect(() => {
        if (isSignUpModalOpen) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isSignUpModalOpen]); //회원가입 모달 오픈 시 아이디 입력창에 포커스

    const checkIdAvailable = async () => {
        // setIsIdAvailable((prev) => !prev); // 임시 ID 중복 확인 로직

        try {
            const res = await API.post("/user/exist", {
                username: id,
            });
            const exists = await res.data; // true or false
            setIsIdAvailable(!exists);
        } catch (err) {
            alert("아이디 중복 확인 중 오류가 발생했어요.");
            console.error("아이디 중복 확인 에러:", err);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            await API.post("/user", {
                username: id,
                password: password,
            });
            alert("회원가입이 완료되었어요! 로그인해주세요.");
            setAuthModal("login");
        } catch (err) {
            alert("회원가입 중 오류가 발생했어요.");
            console.error("회원가입 에러:", err);
        }
    };

    const isPasswordMatch = password.length > 0 && password === password2; //비밀번호 재확인 로직
    const isPasswordValid = password.length >= 8; //비밀번호 유효조건: 8자 이상
    const isIdValid =
        id.length > 4 && id.length <= 15 && /^[a-zA-Z0-9_]+$/.test(id); //ID 유효성 검사: 5~15자 영문, 숫자, 밑줄(_)

    return (
        <Modal open={isSignUpModalOpen} onClose={() => handleClose()}>
            <ModalOverflow>
                <ModalDialog variant="soft">
                    <ModalClose variant="outlined" />
                    <DialogTitle>
                        <Typography>
                            {packageJson.description} 회원가입
                        </Typography>
                    </DialogTitle>

                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            handleSignUp(event);
                        }}
                    >
                        <Stack spacing={2}>
                            <FormControl
                                color={isIdAvailable ? "success" : "neutral"}
                            >
                                <FormLabel>아이디</FormLabel>
                                <Input
                                    slotProps={{ input: { ref: inputRef } }}
                                    required
                                    spellCheck={false}
                                    onChange={(e) => {
                                        setId(e.target.value);
                                        setIsIdAvailable(null);
                                    }}
                                    value={id}
                                    endDecorator={
                                        <Button
                                            variant="soft"
                                            color="neutral"
                                            onClick={checkIdAvailable}
                                            disabled={
                                                id.length === 0 || !isIdValid
                                            }
                                        >
                                            중복 확인
                                        </Button>
                                    }
                                />
                                {isIdAvailable === null && id.length > 0 && (
                                    <FormHelperText>
                                        아이디는 5~15자의 영문, 숫자, 밑줄(_)만
                                        사용 가능해요.
                                    </FormHelperText>
                                )}
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
                            <FormControl
                                color={isPasswordValid ? "success" : "neutral"}
                            >
                                <FormLabel>비밀번호</FormLabel>
                                <Input
                                    required
                                    type="password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    value={password}
                                />
                                {!isPasswordValid && password.length > 0 && (
                                    <FormHelperText>
                                        <InfoOutlined /> 비밀번호는 8자 이상으로
                                        설정해주세요.
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
                                color={isPasswordMatch ? "success" : "neutral"}
                            >
                                <FormLabel>비밀번호 확인</FormLabel>
                                <Input
                                    required
                                    type="password"
                                    onChange={(e) =>
                                        setPassword2(e.target.value)
                                    }
                                    value={password2}
                                />
                                {!isPasswordMatch && password2.length > 0 && (
                                    <FormHelperText>
                                        <InfoOutlined /> 비밀번호가 일치하지
                                        않아요.
                                    </FormHelperText>
                                )}
                                {isPasswordMatch && password2.length > 0 && (
                                    <FormHelperText>
                                        <CheckCircleOutlined color="success" />{" "}
                                        비밀번호가 일치해요!
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <Button
                                type="submit"
                                disabled={
                                    !isIdAvailable ||
                                    !isPasswordMatch ||
                                    !isPasswordValid
                                }
                            >
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
                                <Link
                                    underline="hover"
                                    level="body-xs"
                                    component="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPolicy("termsOfService");
                                    }}
                                >
                                    이용약관
                                </Link>{" "}
                                및{" "}
                                <Link
                                    underline="hover"
                                    level="body-xs"
                                    component="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPolicy("privacyPolicy");
                                    }}
                                >
                                    개인정보처리방침
                                </Link>
                                에 동의한 것으로 간주됩니다.
                            </Typography>
                        </Stack>
                    </form>
                    {policy !== null && (
                        <PolicyModal
                            type={policy}
                            onClose={() => setPolicy(null)}
                        />
                    )}
                </ModalDialog>
            </ModalOverflow>
        </Modal>
    );
}
