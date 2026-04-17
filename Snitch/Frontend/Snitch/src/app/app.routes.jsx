
import { createBrowserRouter } from "react-router-dom";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import CreateProduct from "../features/products/pages/createProduct";
import Dashboard from "../features/products/pages/Dashboard";
import Protected from "../features/auth/component/Protected";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <h1>Hello world</h1>
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/seller",
        children: [
            {
                path: "/seller/products/create",
                element: <Protected>
                    <CreateProduct/>
                </Protected>
            },
            {
                path: "/seller/dashboard",
                element: <Dashboard />
            }
        ]
    }
]);


export default routes;