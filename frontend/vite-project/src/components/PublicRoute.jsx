import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Navigate, useLocation } from "react-router-dom";

function PublicRoute({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();
    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (user) {
        return <Navigate to={location.state?.from ?? "/home"} replace />;
    }

    return children;
}

export default PublicRoute;
