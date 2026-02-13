import Button from "@mui/joy/Button";
import BookmarkAdd from "@mui/icons-material/BookmarkAdd";
import useVocaStore from "../stores/vocaStore";

/**
 * SearchPage.jsx에서 단어 검색결과가 있을 경우에 표출되는 '단어장에 추가' 버튼 컴포넌트
 * PROPS: word: 검색 결과 단어
 */

export default function AddToVocaButton({word}) {
    const { openMyVocaList } = useVocaStore();
    return (
        <Button
            variant="soft"
            color="primary"
            startDecorator={<BookmarkAdd />}
            sx={{ flexShrink: 0 }}
            onClick={() => openMyVocaList(word, "add")}
        >
            단어장에 추가
        </Button>
    );
}
