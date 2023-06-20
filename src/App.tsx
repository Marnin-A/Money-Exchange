import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "home", element: <Home /> },
    { path: "signup", element: <Signup /> },
  ]);
  return (
    <div className=" h-screen flex flex-col items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
