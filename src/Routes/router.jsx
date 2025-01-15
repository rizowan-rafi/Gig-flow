import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/Error/ErrorPage";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/Register/SignUp";
import Login from "../Pages/Home/Login/Login";


const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage></ErrorPage>,
        element: <MainLayout></MainLayout>,
        children: [
            // Add your routes here
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/register",
                element: <SignUp></SignUp>
            },
            {
                path: '/login',
                element:<Login></Login>
            }
        ]
    }
]);

export default router;
