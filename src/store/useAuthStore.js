import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set) => ({
            isLoggedIn: false,
            user: null,
            isModalOpen: false, // 기본값
            openModal: () => set({ isModalOpen: true }),
            closeModal: () => set({ isModalOpen: false }),
            // ... 나머지
        }),
        {
            name: "auth-storage",
            // ⭐ 특정 상태만 저장하고 싶을 때 (isModalOpen 제외)
            partialize: (state) => ({
                isLoggedIn: state.isLoggedIn,
                user: state.user,
            }),
        },
    ),
);

export default useAuthStore;
