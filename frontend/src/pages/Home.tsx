import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { fetch_terreiros, fetch_users } from "@/services/api";
import { Input } from "@/components/ui/input";

type User = {
  name: string;
  plan: string;
};

type Terreiro = {
  name: string;
  user: User;
  contact: string;
  opening_hours: string;
  agents: User[];
  address: string;
};

export default function Home() {
  // const [users, setUsers] = useState<User[]>([]);
  // const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [terreiros, setTerreiros] = useState<Terreiro[]>([]);
  const [filteredTerreiros, setFilteredTerreiros] = useState<Terreiro[]>([]);

  const [query, setQuery] = useState("");

  async function fetchUsers() {
    try {
      const response = await fetch_terreiros();
      if (response.status == 200) {
        setTerreiros(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function getInitials(name: string) {
    return name
      .split(" ")
      .filter((word) => word.length > 0)
      .map((word) => word[0]?.toUpperCase() || "")
      .slice(0, 2)
      .join("");
  }
  useEffect(() => {
    fetchUsers();
  }, []);

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
                Mais
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
