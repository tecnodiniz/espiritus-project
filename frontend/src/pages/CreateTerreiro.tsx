import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { TimeRangePicker } from "@/components/ui/time-range-picker";

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "O nome do terreiro deve ter no mínimo 3 caracteres.",
    })
    .regex(new RegExp("^(?!\\s)(?=.*[a-zA-Z])[a-zA-Z0-9 \\s]+$"), {
      message: "Nome inválido",
    }),
  address: z.string().nonempty({ message: "Preencha o endereço" }),
  contact: z
    .string()
    .nonempty({ message: "Preencha o contato" })
    .regex(new RegExp("^\\(\\d{2}\\) \\d{4,5}-\\d{4}$"), {
      message: "Formato inválido. Exemplo: (99) 99999-9999",
    }),
  hours: z
    .object({
      start: z.string().nonempty({ message: "Selecione a hora inicial" }),
      end: z.string().nonempty({ message: "Selecione a hora final" }),
    })
    .refine((data) => data.start < data.end, {
      message: "A hora inicial deve ser menor que a hora final",
      path: ["end"],
    }),

  history: z.string(),
  federation: z.string(),
  segment: z.string().nonempty({
    message: "Selecione um segmento",
  }),
});

export function CreateTerreiro() {
  const { profile } = useProfile();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      contact: "",
      hours: { start: "", end: "" },
      history: "",
      federation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setMessage("");
    try {
      const { hours, ...rest } = values;
      const opening_hours = `${hours.start} às ${hours.end}`;
      const payload = {
        ...rest,
        leader: profile?.id || 0,
        opening_hours: opening_hours,
      };
      console.log(payload);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage("Formulário enviado com sucesso!");
      form.reset();
    } catch (error) {
      setMessage("Erro ao enviar o formulário.");
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    form.reset();
  }

  return (
    <div className="container max-w-[1280px] md:w-[800px] mx-auto">
      <Card className="px-4">
        <CardHeader>
          <CardTitle>
            <p className="text-3xl text-purple-900 font-semibold dark:text-white">
              Cadastro de Terreiro
            </p>
          </CardTitle>
          <CardDescription>Campos Obrigatórios *</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-3 items-baseline"
            >
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl font-normal">
                        Nome do Terreiro *
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

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl font-normal">
                        Endereço *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Endereço"
                          className="mt-2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="">
                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl font-normal">
                        Contato *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(99) 99999-9999"
                          className="mt-2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="">
                <FormField
                  control={form.control}
                  name="hours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl font-normal">
                        Horário de Funcionamento *
                      </FormLabel>
                      <FormControl>
                        <TimeRangePicker
                          start={field.value.start}
                          end={field.value.end}
                          onChange={(start, end) =>
                            field.onChange({ start, end })
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="history"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl font-normal">
                        Histórico da casa
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Fale sobre o histórico do terreiro"
                          className="resize-none"
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
                  name="federation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl font-normal">
                        Federação
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Federação"
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
                        Segmento *
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
                          <SelectItem value="Candomblé">Candomblé</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2 flex gap-4 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Adicionar"}
                </Button>
              </div>
            </form>
          </Form>
          {message && <p className="mt-4 text-center">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
