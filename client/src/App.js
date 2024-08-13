import { createBrowserRouter, RouterProvider } from "react-router-dom";

import IdentificationFlow from "./components/IdentificationFlow";
import Auth from "./components/Auth";

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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
