import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAuth } from "@/hooks/use-user";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z
    .string()
    .email("Email inválido")
    .nonempty("Preencha todos os campos"),
  password: z.string().nonempty("Preencha todos os campos"),
});

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const storageUser = localStorage.getItem("user");
    if (storageUser) navigate("/");
  }, []);
  const { authenticate, error } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    form.reset();
    authenticate(values);
  };

  return (
    <>
      <div className="flex h-screen items-center">
        <div className="w-[450px] mx-auto">
          <Card className="p-3">
            <CardHeader>
              <CardTitle className="text-center  text-2xl">
                Acesse sua conta
              </CardTitle>
              <CardDescription className="text-red-500">
                {error}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="password"
                            type="password"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="w-full flex ">
                    <Button type="submit" className="w-full p-5">
                      Entrar
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="secondary" className="cursor-pointer">
                Entre com Google
              </Button>
              <Button variant="secondary" className="cursor-pointer">
                Entre com facebook
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
