
import { createBrowserRouter } from "react-router-dom";
import Register from "../features/auth/pages/Register";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <h1>Hello world</h1>
    },
    {
        path: "/register",
        element: <Register />
    }
]);


export default routes;