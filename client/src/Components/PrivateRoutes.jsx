import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userJSON = localStorage.getItem("user");

  if (!userJSON) {
    return <Navigate to="/login" />;
  }

  let user;
  try {
    user = JSON.parse(userJSON);
  } catch (e) {
    localStorage.removeItem("user"); // clear corrupted value
    return <Navigate to="/login" />;
  }

  // you can now add conditions like:
  // if (!user.emailVerified) return <Navigate to="/verify-email" />;

  return children;
};

export default PrivateRoute;
