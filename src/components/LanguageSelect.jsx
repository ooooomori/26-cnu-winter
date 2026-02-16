/**
 * @name LanguageSelect
 * @description 검색 Input 좌측에 있는 Select 컴포넌트로, 검색 언어를 선택할 수 있음
 * * @param {string} lang - 검색 언어 (부모 요소인 <MainInput>에서 State로 관리)
 * @param {() => void} onChange - 언어 선택 시 실행될 핸들러
 * * @example
 * <LanguageSelect lang={lang} onChange={handleLangChange} />
 */


import Select, { selectClasses } from "@mui/joy/Select";

import { COUNTRY_MAP } from "../constants/languages";

import Box from "@mui/joy/Box";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import ReactCountryFlag from "react-country-flag";

export default function LanguageSelect({ lang, onChange }) {
    return (
        <Select
            variant="plain"
            value={lang}
            indicator={<KeyboardArrowDown />}
            onChange={onChange}
            renderValue={(selected) => {
                if (!selected) return null;
                return (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            border: "none",
                        }}
                    >
                        <ReactCountryFlag
                            countryCode={COUNTRY_MAP[selected.value]}
                            svg
                            style={{
                                fontSize: "1.2em",
                                lineHeight: "1em",
                            }}
                        />
                        <span>{selected.label}</span>
                    </Box>
                );
            }}
            slotProps={{
                listbox: {
                    variant: "outlined",
                },
            }}
            sx={{
                paddingX: 0.5,
                "&:hover": { bgcolor: "transparent" },
                "&:focus": { border: "none" },
                [`& .${selectClasses.indicator}`]: {
                    border: 0,
                    transition: "0.2s",
                    [`&.${selectClasses.expanded}`]: {
                        transform: "rotate(-180deg)",
                    },
                },
                // 모바일 터치 하이라이트 제거
                WebkitTapHighlightColor: "transparent",
            }}
        >
            <Option value="de">
                <ReactCountryFlag countryCode="DE" svg /> 독일어
            </Option>
            <Option value="ru">
                <ReactCountryFlag countryCode="RU" svg /> 러시아어
            </Option>
            <Option value="es">
                <ReactCountryFlag countryCode="ES" svg /> 스페인어
            </Option>
            <Option value="en">
                <ReactCountryFlag countryCode="US" svg /> 영어
            </Option>
            <Option value="ja">
                <ReactCountryFlag countryCode="JP" svg /> 일본어
            </Option>
            <Option value="fr">
                <ReactCountryFlag countryCode="FR" svg /> 프랑스어
            </Option>
        </Select>
    );
}
