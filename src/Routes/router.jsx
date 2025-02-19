import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/Error/ErrorPage";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/Register/SignUp";
import Login from "../Pages/Home/Login/Login";
import DashBoard from "../Layouts/DashBoard";
import PrivateRoute from "./PrivateRoute";
import Buyerhome from "../Pages/Dashboard/Buyer/Buyerhome";
import BuyerAddTask from "../Pages/Dashboard/Buyer/BuyerAddTask";
import BuyerTaskList from "../Pages/Dashboard/Buyer/BuyerTaskList";
import Checkout from "../Pages/Dashboard/Chekout/Checkout";
import PaymentHistory from "../Pages/Dashboard/Buyer/PaymentHistory";
import PurchaseCoin from "../Pages/Dashboard/Chekout/PurchaseCoin";
import WorkerHome from "../Pages/Dashboard/Worker/WorkerHome";
import WorkerTaskList from "../Pages/Dashboard/Worker/WorkerTaskList";
import TaskDetail from "../Pages/Dashboard/Worker/TaskDetail";
import WorkerSubmission from "../Pages/Dashboard/Worker/WorkerSubmission";
import WorkerWithdraw from "../Pages/Dashboard/Worker/WorkerWithdraw";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import AdminUser from "../Pages/Dashboard/Admin/AdminUser";
import AdminTask from "../Pages/Dashboard/Admin/AdminTask";
import BuyerTaskUpdate from "../Pages/Dashboard/Buyer/BuyerTaskUpdate";
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import WorkerRoute from "./WorkerRoute";
import Profile from "../shared/Profile";
import AllTasks from "../Pages/Home/AllTasks";
import OverView from "../shared/OverView";


const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage></ErrorPage>,
        element: <MainLayout></MainLayout>,
        children: [
            // Add your routes here
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/register",
                element: <SignUp></SignUp>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/alltasks",
                element: <AllTasks></AllTasks>,
            },
        ],
    },
    // Add your other routes here
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashBoard></DashBoard>
            </PrivateRoute>
        ),
        children: [
            // Add your dashboard routes here
            {
                path: "/dashboard/Buyer/home",
                element: (
                    <BuyerRoute>
                        <Buyerhome></Buyerhome>
                    </BuyerRoute>
                ),
            },
            {
                path: "/dashboard/Buyer/profile",
                element: (
                    <BuyerRoute>
                        <Profile></Profile>
                    </BuyerRoute>
                ),
            },
            {
                path: "/dashboard/Buyer/AddTask",
                element: (
                    <BuyerRoute>
                        <BuyerAddTask></BuyerAddTask>
                    </BuyerRoute>
                ),
            },
            {
                path: "/dashboard/Buyer/TaskLists",
                element: (
                    <BuyerRoute>
                        <BuyerTaskList></BuyerTaskList>
                    </BuyerRoute>
                ),
            },
            {
                path: "/dashboard/Buyer/TaskListUpdate",
                element: (
                    <BuyerRoute>
                        <BuyerTaskUpdate></BuyerTaskUpdate>
                    </BuyerRoute>
                ),
            },
            {
                path: "/dashboard/Buyer/Checkout",
                element: (
                    <BuyerRoute>
                        <PurchaseCoin></PurchaseCoin>
                    </BuyerRoute>
                ),
            },
            {
                path: "/dashboard/Buyer/Payment",
                element: (
                    <BuyerRoute>
                        <Checkout></Checkout>
                    </BuyerRoute>
                ),
            },
            {
                path: "/dashboard/Buyer/PaymentHistory",
                element: (
                    <BuyerRoute>
                        <PaymentHistory></PaymentHistory>
                    </BuyerRoute>
                ),
            },
            {
                path: "/dashboard/Worker/home",
                element: (
                    <WorkerRoute>
                        <WorkerHome></WorkerHome>
                    </WorkerRoute>
                ),
            },
            {
                path: "/dashboard/Worker/profile",
                element: (
                    <WorkerRoute>
                        <Profile></Profile>
                    </WorkerRoute>
                ),
            },
            {
                path: "/dashboard/Worker/taskList",
                element: (
                    <WorkerRoute>
                        <WorkerTaskList></WorkerTaskList>
                    </WorkerRoute>
                ),
            },
            {
                path: "/dashboard/Worker/taskDetail/:taskId",
                element: (
                    <WorkerRoute>
                        <TaskDetail></TaskDetail>
                    </WorkerRoute>
                ),
            },
            {
                path: "/dashboard/Worker/submission",
                element: (
                    <WorkerRoute>
                        <WorkerSubmission></WorkerSubmission>
                    </WorkerRoute>
                ),
            },
            {
                path: "/dashboard/Worker/withdraws",
                element: (
                    <WorkerRoute>
                        <WorkerWithdraw></WorkerWithdraw>
                    </WorkerRoute>
                ),
            },
            {
                path: "/dashboard/Admin/home",
                element: (
                    <AdminRoute>
                        <AdminHome></AdminHome>
                    </AdminRoute>
                ),
            },
            {
                path: "/dashboard/Admin/profile",
                element: (
                    <AdminRoute>
                        <Profile></Profile>
                    </AdminRoute>
                ),
            },
            {
                path: "/dashboard/Admin/users",
                element: (
                    <AdminRoute>
                        <AdminUser></AdminUser>
                    </AdminRoute>
                ),
            },
            {
                path: "/dashboard/Admin/tasks",
                element: (
                    <AdminRoute>
                        <AdminTask></AdminTask>
                    </AdminRoute>
                ),
            },
            {
                path: "/dashboard/overview",
                element: (
                    <PrivateRoute>
                        <OverView></OverView>
                    </PrivateRoute>
                ),
            },
        ],
    },
]);

export default router;
