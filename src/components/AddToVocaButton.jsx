import Button from "@mui/joy/Button";
import Bookmarks from "@mui/icons-material/Bookmarks";

export default function AddToVocaButton() {
    return <Button variant="soft" color="primary" startDecorator={<Bookmarks />}>단어장에 추가</Button>
}