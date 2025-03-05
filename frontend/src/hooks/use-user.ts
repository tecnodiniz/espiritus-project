import { useProfile } from "@/context/ProfileContext";
import { authService } from "@/services/authService";
import { userService } from "@/services/userService";
import { Auth, User } from "@/types/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const { userLogin } = useProfile();
  const navigate = useNavigate();

  async function authenticate(credentials: Auth) {
    setError(null);
    try {
      const response = await authService.userLogin(credentials);
      userLogin(response.data);
      navigate("/");
    } catch (err: any) {
      if (err.response.status === 401) {
        setError(err.response.data?.detail);
      }
      console.log(err.response?.data || "Erro ao fazer login");
    }
  }
  return { authenticate, error };
}
