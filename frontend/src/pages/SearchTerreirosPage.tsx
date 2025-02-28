import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useTerreiros } from "@/hooks/use-terreiro";
import { Terreiro } from "@/types/types";

import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export function SearchTerreiros() {
  const { terreiros } = useTerreiros(); //Provisório. O correto é fazer a buscar pela api
  const [filteredTerreiros, setFilteredTerreiros] = useState<Terreiro[]>([]);
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  useEffect(() => {
    setFilteredTerreiros(
      query.trim()
        ? terreiros.filter((terreiro) =>
            terreiro.name.toLowerCase().includes(query.toLowerCase())
          )
        : terreiros
    );
  }, [query, terreiros]);

  return (
    <>
      <div className="grid grid-cols-1 space-y-6">
        <Badge>Terreiros</Badge>
        {filteredTerreiros.length == 0 && (
          <p>Ops! Não encontramos resultados para a busca por "{query}"</p>
        )}

        <h2 className="text-2xl"></h2>
        <div className="grid grid-cols-1 gap-4 justify-center">
          {filteredTerreiros.map((terreiro, index) => (
            <Card className="rounded-none" key={index}>
              <div className="flex items-center">
                <CardHeader>
                  <CardTitle>{terreiro.name}</CardTitle>
                  <CardDescription>
                    <ul>
                      <li>Responsável: {terreiro.user.name}</li>
                      <li>Membros: {terreiro.agents.length}</li>
                    </ul>
                  </CardDescription>
                </CardHeader>
              </div>
              <CardContent>
                <ul>
                  <li>
                    <strong>Contact:</strong> {terreiro.contact}
                  </li>
                  <li>
                    <strong>Opening Hours:</strong> {terreiro.opening_hours}
                  </li>
                </ul>
              </CardContent>

              <CardFooter className="flex justify-end p-1">
                <Button className="cursor-pointer" variant="link">
                  <Link to={"/terreiros/" + terreiro.id}>Mais</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
