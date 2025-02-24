import { userService } from "@/services/userService";
import { User } from "@/types/types";
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
