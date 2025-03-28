import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

type PricingTier = {
  name: string;
  price: string;
  description: string;
  features: Array<{
    text: string;
    included: boolean;
  }>;
  buttonText: string;
  badge?: string;
  highlighted?: boolean;
};

export default function Prices() {
  const navigate = useNavigate();
  const pricingTiers: PricingTier[] = [
    {
      name: "Básico",
      price: "Grátis",
      description:
        "Ideal para quem está começando a explorar o mundo espiritual.",
      features: [
        { text: "Acesso a 3 terreiros", included: true },
        { text: "Busca básica", included: true },
        { text: "Perfil pessoal", included: true },
        { text: "Eventos públicos", included: true },
        { text: "Suporte por email", included: true },
        { text: "Acesso a conteúdo premium", included: false },
        { text: "Verificação do perfil", included: false },
        { text: "Acesso a terreiros exclusivos", included: false },
        { text: "Suporte prioritário", included: false },
      ],
      buttonText: "Começar Agora",
    },
    {
      name: "Premium",
      price: "R$ 29,90",
      description: "Perfeito para devotos e praticantes regulares.",
      features: [
        { text: "Acesso a 15 terreiros", included: true },
        { text: "Busca avançada", included: true },
        { text: "Perfil pessoal verificado", included: true },
        { text: "Eventos públicos e privados", included: true },
        { text: "Suporte por email e chat", included: true },
        { text: "Acesso a conteúdo premium", included: true },
        { text: "Verificação do perfil", included: true },
        { text: "Acesso a terreiros exclusivos", included: false },
        { text: "Suporte prioritário", included: false },
      ],
      buttonText: "Assinar Premium",
      badge: "Popular",
      highlighted: true,
    },
    {
      name: "Profissional",
      price: "R$ 59,90",
      description: "Para líderes espirituais e terreiros.",
      features: [
        { text: "Acesso ilimitado a terreiros", included: true },
        { text: "Busca completa e personalizada", included: true },
        { text: "Perfil verificado com selo", included: true },
        { text: "Todos os eventos e cerimônias", included: true },
        { text: "Suporte prioritário 24/7", included: true },
        { text: "Acesso a conteúdo exclusivo", included: true },
        { text: "Verificação do perfil com destaque", included: true },
        { text: "Acesso a terreiros exclusivos", included: true },
        { text: "Publicidade para seu terreiro", included: true },
      ],
      buttonText: "Assinar Profissional",
    },
  ];

  const registerPage = () => {
    navigate("/register");
  };
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 mx-auto max-w-7xl bg-gradient-to-b from-purple-50/50 to-white dark:from-purple-950/20 dark:to-gray-950/80 rounded-xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-purple-900 dark:text-white sm:text-4xl">
          Planos para sua jornada espiritual
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Escolha o plano ideal para suas necessidades e comece a explorar a
          rica tradição espiritual brasileira.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-8">
        {pricingTiers.map((tier, index) => (
          <Card
            key={index}
            className={cn(
              "flex flex-col border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-lg",
              tier.highlighted &&
                "border-purple-200 dark:border-purple-800 shadow-md transform md:-translate-y-2"
            )}
          >
            <CardHeader
              className={cn(
                "pb-8",
                tier.highlighted
                  ? "bg-gradient-to-br from-purple-600 to-purple-800 dark:from-purple-700 dark:to-purple-900"
                  : ""
              )}
            >
              {tier.badge && (
                <Badge className="mb-2 self-start bg-yellow-400 dark:bg-yellow-500 dark:text-gray-900 hover:bg-yellow-500">
                  {tier.badge}
                </Badge>
              )}
              <CardTitle
                className={cn(
                  "text-2xl font-bold",
                  tier.highlighted
                    ? "text-white"
                    : "text-purple-900 dark:text-white"
                )}
              >
                {tier.name}
              </CardTitle>
              <div
                className={cn(
                  "mt-1",
                  tier.highlighted
                    ? "text-white/90"
                    : "text-gray-600 dark:text-gray-300"
                )}
              >
                <span className="text-3xl font-bold">{tier.price}</span>
                {tier.price !== "Grátis" && (
                  <span className="text-sm">/mês</span>
                )}
              </div>
              <CardDescription
                className={cn(
                  "mt-3",
                  tier.highlighted
                    ? "text-white/80"
                    : "text-gray-500 dark:text-gray-400"
                )}
              >
                {tier.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-6">
              <ul className="space-y-3">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400 dark:text-gray-600 flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={cn(
                        "text-sm",
                        feature.included
                          ? "text-gray-700 dark:text-gray-300"
                          : "text-gray-400 dark:text-gray-600"
                      )}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-0 pb-6 px-6">
              <Button
                onClick={registerPage}
                className={cn(
                  "w-full rounded-full ",
                  tier.highlighted
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-purple-900"
                    : "bg-purple-700 hover:bg-purple-800 text-white"
                )}
              >
                {tier.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Todos os planos incluem acesso ao app e atualizações regulares.
          <br />
          Dúvidas? Entre em contato com nosso{" "}
          <a
            href="#"
            className="text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 underline"
          >
            suporte
          </a>
          .
        </p>
      </div>
    </div>
  );
}
