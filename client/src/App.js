import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Landing from "./components/Landing";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import IdentificationFlow from "./components/IdentificationFlow";
import Dashboard from "./components/Dashboard";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Landing /> },
    { path: "/signin", element: <SignIn /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/identification-flow", element: <IdentificationFlow /> },
    { path: "/dashboard", element: <Dashboard /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
