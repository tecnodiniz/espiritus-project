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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProfile } from "@/context/ProfileContext";
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
  segment: z.string().nonempty({
    message: "Selecione um segmento",
  }),
});

export function CreateTerreiro() {
  const { profile } = useProfile();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = { ...values, leader: profile?.id || 0 };
    console.log(payload);
  }
  return (
    <div className="container max-w-[1280px] md:w-[800px] mx-auto">
      <Card className="px-4">
        <CardHeader>
          <CardTitle>
            <p className="text-3xl text-purple-900 font-semibold">
              Cadastro de Terreiro
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-6 space-y-4 items-center"
            >
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl font-normal">
                        Nome do Terreiro
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nome do Terreiro"
                          className="mt-2"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full">
                <FormField
                  control={form.control}
                  name="segment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl font-normal">
                        Segmento
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full mt-2">
                            <SelectValue placeholder="Selecione um segmento" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Umbanda">Umbanda</SelectItem>
                          <SelectItem value="Candomlé">Candomblé</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2 flex gap-4 justify-end">
                <Button variant="outline" className="cursor-pointer">
                  Cancelar
                </Button>
                <Button type="submit" className="cursor-pointer">
                  Adicionar
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
