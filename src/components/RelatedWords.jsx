import { useSearchParams, Link as RouterLink } from "react-router-dom";
import { Box, Chip, Link, Stack, Typography } from "@mui/joy";

export default function RelatedWords({ synonym, antonym }) {
    const [searchParams] = useSearchParams();

    const synonyms = synonym.split(",");
    const antonyms = antonym.split(",");

    // URL 생성 함수
    const getSearchUrl = (word) => {
        const params = new URLSearchParams(searchParams);
        params.set("keyword", word);
        return `/search?${params.toString()}`;
    };

    // 단어 리스트를 링크로 변환
    const renderLinks = (words) => {
        return words.map((word, index) => (
            <span key={word}>
                <Link
                    component={RouterLink}
                    to={getSearchUrl(word)}
                    underline="hover"
                >
                    {word}
                </Link>
                {/* 마지막 단어가 아니면 쉼표 추가 */}
                {index < words.length - 1 && ", "}
            </span>
        ));
    };

    return (
        <Box>
            {synonyms.length > 0 && (
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{ my: 1 }}
                    alignItems="center"
                >
                    <Chip color="success" variant="soft">
                        유의어
                    </Chip>
                    <Typography>
                        {renderLinks(synonyms)}
                    </Typography>
                </Stack>
            )}

            {antonyms.length > 0 && (
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{ my: 1 }}
                    alignItems="center"
                >
                    <Chip color="warning" variant="soft">
                        반의어
                    </Chip>
                    <Typography>
                        {renderLinks(antonyms)}
                    </Typography>
                </Stack>
            )}
        </Box>
    );
}
