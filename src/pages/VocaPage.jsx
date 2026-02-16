import * as React from "react";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import packageJson from "../../package.json";
import API from "../api/axios";
import {
    Stack,
    Box,
    Typography,
    Accordion,
    AccordionGroup,
    AccordionSummary,
    AccordionDetails,
    IconButton,
    Button,
    Card,
} from "@mui/joy";
import AddCommentIcon from "@mui/icons-material/AddComment";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";
import RelatedWords from "../components/RelatedWords";
import ExampleSentence from "../components/ExampleSentence";
import MainInput from "../components/MainInput";
export default function VocaPage() {
    const [searchParams] = useSearchParams();
    const queryId = searchParams.get("id") || "";
    const [words, setWords] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchWords = async () => {
            try {
                const res = await API.get("/wordbook", {
                    params: {
                        id: queryId,
                    },
                });

                setWords(res.data);

                /**
                const dummyData = {
                    name: "테스트1",
                    words: Array.from({ length: 10 }, (_, i) => ({
                        wordId: i,
                        word: `Word ${i}`,
                        meaning: `뜻 ${i}`,
                        example: `Sample Word ${i} sentence.`,
                        synonym: "lorem",
                        antonym: "ipsum",
                    })),
                };
                */
                setWords(dummyData);
            } catch (err) {
                alert("단어장 로드 중 오류가 발생했습니다");
                console.error("단어장 로드 실패:", err);
            }
        };
        fetchWords();
    }, [queryId]);

    return (
        <Stack
            justifyContent="center"
            sx={{
                minHeight: "80dvh",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    border: "none",
                    width: "100%",
                    mb: 5,
                    justifyContent: "center",
                }}
            >
                <IconButton
                    variant="outlined"
                    sx={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "20px",
                    }}
                    onClick={() => navigate("/")}
                >
                    <HomeIcon />
                </IconButton>
                <Box>
                    <Typography level="h2" component="h2">
                        {packageJson.description}
                    </Typography>
                    <Typography>단어장 - #{words.name}</Typography>
                </Box>
            </Box>
            {words?.words?.length > 0 ? (
                <AccordionGroup size="lg" sx={{ width: "100%", mb: 5 }}>
                    {words?.words.map((e, i) => (
                        <Accordion key={i}>
                            <AccordionSummary>
                                <Stack>
                                    <Typography level="title-md">
                                        {e.word}
                                    </Typography>
                                    <Typography>{e.meaning}</Typography>
                                </Stack>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Stack spacing={2}>
                                    <RelatedWords
                                        synonym={e.synonym}
                                        antonym={e.antonym}
                                    />
                                    <Card>
                                        <ExampleSentence
                                            text={e.example}
                                            keyword={e.word}
                                        />
                                    </Card>
                                    <Button
                                        disabled
                                        variant="soft"
                                        color="danger"
                                        size="sm"
                                        startDecorator={<DeleteIcon />}
                                        sx={{
                                            width: "fit-content",
                                            alignSelf: "flex-end",
                                        }}
                                    >
                                        삭제
                                    </Button>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </AccordionGroup>
            ) : (
                words?.words?.length === 0 && (
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                        }}
                    >
                        <Box>
                            <AddCommentIcon
                                sx={{ fontSize: 30, color: "secondary" }}
                            />
                            <Typography level="body-md" color="neutral">
                                아직 단어장에 추가한 단어가 없어요.
                                <br />
                                단어를 검색해 나만의 단어장을 채워요!
                            </Typography>
                        </Box>
                    </Box>
                )
            )}

            <MainInput />
        </Stack>
    );
}
