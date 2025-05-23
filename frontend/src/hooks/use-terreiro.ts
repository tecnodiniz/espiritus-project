import { terreiroService } from "@/services/terreiroService";
import { Terreiro } from "@/types/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useTerreiros() {
  const [terreiros, setTerreiros] = useState<Terreiro[]>([]);

  async function fetchTterreiros() {
    try {
      const data = await terreiroService.getTerreiros();

      setTerreiros(data);
    } catch (error) {
      console.error("Erro ao buscar terreiros:", error);
    }
  }
  useEffect(() => {
    fetchTterreiros();
  }, []);
  return { terreiros };
}

export function useTerreiro(id: any) {
  const [terreiro, setTerreiro] = useState<Terreiro>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTerreiroById() {
      try {
        const data = await terreiroService.getTerreirosById(id);

        setTerreiro(data);
      } catch (err: any) {
        if (err.response.status === 404 || err.response.status === 422)
          navigate("/notFound");
        console.error("Não foi possível buscar o terreiro: ", err);
      }
    }
    if (id) fetchTerreiroById();
  }, [id]);

  async function updateTerreiro() {
    const data = await terreiroService.getTerreirosById(id);
    setTerreiro(data);
  }

  return { terreiro, updateTerreiro };
}
