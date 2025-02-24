import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTerreiros } from "@/hooks/use-terreiro";
import { Terreiro } from "@/types/types";

export default function Home() {
  const { terreiros } = useTerreiros();
  const [filteredTerreiros, setFilteredTerreiros] = useState<Terreiro[]>([]);

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!query.trim()) {
      setFilteredTerreiros(terreiros);
    } else
      setFilteredTerreiros(
        terreiros.filter((terreiro) =>
          terreiro.name.toLowerCase().includes(query.toLocaleLowerCase())
        )
      );
  }, [query]);

  useEffect(() => {
    setFilteredTerreiros(terreiros);
  }, [terreiros]);

  return (
    <>
      <div className="grid grid-cols-1 space-y-6">
        <Input
          type="text"
          placeholder="Search Terreiros"
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="grid grid-cols-4 gap-4 justify-center">
          {filteredTerreiros.map((terreiro, index) => (
            <Card className=" " key={index}>
              <div className="flex items-center">
                {/* <Avatar className="size-15 ml-3">
                <AvatarImage src="" />
                <AvatarFallback>{getInitials(terreiro.name)}</AvatarFallback>
              </Avatar> */}
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
                  <Link to={"terreiros/" + terreiro.id}>Mais</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
