import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

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
      <div className="fixed w-full z-50">
        <NavBar className="mx-auto">
          <NavBarContent>
            <NavBarLogo>
              <a href="/" className="text-2xl font-semibold ">
                Logo
              </a>
              <Button variant="link" className="ml-2 cursor-pointer">
                v0.0.1
              </Button>
              <Button
                onClick={toggleTheme}
                variant="ghost"
                className="size-4 p-4 cursor-pointer"
              >
                {theme === "light" ? <Moon /> : <Sun />}
              </Button>
            </NavBarLogo>

            <NavbarMenu>
              <SearchBox
                className="bg-white"
                onChange={(e) => setsearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />

              <NavBarLink to="/terreiros">Terreiros</NavBarLink>
              <NavBarLink to="/">Lojas</NavBarLink>
              <NavBarLink to="/">História</NavBarLink>

              {profile ? (
                <Button
                  variant="default"
                  className="cursor-pointer"
                  onClick={userLogout}
                >
                  Logout {profile.name}
                </Button>
              ) : (
                <Button variant="default" className="cursor-pointer">
                  <Link to="/login">Sign In</Link>
                </Button>
              )}
            </NavbarMenu>
          </NavBarContent>
        </NavBar>
      </div>

      <main className="grid gap-6 container mx-auto px-4 sm:px-6 lg:px-10 lg:pt-[8rem]">
        {/* <div className="col-span-1">
          <div className="sticky top-[8rem]">
            <Card className="rounded-none">
              <CardHeader>
                <CardTitle>Bem vindo ao meu Card</CardTitle>
                <CardDescription>Card de exemplo</CardDescription>
              </CardHeader>
              <CardContent>OLAA</CardContent>
            </Card>
          </div>
        </div> */}

        <Outlet />
      </main>
    </>
  );
};

export default Layout;
