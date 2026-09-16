const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"
).replace(/\/$/, "");
const ACCESS_TOKEN_KEY = "vidthix_access_token";
const REFRESH_TOKEN_KEY = "vidthix_refresh_token";

export const authStorage = {
  get accessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  get refreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  setTokens({ access_token, refresh_token }) {
    localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
  },
  clear() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

async function request(path, options = {}, allowRefresh = true) {
  const headers = new Headers(options.headers);
  if (
    options.body &&
    !(options.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }
  if (authStorage.accessToken) {
    headers.set("Authorization", `Bearer ${authStorage.accessToken}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });
  if (response.status === 401 && allowRefresh && authStorage.refreshToken) {
    const refreshResponse = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: authStorage.refreshToken }),
    });
    if (refreshResponse.ok) {
      authStorage.setTokens(await refreshResponse.json());
      return request(path, options, false);
    }
    authStorage.clear();
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.detail || "The request failed");
    error.status = response.status;
    throw error;
  }
  return data;
}

export const api = {
  register: (payload) =>
    request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  login: (payload) =>
    request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  me: () => request("/api/auth/me"),
  youtubeConnect: () => request("/api/auth/youtube/connect"),
  getPlatforms: () => request("/api/platforms"),
  listPlatforms: () => request("/api/platforms"),
  disconnectPlatform: (platform) =>
    request(`/api/platforms/${platform}`, { method: "DELETE" }),
  getStats: () => request("/api/dashboard/stats"),
  getVideos: () => request("/api/videos"),
  getScheduled: () => request("/api/scheduled"),
  deleteScheduled: (id) =>
    request(`/api/scheduled/${id}`, { method: "DELETE" }),
  uploadVideo: (formData) =>
    request("/api/videos/upload", {
      method: "POST",
      body: formData,
    }),
  updateVideo: (videoId, data) =>
    request(`/api/videos/${videoId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  publishVideo: (videoId, platform = "youtube") =>
    request(`/api/videos/${videoId}/publish`, {
      method: "POST",
      body: JSON.stringify({ platform, privacy_status: "public" }),
    }),
  scheduleVideo: (
    videoId,
    { scheduled_at, privacy_status = "public", platform = "youtube" },
  ) =>
    request(`/api/scheduled/${videoId}`, {
      method: "POST",
      body: JSON.stringify({
        platform,
        scheduled_time: scheduled_at,
        privacy_status,
      }),
    }),
};

export { API_BASE_URL };
