import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, Calendar, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Introduction() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const backgroundImages = [
    "https://source.unsplash.com/random/1920x1080/?spirituality",
    "https://source.unsplash.com/random/1920x1080/?meditation",
    "https://source.unsplash.com/random/1920x1080/?temple",
  ];

  useEffect(() => {
    // Set animation visibility after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Set up image rotation
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const goToHomePage = () => {
    navigate("/");
  };

  const features = [
    {
      icon: <Search className="h-6 w-6 text-purple-600" />,
      title: "Encontre Terreiros",
      description:
        "Busque por terreiros próximos a você e conecte-se com comunidades espirituais.",
    },
    {
      icon: <Calendar className="h-6 w-6 text-purple-600" />,
      title: "Eventos Espirituais",
      description:
        "Descubra eventos, cerimônias e rituais que estão acontecendo ao seu redor.",
    },
    {
      icon: <Users className="h-6 w-6 text-purple-600" />,
      title: "Comunidade Vibrante",
      description:
        "Conecte-se com praticantes e líderes espirituais que compartilham sua jornada.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      {/* Background with gradual image transition */}
      <div className="fixed inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${image})`,
              opacity: currentImageIndex === index ? 0.15 : 0,
              zIndex: currentImageIndex === index ? 1 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/90 via-purple-900/80 to-indigo-900/70 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex-1 flex flex-col">
        {/* Header */}
        <header className="container mx-auto pt-8 pb-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-bold text-yellow-400 font-serif">
              Espiritus
            </h1>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center py-10">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className={cn(
                "transform transition-all duration-700 ease-out",
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              )}
              style={{ transitionDelay: "300ms" }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Sua jornada espiritual
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
                  {" "}
                  começa aqui
                </span>
              </h1>
            </div>

            <div
              className={cn(
                "transform transition-all duration-700 ease-out",
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              )}
              style={{ transitionDelay: "500ms" }}
            >
              <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Conectamos você com as tradições espirituais brasileiras.
                Encontre terreiros, participe de eventos e mergulhe em um mundo
                de sabedoria ancestral.
              </p>
            </div>

            <div
              className={cn(
                "transform transition-all duration-700 ease-out",
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              )}
              style={{ transitionDelay: "700ms" }}
            >
              <Button
                onClick={goToHomePage}
                className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-purple-900 font-medium shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Explorar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={cn(
                    "bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 transform",
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-20 opacity-0"
                  )}
                  style={{
                    transitionDelay: `${900 + index * 200}ms`,
                    transitionProperty: "transform, opacity, background-color",
                  }}
                >
                  <div className="mb-4 bg-white/20 rounded-full h-12 w-12 flex items-center justify-center mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 text-center relative z-10">
          <div
            className={cn(
              "text-white/60 text-sm transition-opacity duration-1000",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: "1500ms" }}
          >
            <p>Descubra a riqueza das tradições espirituais brasileiras</p>
            <div className="flex items-center justify-center mt-4 space-x-2">
              <Heart className="h-4 w-4 text-purple-400" />
              <span className="text-purple-300">
                Feito com amor e respeito às tradições
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
