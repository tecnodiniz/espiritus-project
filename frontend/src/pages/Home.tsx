import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-6 space-y-6">
        <div className="col-span-3 col-start-2 grid grid-cols-1 gap-4 justify-center">
          <Card>
            <CardHeader>
              <CardTitle>Tudo sobre a Umbanda</CardTitle>
              <CardDescription>
                Venha entender e desmistificar sobre a religião
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                A Umbanda é uma religião brasileira que combina elementos de
                diversas tradições espirituais, como o catolicismo, o
                espiritismo, as religiões africanas e o xamanismo indígena. Ela
                é baseada na crença na comunicação com espíritos, como guias
                espirituais, orixás e entidades de diferentes origens, que
                ajudam na cura, orientação e proteção...
              </p>
            </CardContent>
            <CardFooter className="justify-self-end">
              <Button>Saiba mais</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tudo sobre a Umbanda</CardTitle>
              <CardDescription>
                Venha entender e desmistificar sobre a religião
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                A Umbanda é uma religião brasileira que combina elementos de
                diversas tradições espirituais, como o catolicismo, o
                espiritismo, as religiões africanas e o xamanismo indígena. Ela
                é baseada na crença na comunicação com espíritos, como guias
                espirituais, orixás e entidades de diferentes origens, que
                ajudam na cura, orientação e proteção...
              </p>
            </CardContent>
            <CardFooter className="justify-self-end">
              <Button>Saiba mais</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tudo sobre a Umbanda</CardTitle>
              <CardDescription>
                Venha entender e desmistificar sobre a religião
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                A Umbanda é uma religião brasileira que combina elementos de
                diversas tradições espirituais, como o catolicismo, o
                espiritismo, as religiões africanas e o xamanismo indígena. Ela
                é baseada na crença na comunicação com espíritos, como guias
                espirituais, orixás e entidades de diferentes origens, que
                ajudam na cura, orientação e proteção...
              </p>
            </CardContent>
            <CardFooter className="justify-self-end">
              <Button>Saiba mais</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tudo sobre a Umbanda</CardTitle>
              <CardDescription>
                Venha entender e desmistificar sobre a religião
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                A Umbanda é uma religião brasileira que combina elementos de
                diversas tradições espirituais, como o catolicismo, o
                espiritismo, as religiões africanas e o xamanismo indígena. Ela
                é baseada na crença na comunicação com espíritos, como guias
                espirituais, orixás e entidades de diferentes origens, que
                ajudam na cura, orientação e proteção...
              </p>
            </CardContent>
            <CardFooter className="justify-self-end">
              <Button>Saiba mais</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
