import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Stack from "@mui/joy/Stack";
import SearchIcon from "@mui/icons-material/Search";

export default function MainInput() {
    const [lang, setLang] = React.useState("eng");
    return (
        <Input
            placeholder="공부할 단어를 검색하세요"
            startDecorator={
                <React.Fragment>
                    <Divider orientation="vertical" />
                    <Select
                        variant="plain"
                        value={lang}
                        onChange={(_, value) => setLang(value)}
                        slotProps={{
                            listbox: {
                                variant: "outlined",
                            },
                        }}
                        sx={{
                            ml: -1.5,
                            "&:hover": { bgcolor: "transparent" },
                        }}
                    >
                        <Option value="eng">영어</Option>
                        <Option value="ger">독일어</Option>
                        <Option value="kor">한국어</Option>
                    </Select>
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
            sx={{ width: "100%", paddingY: "5px" }}
        />
    );
}
