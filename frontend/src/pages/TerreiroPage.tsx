import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ChevronLeft,
  MapPin,
  CalendarDays,
  Users,
  Image,
  Star,
  Phone,
  Clock,
  Building,
  Info,
  Heart,
  Navigation2,
  Search,
  Hourglass,
  Circle,
  X,
  Check,
} from "lucide-react";

import { useTerreiro } from "@/hooks/use-terreiro";
import { getInitials } from "@/utility/utils";
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
import { useProfile } from "@/context/ProfileContext";

export default function TerreiroPage() {
  const { id } = useParams();
  const { terreiro } = useTerreiro(id);
  const [query, setQuery] = useState("");
  const [filteredUser, setFilteredUser] = useState<TerreiroAgent[]>([]);
  const { profile } = useProfile();

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
    <div className="container max-w-[1280px] mx-auto px-4 py-6">
      <Link to="/terreiros">
        <Button
          className="mb-4 cursor-pointer hover:text-yellow-400 transition-colors duration-200 px-0"
          variant="link"
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Voltar para listagem
        </Button>
      </Link>

      <Card className="overflow-hidden border-none shadow-xl rounded-xl">
        {/* Hero Image */}
        <div className="relative w-full h-[250px] md:h-[350px] bg-gradient-to-br from-purple-800 to-purple-600 dark:from-purple-900 dark:to-gray-800 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://source.unsplash.com/random/1200x600/?temple')] bg-center bg-cover"></div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent h-1/3"></div>
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
            <Badge className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 mb-2 px-3 py-1">
              {terreiro?.segment}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {terreiro?.name}
            </h1>
            <div className="flex items-center text-white/80 text-sm md:text-base mt-2">
              <MapPin className="mr-1 h-4 w-4" />
              <span>{terreiro?.address}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between px-4 md:px-8 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="ml-2 text-gray-600 dark:text-gray-400 font-medium">
                4.0
              </span>
            </div>
            <span className="mx-3 text-gray-300 dark:text-gray-700">•</span>
            <span className="text-gray-600 dark:text-gray-400">
              42 avaliações
            </span>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1 md:flex-none rounded-full bg-purple-700 hover:bg-purple-800 text-white shadow-md">
              <Heart className="mr-2 h-4 w-4" />
              Seguir
            </Button>
            <Button
              className="flex-1 md:flex-none rounded-full border-purple-700 text-purple-800 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400 dark:hover:bg-gray-800/50"
              variant="outline"
            >
              <Navigation2 className="mr-2 h-4 w-4" />
              Como chegar
            </Button>
          </div>
        </div>

        <CardContent className="p-0">
          <Tabs defaultValue="sobre" className="w-full">
            <div className="border-b border-gray-200 dark:border-gray-800 px-4 md:px-8">
              <TabsList className="bg-transparent h-14">
                <TabsTrigger
                  value="sobre"
                  className="data-[state=active]:text-purple-700 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-purple-700 rounded-none h-14 px-4"
                >
                  <Info className="mr-2 h-4 w-4" />
                  Sobre
                </TabsTrigger>
                <TabsTrigger
                  value="eventos"
                  className="data-[state=active]:text-purple-700 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-purple-700 rounded-none h-14 px-4"
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Eventos
                </TabsTrigger>
                <TabsTrigger
                  value="membros"
                  className="data-[state=active]:text-purple-700 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-purple-700 rounded-none h-14 px-4"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Membros
                </TabsTrigger>
                {profile?.id == terreiro?.user.id && (
                  <TabsTrigger
                    value="pendentes"
                    className="data-[state=active]:text-purple-700 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-purple-700 rounded-none h-14 px-4"
                  >
                    <Hourglass className="mr-2 h-4 w-4" />
                    Pendentes
                  </TabsTrigger>
                )}

                <TabsTrigger
                  value="fotos"
                  className="data-[state=active]:text-purple-700 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-purple-700 rounded-none h-14 px-4"
                >
                  <Image className="mr-2 h-4 w-4" />
                  Fotos
                </TabsTrigger>
                <TabsTrigger
                  value="avaliacao"
                  className="data-[state=active]:text-purple-700 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-purple-700 rounded-none h-14 px-4"
                >
                  <Star className="mr-2 h-4 w-4" />
                  Avaliações
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent
              value="sobre"
              className="p-4 md:p-8 focus:outline-none"
            >
              <div className="grid grid-cols-1 gap-8">
                <section>
                  <h2 className="text-2xl font-bold text-purple-900 dark:text-white mb-6">
                    Informações
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="mr-3 h-9 w-9 flex-shrink-0 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Dirigente
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            <Link
                              to={"/users/" + terreiro?.user.id}
                              className="hover:underline"
                            >
                              {terreiro?.user.name}
                            </Link>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-3 h-9 w-9 flex-shrink-0 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                          <Phone className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Contato
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {terreiro?.contact}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="mr-3 h-9 w-9 flex-shrink-0 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                          <Info className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Segmento
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {terreiro?.segment}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-3 h-9 w-9 flex-shrink-0 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Funcionamento
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {terreiro?.opening_hours}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="mr-3 h-9 w-9 flex-shrink-0 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                          <Building className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Federação
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            FENACAB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <Separator className="bg-gray-200 dark:bg-gray-800" />

                <section>
                  <h2 className="text-xl font-bold text-purple-900 dark:text-white mb-4">
                    Infraestrutura
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {terreiro?.infrastructure ||
                      "Informações sobre a infraestrutura não disponíveis."}
                  </p>
                </section>

                <Separator className="bg-gray-200 dark:bg-gray-800" />

                <section>
                  <h2 className="text-xl font-bold text-purple-900 dark:text-white mb-4">
                    Histórico
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {terreiro?.history || "Histórico não disponível."}
                  </p>
                </section>
              </div>
            </TabsContent>

            <TabsContent
              value="membros"
              className="p-4 md:p-8 focus:outline-none"
            >
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center">
                  <h2 className="text-2xl font-bold text-purple-900 dark:text-white mb-4 md:mb-0">
                    Membros
                  </h2>

                  {terreiro && terreiro.agents.length > 0 && (
                    <div className="relative w-full md:w-72">
                      <Input
                        type="text"
                        placeholder="Pesquisar participantes"
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 rounded-full border-gray-300 dark:border-gray-700 focus:ring-purple-500 focus:border-purple-500"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Search className="h-5 w-5" />
                      </div>
                    </div>
                  )}
                </div>

                {terreiro && terreiro.agents.length === 0 && (
                  <div className="bg-purple-50 dark:bg-gray-800/50 rounded-xl p-6 border border-purple-100 dark:border-gray-800 text-center">
                    <Users className="mx-auto h-12 w-12 text-purple-400 mb-3" />
                    <p className="text-purple-800 dark:text-purple-300 text-lg font-medium">
                      Não há participantes registrados
                    </p>
                    <p className="text-purple-600 dark:text-purple-400 mt-2">
                      Este terreiro ainda não tem membros cadastrados na
                      plataforma.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredUser.map(
                    (agent, index) =>
                      agent.status === "ativo" && (
                        <Card
                          key={index}
                          className="overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all duration-300 rounded-xl"
                        >
                          <CardHeader className="pb-2">
                            <div className="flex items-center">
                              <Avatar className="h-14 w-14 border-2 border-purple-100 dark:border-purple-800">
                                <AvatarImage src="" />
                                <AvatarFallback className="bg-purple-700 text-white font-bold">
                                  {getInitials(agent.user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="ml-4">
                                <CardTitle className="text-lg text-purple-900 dark:text-white">
                                  {agent.user.name}
                                </CardTitle>
                                <Badge className="mt-1 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-200">
                                  {agent.role.position}
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent className="pt-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                              {agent.role.description ||
                                "Sem descrição disponível."}
                            </p>
                          </CardContent>

                          <CardFooter className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-800">
                            <CardDescription className="text-gray-500 dark:text-gray-400">
                              Membro desde 2020
                            </CardDescription>
                            <Button
                              variant="ghost"
                              className="text-purple-700 hover:text-purple-900 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20 p-0 h-auto"
                            >
                              <Link
                                to={"/users/" + agent.user.id}
                                className="flex items-center"
                              >
                                Visitar Perfil
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      )
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="pendentes"
              className="p-4 md:p-8 focus:outline-none"
            >
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center">
                  <h2 className="text-2xl font-bold text-purple-900 dark:text-white mb-4 md:mb-0">
                    Pendentes
                  </h2>

                  {terreiro && terreiro.agents.length > 0 && (
                    <div className="relative w-full md:w-72">
                      <Input
                        type="text"
                        placeholder="Pesquisar participantes"
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 rounded-full border-gray-300 dark:border-gray-700 focus:ring-purple-500 focus:border-purple-500"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Search className="h-5 w-5" />
                      </div>
                    </div>
                  )}
                </div>

                {terreiro && terreiro.agents.length === 0 && (
                  <div className="bg-purple-50 dark:bg-gray-800/50 rounded-xl p-6 border border-purple-100 dark:border-gray-800 text-center">
                    <Users className="mx-auto h-12 w-12 text-purple-400 mb-3" />
                    <p className="text-purple-800 dark:text-purple-300 text-lg font-medium">
                      Não há participantes registrados
                    </p>
                    <p className="text-purple-600 dark:text-purple-400 mt-2">
                      Este terreiro ainda não tem membros cadastrados na
                      plataforma.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredUser.map(
                    (agent, index) =>
                      agent.status === "pendente" && (
                        <Card
                          key={index}
                          className="overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all duration-300 rounded-xl"
                        >
                          <CardHeader className="pb-2 ">
                            <div className="flex justify-between">
                              <div className="flex items-center">
                                <Avatar className="h-14 w-14 border-2 border-purple-100 dark:border-purple-800">
                                  <AvatarImage src="" />
                                  <AvatarFallback className="bg-purple-700 text-white font-bold">
                                    {getInitials(agent.user.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="ml-4">
                                  <CardTitle className="text-lg text-purple-900 dark:text-white">
                                    {agent.user.name}
                                  </CardTitle>
                                  <Badge className="mt-1 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-200">
                                    {agent.role.position}
                                  </Badge>
                                </div>
                              </div>
                              <div>
                                <Button
                                  variant="ghost"
                                  className="cursor-pointer"
                                  size="sm"
                                >
                                  <X />
                                </Button>
                                <Button
                                  variant="ghost"
                                  className="cursor-pointer"
                                  size="sm"
                                >
                                  <Check />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent className="pt-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                              {agent.role.description ||
                                "Sem descrição disponível."}
                            </p>
                          </CardContent>

                          <CardFooter className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-800">
                            <CardDescription className="text-gray-500 dark:text-gray-400">
                              Membro desde 2020
                            </CardDescription>
                            <Button
                              variant="ghost"
                              className="text-purple-700 hover:text-purple-900 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20 p-0 h-auto"
                            >
                              <Link
                                to={"/users/" + agent.user.id}
                                className="flex items-center"
                              >
                                Visitar Perfil
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      )
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="eventos" className="p-8 focus:outline-none">
              <div className="flex justify-center items-center py-16">
                <div className="text-center">
                  <CalendarDays className="mx-auto h-12 w-12 text-purple-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">
                    Nenhum evento disponível
                  </h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-500">
                    Não há eventos programados para este terreiro no momento.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="fotos" className="p-8 focus:outline-none">
              <div className="flex justify-center items-center py-16">
                <div className="text-center">
                  <Image className="mx-auto h-12 w-12 text-purple-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">
                    Nenhuma foto disponível
                  </h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-500">
                    Este terreiro ainda não possui fotos na galeria.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="avaliacao" className="p-8 focus:outline-none">
              <div className="flex justify-center items-center py-16">
                <div className="text-center">
                  <Star className="mx-auto h-12 w-12 text-purple-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">
                    Nenhuma avaliação disponível
                  </h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-500">
                    Seja o primeiro a avaliar este terreiro.
                  </p>
                  <Button className="mt-6 rounded-full bg-purple-700 hover:bg-purple-800 text-white shadow-md px-6">
                    Avaliar Terreiro
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
