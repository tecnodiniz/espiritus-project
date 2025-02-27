import { Outlet } from "react-router-dom";
import {
  NavBar,
  NavBarContent,
  NavBarLink,
  NavBarLogo,
  NavbarMenu,
} from "./NavBar";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SearchBox } from "./SearchBox";
import { useTheme } from "@/context/ThemeContext";

import { Moon } from "lucide-react";
import { Sun } from "lucide-react";

const Layout = () => {
  const { theme, toggleTheme } = useTheme();

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
              <SearchBox className="bg-white" />
              <NavBarLink to="/">Features</NavBarLink>
              <NavBarLink to="/">About</NavBarLink>
              <Button variant="default" className="cursor-pointer">
                Sign In
              </Button>
            </NavbarMenu>
          </NavBarContent>
        </NavBar>
      </div>

      <main className="grid grid-cols-6 gap-6 justify-center p-4 container mx-auto sm:p-6 lg:p-10 lg:pt-[8rem]">
        <div className="fixed left-10 z-50">
          <Card className="rounded-none">
            <CardHeader>
              <CardTitle>Bem vindo ao meu Card</CardTitle>
              <CardDescription>Card de exemplo</CardDescription>
            </CardHeader>
            <CardContent>OLAA</CardContent>
          </Card>
        </div>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
