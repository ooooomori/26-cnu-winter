import axios from 'axios';
import useAuthStore from "../stores/authStore";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_BASE_URL,
});

// 요청 인터셉터
API.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러가 발생했고, 재시도 전이라면
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 스토어에서 refreshToken 가져오기
        const refreshToken = useAuthStore.getState().refreshToken;

        const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_BASE_URL}/jwt/refresh`, {
          refreshToken,
        });

        const newAccessToken = res.data.accessToken;
        const newRefreshToken = res.data.refreshToken;

        // 스토어 업데이트
        useAuthStore.getState().setTokens(newAccessToken, newRefreshToken);

        // 새 토큰으로 원래 요청 재시도
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return API(originalRequest); 
      } catch (refreshError) {
        // 갱신 실패 시 로그아웃 (스토어 초기화)
        useAuthStore.getState().logout();
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default API;