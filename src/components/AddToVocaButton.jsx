import Button from "@mui/joy/Button";
import BookmarkAdd from "@mui/icons-material/BookmarkAdd";

export default function AddToVocaButton() {
    return (
        <Button
            variant="soft"
            color="primary"
            startDecorator={<BookmarkAdd />}
            sx={{ flexShrink: 0 }}
        >
            단어장에 추가
        </Button>
    );
}
