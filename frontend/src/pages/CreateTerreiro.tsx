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

import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  ChevronRight,
  Clock,
  HelpCircle,
  Info,
  MapPin,
  Phone,
  Save,
  Building2,
  FileText,
  Warehouse,
  X,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { terreiroService } from "@/services/terreiroService";
import { ToastAction } from "@radix-ui/react-toast";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "O nome do terreiro deve ter no mínimo 3 caracteres.",
    })
    .regex(
      new RegExp("^(?!\\s)(?=.*[a-zA-ZÀ-ÖØ-öø-ÿ])[a-zA-ZÀ-ÖØ-öø-ÿ0-9 \\s]+$"),
      {
        message: "Nome inválido",
      }
    ),
  address: z.string().nonempty({ message: "Preencha o endereço" }),
  contact: z
    .string()
    .nonempty({ message: "Preencha o contato" })
    .transform((val) => val.replace(/\s+/g, "").replace(/[-()]/g, ""))
    .refine((val) => /^\d{10,11}$/.test(val), {
      message: "Telefone deve ter 10 ou 11 dígitos numéricos",
    }),
  hours: z.object({
    start: z.string().nonempty({ message: "Selecione a hora inicial" }),
    end: z.string().nonempty({ message: "Selecione a hora final" }),
  }),

  history: z.string().nonempty({ message: "Preencha o histórico" }),
  infrastructure: z.string().nonempty({ message: "Preencha a infraestrutura" }),
  segment: z.string().nonempty({
    message: "Selecione um segmento",
  }),
});

