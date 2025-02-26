import { Outlet } from "react-router-dom";
import { NavBar, NavBarContent, NavBarItem, NavBarLink } from "./NavBar";
import { Button } from "./ui/button";

import { SearchBox } from "./SearchBox";

const Layout = () => {
  return (
    <>
      <NavBar>
        <NavBarContent>
          <NavBarItem>
            <a href="" className="text-2xl font-semibold">
              Espiritus
            </a>
            <Button variant="link" className="cursor-pointer text-white">
              v0.0.1
            </Button>
          </NavBarItem>
          <NavBarItem>
            <SearchBox />
          </NavBarItem>
          <NavBarItem>
            {/* <NavBarLink to="/">Home</NavBarLink>
            <NavBarLink to="/">Sobre</NavBarLink>
            <NavBarLink to="/">Instituição</NavBarLink>
            <NavBarLink to="/">Parceiros</NavBarLink>
            <NavBarLink to="/">Contato</NavBarLink> */}
          </NavBarItem>
        </NavBarContent>
      </NavBar>

      <main className="main">
        <div className="container mx-auto p-10">
          <Outlet />
        </div>
      </main>
    </>
  );
};
export default Layout;
