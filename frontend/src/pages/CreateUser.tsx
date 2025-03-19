"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState } from "react";
import { userService } from "@/services/userService";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at leat 2 characters",
    })
    .regex(new RegExp("^(?!\\s)[a-zA-Z]+(\\s[a-z-A-Z]+)*$"), {
      message: "Invalid username",
    })
    .max(50),
  cpf: z.string(),
  email: z.string(),
  password: z.string(),
});

export default function ProfileForm() {
  const { toast } = useToast();
  const [load, setLoad] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoad(true);
    const userPayload = {
      name: values.name,
      cpf: values.cpf,
    };
    const authPayload = {
      email: values.email,
      password: values.password,
    };
    try {
      //   console.log(userPayload, authPayload);
      //   form.reset();
      const response = await userService.createUser({
        user: userPayload,
        auth: authPayload,
      });
      if (response.status === 200) {
        console.log(response.data);
        toast({
          description: "user has been created",
          action: (
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
            </div>
          ),
        });
        form.reset();
      }
    } catch (error) {
      setLoad(false);
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${error}` || "Erro ao criar usuário",
        action: (
          <ToastAction altText="Try again" onClick={() => onSubmit(values)}>
            Try again
          </ToastAction>
        ),
      });
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="flex flex-col ">
      <div className="w-full md:w-120 mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>User Form</CardTitle>
            <CardDescription>Create a new user</CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is you public display name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <Input placeholder="123.456.789-00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="user@example.com" {...field} />
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
                        <Input placeholder="****" {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <CardFooter>
                  <Button variant="default" type="submit" disabled={load}>
                    {load && <Loader2 className="animate-spin" />}
                    Submit
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
