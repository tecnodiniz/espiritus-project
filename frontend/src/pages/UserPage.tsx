import { Link, useParams } from "react-router-dom";

import { useUser } from "@/hooks/use-user";
import { getInitials } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { use } from "react";
import { useProfile } from "@/context/ProfileContext";

export default function UserPage() {
  const { id } = useParams();
  const { user } = useUser(id);
  const { profile } = useProfile();

  return (
    <>
      <div className="container max-w-[1280px] mx-auto">
        <Card className="min-h-[100vh] rounded-none">
          <div className="w-full bg-purple-900 h-50"></div>
          <Link to="/">
            <Button className="m-2 cursor-pointer" variant="link">
              <ChevronLeft /> Voltar
            </Button>
          </Link>

          <div className="flex items-center ml-3 mb-10">
            <Avatar className="size-25 ">
              <AvatarImage src="https://thispersondoesnotexist.com/" />
              <AvatarFallback>
                {getInitials(user?.name || "IMGs")}
              </AvatarFallback>
            </Avatar>
            <CardHeader className="flex flex-row justify-between w-100 items-center">
              <CardTitle>
                <p className="font-bold text-2xl">{user?.name}</p>
              </CardTitle>
              <Button
                className="cursor-pointer font-light cursor-pointer rounded-3xl bg-yellow-400 text-purple-900 font-medium hover:bg-yellow-300 dark:bg-primary dark:text-primary-foreground"
                disabled={profile ? false : true}
              >
                Seguir
              </Button>
            </CardHeader>
          </div>

          <CardContent>
            <Tabs defaultValue="sobre" className="w-full">
              <TabsList>
                <TabsTrigger value="sobre">Sobre</TabsTrigger>
                <TabsTrigger value="terreiros">Terreiros</TabsTrigger>
              </TabsList>
              <TabsContent value="sobre">
                <div className="grid grid-cols-1 gap-4 mb-5">
                  <p className="text-2xl font-bold">Informações</p>
                  <div className="grid grid-cols-3 py-5 gap-6">
                    <div className="grid space-y-5"></div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="terreiros">
                <div className="grid grid-cols-1 gap-4 mb-5">
                  <p className="text-2xl font-bold">Terreiros</p>
                  <div className="grid grid-cols-3 py-5 gap-6">
                    <div className="grid space-y-5"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3">
                  {user?.agents.map((agent, index) => (
                    <Card key={index} className="rounded-none">
                      <div className="w-full bg-purple-900 h-40"></div>
                      <CardHeader>
                        <CardTitle>{agent.terreiro.name}</CardTitle>
                        <CardDescription>
                          {agent.terreiro.address}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>
                          <span className="font-bold">Posição:</span>{" "}
                          {agent.role.position}
                        </p>
                      </CardContent>
                      <CardFooter className="flex flex-col xl:flex-row md:flex-col gap-2 justify-between">
                        <Button className="w-full cursor-pointer font-light cursor-pointer rounded-3xl bg-yellow-400 text-purple-900 font-medium hover:bg-yellow-300 dark:bg-primary dark:text-primary-foreground">
                          <Link to={"/terreiros/" + agent.terreiro.id}>
                            Seguir
                          </Link>
                        </Button>
                        <Button className="w-full cursor-pointer font-light cursor-pointer rounded-3xl bg-emerald-500 font-medium hover:bg-emerald-700 dark:bg-primary dark:text-primary-foreground">
                          Como chegar
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
