import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/Home";
import { lazy } from "react";
const AvailableFoods = lazy(() => import('../pages/AvailableFoods'));
const NoPage = lazy(() => import('../pages/NoPage'));
const AuthLayout = lazy(() => import('../pages/AuthLayout'));
const Login = lazy(() => import('../comps/auth/Login'));
const Register = lazy(() => import('../comps/auth/Register'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            { index: true, element: <Home /> },
            {
                path: '/available-foods',
                element: <AvailableFoods />
            },
            {
                path: '/auth',
                element: <AuthLayout />,
                children: [
                    { index: true, element: <Login /> },
                    { path: 'login', element: <Login /> },
                    { path: 'register', element: <Register /> },
                ]
            },
            { path: '/*', element: <NoPage /> }
        ]
    }
]);