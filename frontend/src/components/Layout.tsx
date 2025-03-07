import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Moon, Sun, LogOut } from "lucide-react";

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

const Layout = () => {
  const { theme, toggleTheme } = useTheme();
  const { profile, userLogout } = useProfile();
  const [searchTerm, setsearchTerm] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = () => {
    searchTerm.trim() &&
      navigate(`/terreiros?query=${encodeURIComponent(searchTerm)}`);
  };
  return (
    <>
      <NavBar>
        <NavBarContent>
          <NavBarLogo>
            Espiritus
            <Button
              onClick={toggleTheme}
              variant="ghost"
              className="size-4 p-4 cursor-pointer"
            >
              {theme === "light" ? <Moon /> : <Sun />}
            </Button>
          </NavBarLogo>
          <SearchBox
            className="bg-white w-full mb-3 lg:w-50 lg:m-0"
            onChange={(e) => setsearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          <NavbarMenu>
            <div className="flex flex-col items-center md:flex-row gap-4 ">
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
                  <Avatar className="size-12">
                    <AvatarImage src="" />
                    <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <LogOut />
                      <span onClick={userLogout}>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="default" className="cursor-pointer">
                <Link to="/login">Sign In</Link>
              </Button>
            )}
          </NavbarMenu>
        </NavBarContent>
      </NavBar>

      <main className="flex-grow py-4">
        <Outlet />
      </main>
      <footer>
        <div className="flex items-center justify-center">
          <p>&copy; 2025 Espiritus. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
