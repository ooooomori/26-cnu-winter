import * as React from "react";

import {
    Button,
    Typography,
    Modal,
    ModalDialog,
    ModalClose,
    DialogTitle,
    FormControl,
    FormLabel,
    Input,
    Switch,
    Stack,
    Snackbar,
} from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function AddNewVocaModal({ open, onClose, setAddResult }) {
    // 새 단어장 생성 시 단어장 제목 및 공개 여부를 물어보는 모달.
    const [checked, setChecked] = React.useState(true); // 단어장 공개 여부 스위치 상태
    const [title, setTitle] = React.useState("");

    const inputRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [open]); // 모달 오픈 시 50ms 후 제목 입력창에 포커스 줌

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/wordbook", {
                name: title,
            });

            setTitle("");
            setAddResult(true);
            onClose();
        } catch (err) {
            setTitle("");
            setAddResult(false);
            console.error("단어장 추가 에러:", err);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog>
                <ModalClose variant="plain" />
                <DialogTitle>
                    <Typography>새 단어장 생성</Typography>
                </DialogTitle>
                <form
                    onSubmit={(event) => {
                        handleSubmit(event);
                    }}
                >
                    <Stack spacing={3}>
                        <FormControl>
                            <FormLabel>제목</FormLabel>
                            <Input
                                autoFocus
                                placeholder="단어장 제목을 입력하세요"
                                slotProps={{ input: { ref: inputRef } }}
                                required
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </FormControl>

                        <FormControl
                            orientation="horizontal"
                            sx={{ justifyContent: "space-evenly" }}
                        >
                            <FormLabel>공개 상태</FormLabel>
                            <Switch
                                disabled
                                checked={checked}
                                onChange={(event) =>
                                    setChecked(event.target.checked)
                                }
                                color={checked ? "primary" : "neutral"}
                                variant={checked ? "solid" : "outlined"}
                                endDecorator={checked ? "공개" : "비공개"}
                                slotProps={{
                                    endDecorator: {
                                        sx: {
                                            minWidth: 24,
                                        },
                                    },
                                }}
                            />
                        </FormControl>
                        <Button type="submit" disabled={!title.length}>
                            만들기
                        </Button>
                    </Stack>
                </form>
            </ModalDialog>
        </Modal>
    );
}
export default function AddNewVocaButton({ onRefresh }) {
    const [open, setOpen] = React.useState(false);
    const [addResult, setAddResult] = React.useState(null); // null: 기본값, true: 단어장 생성 성공, false: 단어장 생성 실패

    React.useState(() => {
        if (addResult) {
            onRefresh();
        }
    }, [addResult]); // 단어장 생성 성공시 onRefresh(=fetchVocaList()) 실행

    return (
        <>
            <Button startDecorator={<AddIcon />} onClick={() => setOpen(true)}>
                새 단어장 생성
            </Button>
            <AddNewVocaModal
                open={open}
                onClose={() => setOpen(false)}
                setAddResult={setAddResult}
            />
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                startDecorator={<CheckCircleOutlineIcon />}
                open={addResult}
                color="success"
                autoHideDuration={3000}
                onClose={() => {
                    setAddResult(null);
                }}
            >
                새 단어장이 생성되었어요!
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                startDecorator={<ErrorOutlineIcon />}
                open={addResult === false}
                color="danger"
                autoHideDuration={3000}
                onClose={() => {
                    setAddResult(null);
                }}
            >
                새 단어장을 생성하는 데 문제가 생겼어요.
            </Snackbar>
        </>
    );
}
