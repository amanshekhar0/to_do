import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Signup from "./Signup";
import Login from "./Login";
import Todo from "./Todo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path:"/todo",
    element:<Todo/>
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
