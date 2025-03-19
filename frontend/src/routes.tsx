import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import UserPage from "./pages/UserPage";
import TerreiroPage from "./pages/TerreiroPage";
import { SearchTerreiros } from "./pages/SearchTerreirosPage";
import { CreateTerreiro } from "./pages/CreateTerreiro";
import CreateUser from "./pages/CreateUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "terreiros",
        children: [
          { index: true, element: <SearchTerreiros /> },
          { path: "create", element: <CreateTerreiro /> },
          { path: ":id", element: <TerreiroPage /> },
          { path: "*", element: <p>Ops, 404 página não encontrada</p> }, // Catch-all route for /terreiros/*
        ],
      },
      { path: "users/:id", element: <UserPage /> },
      { path: "*", element: <p>Ops, 404 página não encontrada</p> }, // Catch-all route for other paths
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "/register", element: <CreateUser /> },
  {
    path: "*",
    element: <h1>Ops, 404 página não encontrada</h1>,
  },
]);

export default router;
