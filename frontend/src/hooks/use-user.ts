import { useProfile } from "@/context/ProfileContext";
import { authService } from "@/services/authService";
import { userService } from "@/services/userService";
import { Auth, User } from "@/types/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useUser(id: any) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function fetchUserById() {
      try {
        const data = await userService.getUsersById(id);
        setUser(data);
      } catch (err: any) {
        if (err.response.status === 404 || err.response.status === 422)
          navigate("/notFound");
      }
    }
    fetchUserById();
  }, [id]);
  return { user };
}

export function useAuth() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { userLogin } = useProfile();

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
