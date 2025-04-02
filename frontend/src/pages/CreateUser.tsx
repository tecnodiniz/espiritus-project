"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, User, Mail, Lock, Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
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
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-user";

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        message: "O nome deve ter pelo menos 2 caracteres",
      })
      .regex(
        new RegExp("^(?!\\s)[a-zA-ZÀ-ÖØ-öø-ÿ]+(\\s[a-z-A-ZÀ-ÖØ-öø-ÿ]+)*$"),
        {
          message: "Nome inválido",
        }
      )
      .max(50),
    cpf: z.string().min(11, {
      message: "CPF inválido",
    }),
    email: z.string().email({
      message: "Email inválido",
    }),
    password: z.string().min(6, {
      message: "A senha deve ter pelo menos 6 caracteres",
    }),
    confirmPassword: z.string().min(1, {
      message: "Confirmação de senha é obrigatória",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export default function CreateUser() {
  const { toast } = useToast();
  const [load, setLoad] = useState(false);
  const { authenticate } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
      email: "",
      password: "",
      confirmPassword: "",
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
      const response = await userService.createUser({
        user: userPayload,
        auth: authPayload,
      });
      if (response.status === 200) {
        toast({
          description: "Usuário criado com sucesso!",
          action: <ToastAction altText="OK">OK</ToastAction>,
        });
        authenticate(authPayload);
        form.reset();
      }
    } catch (error: any) {
      console.log(error);
      setLoad(false);
      toast({
        variant: "destructive",
        title: "Ops! Algo deu errado.",
        description:
          `${error?.response.data.detail}` || "Erro ao criar usuário",
        action: (
          <ToastAction altText="Tentar novamente">Tentar novamente</ToastAction>
        ),
      });
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-8 bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/30 dark:to-gray-950/80">
      <div className="w-full max-w-md mx-auto">
        <Card className="border-none shadow-lg overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-800"></div>

          <CardHeader className="space-y-1 pb-4">
            <div className="flex justify-center mb-2">
              <div className="size-16 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                <User className="size-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Criar Conta
            </CardTitle>
            <CardDescription className="text-center">
              Preencha os campos abaixo para se cadastrar
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome completo</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="João Silva"
                            {...field}
                            className="pl-10"
                          />
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </FormControl>
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
                        <div className="relative">
                          <Input
                            placeholder="123.456.789-00"
                            {...field}
                            className="pl-10"
                            onChange={(e) => {
                              const value = (
                                e.target as HTMLInputElement
                              ).value.replace(/\D/g, "");
                              let formattedValue = "";

                              if (value.length <= 11) {
                                if (value.length > 9) {
                                  formattedValue = value.replace(
                                    /(\d{3})(\d{3})(\d{3})(\d{1,2})/,
                                    "$1.$2.$3-$4"
                                  );
                                } else if (value.length > 6) {
                                  formattedValue = value.replace(
                                    /(\d{3})(\d{3})(\d{1,3})/,
                                    "$1.$2.$3"
                                  );
                                } else if (value.length > 3) {
                                  formattedValue = value.replace(
                                    /(\d{3})(\d{1,3})/,
                                    "$1.$2"
                                  );
                                } else {
                                  formattedValue = value;
                                }
                                field.onChange(formattedValue);
                              }
                            }}
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect x="2" y="4" width="20" height="16" rx="2" />
                              <path d="M12 8v8" />
                              <path d="m9 12 6 0" />
                            </svg>
                          </div>
                        </div>
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
                        <div className="relative">
                          <Input
                            placeholder="usuario@exemplo.com"
                            {...field}
                            className="pl-10"
                          />
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
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
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="••••••"
                            {...field}
                            type={showPassword ? "text" : "password"}
                            className="pl-10 pr-10"
                          />
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-0 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="••••••"
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            className="pl-10 pr-10"
                          />
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-0 hover:bg-transparent"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                  <Button
                    variant="default"
                    type="submit"
                    disabled={load}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-medium py-2 rounded-md transition-all duration-300"
                  >
                    {load ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Processando...
                      </>
                    ) : (
                      "Criar conta"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-0">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300 dark:border-gray-700"></span>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">
                  Já tem uma conta?
                </span>
              </div>
            </div>

            <Link
              to="/login"
              className="text-center text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
            >
              Faça login aqui
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
