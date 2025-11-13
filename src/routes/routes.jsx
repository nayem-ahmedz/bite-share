import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/Home";
import { lazy } from "react";
import PrivateRoute from "./PrivateRoute";
import FoodDetails from "../pages/FoodDetails";
import ErrorPage from "../utils/ErrorPage";
const AvailableFoods = lazy(() => import('../pages/AvailableFoods'));
const NoPage = lazy(() => import('../pages/NoPage'));
const AuthLayout = lazy(() => import('../pages/AuthLayout'));
const Login = lazy(() => import('../comps/auth/Login'));
const Register = lazy(() => import('../comps/auth/Register'));
const AddFood = lazy(() => import('../pages/AddFood'));
const ManageMyFoods = lazy(() => import('../pages/ManageMyFoods'));
const MyFoodRequests = lazy(() => import('../pages/MyFoodRequests'));

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
                path: '/available-foods',
                loader: () => fetch(`${import.meta.env.VITE_BACKEND_URL}foods`),
                element: <AvailableFoods />
            },
            {
                path: '/foods/:id',
                loader: ({params}) => fetch(`${import.meta.env.VITE_BACKEND_URL}foods/${params.id}`),
                element: <PrivateRoute> <FoodDetails /> </PrivateRoute>
            },
            {
                path: '/add-food',
                element: <PrivateRoute> <AddFood /> </PrivateRoute>
            },
            {
                path: '/my-foods',
                element: <PrivateRoute> <ManageMyFoods /> </PrivateRoute>
            },
            {
                path: '/food-request',
                element: <PrivateRoute> <MyFoodRequests /> </PrivateRoute>
            },
            { path: '/*', element: <NoPage /> }
        ]
    }
]);