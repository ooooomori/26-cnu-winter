import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set) => ({
            isLoggedIn: false,
            user: null,

            isLoginModalOpen: false,
            isSignUpModalOpen: false,

            setAuthModal: (type) =>
                set({
                    isLoginModalOpen: type === "login",
                    isSignUpModalOpen: type === "signup",
                }),

            onLoginSuccess: (user) =>
                set({
                    isLoggedIn: true,
                    user: user,
                    isLoginModalOpen: false,
                    isSignUpModalOpen: false,
                }),

            logout: () => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("auth-storage");
                set({ isLoggedIn: false, user: null });
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                isLoggedIn: state.isLoggedIn,
                user: state.user,
            }),
        },
    ),
);

export default useAuthStore;
