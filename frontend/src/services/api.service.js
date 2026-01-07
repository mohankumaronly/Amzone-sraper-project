import api from "./api";

export const userRegister = (data) => {
  return api.post("/api/auth/register", data);
};

export const verifyEmail = (token) => {
  return api.get(`/api/auth/verify-email/${token}`);
};

export const userLogin = (data) => {
  return api.post("/api/auth/login", data);
};

export const getMe = () => {
  return api.get("/api/auth/me")
}

export const logout = () => {
  return api.post('/api/auth/logout')
}

export const forgotPassword = (email) => {
  return api.post('/api/auth/forgot-password', {email})
}

export const resetPassword = (token, password) => {
  return api.post(`/api/auth/reset-password/${token}`, { password });
};

