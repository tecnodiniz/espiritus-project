import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import router from "./routes";
import "./App.css";

function App() {
  return (
    <>
      <div className="min-h-screen">
        <RouterProvider router={router} />
        <Toaster />
      </div>
    </>
  );
}

export default App;
