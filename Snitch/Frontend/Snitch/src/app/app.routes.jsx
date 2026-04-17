import { createBrowserRouter } from "react-router-dom";

import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import CreateProduct from "../features/products/pages/createProduct";
import Dashboard from "../features/products/pages/Dashboard";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <h1>Hello world</h1>,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  // ✅ Seller Protected Routes
  {
    path: "/seller",
    children: [
      {
        path: "products/create", // ✅ no /seller again
        element: (
       
            <CreateProduct />
          
        ),
      },
      {
        path: "dashboard",
        element: (
          
            <Dashboard />
          
        ),
      },
    ],
  },
]);

export default routes;