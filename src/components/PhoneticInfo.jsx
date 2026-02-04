import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import { Typography } from "@mui/joy";

import ReactCountryFlag from "react-country-flag";

export default function PhoneticInfo({ phonetic, audioUrl }) {
    const groupedPhonetics = Object.entries(phonetic).reduce(
        (acc, [lang, text]) => {
            if (!acc[text]) acc[text] = [];
            acc[text].push(lang);
            return acc;
        },
        {},
    );

    return (
        <Stack
            direction="row"
            spacing={1}
        >
            {Object.entries(groupedPhonetics).map(([text, countries]) => (
                <Box
                    key={text}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mb: 0.5,
                    }}
                >
                    {countries.map((lang) => (
                        <ReactCountryFlag
                            key={lang}
                            countryCode={lang}
                            svg
                            style={{ fontSize: "1.2em", lineHeight: "1em" }}
                        />
                    ))}

                    <Typography sx={{ color: "text.secondary", ml: 0.5 }}>
                        [{text}]
                    </Typography>
                </Box>
            ))}
        </Stack>
    );
}
