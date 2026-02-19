/**
 * @name VocaPage
 * @description
 * 특정 단어장의 상세 내용을 보여주는 페이지 컴포넌트입니다.
 * URL의 쿼리 파라미터(`?id=...`)로부터 단어장 ID를 읽어와 해당 단어장의 데이터를 서버에서 불러옵니다.
 * 수록된 단어들의 뜻, 유의어/반의어, 예문을 아코디언(Accordion) UI 형태로 제공하며, 개별 단어 삭제 기능을 포함합니다.
 * 하단에는 새로운 단어를 검색할 수 있는 MainInput 컴포넌트가 배치되어 있습니다.
 * * @state {Object} words - 현재 렌더링 중인 단어장 데이터 { name: string, words: Array }
 * * @function fetchWords - (useEffect 내부) 단어장 ID를 기반으로 단어 목록을 서버에서 가져오는 함수
 * @function handleDeleteWord - 선택한 단어를 서버에서 삭제하고 브라우저에 표시되는 화묜을 즉시 업데이트하는 함수
 */
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
    const [words, setWords] = useState({ name: "", words: [] });
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
                
                setWords(dummyData);
                */
            } catch (err) {
                alert("단어장 로드 중 오류가 발생했습니다");
                console.error("단어장 로드 실패:", err);
            }
        };
        fetchWords();
    }, [queryId]);

    const handleDeleteWord = async (word, wordId) => {
        if (window.confirm(`정말 단어 ${word}(을)를 삭제하시겠습니까?`)) {
            try {
                await API.delete("/wordbookword", {
                    data: {
                        wordBookId: queryId,
                        wordId: wordId,
                    },
                });
                alert("단어가 삭제되었습니다.");
                setWords((prevWords) => ({
                    ...prevWords,
                    words: prevWords.words.filter(
                        (item) => item.wordId !== wordId,
                    ),
                }));
            } catch (err) {
                alert("단어 삭제 중 문제가 발생했어요.");
                console.error("단어 삭제 실패:", err);
            }
        }
    };

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
                                        onClick={() =>
                                            handleDeleteWord(e.word, e.wordId)
                                        }
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
