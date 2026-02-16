import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import MainInput from "../components/MainInput.jsx";
import ExampleSentence from "../components/ExampleSentence.jsx";
import AddToVocaButton from "../components/AddToVocaButton.jsx";
import RelatedWords from "../components/RelatedWords.jsx";
import API from "../api/axios";

import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { Typography } from "@mui/joy";
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import CircularProgress from "@mui/joy/CircularProgress";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const queryKeyword = searchParams.get("keyword") || ""; // 쿼리 중 keyword (검색 단어)
    const queryLang = searchParams.get("lang") || "en"; // 쿼리 중 lang (검색 언어)
    const navigate = useNavigate();
    const [searchResult, setSearchResult] = useState({}); // 검색 결과 객체 저장

    /**
    const searchResult = {
        wordId: 1234,
        word: "defeat",
        meaning: "패배시키다, 패배",
        example: "He defeated the champion in three sets.",
        synonym: "beat",
        antonym: "triumph, victory",
    }; // 데이터 형식
    */

    
    useEffect(() => {
        const fetchResult = async () => {
            try {
                const res = await API.get("/search", {
                    params: {
                        keyword: queryKeyword,
                        lang: queryLang,
                    },
                });
                setSearchResult(res.data);
            } catch (err) {
                alert("단어 검색 중 오류가 발생했습니다");
                console.error("단어 검색 실패:", err);
            }
        };
        fetchResult();
    }, [queryKeyword, queryLang]);

    return (
        <Box
            sx={{
                minHeight: "80dvh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    border: "none",
                    width: "100%",
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
                <MainInput />
            </Box>
            {searchResult &&
            searchResult.word &&
            searchResult.meaning !== "" ? (
                <Card variant="plain" sx={{ mt: 4, textAlign: "left" }}>
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <Typography
                                level="h2"
                                sx={{
                                    wordBreak: "break-all",
                                    minWidth: 0,
                                    flex: 1,
                                }}
                            >
                                {searchResult.word}
                            </Typography>
                            <AddToVocaButton word={searchResult.wordId} />
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Stepper orientation="vertical">
                            <Step>
                                <Typography level="title-md">뜻</Typography>

                                <Typography sx={{ mb: 2 }}>
                                    {searchResult.meaning}
                                </Typography>
                            </Step>
                            <Step>
                                <Typography level="title-md">
                                    연관 단어
                                </Typography>
                                <Box sx={{ mb: 2 }}>
                                    <RelatedWords
                                        synonym={searchResult.synonym}
                                        antonym={searchResult.antonym}
                                    />
                                </Box>
                            </Step>
                            <Step>
                                <Typography level="title-md">
                                    활용하기
                                </Typography>
                                <Card
                                    sx={{
                                        marginY: 2,
                                        bgcolor: "background.level1",
                                    }}
                                >
                                    <ExampleSentence
                                        text={searchResult.example}
                                        keyword={searchResult.word}
                                    />
                                </Card>
                            </Step>
                            <Step sx={{ opacity: 0 }} disabled />
                        </Stepper>
                    </CardContent>
                </Card>
            ) : searchResult && searchResult.word ? (
                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                    }}
                ><Box>
                    <SentimentDissatisfiedIcon
                        sx={{ fontSize: 30, color: "secondary" }}
                    />
                    <Typography level="body-md" color="neutral">
                        검색 결과가 없어요.
                        <br />
                        단어를 맞게 입력했는지 확인해보세요.
                    </Typography>
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
        </Box>
    );
}
