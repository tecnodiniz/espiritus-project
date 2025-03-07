import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { useTerreiros } from "@/hooks/use-terreiro";
import { Terreiro } from "@/types/types";

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
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 space-y-6">
          <Badge>Terreiros</Badge>
          {filteredTerreiros.length == 0 && (
            <p>Ops! Não encontramos resultados para a busca por "{query}"</p>
          )}

          <h2 className="text-2xl"></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTerreiros.map((terreiro, index) => (
              <Card key={index} className="rounded-none">
                <div className="w-full bg-purple-900 h-40"></div>
                <CardHeader>
                  <CardTitle>{terreiro.name}</CardTitle>
                  <CardDescription>{terreiro.address}</CardDescription>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter className="flex flex-col xl:flex-row md:flex-col gap-2 justify-between">
                  <Button className="w-full cursor-pointer font-light cursor-pointer rounded-3xl bg-yellow-400 text-purple-900 font-medium hover:bg-yellow-300 dark:bg-primary dark:text-primary-foreground">
                    <Link to={"/terreiros/" + terreiro.id}>Seguir</Link>
                  </Button>
                  <Button className="w-full cursor-pointer font-light cursor-pointer rounded-3xl bg-emerald-500 font-medium hover:bg-emerald-700 dark:bg-primary dark:text-primary-foreground">
                    Como chegar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
