import { terreiroService } from "@/services/terreiroService";
import { Role } from "@/types/types";
import { useEffect, useState } from "react";

export function useRoles() {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    async function fetchRoles() {
      const response = await terreiroService.getRoles();
      setRoles(response.data);
    }
    fetchRoles();
  }, []);
  return { roles };
}
