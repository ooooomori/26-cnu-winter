import Typography from "@mui/joy/Typography";

export default function ExampleSentence({ text, keyword, level = "body-md" }) {
    const parts = text.split(" ");

    return (
        <Typography component="span" sx={{ lineHeight: 1 }} level={level}>
            {parts.map((part, i) => {
                // 현재 단어가 keyword(검색결과 단어)를 포함하는지 확인
                const isMatch = part.includes(keyword);

                return isMatch ? (
                    <>
                        <Typography
                            key={i}
                            variant="soft"
                            color="success"
                            component="span"
                        >
                            {part}
                        </Typography>{" "}
                    </>
                ) : (
                    part + " "
                );
            })}
        </Typography>
    );
}