export default function CreateTerreiro() {
  const { profile } = useProfile();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      contact: "",
      hours: { start: "", end: "" },
      history: "",
      infrastructure: "",
    },
    mode: "onChange",
  });

  const basicInfoFilled =
    form.watch("name") &&
    form.watch("address") &&
    form.watch("contact") &&
    form.watch("hours.start") &&
    form.watch("hours.end") &&
    form.watch("segment");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const { hours, ...rest } = values;
      const opening_hours = `${hours.start} às ${hours.end}`;
      const payload = {
        ...rest,
        leader: profile?.id || 0,
        opening_hours: opening_hours,
      };
      console.log(payload);

      const response = await terreiroService.postTerreiro(payload);

      console.log(response);
      if (response.status === 200) {
        toast({
          title: "Terreiro cadastrado com sucesso!",
          description: `O terreiro ${values.name} foi cadastrado com sucesso.`,
          action: (
            <ToastAction
              altText="Visualizar"
              onClick={() => navigate(`/terreiros/${response.data.id}`)}
            >
              Visualizar
            </ToastAction>
          ),
        });

        form.reset();
        setCurrentStep(1);
      }
      // Simulate API call
      // await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      toast({
        title: "Erro ao cadastrar terreiro",
        description:
          "Ocorreu um erro ao processar seu cadastro. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    form.reset();
    setCurrentStep(1);
  }

  const goToNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <TooltipProvider>
      <div className="container max-w-[1280px] md:w-[800px] mx-auto py-8">
        <Card className="shadow-md border-purple-100 dark:border-purple-900">
          <CardHeader className="bg-gradient-to-r from-purple-900 to-purple-800 text-white dark:from-purple-800 dark:to-purple-700 rounded-t-lg pb-6">
            <CardTitle>
              <p className="text-3xl font-semibold">Cadastro de Terreiro</p>
            </CardTitle>
            <CardDescription className="text-purple-100 dark:text-purple-200 mt-2">
              Preencha as informações para cadastrar um novo terreiro
            </CardDescription>

            <div className="mt-6 flex justify-center">
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 1
                      ? "bg-yellow-400 text-purple-900"
                      : "bg-purple-700 text-white"
                  }`}
                >
                  1
                </div>
                <div
                  className={`w-16 h-1 ${
                    currentStep >= 2 ? "bg-yellow-400" : "bg-purple-700"
                  }`}
                ></div>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 2
                      ? "bg-yellow-400 text-purple-900"
                      : "bg-purple-700 text-white"
                  }`}
                >
                  2
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {currentStep === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl text-purple-900 font-medium dark:text-purple-300">
                        Informações Básicas
                      </h3>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle
                            size={16}
                            className="text-purple-700 dark:text-purple-400"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-[220px] text-sm">
                            Estas são as informações essenciais para o cadastro
                            do terreiro
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Separator className="bg-purple-200 dark:bg-purple-800 mb-4" />

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <Building2
                              className="text-purple-700 dark:text-purple-400"
                              size={18}
                            />
                            <FormLabel className="text-lg font-medium text-purple-900 dark:text-purple-300">
                              Nome do Terreiro{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Input
                              placeholder="Nome do Terreiro"
                              className="mt-2 border-purple-200 focus:border-purple-500 focus-visible:ring-purple-500 dark:border-purple-800 dark:bg-gray-800 dark:text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-xs text-gray-500 ml-6">
                            Digite o nome completo do terreiro
                          </FormDescription>
                          <FormMessage className="text-red-500 ml-6" />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center gap-2">
                              <MapPin
                                className="text-purple-700 dark:text-purple-400"
                                size={18}
                              />
                              <FormLabel className="text-lg font-medium text-purple-900 dark:text-purple-300">
                                Endereço <span className="text-red-500">*</span>
                              </FormLabel>
                            </div>
                            <FormControl>
                              <Input
                                placeholder="Rua, número, bairro, cidade, estado"
                                className="mt-2 border-purple-200 focus:border-purple-500 focus-visible:ring-purple-500 dark:border-purple-800 dark:bg-gray-800 dark:text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-xs text-gray-500 ml-6">
                              Endereço completo do terreiro
                            </FormDescription>
                            <FormMessage className="text-red-500 ml-6" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contact"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center gap-2">
                              <Phone
                                className="text-purple-700 dark:text-purple-400"
                                size={18}
                              />
                              <FormLabel className="text-lg font-medium text-purple-900 dark:text-purple-300">
                                Contato <span className="text-red-500">*</span>
                              </FormLabel>
                            </div>
                            <FormControl>
                              <Input
                                placeholder="(99) 99999-9999"
                                className="mt-2 border-purple-200 focus:border-purple-500 focus-visible:ring-purple-500 dark:border-purple-800 dark:bg-gray-800 dark:text-white"
                                {...field}
                                onChange={(e) => {
                                  let value = e.target.value.replace(/\D/g, "");
                                  if (value.length > 0) {
                                    // Add formatting as the user types
                                    if (value.length <= 2) {
                                      value = `(${value}`;
                                    } else if (value.length <= 7) {
                                      value = `(${value.substring(
                                        0,
                                        2
                                      )}) ${value.substring(2)}`;
                                    } else if (value.length <= 11) {
                                      value = `(${value.substring(
                                        0,
                                        2
                                      )}) ${value.substring(
                                        2,
                                        7
                                      )}-${value.substring(7)}`;
                                    } else {
                                      value = `(${value.substring(
                                        0,
                                        2
                                      )}) ${value.substring(
                                        2,
                                        7
                                      )}-${value.substring(7, 11)}`;
                                    }
                                  }
                                  field.onChange(value);
                                }}
                              />
                            </FormControl>
                            <FormDescription className="text-xs text-gray-500 ml-6">
                              Digite apenas os números e a formatação será
                              aplicada automaticamente
                            </FormDescription>
                            <FormMessage className="text-red-500 ml-6" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center gap-2">
                          <Clock
                            className="text-purple-700 dark:text-purple-400"
                            size={18}
                          />
                          <FormLabel className="text-lg font-medium text-purple-900 dark:text-purple-300">
                            Horário de Funcionamento{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                        </div>
                        <FormDescription className="text-xs text-gray-500 ml-6 mb-2">
                          Selecione o horário de abertura e fechamento
                        </FormDescription>

                        <div className="space-y-3 ml-6">
                          <div className="flex items-center space-x-2">
                            <FormField
                              control={form.control}
                              name="hours.start"
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <div className="relative">
                                    <select
                                      className="w-full border rounded p-2 pr-8 border-purple-200 focus:border-purple-500 focus-visible:ring-purple-500 dark:border-purple-800 dark:bg-gray-800 dark:text-white"
                                      value={field.value}
                                      onChange={(e) => {
                                        field.onChange(e.target.value);
                                      }}
                                    >
                                      <option value="">Hora Inicial</option>
                                      {Array.from({ length: 24 }, (_, i) =>
                                        i.toString().padStart(2, "0")
                                      ).map((hour) => (
                                        <option key={hour} value={hour}>
                                          {hour}:00
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <FormMessage className="text-red-500 text-xs" />
                                </FormItem>
                              )}
                            />
                            <span className="text-gray-500 dark:text-gray-400">
                              até
                            </span>
                            <FormField
                              control={form.control}
                              name="hours.end"
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <div className="relative">
                                    <select
                                      className="w-full border rounded p-2 pr-8 border-purple-200 focus:border-purple-500 focus-visible:ring-purple-500 dark:border-purple-800 dark:bg-gray-800 dark:text-white"
                                      value={field.value}
                                      onChange={(e) => {
                                        field.onChange(e.target.value);
                                      }}
                                    >
                                      <option value="">Hora Final</option>
                                      {Array.from({ length: 24 }, (_, i) =>
                                        i.toString().padStart(2, "0")
                                      ).map((hour) => (
                                        <option key={hour} value={hour}>
                                          {hour}:00
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <FormMessage className="text-red-500 text-xs" />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="segment"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center gap-2">
                              <Info
                                className="text-purple-700 dark:text-purple-400"
                                size={18}
                              />
                              <FormLabel className="text-lg font-medium text-purple-900 dark:text-purple-300">
                                Segmento <span className="text-red-500">*</span>
                              </FormLabel>
                            </div>
                            <FormDescription className="text-xs text-gray-500 ml-6 mb-2">
                              Selecione a tradição religiosa do terreiro
                            </FormDescription>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="ml-6 border-purple-200 focus:border-purple-500 focus-visible:ring-purple-500 dark:border-purple-800 dark:bg-gray-800 dark:text-white">
                                  <SelectValue placeholder="Selecione um segmento" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Umbanda">Umbanda</SelectItem>
                                <SelectItem value="Candomblé">
                                  Candomblé
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-red-500 ml-6" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button
                        type="button"
                        className="bg-purple-700 hover:bg-purple-800 text-white dark:bg-purple-600 dark:hover:bg-purple-700"
                        onClick={goToNextStep}
                        disabled={!basicInfoFilled}
                      >
                        Próximo
                        <ChevronRight className="ml-2" size={18} />
                      </Button>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl text-purple-900 font-medium dark:text-purple-300">
                        Informações Adicionais
                      </h3>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle
                            size={16}
                            className="text-purple-700 dark:text-purple-400"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-[220px] text-sm">
                            Estas informações auxiliam os visitantes a
                            conhecerem melhor o terreiro
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Separator className="bg-purple-200 dark:bg-purple-800 mb-4" />

                    <FormField
                      control={form.control}
                      name="history"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FileText
                              className="text-purple-700 dark:text-purple-400"
                              size={18}
                            />
                            <FormLabel className="text-lg font-medium text-purple-900 dark:text-purple-300">
                              Histórico da Casa
                            </FormLabel>
                          </div>
                          <FormDescription className="text-xs text-gray-500 ml-6 mb-2">
                            Conte a história e a trajetória do terreiro{" "}
                            <span className="text-red-500">*</span>
                          </FormDescription>
                          <FormControl>
                            <Textarea
                              placeholder="Conte um pouco sobre a história do terreiro, sua fundação e trajetória..."
                              className="resize-none min-h-[120px] ml-6 border-purple-200 focus:border-purple-500 focus-visible:ring-purple-500 dark:border-purple-800 dark:bg-gray-800 dark:text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 ml-6" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="infrastructure"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <Warehouse
                              className="text-purple-700 dark:text-purple-400"
                              size={18}
                            />
                            <FormLabel className="text-lg font-medium text-purple-900 dark:text-purple-300">
                              Infraestrutura
                            </FormLabel>
                          </div>
                          <FormDescription className="text-xs text-gray-500 ml-6 mb-2">
                            Descreva a infraestrutura e acomodações do terreiro{" "}
                            <span className="text-red-500">*</span>
                          </FormDescription>
                          <FormControl>
                            <Textarea
                              placeholder="Descreva a infraestrutura do terreiro (espaços, acomodações, etc.)"
                              className="resize-none min-h-[120px] ml-6 border-purple-200 focus:border-purple-500 focus-visible:ring-purple-500 dark:border-purple-800 dark:bg-gray-800 dark:text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 ml-6" />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-4 justify-between pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-purple-500 text-purple-700 hover:bg-purple-50 dark:border-purple-600 dark:text-purple-300 dark:hover:bg-purple-900/30"
                        onClick={goToPreviousStep}
                      >
                        Voltar
                      </Button>

                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          className="border-purple-500 text-purple-700 hover:bg-purple-50 dark:border-purple-600 dark:text-purple-300 dark:hover:bg-purple-900/30"
                          onClick={handleCancel}
                        >
                          <X size={18} className="mr-2" />
                          Cancelar
                        </Button>
                        <Button
                          type="submit"
                          className="bg-purple-700 hover:bg-purple-800 text-white dark:bg-purple-600 dark:hover:bg-purple-700"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="animate-spin mr-2">⟳</span>
                              Enviando...
                            </>
                          ) : (
                            <>
                              <Save size={18} className="mr-2" />
                              Cadastrar Terreiro
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
