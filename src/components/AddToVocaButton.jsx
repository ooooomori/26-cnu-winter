/**
 * @name AddToVocaButton
 * @description SearchPage.jsx에서 단어 검색결과가 있을 경우에 표출되는 '단어장에 추가' 버튼 컴포넌트
 * @param {number} word - 검색결과 단어이자 단어장에 추가될 단어의 ID
 * @example <AddToVocaButton word={searchResult.wordId} />
 */

import Button from "@mui/joy/Button";
import BookmarkAdd from "@mui/icons-material/BookmarkAdd";
import useVocaStore from "../stores/vocaStore";


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
