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

import { Star, StarHalf, MapPin, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col my-4 sm:my-8 md:my-12">
          <Card className="flex flex-col items-start justify-center w-full bg-gradient-to-r from-purple-950 to-purple-800 dark:from-neutral-950 dark:to-gray-900 overflow-hidden border-none rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl min-h-[350px] md:min-h-[450px]">
            <CardContent className="p-6 sm:p-8 md:p-12 lg:p-16 w-full">
              <div className="max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] space-y-4 md:space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                  Descubra e conecte-se com tradições espirituais
                </h1>
                <p className="text-purple-200 dark:text-gray-300 text-base sm:text-lg">
                  Encontre terreiros, participe de eventos e conheça mais sobre as tradições espirituais brasileiras.
                </p>
                <div className="pt-2 md:pt-4">
                  <Button
                    variant="default"
                    className="px-6 py-2 sm:px-8 sm:py-3 text-base sm:text-lg font-medium cursor-pointer rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-purple-900 border-none shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    EXPLORAR
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="py-4 sm:py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-purple-900 dark:text-white">Terreiros em destaque</h2>
            <a className="flex items-center gap-1 font-medium text-purple-700 hover:text-yellow-500 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors duration-200 cursor-pointer text-sm sm:text-base">
              Ver todos
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <Card 
                key={i} 
                className="rounded-xl overflow-hidden border border-purple-100 dark:border-gray-800 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-950"
              >
                <div className="relative w-full h-40 sm:h-48 bg-gradient-to-br from-purple-800 to-purple-600 dark:from-purple-900 dark:to-gray-800 overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://source.unsplash.com/random/300x200/?temple')] bg-center bg-cover"></div>
                </div>
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-lg sm:text-xl text-purple-900 dark:text-white">Terreiro do Mauro</CardTitle>
                  <CardDescription className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                    <span className="text-purple-700 dark:text-purple-400 font-medium">Umbanda</span> · 
                    <MapPin className="h-3 w-3 text-gray-500 dark:text-gray-400" /> 
                    Salvador, BA
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" /> 
                    <StarHalf className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm ml-1 font-medium">4.2</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    Terreiro tradicional de Umbanda com mais de 20 anos de história dedicada à espiritualidade.
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex flex-row sm:flex-col md:flex-row gap-2 justify-between">
                  <Button 
                    size="sm"
                    className="w-full rounded-full cursor-pointer bg-purple-700 hover:bg-purple-800 text-white text-xs sm:text-sm"
                  >
                    Seguir
                  </Button>
                  <Button
                    size="sm"
                    className="w-full rounded-full cursor-pointer border-purple-700 text-purple-800 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400 dark:hover:bg-gray-800/50 text-xs sm:text-sm"
                    variant="outline"
                  >
                    Como chegar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="py-4 sm:py-8 mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-purple-900 dark:text-white">Explore Categorias</h2>
            <a className="flex items-center gap-1 font-medium text-purple-700 hover:text-yellow-500 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors duration-200 cursor-pointer text-sm sm:text-base">
              Ver todos
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {[
              { name: "Terreiros", image: "https://www.jornalopcao.com.br/assets/2024/03/IMG-20240329-WA0091.jpg", abbr: "TR", gradient: "from-purple-900 to-purple-700" },
              { name: "Mediums", image: "https://media.istockphoto.com/id/1469828938/pt/foto/detail-of-traditional-character-at-salvador-bahia-brazil.jpg?s=612x612&w=0&k=20&c=gnjAwVOapGp5ZAf8wNQhhi5y8zmLyJHUs0zdABNyiC0=", abbr: "MD", gradient: "from-purple-800 to-purple-600" },
              { name: "Eventos", image: "https://averdade.org.br/wp-content/uploads/2019/01/image.jpg", abbr: "EV", gradient: "from-purple-700 to-purple-500" },
              { name: "Federações", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuXF1Y1oqm1pczWGM1rHOkzYOOVKjgeF7YSA&s", abbr: "FD", gradient: "from-purple-600 to-purple-400" },
              { name: "Lojas", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScg6xBkozxZo00U4uVua3pf0JxVIucym6EBg&s", abbr: "LJ", gradient: "from-purple-500 to-purple-300" },
              { name: "Espaços", image: "https://patosurgente.com.br/wp-content/uploads/2023/07/DSC0044-scaled.jpg", abbr: "ES", gradient: "from-purple-400 to-purple-200" }
            ].map((category, index) => (
              <Card 
                key={index} 
                className="rounded-xl overflow-hidden border-none shadow-md cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className={`w-full flex-col bg-gradient-to-br ${category.gradient} dark:from-purple-800 dark:to-gray-800 h-28 sm:h-36 md:h-44 lg:h-56 flex items-center justify-center p-3 sm:p-4 relative overflow-hidden`}>
                  <div className={`absolute inset-0 bg-[url('${category.image}')] bg-center bg-cover opacity-20`}></div>
                  <Avatar className="size-10 sm:size-14 md:size-16 lg:size-20 mb-2 sm:mb-3 md:mb-4 border-2 border-white/30 shadow-lg">
                    <AvatarImage src={category.image} />
                    <AvatarFallback className="bg-purple-700">{category.abbr}</AvatarFallback>
                  </Avatar>
                  <p className="text-white font-medium text-sm sm:text-base md:text-lg relative z-10">{category.name}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
