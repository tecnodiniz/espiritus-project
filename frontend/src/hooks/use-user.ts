import { authService } from "@/services/authService";
import { userService } from "@/services/userService";
import { Auth, User } from "@/types/types";
import { useEffect, useState } from "react";

export function useUser(id: any) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function fetchUserById() {
      const data = await userService.getUsersById(id);
      setUser(data);
    }
    fetchUserById();
  }, [id]);
  return { user };
}

export function useAuth() {
  const [error, setError] = useState<string | null>(null);

  async function authenticate(credentials: Auth) {
    setError(null);
    try {
      const response = await authService.userLogin(credentials);
      console.log(response);
    } catch (err: any) {
      if (err.response.status === 401) {
        console.log(err.response.data);
      }
      console.log(err.response?.data?.message || "Erro ao fazer login");
    }
  }
  return { authenticate, error };
}
