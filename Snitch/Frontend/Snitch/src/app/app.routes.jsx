import { createBrowserRouter } from "react-router-dom";
import ProductDetail from "../features/products/pages/ProductDetail"; 
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import CreateProduct from "../features/products/pages/createProduct";
import Dashboard from "../features/products/pages/Dashboard";
import Protected from "../features/auth/component/Protected";
import Home from "../features/products/pages/Home";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/login",
    element: <Login />,
  },
{
  path:"/product/:productId",
  element:<ProductDetail /> 
},
  // ✅ Seller Protected Routes
  {
    path: "/seller",
    children: [
      {
        path: "products/create", // ✅ no /seller again
        element:  <Protected role="seller"><CreateProduct /></Protected>,
      },
      {
        path: "dashboard",
        element: <Protected role="seller"><Dashboard /></Protected>,
      },
    ],
  },
]);

export default routes;