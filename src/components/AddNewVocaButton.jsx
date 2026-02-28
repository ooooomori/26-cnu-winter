import * as React from "react";
import API from "../api/axios";
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
} from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import useAlertStore from "../stores/alertStore";

function AddNewVocaModal({ open, onClose, onRefresh }) {
    const [checked, setChecked] = React.useState(true);
    const [title, setTitle] = React.useState("");
    const inputRef = React.useRef(null);

    const { showSuccess, showFail } = useAlertStore();

    React.useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [open]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post("/wordbook", {
                name: title,
            });

            showSuccess("새 단어장이 생성되었어요!");
            setTitle("");
            onRefresh();
            onClose();
        } catch (err) {
            showFail("새 단어장을 생성하는 데 문제가 생겼어요.");
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
                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <FormControl>
                            <FormLabel>제목</FormLabel>
                            <Input
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

    return (
        <>
            <Button
                variant="soft"
                size="lg"
                startDecorator={<AddIcon />}
                onClick={() => setOpen(true)}
                sx={{
                    position: "fixed",
                    bottom: "30px",
                    right: "30px",
                    borderRadius: "20px",
                    boxShadow: "md",
                    zIndex: 999,
                }}
            >
                <Typography level="body-md">새 단어장</Typography>
            </Button>

            <AddNewVocaModal
                open={open}
                onClose={() => setOpen(false)}
                onRefresh={onRefresh}
            />
        </>
    );
}
