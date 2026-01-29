import * as React from "react";
import Button from "@mui/joy/Button";

import Input from "@mui/joy/Input";
import LanguageSelect from "./LanguageSelect";

import SearchIcon from "@mui/icons-material/Search";

export default function MainInput() {
    const [lang, setLang] = React.useState("en");
    const inputRef = React.useRef(null);
    const handleLangChange = (_, newValue) => {
        setLang(newValue);
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 10);
    };
    return (
        <Input
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
                </React.Fragment>
            }
            endDecorator={
                <Button
                    variant="soft"
                    color="neutral"
                    endDecorator={<SearchIcon style={{ margin: 0 }} />}
                    sx={{
                        paddingRight: "5px",
                        paddingLeft: 0,
                        paddingY: "5px",
                    }}
                ></Button>
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
