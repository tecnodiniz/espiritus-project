import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="container mx-auto p-10">
        <Outlet />
      </div>
    </>
  );
};
export default Layout;
