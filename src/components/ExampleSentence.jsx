import Typography from "@mui/joy/Typography";

export default function ExampleSentence({ text, keyword }) {
    const regex = new RegExp(`(${keyword})`, "gi");
    const parts = text.split(regex);

    return (
        <Typography sx={{lineHeight: 1}}>
            {parts.map((part, i) => {
                // 현재 조각이 키워드 배열에 포함되어 있는지 확인
                const isMatch = keyword.toLowerCase() === part.toLowerCase();

                return isMatch ? (
                    <Typography key={i} variant="soft" color="success" noWrap>
                        {part}
                    </Typography>
                ) : (
                    part
                );
            })}
        </Typography>
    );
}
