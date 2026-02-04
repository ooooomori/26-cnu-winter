import * as React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import MainInput from "../components/MainInput.jsx";
import ExampleSentence from "../components/ExampleSentence.jsx";
import AddToVocaButton from "../components/AddToVocaButton.jsx";
import PhoneticInfo from "../components/PhoneticInfo.jsx";

import Chip from "@mui/joy/Chip";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { Typography } from "@mui/joy";
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepIndicator from "@mui/joy/StepIndicator";
import Divider from "@mui/joy/Divider";
import Tooltip from "@mui/joy/Tooltip";
import IconButton from "@mui/joy/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import BookmarksOutlined from "@mui/icons-material/BookmarksOutlined";

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const searchedLang = searchParams.get("lang");
    const navigate = useNavigate();

    const searchResult = [
        {
            word: "right",
            phonetic: {US: "raɪt", GB: "raɪt", KR: "라잇"},
            savedCount: 9921,
            meanings: [
                {
                    partOfSpeech: "형용사",
                    definition: "옳은, 올바른",
                    examples: [
                        {
                            a: "Is it ever right to kill?",
                            b: "사람을 죽이는 것이 과연 옳은 일인가?",
                            keywords: ["right", "옳은"],
                        },
                    ],
                },
                {
                    partOfSpeech: "형용사",
                    definition: "맞는, 정확한",
                    examples: [
                        {
                            a: "What’s the right time?",
                            b: "지금이 정확하게 몇 시지?",
                            keywords: ["right", "정확하게"],
                        },
                    ],
                },
                {
                    partOfSpeech: "부사",
                    definition: "정확히, 바로, 꼭",
                    examples: [
                        {
                            a: "The wind was right in our faces.",
                            b: "바람이 정확히 우리 얼굴을 향해 불어왔다.",
                            keywords: ["right", "정확히"],
                        },
                    ],
                },
            ],
        },
    ]; // 임시 데이터

    return (
        <Box sx={{ minHeight: "80dvh" }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    border: "none",
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
            {searchResult.map((item) => (
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
                                {item.word}
                            </Typography>
                            <AddToVocaButton />
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <PhoneticInfo
                                phonetic={item.phonetic}
                            />
                            <Tooltip
                                title={`${item.savedCount.toLocaleString("ko-KR")}개의 단어장에 저장되어 있어요.`}
                                variant="outlined"
                                enterTouchDelay={0}
                            >
                                <Typography
                                    startDecorator={
                                        <BookmarksOutlined
                                            sx={{ fontSize: "md" }}
                                        />
                                    }
                                >
                                    {item.savedCount.toLocaleString("ko-KR")}
                                </Typography>
                            </Tooltip>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Stepper orientation="vertical">
                            {item.meanings.map((meaning, index) => (
                                <Step
                                    indicator={
                                        <StepIndicator variant="solid">
                                            {index + 1}
                                        </StepIndicator>
                                    }
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 1,
                                            alignItems: "center",
                                        }}
                                    >
                                        <Chip color="warning" variant="soft">
                                            {meaning.partOfSpeech}
                                        </Chip>
                                        <Typography>
                                            {meaning.definition}
                                        </Typography>
                                    </Box>

                                    <Card
                                        sx={{
                                            mb: 2,
                                            bgcolor: "background.level1",
                                        }}
                                    >
                                        <ExampleSentence
                                            text={meaning.examples[0].a}
                                            keyword={
                                                meaning.examples[0].keywords[0]
                                            }
                                        />
                                        <ExampleSentence
                                            text={meaning.examples[0].b}
                                            keyword={
                                                meaning.examples[0].keywords[1]
                                            }
                                            level="body-sm"
                                        />
                                    </Card>
                                </Step>
                            ))}
                        </Stepper>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}
