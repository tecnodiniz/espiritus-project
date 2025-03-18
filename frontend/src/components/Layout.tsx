import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Moon, Sun, LogOut, Heart, User, PlusCircle, Facebook, Twitter, Instagram, MapPin, Phone, Mail } from "lucide-react";

import { useTheme } from "@/context/ThemeContext";

import {
  NavBar,
  NavBarContent,
  NavBarLink,
  NavBarLogo,
  NavbarMenu,
} from "./NavBar";
import { SearchBox } from "./SearchBox";
import { Button } from "./ui/button";
import { useProfile } from "@/context/ProfileContext";
import { getInitials } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { Separator } from "./ui/separator";

const Layout = () => {
  const { theme, toggleTheme } = useTheme();
  const { profile, userLogout } = useProfile();
  const [searchTerm, setsearchTerm] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = () => {
    searchTerm.trim() &&
      navigate(`/terreiros?query=${encodeURIComponent(searchTerm)}`);
  };

  const login = () => {
    localStorage.setItem("redirectAfterLogin", window.location.pathname);
    navigate("/login");
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar>
        <NavBarContent>
          <NavBarLogo>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 transition-all duration-300">
                Espiritus
              </Link>
              <Button
                onClick={toggleTheme}
                variant="ghost"
                className="size-9 p-2 cursor-pointer rounded-full hover:bg-purple-800 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                {theme === "light" ? <Moon className="size-5" /> : <Sun className="size-5" />}
              </Button>
            </div>
          </NavBarLogo>
          <SearchBox
            className="bg-white dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 w-full mb-3 lg:w-50 lg:m-0 rounded-xl border-none focus-visible:ring-yellow-400 shadow-md"
            placeholder="Pesquisar terreiros..."
            onChange={(e) => setsearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          <NavbarMenu>
            <div className="flex flex-col items-center md:flex-row gap-4">
              <NavBarLink to="/">Inicio</NavBarLink>
              <NavBarLink to="/terreiros">Terreiros</NavBarLink>
              <NavBarLink to="/terreiros">Mediums</NavBarLink>
              <NavBarLink to="/terreiros">Eventos</NavBarLink>
              <NavBarLink to="/">Lojas</NavBarLink>
              <NavBarLink to="/">Federações</NavBarLink>
              <NavBarLink to="/terreiros">Espaços</NavBarLink>
            </div>

            {profile ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus-visible:outline-none cursor-pointer">
                  <Avatar className="size-12 border-2 border-yellow-300 transition-transform hover:scale-105">
                    <AvatarImage src="/" />
                    <AvatarFallback className="bg-purple-800 text-white font-bold">
                      {getInitials(profile.name)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{profile.name}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Meu Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Favoritos</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <Link to="/terreiros/create">Cadastrar Terreiro</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={userLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="default"
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-purple-900 font-medium cursor-pointer border-none shadow-md"
                onClick={login}
              >
                Entrar
              </Button>
            )}
          </NavbarMenu>
        </NavBarContent>
      </NavBar>

      <main className="flex-grow py-6">
        <Outlet />
      </main>
      
      <footer className="mt-12 bg-gradient-to-r from-purple-950 to-purple-800 dark:from-neutral-950 dark:to-gray-900 text-white">
        <div className="container mx-auto py-10 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-300">Espiritus</h3>
              <p className="text-gray-200 dark:text-gray-300 mb-4">
                Conectando pessoas às tradições espirituais brasileiras desde 2024.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-300">Links Rápidos</h3>
              <nav className="flex flex-col space-y-2">
                <Link to="/" className="text-gray-200 dark:text-gray-300 hover:text-yellow-300 transition-colors">Início</Link>
                <Link to="/terreiros" className="text-gray-200 dark:text-gray-300 hover:text-yellow-300 transition-colors">Terreiros</Link>
                <Link to="/terreiros" className="text-gray-200 dark:text-gray-300 hover:text-yellow-300 transition-colors">Mediums</Link>
                <Link to="/terreiros" className="text-gray-200 dark:text-gray-300 hover:text-yellow-300 transition-colors">Eventos</Link>
                <Link to="/" className="text-gray-200 dark:text-gray-300 hover:text-yellow-300 transition-colors">Sobre Nós</Link>
              </nav>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-300">Contato</h3>
              <div className="flex flex-col space-y-3">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-yellow-300" />
                  <span className="text-gray-200 dark:text-gray-300">Salvador, Bahia, Brasil</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-yellow-300" />
                  <span className="text-gray-200 dark:text-gray-300">(71) 99999-9999</span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-yellow-300" />
                  <span className="text-gray-200 dark:text-gray-300">contato@espiritus.com.br</span>
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-6 bg-purple-700 dark:bg-gray-700" />
          <div className="text-center text-gray-300 dark:text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Espiritus. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
