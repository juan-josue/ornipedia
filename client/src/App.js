import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Auth from "./components/Auth";
import IdentificationFlow from "./components/IdentificationFlow";
import Dashboard from "./components/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth />,
    },
    {
      path: "/identification-flow",
      element: <IdentificationFlow />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
