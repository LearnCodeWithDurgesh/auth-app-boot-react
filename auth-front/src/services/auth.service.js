import api from "@/utils/ApiClient";

export const signup = async (payload) => {
  // payload: { name, email, password }
  const res = await api.post("/auth/register", payload);
  return res.data; // only return data, not the whole response
};

export const login = async (payload) => {
  const res = await api.post("/auth/login", payload);
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

//refresh new access token using refresh token
export const refreshToken = async () => {
  const res = await api.post("/auth/refresh");
  return res.data;
};
