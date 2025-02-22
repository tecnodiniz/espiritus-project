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

type User = {
  name: string;
  plan: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

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
    console.log(users);
  }, [users]);
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {users.map((user, index) => (
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
  );
}
