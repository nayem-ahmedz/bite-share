import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/Home";
import { lazy } from "react";
import PrivateRoute from "./PrivateRoute";
const AvailableFoods = lazy(() => import('../pages/AvailableFoods'));
const NoPage = lazy(() => import('../pages/NoPage'));
const AuthLayout = lazy(() => import('../pages/AuthLayout'));
const Login = lazy(() => import('../comps/auth/Login'));
const Register = lazy(() => import('../comps/auth/Register'));
const FoodDetails = lazy(() => import('../pages/FoodDetails'));
const ErrorPage = lazy(() => import('../utils/ErrorPage'));
const About = lazy(() => import('../pages/about/About'));
const Contact = lazy(() => import('../pages/contact/Contact'));

// dashboard
const Dashboard = lazy(() => import('../layout/Dashboard'));
const DashboardHome = lazy(() => import('../pages/dashboard/Home'));
const AddFood = lazy(() => import('../pages/dashboard/foods/AddFood'));
const ManageFoods = lazy(() => import('../pages/dashboard/foods/ManageMyFoods'));
const MyFoodRequest = lazy(() => import('../pages/dashboard/foods/MyFoodRequests'));
const NoPageDashboards = lazy(() => import('../pages/dashboard/NoPage'));
const Profile = lazy(() => import('../pages/dashboard/Profile'));
const UpdateFood = lazy(() => import('../pages/dashboard/foods/UpdateFood'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            { index: true, element: <Home />, errorElement: <ErrorPage /> },
            {
                path: '/auth',
                element: <AuthLayout />,
                children: [
                    { index: true, element: <Login /> },
                    { path: 'login', element: <Login /> },
                    { path: 'register', element: <Register /> },
                ]
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/available-foods',
                element: <AvailableFoods />
            },
            {
                path: '/foods/:id',
                loader: ({params}) => fetch(`${import.meta.env.VITE_BACKEND_URL}/api/food/${params.id}`),
                element: <FoodDetails />,
                errorElement: <ErrorPage />
            },
            { path: '/*', element: <NoPage /> }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute> <Dashboard /> </PrivateRoute>,
        children: [
            { index: true, element: <DashboardHome /> },
            { path: 'home', element: <DashboardHome /> },
            { path: 'add-food', element: <AddFood /> },
            { path: 'manage-foods', element: <ManageFoods /> },
            { path: 'update-food/:id', element: <UpdateFood /> },
            { path: 'my-request', element: <MyFoodRequest /> },
            { path: 'my-profile', element: <Profile /> },
            { path: '*', element: <NoPageDashboards /> }
        ]
    }
]);