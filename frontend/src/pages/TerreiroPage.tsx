import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useTerreiro } from "@/hooks/use-terreiro";
import { getInitials } from "@/lib/utils";
import { TerreiroAgent } from "@/types/types";

import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

export default function TerreiroPage() {
  const { id } = useParams();
  const { terreiro } = useTerreiro(id);
  const [query, setQuery] = useState("");
  const [filteredUser, setFilteredUser] = useState<TerreiroAgent[]>([]);

  useEffect(() => {
    if (terreiro?.agents) {
      setFilteredUser(
        query.trim()
          ? terreiro.agents.filter((terreiroAgent) =>
              terreiroAgent.user.name
                .toLowerCase()
                .includes(query.toLowerCase())
            )
          : terreiro.agents
      );
    }
  }, [query, terreiro]);

  return (
    <>
      <Card className="min-h-[100vh]">
        <CardHeader>
          <CardTitle className="text-2xl">{terreiro?.name}</CardTitle>
          <CardDescription>{terreiro?.history}</CardDescription>
          <CardDescription>
            <Badge>{terreiro?.segment}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 mb-5 ">
            <div>{terreiro?.infrastructure}</div>
            <div>
              <strong>Responsável:</strong> {terreiro?.user.name}
            </div>
            <div>
              <strong>Endereço:</strong> {terreiro?.address}
            </div>
            <div>
              <strong>Contato:</strong> {terreiro?.contact}
            </div>
            <div>
              <strong>Horário de funcionamento: </strong>
              {terreiro?.opening_hours}
            </div>
          </div>
          <Separator className="mb-5" />
          <div className="font-semibold text-xl mb-4">Membros</div>
          <div className="my-5">
            {terreiro && terreiro.agents.length > 0 ? (
              <Input
                type="text"
                placeholder="Pesquisar participantes"
                onChange={(e) => setQuery(e.target.value)}
              />
            ) : (
              <p>Não há participantes</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {filteredUser.map((agent, index) => (
              <Card key={index}>
                <div className="flex items-center">
                  <Avatar className="size-15 ml-3">
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {getInitials(agent.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <CardHeader>
                    <CardTitle>{agent.user.name}</CardTitle>
                    <CardDescription>{agent.role.position}</CardDescription>
                  </CardHeader>
                </div>
                <CardContent>{agent.role.description}</CardContent>

                <CardFooter className="flex justify-end p-1">
                  <Button className="cursor-pointer" variant="link">
                    <Link to={"/users/" + agent.user.id}>Visitar Perfil</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
