import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  let user = null;

  try {
    const raw = localStorage.getItem("user");
    user = JSON.parse(raw);
  } catch {
    localStorage.removeItem("user");
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
