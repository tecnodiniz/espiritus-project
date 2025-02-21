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

export default function Home() {
  return (
    <Card className="w-[350px]">
      <div className="flex items-center">
        <Avatar className="size-15 ml-3">
          <AvatarImage src="https://thispersondoesnotexist.com/" />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
        <CardHeader className="px-2">
          <CardTitle>Eduardo Diniz</CardTitle>
          <CardDescription>Usuário no plano basico</CardDescription>
        </CardHeader>
      </div>

      <CardFooter className="flex justify-end">
        <Button>Mais</Button>
      </CardFooter>
    </Card>
  );
}
