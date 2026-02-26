import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";

import AddNewVocaButton from "./AddNewVocaButton.jsx";

import {
    Link,
    Modal,
    ModalDialog,
    ModalClose,
    DialogTitle,
    Typography,
    Stack,
    Box,
    Card,
    CardContent,
    CardOverflow,
    Chip,
} from "@mui/joy";
import AddCommentIcon from "@mui/icons-material/AddComment";
import useVocaStore from "../stores/VocaStore.js";
import API from "../api/axios";

export default function MyVocaListModal() {
    const { isMyVocaListOpen, closeMyVocaList, mode, selectedWord } =
        useVocaStore();
    const [vocaList, setVocaList] = useState([]);

    const fetchVocaList = async () => {
        try {
            const res = await API.get("/wordbook/list");
            //const res = { data: [], };
            setVocaList(res.data);
        } catch (err) {
            alert("단어장 목록을 불러오지 못했어요.");
            console.error("단어장 목록 로드 실패: " + err);
            closeMyVocaList();
        }
    };
    useEffect(() => {
        if (isMyVocaListOpen) {
            setVocaList([]);
            fetchVocaList();
        }
    }, [isMyVocaListOpen]);
    const handleAdd = async (id) => {
        try {
            const res = await API.post("/wordbookword", {
                word: selectedWord,
                wordbook: id,
            });
            alert("단어가 등록되었어요!");
        } catch (err) {
            alert("단어를 추가하다 실패했어요.");
            console.error("단어 등록 실패:", err);
        }
    };

    return (
        <Modal
            open={isMyVocaListOpen}
            onClose={closeMyVocaList}
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

                {vocaList.length === 0 && (
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                        }}
                    >
                        <Box sx={{ mb: "30px" }}>
                            <AddCommentIcon
                                sx={{ fontSize: 30, color: "secondary" }}
                            />
                            <Typography level="body-md" color="neutral">
                                아직 만든 단어장이 없어요.
                                <br />
                                단어장을 만들고 단어를 추가해보아요!
                            </Typography>
                        </Box>
                        <AddNewVocaButton onRefresh={fetchVocaList} />
                    </Box>
                )}
                {vocaList.length > 0 && (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                            overflowY: "scroll",
                            marginY: 2,
                        }}
                    >
                        {vocaList.map((e, i) => (
                            <Card
                                key={i}
                                color="neutral"
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
                                        textAlign: "left",
                                    }}
                                >
                                    <Typography level="title-lg" component="h2">
                                        <Link
                                            overlay
                                            component={
                                                mode === "add"
                                                    ? "button"
                                                    : RouterLink
                                            }
                                            to={
                                                mode === "add"
                                                    ? undefined
                                                    : `/wordbook?id=${e.id}`
                                            }
                                            onClick={
                                                mode === "add"
                                                    ? () => handleAdd(e.id)
                                                    : undefined
                                            }
                                        >
                                            {e.name}
                                        </Link>
                                    </Typography>
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        sx={{ mt: 0.5 }}
                                    >
                                        <Chip
                                            variant="outlined"
                                            color="success"
                                            size="sm"
                                            sx={{
                                                pointerEvents: "none",
                                            }}
                                        >
                                            공개
                                        </Chip>
                                        <Chip
                                            variant="soft"
                                            color="neutral"
                                            size="sm"
                                            sx={{
                                                pointerEvents: "none",
                                            }}
                                        >
                                            수록 단어 {e.count}개
                                        </Chip>
                                    </Stack>
                                </CardContent>
                                <CardOverflow
                                    variant="soft"
                                    color="neutral"
                                    sx={{
                                        px: 1,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: "xs",
                                        fontWeight: "xl",
                                        textTransform: "uppercase",
                                        borderLeft: "1px solid",
                                        borderColor: "divider",
                                    }}
                                >
                                    {mode === "add" ? "선택" : "열기"}
                                </CardOverflow>
                            </Card>
                        ))}
                        <AddNewVocaButton onRefresh={fetchVocaList} />
                    </Box>
                )}
            </ModalDialog>
        </Modal>
    );
}
