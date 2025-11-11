import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router";
import Loading from "../utils/Loading";

export default function PrivateRoute({children}){
    const { currentUser, loading } = useContext(AuthContext);
    const location = useLocation();
    if(loading){
        return <Loading />;
    }
    if(!currentUser){
        return <Navigate to='/auth/login' state={location.pathname} />
    }
    return children;
}