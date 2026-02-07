const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
    Button,
    IconButton,
    Modal,
    ModalDialog,
    ModalClose,
    ModalOverflow,
    DialogTitle,
    Typography,
    Stack,
    Box,
    Card,
    CardContent,
    CardActions,
    CardOverflow,
    Chip,
} from "@mui/joy";
import AddCommentIcon from "@mui/icons-material/AddComment";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";
import packageJson from "../../package.json";
import useAuthStore from "../stores/authStore.js";

export default function MyVocaListModal({ open, setOpen }) {
    const navigate = useNavigate();
    const handleClose = () => {
        setOpen(false);
        navigate("/");
    };
    const [vocaList, setVocaList] = useState([]);

    const VocaList = [
        { id: "abcde", name: "나만의단어장1121", count: 121 },
        { id: "fghji", name: "영어단어장", count: 15 },
        { id: "abcde", name: "나만의단어장1121331", count: 121 },
        { id: "fghji", name: "영어단어장", count: 15 },
        { id: "abcde", name: "나만의단어장1121", count: 121 },
        { id: "fghji", name: "영어단어장", count: 15 },
        { id: "abcde", name: "나만의단어장1121", count: 121 },
        { id: "fghji", name: "영어단어장", count: 15 },
        { id: "abcde", name: "나만의단어장1121", count: 121 },
        { id: "fghji", name: "영어단어장", count: 15 },
    ]; // 내 단어장 목록 (임시 데이터)

    useEffect(() => {
        const fetchVocaList = async () => {
            try {
                //const res = await API.get("/wordbook/list");
                //setVocaList(res.data);
            } catch {
                alert("단어장 목록을 불러오지 못했어요.");
            }
        };
        fetchVocaList();
    }, []);

    return (
        <Modal
            open={open}
            onClose={() => handleClose()}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            <ModalDialog
                sx={{
                    minHeight: "60dvh",
                }}
            >
                <ModalClose />
                <DialogTitle>
                    <Typography>내 단어장 목록</Typography>
                </DialogTitle>
                {VocaList.length === 0 && (
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            <AddCommentIcon
                                sx={{ fontSize: 30, color: "secondary" }}
                            />
                            <Typography level="body-md" color="neutral">
                                아직 만든 단어장이 없어요!
                                <br />
                                단어를 검색하고 내 단어장에 추가해보세요.
                            </Typography>
                        </Box>
                        <Button
                            variant="outlined"
                            startDecorator={<HomeIcon />}
                            onClick={() => navigate("/")}
                            size="lg"
                        >
                            메인으로
                        </Button>
                    </Box>
                )}
                {VocaList.length !== 0 && (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                            overflowY: "scroll"
                        }}
                    >
                        {VocaList.map((e, i) => (
                            <Card
                                key={i}
                                color="primary"
                                sx={{
                                    width: "200px",
                                    "&:hover": {
                                        boxShadow: "md",
                                        borderColor:
                                            "neutral.outlinedHoverBorder",
                                    },
                                }}
                                orientation="horizontal"
                            >
                                <CardContent
                                    sx={{
                                        alignItems: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography level="title-lg" component="h2">
                                        {e.name}
                                    </Typography>
                                    <Chip
                                        variant="soft"
                                        color="primary"
                                        size="sm"
                                        sx={{ pointerEvents: "none", mt: 1 }}
                                    >
                                        수록 단어: {e.count}개
                                    </Chip>
                                </CardContent>
                                <CardOverflow
                                    variant="soft"
                                    color="primary"
                                    sx={{
                                        px: 2,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: "xs",
                                        fontWeight: "xl",
                                        textTransform: "uppercase",
                                        borderLeft: "1px solid",
                                        borderColor: "divider",
                                    }}
                                >
                                    열기
                                </CardOverflow>
                            </Card>
                        ))}
                    </Box>
                )}
            </ModalDialog>
        </Modal>
    );
}
