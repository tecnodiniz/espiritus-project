import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "O nome do terreiro deve ter no mínimo 3 caracteres.",
    })
    .regex(new RegExp("^(?!\\s)(?=.*[a-zA-Z])[a-zA-Z0-9 \\s]+$"), {
      message: "Nome inválido",
    }),
});

export function CreateTerreiro() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="container max-w-[1280px] md:w-[800px] mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>
            <p className="text-3xl text-purple-900">Cadastro de Terreiro</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Terreiro</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do Terreiro" {...field} />
                    </FormControl>
                    <FormDescription>
                      Nome que aparecerá para os usuários
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Adicionar</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
