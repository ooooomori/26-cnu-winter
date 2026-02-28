import { create } from "zustand";

const useAlertStore = create((set) => ({
    open: null, // true: 성공, false: 실패, null: 닫힘(기본값)
    message: "",

    // 성공 메시지 띄우기
    showSuccess: (msg) => set({ open: true, message: msg }),
    
    // 실패 메시지 띄우기
    showFail: (msg) => set({ open: false, message: msg }),
    
    // 닫기
    closeAlert: () => set({ open: null }),
}));

export default useAlertStore;