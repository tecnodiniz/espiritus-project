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
import { Link, useNavigate } from "react-router-dom";
import { Facebook, Mail, Eye, EyeOff, Lock, LogIn, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  email: z
    .string()
    .email("Email inválido")
    .nonempty("Preencha todos os campos"),
  password: z.string().nonempty("Preencha todos os campos"),
});

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-gray-950 dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-purple-900 dark:from-purple-400 dark:to-purple-600 mb-2 inline-block">
            Espiritus
          </Link>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Conecte-se à sua jornada espiritual
          </p>
        </div>

        <Card className="overflow-hidden border-none shadow-xl rounded-xl bg-white dark:bg-gray-900">
          <div className="h-2 bg-gradient-to-r from-purple-700 to-purple-500"></div>
          
          <CardHeader className="pt-8 pb-4 px-6">
            <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">
              Acesse sua conta
            </CardTitle>
            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center text-red-700 dark:text-red-400">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <CardDescription className="text-red-700 dark:text-red-400 m-0">
                  {error}
                </CardDescription>
              </div>
            )}
          </CardHeader>

          <CardContent className="px-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                        Email
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            placeholder="seu@email.com" 
                            className="pl-10 py-6 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-purple-500 focus:border-purple-500" 
                            {...field} 
                          />
                        </FormControl>
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                        Senha
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="Sua senha"
                            type={showPassword ? "text" : "password"}
                            className="pl-10 pr-10 py-6 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                            {...field}
                          />
                        </FormControl>
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <button 
                          type="button" 
                          onClick={togglePasswordVisibility} 
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      <div className="flex justify-end">
                        <Link to="/forgot-password" className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors mt-1">
                          Esqueceu sua senha?
                        </Link>
                      </div>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full py-6 mt-2 bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-800 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Entrar
                </Button>
              </form>
            </Form>

            <div className="mt-6 mb-4">
              <div className="grid grid-cols-3 items-center">
                <Separator className="flex-grow bg-gray-200 dark:bg-gray-700" />
                <span className="px-3 text-center text-gray-500 dark:text-gray-400 text-sm">ou entre com</span>
                <Separator className="flex-grow bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between px-6 pb-8">
            <Button 
              variant="outline" 
              className="w-full sm:w-[48%] py-5 border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-purple-700 dark:hover:text-purple-400 transition-colors"
            >
              <svg viewBox="0 0 48 48" className="h-5 w-5 mr-2">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
              Entrar com Google
            </Button>
            <Button 
              variant="outline" 
              className="w-full sm:w-[48%] py-5 border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-purple-700 dark:hover:text-purple-400 transition-colors"
            >
              <Facebook className="h-5 w-5 mr-2 text-blue-600" />
              Entrar com Facebook
            </Button>
          </CardFooter>
        </Card>

        <div className="text-center mt-6">
          <p className="text-gray-600 dark:text-gray-400">
            Não tem uma conta?{" "}
            <Link to="/register" className="font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
