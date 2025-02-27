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

const Layout = () => {
  return (
    <>
      <NavBar className="bg-blue-400">
        <NavBarContent>
          <NavBarLogo>
            <a href="/" className="text-2xl font-semibold ">
              Logo
            </a>
            <Button variant="link" className="ml-2 text-white cursor-pointer">
              v0.0.1
            </Button>
          </NavBarLogo>

          <NavbarMenu>
            <SearchBox className="bg-white" />
            <NavBarLink to="/">Features</NavBarLink>
            <NavBarLink to="/">About</NavBarLink>
            <Button variant="outline" className="bg-transparent cursor-pointer">
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
