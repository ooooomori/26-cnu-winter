import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set) => ({
            isLoggedIn: false, //로그인 상태 변수 (초기값: false)
            user: null, //유저 ID (초기값: null)
            isLoginModalOpen: false, //로그인 모달 열림 상태 변수 (초기값: false)
            isSignUpModalOpen: false, //회원가입 모달 열림 상태 변수 (초기값: false)
            redirectTo: null, //로그인 후 이동할 경로 저장 변수 (초기값: null)
            accessToken: null, //로그인 토큰
            refreshToken: null,

            //토큰 설정 함수
            setTokens: (accessToken, refreshToken) =>
                set({ accessToken, refreshToken }),

            //목적지 설정 함수
            setRedirectTo: (path) => set({ redirectTo: path }),

            setAuthModal: (type) =>
                set({
                    isLoginModalOpen: type === "login", //로그인 모달 열기
                    isSignUpModalOpen: type === "signup", //회원가입 모달 열기
                }),

            onLoginSuccess: (user) =>
                set({
                    isLoggedIn: true,
                    user: user,
                    isLoginModalOpen: false,
                    isSignUpModalOpen: false,
                }),

            logout: () => {
                set({
                    isLoggedIn: false,
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                });
            }, //LocalStorage에서 토큰 삭제, 로그인 상태 해제
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                isLoggedIn: state.isLoggedIn,
                user: state.user,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
            }), //LocalStorage에 로그인 상태 저장
        },
    ),
);

export default useAuthStore;
