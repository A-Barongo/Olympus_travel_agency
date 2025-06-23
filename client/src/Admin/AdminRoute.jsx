import React from "react";
import { Navigate } from "react-router-dom";

function AdminRoute({ isAdmin, children }) {
    if (!isAdmin) {
        return <Navigate to="/adminLogin" />;
    }
    return children;
}

export default AdminRoute;