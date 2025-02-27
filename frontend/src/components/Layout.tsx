import { Outlet } from "react-router-dom";
import {
  NavBar,
  NavBarContent,
  NavBarLink,
  NavBarLogo,
  NavbarMenu,
} from "./NavBar";
import { Button } from "./ui/button";
import { SearchBox } from "./SearchBox";
import { useEffect, useState } from "react";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";
const Layout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Para aplicar o tema dark no body quando o estado mudar
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <>
      <NavBar>
        <NavBarContent>
          <NavBarLogo>
            <a href="/" className="text-2xl font-semibold ">
              Logo
            </a>
            <Button variant="link" className="ml-2 cursor-pointer">
              v0.0.1
            </Button>
            <Button
              onClick={() => setIsDarkMode(!isDarkMode)}
              variant="ghost"
              className="size-4 p-3"
            >
              {isDarkMode ? <Sun /> : <Moon />}
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

      <main className="main">
        <div className="container mx-auto p-4 sm:p-6 lg:p-10">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
