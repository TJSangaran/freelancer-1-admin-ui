import React from "react";
import { useRoutes, Navigate } from "react-router-dom";

//layouts
import HomeLayout from "./components/layout/HomeLayout";
import AuthenticationLayout from "./components/layout/AuthenticationLayout";

//pages
import SignIn from "./pages/authentication/SignIn";
import Users from "./pages/users/Users";
import User from "./pages/User/User";
import EditUser from "./pages/User/EditUser";
import Withdrawal from "./pages/withdrawal";

const Routes = () => {
    let router = useRoutes([
        {
            path: "/",
            element: <HomeLayout />,
            children: [
                {
                    path: "users",
                    element: <Users />,
                },
                {
                    path: "users/:userId",
                    element: <User />,
                },
                {
                    path: "users/edit/:userId",
                    element: <EditUser />,
                },
                {
                    path: "withdrawal",
                    element: <Withdrawal />,
                },
            ],
        },
        { path: "/", element: <Navigate to="users" /> },
        { path: "*", element: <Navigate to="users" /> },
    ]);

    return router;
}

const AuthRoutes = () => {
    let authRouter = useRoutes([
        {
            path: "auth",
            element: <AuthenticationLayout />,
            children: [
                {
                    path: "signin",
                    element: <SignIn />,
                }
            ],
        },
        { path: "/", element: <Navigate to="/auth/signin" /> },
        { path: "*", element: <Navigate to="/auth/signin" /> },
    ])

    return authRouter
}
export {
    Routes,
    AuthRoutes
} 