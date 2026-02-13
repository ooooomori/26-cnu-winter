import { create } from "zustand";
/**
 * <MyVocaListModal /> (내 단어장 목록을 보여주는 모달 컴포넌트)의 열림 상태를 저장하는 Store
 */

const useVocaStore = create((set) => ({
    isMyVocaListOpen: false, //모달 열림 상태(기본값 F)
    selectedWord: null, //단어장에 저장할 단어
    mode: null, //단어장에 단어 추가: (추가할 단어 ID, "add"), 단어장 열기: (null, "open")
    openMyVocaList: (word, mode) =>
        set({ isMyVocaListOpen: true, selectedWord: word, mode: mode, }),
    closeMyVocaList: () => set({ isMyVocaListOpen: false, selectedWord: null, mode: null, }),
}));

export default useVocaStore;
