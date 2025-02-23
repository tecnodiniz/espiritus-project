import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { use, useEffect, useState } from "react";
import { fetch_users } from "@/services/api";
import { Input } from "@/components/ui/input";

type User = {
  name: string;
  plan: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");

  async function fetchUsers() {
    try {
      const response = await fetch_users();
      if (response.status == 200) {
        setUsers(response.data);
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
      setFilteredUsers(users);
    } else
      setFilteredUsers(
        users.filter((user) =>
          user.name.toLowerCase().includes(query.toLocaleLowerCase())
        )
      );
  }, [query]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  return (
    <div className="grid grid-cols-1 space-y-6">
      <Input
        type="text"
        placeholder="Search Users"
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="flex flex-wrap gap-4 justify-center">
        {filteredUsers.map((user, index) => (
          <Card className="w-[350px] " key={index}>
            <div className="flex items-center">
              <Avatar className="size-15 ml-3">
                <AvatarImage src="" />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <CardHeader className="px-2">
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>Usuário no plano {user.plan}</CardDescription>
              </CardHeader>
            </div>

            <CardFooter className="flex justify-end">
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
