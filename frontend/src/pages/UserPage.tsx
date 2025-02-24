import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/hooks/use-user";
import { getInitials } from "@/lib/utils";
import { useParams } from "react-router-dom";

export default function UserPage() {
  const { id } = useParams();
  const { user } = useUser(id);

  return (
    <>
      <Card>
        <div className="flex items-center">
          <Avatar className="size-15 ml-3">
            <AvatarImage src="" />
            <AvatarFallback>
              {getInitials(user ? user?.name : "")}
            </AvatarFallback>
          </Avatar>
          <CardHeader>
            <CardTitle>{user?.name}</CardTitle>
            <CardDescription>
              <Badge>{user?.plan}</Badge>
            </CardDescription>
          </CardHeader>
        </div>
        <CardContent></CardContent>

        <CardFooter className="flex justify-end p-1"></CardFooter>
      </Card>
    </>
  );
}
