import api from "./api";

export const userRegister = (data) => {
  return api.post("/api/auth/register", data);
};
