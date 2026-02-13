import Typography from "@mui/joy/Typography";

export default function ExampleSentence({ text, keyword }) {
    // text: 예문
    // keyword: 검색한 단어
    const parts = text.split(new RegExp(`(${keyword})`, "gi")); //keyword를 기준으로 text를 쪼갬

    return (
        <Typography sx={{ lineHeight: 1 }}>
            {parts.map((part, i) => {
                // 현재 단어가 keyword를 포함하는지 확인
                const isMatch = part.includes(keyword);

                return isMatch ? (
                    <span key={i}>
                        <Typography
                            key={i}
                            variant="soft"
                            color="success"
                            component="span"
                        >
                            {part}
                        </Typography>{" "}
                    </span>
                ) : (
                    part + " "
                );
            })}
        </Typography>
    );
}
