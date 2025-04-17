import { Link, useParams } from "react-router-dom";

import { useUser } from "@/hooks/use-user";
import { formatDate, getInitials } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  MapPin,
  Calendar,
  User as UserIcon,
  Mail,
  Phone,
  Info,
  Heart,
  Building,
  Navigation2,
  Edit,
} from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import { AgentStatus } from "@/types/types";
import { use } from "react";

export default function UserPage() {
  const { id } = useParams();
  const { user } = useUser(id);
  const { profile } = useProfile();

  return (
    <div className="container max-w-[1280px] mx-auto px-4 py-6">
      <Link to="/">
        <Button
          className="mb-4 cursor-pointer hover:text-yellow-400 transition-colors duration-200 px-0"
          variant="link"
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Voltar para início
        </Button>
      </Link>

      <Card className="overflow-hidden border-none shadow-xl rounded-xl">
        {/* Hero Banner */}
        <div className="relative w-full h-[150px] md:h-[200px] bg-gradient-to-r from-purple-800 to-purple-600 dark:from-purple-900 dark:to-gray-800 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://source.unsplash.com/random/1200x300/?pattern')] bg-center bg-cover"></div>
        </div>

        {/* Profile Section */}
        <div className="relative px-4 md:px-8 -mt-16">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-900 shadow-xl">
              <AvatarImage src="/" />
              <AvatarFallback className="bg-gradient-to-br from-purple-700 to-purple-900 text-white text-2xl font-bold">
                {getInitials(user?.name || "IMGs")}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full pt-4 md:pt-0">
              <div className="mt-0 md:mt-20">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {user?.name}
                </h1>
                <div className="flex items-center mt-1 text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">Salvador, Bahia</span>
                </div>
                <div className="flex items-center mt-1 text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    {"Membro desde " +
                      formatDate(user?.auth.created_at || Date())}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-200">
                    {user?.plan}
                  </Badge>
                </div>
              </div>

              <div className="mt-4 md:mt-0">
                {profile?.id == user?.id ? (
                  <Button
                    className="rounded-full bg-purple-700 hover:bg-purple-800 text-white shadow-md disabled:opacity-70"
                    disabled={profile ? false : true}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                ) : (
                  <Button
                    className="rounded-full bg-purple-700 hover:bg-purple-800 text-white shadow-md disabled:opacity-70"
                    disabled={profile ? false : true}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Seguir
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6 mx-4 md:mx-8 bg-gray-200 dark:bg-gray-800" />

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
                  value="terreiros"
                  className="data-[state=active]:text-purple-700 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-purple-700 rounded-none h-14 px-4"
                >
                  <Building className="mr-2 h-4 w-4" />
                  Terreiros
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
                    Informações do Perfil
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="mr-3 h-9 w-9 flex-shrink-0 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                          <UserIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Nome Completo
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {user?.name}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="mr-3 h-9 w-9 flex-shrink-0 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                          <Mail className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Email
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {user?.auth.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="mr-3 h-9 w-9 flex-shrink-0 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                          <Phone className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Contato
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {user?.contact ? user.contact : "-----"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="mr-3 h-9 w-9 flex-shrink-0 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Localização
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            Salvador, Bahia
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <Separator className="bg-gray-200 dark:bg-gray-800" />

                <section>
                  <h2 className="text-xl font-bold text-purple-900 dark:text-white mb-4">
                    Biografia
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {user?.bio
                      ? user.bio
                      : "O usuário ainda não adicionou uma biografia."}
                  </p>
                </section>
              </div>
            </TabsContent>

            <TabsContent
              value="terreiros"
              className="p-4 md:p-8 focus:outline-none"
            >
              <div className="grid grid-cols-1 gap-6">
                <h2 className="text-2xl font-bold text-purple-900 dark:text-white">
                  Terreiros
                </h2>

                {user?.agents &&
                  user.agents.reduce(
                    (acc, agent) =>
                      acc + (agent.status == AgentStatus.active ? 1 : 0),
                    0
                  ) == 0 && (
                    <div className="bg-purple-50 dark:bg-gray-800/50 rounded-xl p-6 border border-purple-100 dark:border-gray-800 text-center">
                      <Building className="mx-auto h-12 w-12 text-purple-400 mb-3" />
                      <p className="text-purple-800 dark:text-purple-300 text-lg font-medium">
                        Nenhum terreiro associado
                      </p>
                      <p className="text-purple-600 dark:text-purple-400 mt-2">
                        Este usuário ainda não está associado a nenhum terreiro.
                      </p>
                    </div>
                  )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {user?.agents?.map((agent, index) => (
                    <>
                      {agent.status == AgentStatus.active && (
                        <Card
                          key={index}
                          className="overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all duration-300 rounded-xl"
                        >
                          <div className="relative w-full h-40 bg-gradient-to-br from-purple-800 to-purple-600 dark:from-purple-900 dark:to-gray-800 overflow-hidden">
                            <div className="absolute inset-0 opacity-20 bg-[url('https://source.unsplash.com/random/300x200/?temple')] bg-center bg-cover"></div>
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg text-purple-900 dark:text-white">
                              {agent.terreiro.name}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                              <MapPin className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                              {agent.terreiro.address}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-200">
                              {agent.role.position}
                            </Badge>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                              {agent.role.description ||
                                `Atua como ${agent.role.position} neste terreiro.`}
                            </p>
                          </CardContent>
                          <CardFooter className="flex flex-col sm:flex-row gap-2 justify-between pt-2">
                            <Button className="w-full sm:w-auto rounded-full bg-purple-700 hover:bg-purple-800 text-white">
                              <Link
                                to={"/terreiros/" + agent.terreiro.id}
                                className="flex items-center justify-center w-full"
                              >
                                <Heart className="mr-2 h-4 w-4" />
                                Seguir
                              </Link>
                            </Button>

                            <Button
                              className="w-full sm:w-auto rounded-full border-purple-700 text-purple-800 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400 dark:hover:bg-gray-800/50"
                              variant="outline"
                            >
                              <Navigation2 className="mr-2 h-4 w-4" />
                              Como chegar
                            </Button>
                          </CardFooter>
                        </Card>
                      )}
                    </>
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
