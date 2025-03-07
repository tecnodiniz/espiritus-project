import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Star, StarHalf } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="container mx-auto p-0 lg:px-8">
        <div className="flex h-[500px] p-0 lg:px-4 mb-30">
          <Card className="flex items-center w-full bg-purple-900 dark:bg-card">
            <CardContent className="p-10 md:p-30 ">
              <div className="mb-7">
                <p className="text-4xl font-bold max-w-[600px] text-white">
                  Descubra e conecte-se com tradições espirituais
                </p>
              </div>
              <Button
                variant="default"
                className="px-20 py-5 font-light cursor-pointer rounded-3xl bg-yellow-400 text-purple-900 font-medium hover:bg-yellow-300 dark:bg-primary dark:text-primary-foreground"
              >
                EXPLORAR
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between my-5">
            <p className="text-2xl font-bold">Terreiros em destaque</p>
            <a className="hover:underline cursor-pointer text-purple-900">
              Ver todos
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="rounded-none">
                <div className="w-full bg-purple-900 h-40"></div>
                <CardHeader>
                  <CardTitle>Terreiro do Mauro</CardTitle>
                  <CardDescription>Umbanda - Salvador,BA</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex">
                    <Star />
                    <Star />
                    <Star /> <StarHalf />
                    <p>4.2</p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col xl:flex-row md:flex-col gap-2 justify-between">
                  <Button className="w-full cursor-pointer font-light cursor-pointer rounded-3xl bg-yellow-400 text-purple-900 font-medium hover:bg-yellow-300 dark:bg-primary dark:text-primary-foreground">
                    Seguir
                  </Button>
                  <Button className="w-full cursor-pointer font-light cursor-pointer rounded-3xl bg-emerald-500 font-medium hover:bg-emerald-700 dark:bg-primary dark:text-primary-foreground">
                    Como chegar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between my-5">
            <p className="text-2xl font-bold">Explore Categorias</p>
            <a className="hover:underline cursor-pointer text-purple-900">
              Ver todos
            </a>
          </div>

          <div className="grid grid-cols-6 gap-4 mb-30">
            <Card className="rounded-none cursor-pointer">
              <div className="w-full flex-col bg-purple-900 hover:bg-purple-500 h-50 rounded flex items-center justify-center">
                <Avatar className="size-20 ">
                  <AvatarImage src="https://www.jornalopcao.com.br/assets/2024/03/IMG-20240329-WA0091.jpg" />
                  <AvatarFallback>TR</AvatarFallback>
                </Avatar>
                <p className="text-white">Terreiros</p>
              </div>
            </Card>

            <Card className="rounded-none cursor-pointer">
              <div className="w-full flex-col bg-purple-800 hover:bg-purple-500 h-50 rounded flex items-center justify-center">
                <Avatar className="size-20 ">
                  <AvatarImage src="https://media.istockphoto.com/id/1469828938/pt/foto/detail-of-traditional-character-at-salvador-bahia-brazil.jpg?s=612x612&w=0&k=20&c=gnjAwVOapGp5ZAf8wNQhhi5y8zmLyJHUs0zdABNyiC0=" />
                  <AvatarFallback>TR</AvatarFallback>
                </Avatar>
                <p className="text-white">Mediums</p>
              </div>
            </Card>

            <Card className="rounded-none cursor-pointer">
              <div className="w-full flex-col bg-purple-700 hover:bg-purple-500 h-50 rounded flex items-center justify-center">
                <Avatar className="size-20 ">
                  <AvatarImage src="https://averdade.org.br/wp-content/uploads/2019/01/image.jpg" />
                  <AvatarFallback>TR</AvatarFallback>
                </Avatar>
                <p className="text-white">Eventos</p>
              </div>
            </Card>

            <Card className="rounded-none cursor-pointer">
              <div className="w-full flex-col bg-purple-600 hover:bg-purple-500 h-50 rounded flex items-center justify-center">
                <Avatar className="size-20 ">
                  <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuXF1Y1oqm1pczWGM1rHOkzYOOVKjgeF7YSA&s" />
                  <AvatarFallback>TR</AvatarFallback>
                </Avatar>
                <p className="text-white">Federações</p>
              </div>
            </Card>

            <Card className="rounded-none cursor-pointer">
              <div className="w-full flex-col bg-purple-500 hover:bg-purple-500 h-50 rounded flex items-center justify-center">
                <Avatar className="size-20 ">
                  <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScg6xBkozxZo00U4uVua3pf0JxVIucym6EBg&s" />
                  <AvatarFallback>TR</AvatarFallback>
                </Avatar>
                <p className="text-white">Lojas</p>
              </div>
            </Card>

            <Card className="rounded-none cursor-pointer">
              <div className="w-full flex-col bg-purple-400 hover:bg-purple-500 h-50 rounded flex items-center justify-center">
                <Avatar className="size-20 ">
                  <AvatarImage src="https://patosurgente.com.br/wp-content/uploads/2023/07/DSC0044-scaled.jpg" />
                  <AvatarFallback>TR</AvatarFallback>
                </Avatar>
                <p className="text-white">Espaços</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
