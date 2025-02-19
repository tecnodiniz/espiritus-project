import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <h1>Hello Wolrd!</h1>
      <Outlet />
    </>
  );
};
export default Layout;
