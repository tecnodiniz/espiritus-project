import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { ChevronLeft } from "lucide-react";

import { useTerreiro } from "@/hooks/use-terreiro";
import { getInitials } from "@/lib/utils";
import { TerreiroAgent } from "@/types/types";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TerreiroPage() {
  const { id } = useParams();
  const { terreiro } = useTerreiro(id);
  const [query, setQuery] = useState("");
  const [filteredUser, setFilteredUser] = useState<TerreiroAgent[]>([]);

  useEffect(() => {
    console.log(id);
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
    <div className="container max-w-[1280px] mx-auto">
      <Card className="min-h-[100vh] rounded-none">
        <div className="w-full bg-purple-900 h-100"></div>
        <Link to="/">
          <Button className="m-2 cursor-pointer" variant="link">
            <ChevronLeft /> Voltar
          </Button>
        </Link>
        <CardHeader className="pt-0 grid grid-cols-1 lg:grid-cols-2">
          <div>
            <CardTitle className="text-2xl">{terreiro?.name}</CardTitle>
            <CardDescription>{terreiro?.address}</CardDescription>
            <CardDescription className="py-5">
              <Badge>{terreiro?.segment}</Badge>
            </CardDescription>
          </div>
          <div className="flex  gap-2 justify-between">
            <Button className="w-full cursor-pointer font-light cursor-pointer rounded-3xl bg-yellow-400 text-purple-900 font-medium hover:bg-yellow-300 dark:bg-primary dark:text-primary-foreground">
              Seguir
            </Button>
            <Button className="w-full cursor-pointer font-light cursor-pointer rounded-3xl bg-emerald-500 font-medium hover:bg-emerald-700 dark:bg-primary dark:text-primary-foreground">
              Como chegar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sobre" className="w-full">
            <TabsList>
              <TabsTrigger value="sobre">Sobre</TabsTrigger>
              <TabsTrigger value="eventos">Eventos</TabsTrigger>
              <TabsTrigger value="membros">Membros</TabsTrigger>
              <TabsTrigger value="fotos">Fotos</TabsTrigger>
              <TabsTrigger value="avaliacao">Avaliações</TabsTrigger>
            </TabsList>
            <TabsContent value="sobre">
              <div className="grid grid-cols-1 gap-4 mb-5">
                <p className="text-2xl font-bold">Informações</p>
                <div className="grid grid-cols-3 py-5 gap-6">
                  <div className="grid space-y-5">
                    <div className="grid grid-cols-2 ">
                      <p>Dirigente</p>
                      <p>{terreiro?.user.name}</p>
                    </div>
                    <div className="grid grid-cols-2">
                      <p>Contato</p>
                      <p>{terreiro?.contact}</p>
                    </div>
                  </div>

                  <div className="grid space-y-5">
                    <div className="grid grid-cols-2 ">
                      <p>Segmento</p>
                      <p>{terreiro?.segment}</p>
                    </div>
                    <div className="grid grid-cols-2">
                      <p>Funcionamento</p>
                      <p>{terreiro?.opening_hours}</p>
                    </div>
                  </div>

                  <div className="grid space-y-5">
                    <div className="grid grid-cols-2 ">
                      <p>Federação</p>
                      <p>FENACAB</p>
                    </div>
                  </div>
                </div>

                <div className=" py-2">
                  <p className="text-xl font-semibold">Infraestrutura</p>
                  {terreiro?.infrastructure}
                </div>

                <div className=" py-2">
                  <p className="text-xl font-semibold">Histórico</p>
                  {terreiro?.history}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="membros">
              <div className="grid grid-cols-1 gap-4 mb-5">
                <p className="text-2xl font-bold">Membros</p>
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

                <div className="grid gap-3">
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
                          <CardDescription>
                            {agent.role.position}
                          </CardDescription>
                        </CardHeader>
                      </div>
                      <CardContent>{agent.role.description}</CardContent>

                      <CardFooter className="flex justify-end p-1">
                        <Button className="cursor-pointer" variant="link">
                          <Link to={"/users/" + agent.user.id}>
                            Visitar Perfil
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
