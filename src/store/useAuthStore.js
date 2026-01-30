import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set) => ({
            isLoggedIn: false,
            user: null,
            isLoginModalOpen: false,
            isSignUpModalOpen: false,
            openLoginModal: () => set({ isLoginModalOpen: true }),
            closeLoginModal: () => set({ isLoginModalOpen: false }),
            openSignUpModal: () => set({ isSignUpModalOpen: true }),
            closeSignUpModal: () => set({ isSignUpModalOpen: false }),
            logout: () => set({ isLoggedIn: false, user: null }),
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
