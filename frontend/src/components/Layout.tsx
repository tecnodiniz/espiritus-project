import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Moon,
  Sun,
  LogOut,
  Heart,
  User,
  PlusCircle,
  Facebook,
  Twitter,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
  Search,
  Edit,
} from "lucide-react";

import { useTheme } from "@/context/ThemeContext";

import { NavBar, NavBarLink } from "./NavBar";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { userService } from "@/services/userService";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

// Form schema for profile editing
const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  bio: z.string().max(500, {
    message: "Bio não pode exceder 500 caracteres.",
  }),
  contact: z
    .string()
    .nonempty({ message: "Preencha o contato" })
    .transform((val) => val.replace(/\s+/g, "").replace(/[-()]/g, ""))
    .refine((val) => /^\d{10,11}$/.test(val), {
      message: "Telefone deve ter 10 ou 11 dígitos numéricos",
    }),
  profile_picture: z.any().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const Layout = () => {
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const { profile, userLogout, updateProfile } = useProfile();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      bio: "",
      contact: "",
    },
  });

  // Reset form when dialog opens with current profile values
  const handleOpenEditProfile = () => {
    if (profile) {
      form.reset({
        name: profile.name ?? "",
        bio: profile.bio ?? "",
        contact: profile.contact ?? "",
      });
    }
    setIsEditProfileOpen(true);
  };

  const handleProfileUpdate = async (values: ProfileFormValues) => {
    if (!profile) return;

    setIsSubmitting(true);
    try {
      const payload = {
        name: values.name,
        bio: values.bio,
        contact: values.contact,
      };
      // Create FormData for file upload
      // const formData = new FormData();
      // formData.append("name", values.name);
      // formData.append("bio", values.bio);
      // formData.append("contact", values.contact);

      // if (values.profile_picture && values.profile_picture.length > 0) {
      //   formData.append("profile_picture", values.profile_picture[0]);
      // }

      const response = await userService.updateProfile(profile.id, payload);
      if (response.status === 200) {
        console.log(response);
        toast({
          description: "Seus dados foram atualizados com sucesso!",
          action: <ToastAction altText="OK">OK</ToastAction>,
        });
        updateProfile(profile.id);
        form.reset();
      }
      setIsEditProfileOpen(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/terreiros?query=${encodeURIComponent(searchTerm)}`);
      setIsSearchOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearchBar = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const login = () => {
    localStorage.setItem("redirectAfterLogin", window.location.pathname);
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar>
        <div className="container mx-auto px-4">
          {/* Desktop Navbar - Simple Layout */}
          <div className="hidden md:flex items-center justify-between w-full h-16">
            <div className="flex items-center space-x-10">
              <Link
                to="/"
                className="text-2xl md:text-3xl font-bold text-yellow-400 hover:text-yellow-300 transition-all duration-300"
              >
                Espiritus
              </Link>

              <nav className="flex items-center space-x-8">
                <NavBarLink to="/prices">Preços</NavBarLink>
                <NavBarLink to="/terreiros">Terreiros</NavBarLink>
                <NavBarLink to="/terreiros">Mediums</NavBarLink>
                <NavBarLink to="/terreiros">Eventos</NavBarLink>
                <NavBarLink to="/terreiros">Celebridades</NavBarLink>
                <div className="group relative">
                  Mais
                  <div className="absolute left-0 top-full mt-1 w-48 bg-white dark:bg-gray-900 rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg z-50">
                    <div className="py-1">
                      <Link
                        to="/"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-800"
                      >
                        Lojas
                      </Link>
                      <Link
                        to="/"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-800"
                      >
                        Federações
                      </Link>
                      <Link
                        to="/terreiros"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-800"
                      >
                        Espaços
                      </Link>
                      <Link
                        to="/find-terreiros"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-800"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Encontre Terreiros
                      </Link>
                    </div>
                  </div>
                </div>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="icon"
                className="size-9 p-0 cursor-pointer rounded-full hover:bg-purple-800 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                {theme === "light" ? (
                  <Moon className="size-5" />
                ) : (
                  <Sun className="size-5" />
                )}
              </Button>

              <div className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-full flex items-center pr-3 pl-3 h-10 w-56">
                  <Search className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="Pesquisar terreiros..."
                    className="bg-transparent border-none focus:outline-none text-gray-900 dark:text-white w-full text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
              </div>

              {profile ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus-visible:outline-none cursor-pointer">
                    <Avatar className="size-10 border-2 border-yellow-300 transition-transform hover:scale-105">
                      <AvatarImage src={profile.profile_picture || ""} />
                      <AvatarFallback className="bg-purple-800 text-white font-bold">
                        {getInitials(profile.name)}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {profile.auth.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <Link to={"/users/" + profile.id}>Meu Perfil</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={handleOpenEditProfile}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Editar Perfil</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Heart className="mr-2 h-4 w-4" />
                        <Link to={"/users/meus-terreiros"}>Meus Terreiros</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <Link to="/terreiros/create">Cadastrar Terreiro</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={userLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sair</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="default"
                  className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-medium cursor-pointer border-none shadow-md rounded-full px-6"
                  onClick={login}
                >
                  Entrar
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Navbar */}
          <div className="flex md:hidden items-center justify-between w-full h-16">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-bold text-yellow-400 hover:text-yellow-300 transition-all duration-300"
            >
              Espiritus
            </Link>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2">
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="icon"
                className="size-9 p-0 cursor-pointer rounded-full hover:bg-purple-800 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                {theme === "light" ? (
                  <Moon className="size-5" />
                ) : (
                  <Sun className="size-5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="size-9 p-0 cursor-pointer rounded-full hover:bg-purple-800 dark:hover:bg-gray-800 transition-colors duration-200"
                onClick={toggleSearchBar}
              >
                <Search className="size-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="size-9 p-0 cursor-pointer rounded-full hover:bg-purple-800 dark:hover:bg-gray-800 transition-colors duration-200"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar - conditionally displayed */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
              isSearchOpen
                ? "max-h-28 opacity-100 py-6"
                : "max-h-0 opacity-0 py-0"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <div className="bg-white dark:bg-gray-800 rounded-l-full flex items-center pl-4 h-12 w-full">
                  <input
                    type="text"
                    placeholder="Pesquisar terreiros..."
                    className="bg-transparent border-none focus:outline-none text-gray-900 dark:text-white w-full text-base"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
              </div>
              <Button
                className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 h-12 rounded-r-full border-none px-4 font-medium"
                onClick={handleSearch}
              >
                Buscar
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - conditionally displayed */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden border-t border-purple-800 ${
            isMobileMenuOpen ? "max-h-[90vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col space-y-8">
              <Link
                to="/"
                className="text-2xl text-white hover:text-yellow-300 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                to="/terreiros"
                className="text-2xl text-white hover:text-yellow-300 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Terreiros
              </Link>
              <Link
                to="/terreiros"
                className="text-2xl text-white hover:text-yellow-300 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Mediums
              </Link>
              <Link
                to="/terreiros"
                className="text-2xl text-white hover:text-yellow-300 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Eventos
              </Link>
              <Link
                to="/"
                className="text-2xl text-white hover:text-yellow-300 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Lojas
              </Link>
              <Link
                to="/"
                className="text-2xl text-white hover:text-yellow-300 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Federações
              </Link>
              <Link
                to="/terreiros"
                className="text-2xl text-white hover:text-yellow-300 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Espaços
              </Link>

              {!profile && (
                <Button
                  variant="default"
                  className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-medium cursor-pointer border-none shadow-md rounded-full py-6 text-lg"
                  onClick={login}
                >
                  Entrar
                </Button>
              )}
            </div>
          </div>
        </div>
      </NavBar>

      <main className="flex-grow py-6">
        <Outlet />
      </main>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Perfil</DialogTitle>
            <DialogDescription>
              Atualize as informações do seu perfil aqui.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleProfileUpdate)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Seu nome completo"
                        {...field}
                        className="mt-2 border-purple-200 focus:border-purple-500 focus-visible:ring-purple-500 dark:border-purple-800 dark:bg-gray-800 dark:text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Uma breve descrição sobre você"
                        className="mt-2 border-purple-200 focus:border-purple-500 focus-visible:ring-purple-500 dark:border-purple-800 dark:bg-gray-800 dark:text-white resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contato</FormLabel>
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
                              )}) ${value.substring(2, 7)}-${value.substring(
                                7
                              )}`;
                            } else {
                              value = `(${value.substring(
                                0,
                                2
                              )}) ${value.substring(2, 7)}-${value.substring(
                                7,
                                11
                              )}`;
                            }
                          }
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="profile_picture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foto de Perfil</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditProfileOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-purple-700 hover:bg-purple-800"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Salvando..." : "Salvar alterações"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <footer className="mt-12 bg-gradient-to-r from-purple-950 to-purple-800 dark:from-neutral-950 dark:to-gray-900 text-white">
        <div className="container mx-auto py-10 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-300">
                Espiritus
              </h3>
              <p className="text-gray-200 dark:text-gray-300 mb-4">
                Conectando pessoas às tradições espirituais brasileiras desde
                2024.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-white hover:text-yellow-300 transition-colors"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="text-white hover:text-yellow-300 transition-colors"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="text-white hover:text-yellow-300 transition-colors"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-300">
                Links Rápidos
              </h3>
              <nav className="flex flex-col space-y-2">
                <Link
                  to="/"
                  className="text-gray-200 dark:text-gray-300 hover:text-yellow-300 transition-colors"
                >
                  Início
                </Link>
                <Link
                  to="/terreiros"
                  className="text-gray-200 dark:text-gray-300 hover:text-yellow-300 transition-colors"
                >
                  Terreiros
                </Link>
                <Link
                  to="/terreiros"
                  className="text-gray-200 dark:text-gray-300 hover:text-yellow-300 transition-colors"
                >
                  Mediums
                </Link>
                <Link
                  to="/terreiros"
                  className="text-gray-200 dark:text-gray-300 hover:text-yellow-300 transition-colors"
                >
                  Eventos
                </Link>
                <Link
                  to="/"
                  className="text-gray-200 dark:text-gray-300 hover:text-yellow-300 transition-colors"
                >
                  Sobre Nós
                </Link>
              </nav>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-300">
                Contato
              </h3>
              <div className="flex flex-col space-y-3">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-yellow-300" />
                  <span className="text-gray-200 dark:text-gray-300">
                    Atibaia, São Paulo, Brasil
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-yellow-300" />
                  <span className="text-gray-200 dark:text-gray-300">
                    (11) 99999-9999
                  </span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-yellow-300" />
                  <span className="text-gray-200 dark:text-gray-300">
                    contato@espiritus.com.br
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-6 bg-purple-700 dark:bg-gray-700" />
          <div className="text-center text-gray-300 dark:text-gray-400 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Espiritus. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
