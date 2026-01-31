import * as React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import LanguageSelect from "./LanguageSelect";

import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";

import SearchIcon from "@mui/icons-material/Search";

export default function MainInput() {
    const [searchParams] = useSearchParams();

    const queryKeyword = searchParams.get("keyword") || "";
    const queryLang = searchParams.get("lang") || "en";

    const [keyword, setKeyword] = React.useState(queryKeyword);
    const [lang, setLang] = React.useState(queryLang);

    const navigate = useNavigate();
    const handleSearch = () => {
        if (!keyword.trim()) return;
        // URL 이동: /search?keyword=단어&lang=언어
        navigate(`/search?keyword=${encodeURIComponent(keyword)}&lang=${lang}`);
    };

    const inputRef = React.useRef(null);
    const handleLangChange = (_, newValue) => {
        setLang(newValue);
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 10);
    }; // 언어 변경 시 인풋에 포커스

    React.useEffect(() => {
        setKeyword(queryKeyword);
        setLang(queryLang);
    }, [queryKeyword, queryLang]); // 쿼리 파라미터 변경 시 상태 동기화

    return (
        <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch(); // 엔터키 처리
            }}
            placeholder="공부할 단어를 검색하세요"
            slotProps={{
                input: {
                    inputMode: "search",
                    autoCapitalize: "none",
                    autoComplete: "off",
                    autoCorrect: "off",
                    spellCheck: "false",
                    ref: inputRef,
                },
            }}
            startDecorator={
                <React.Fragment>
                    <LanguageSelect lang={lang} onChange={handleLangChange} />
                </React.Fragment> // 언어 선택 Select 컴포넌트
            }
            endDecorator={
                <Button
                    onClick={handleSearch}
                    variant="soft"
                    color="neutral"
                    endDecorator={<SearchIcon style={{ margin: 0 }} />}
                    sx={{
                        paddingRight: "5px",
                        paddingLeft: 0,
                        paddingY: "5px",
                    }}
                ></Button> // 검색 버튼
            }
            sx={{
                "--Input-radius": "20px",
                paddingY: "10px",
                width: "100%",
                fontSize: "1.2rem",
                "& input::placeholder": {
                    fontSize: "1rem",
                    transform: "translateY(-1.5px)",
                },
            }}
        />
    );
}
