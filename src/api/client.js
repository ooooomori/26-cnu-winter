import useAuthStore from "../stores/authStore";

// AccessToken 만료시 Refreshing
export async function refreshAccessToken() {

    // 로컬 스토리지로 부터 RefreshToken 가져옴
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("RefreshToken이 없습니다.");

    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_BASE_URL}/jwt/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) throw new Error("AccessToken 갱신 실패");

    // 성공 새 Token 저장
    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    return data.accessToken;
}

// AccessToken과 함께 fetch
export async function fetchWithAccess(url, options = {}) {

    // 로컬 스토리지로 부터 AccessToken 가져옴
    let accessToken = localStorage.getItem("accessToken");

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        ...options.headers,
    };
    
    // 요청 진행
    let response = await fetch(url, { ...options, headers });

    // AccessToken 만료로 401 뜨면, Refresh로 재발급
    if (response.status === 401) {

        try {
            accessToken = await refreshAccessToken();
            const newHeaders = {
                ...headers,
                'Authorization': `Bearer ${accessToken}`,
            };
            // 재요청
            response = await fetch(url, { ...options, headers: newHeaders });
        } catch (err) {
            // Refreshing이 실패했기 때문에 로컬스토리지 삭제 후, 로그인 페이지로
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            const { logout } = useAuthStore.getState();
            logout();
            throw new Error("토큰 갱신 실패로 로그아웃 처리되었습니다.");
        }

    }

    if (!response.ok) {
        throw new Error(`HTTP 오류 : ${response.status}`);
    }

    return response;
}