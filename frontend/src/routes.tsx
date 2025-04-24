import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./components/Layout";
import PricePage from "./pages/PricePage";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import { LoaderComponent } from "./components/LoaderComponent";
import Introduction from "./pages/Introduction";
import { lazy, Suspense } from "react";

// Lazy load
const TerreiroPage = lazy(() => import("./pages/TerreiroPage"));
const CreateTerreiro = lazy(() => import("./pages/CreateTerreiro"));
const UserPage = lazy(() => import("./pages/UserPage"));
const SearchTerreiros = lazy(() => import("./pages/SearchTerreirosPage"));
const UserTerreiros = lazy(() => import("./pages/UserTerreiros"));
const FindTerreiros = lazy(() => import("./pages/FindTerreiros"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "/prices", element: <PricePage /> },
      {
        path: "terreiros",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoaderComponent />}>
                <SearchTerreiros />
              </Suspense>
            ),
          },
          {
            path: "create",
            element: (
              <Suspense fallback={<LoaderComponent />}>
                <CreateTerreiro />
              </Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<LoaderComponent />}>
                <TerreiroPage />
              </Suspense>
            ),
          },
          { path: "*", element: <p>Ops, 404 página não encontrada</p> },
        ],
      },
      { path: "/find-terreiros", element: <FindTerreiros /> },
      {
        path: "users/:id",
        element: (
          <Suspense fallback={<LoaderComponent />}>
            <UserPage />
          </Suspense>
        ),
      },
      {
        path: "users/meus-terreiros",
        element: (
          <Suspense fallback={<LoaderComponent />}>
            <UserTerreiros />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/introduction",
    element: <Introduction />,
  },
  { path: "/register", element: <CreateUser /> },
  {
    path: "*",
    element: <h1>Ops, 404 página não encontrada</h1>,
  },
]);

export default router;
