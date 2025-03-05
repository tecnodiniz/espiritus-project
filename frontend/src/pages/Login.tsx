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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAuth } from "@/hooks/use-user";
import { useProfile } from "@/context/ProfileContext";
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
  const { profile } = useProfile();
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
              <CardTitle>Login</CardTitle>
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
                  <div className="w-full flex justify-end">
                    <Button type="submit">Login</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
