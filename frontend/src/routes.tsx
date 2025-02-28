import { createBrowserRouter } from "react-router-dom";
// import Layout from "./components/Layout";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Login from "./pages/Login";

import UserPage from "./pages/UserPage";
import TerreiroPage from "./pages/TerreiroPage";
import { SearchTerreiros } from "./pages/SearchTerreirosPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "terreiros", // Caminho base para a página de busca
        element: <SearchTerreiros />,
      },
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
