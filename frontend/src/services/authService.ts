import { Auth } from "@/types/types";
import api from "./api";

export const authService = {
  async userLogin(credentials: Auth) {
    const response = await api.post("/users/auth", credentials);
    return response;
  },
};
