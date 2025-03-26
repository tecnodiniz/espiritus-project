import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
import { MapPin, Star, StarHalf } from "lucide-react";

import { useProfile } from "@/context/ProfileContext";
import { Terreiro } from "@/types/types";
import { terreiroService } from "@/services/terreiroService";

export function UserTerreiros() {
  const { profile } = useProfile();
  const [terreiros, setTerreiros] = useState<Terreiro[]>([]);

  const id = profile?.id || "";

  useEffect(() => {
    if (!id) return;
    async function fetchUserTerreiros() {
      try {
        const response = await terreiroService.getUserTerreiros(id);
        if (response.status === 200) setTerreiros(response?.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUserTerreiros();
  }, [id]);
  return (
    <>
      <div className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 space-y-6">
          <div className="flex flex-col space-y-4">
            <Badge className="w-fit px-4 py-1.5 text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/40">
              Terreiros
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {terreiros.map((terreiro, index) => (
              <Card
                key={index}
                className="rounded-xl overflow-hidden border border-purple-100 dark:border-gray-800 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-950"
              >
                <div className="relative w-full h-48 bg-gradient-to-br from-purple-800 to-purple-600 dark:from-purple-900 dark:to-gray-800 overflow-hidden">
                  {/* Placeholder for Terreiro image */}
                  <div className="absolute inset-0 opacity-20 bg-[url('https://source.unsplash.com/random/300x200/?temple')] bg-center bg-cover"></div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-purple-900 dark:text-white">
                    {terreiro.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <span className="text-purple-700 dark:text-purple-400 font-medium">
                      {terreiro.segment}
                    </span>{" "}
                    ·
                    <MapPin className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                    {terreiro.address}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-1 mb-4">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-600 dark:text-gray-400 text-sm ml-1 font-medium">
                      4.2
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {terreiro.history}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col xl:flex-row md:flex-col gap-2 justify-between pt-2">
                  <Button className="w-full rounded-full cursor-pointer bg-purple-700 hover:bg-purple-800 text-white">
                    <Link
                      to={"/terreiros/" + terreiro.id}
                      className="flex items-center justify-center w-full"
                    >
                      Seguir
                    </Link>
                  </Button>
                  <Button
                    className="w-full rounded-full cursor-pointer border-purple-700 text-purple-800 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400 dark:hover:bg-gray-800/50"
                    variant="outline"
                  >
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
