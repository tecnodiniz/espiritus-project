import { createBrowserRouter } from "react-router-dom";
// import Layout from "./components/Layout";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Login from "./pages/Login";

import UserPage from "./pages/UserPage";
import TerreiroPage from "./pages/TerreiroPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      // { path: "create-user", element: <CreateUser /> },
      { path: "terreiros/:id", element: <TerreiroPage /> },
      { path: "users/:id", element: <UserPage /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
