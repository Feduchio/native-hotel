import { Navigate } from "react-router-dom";

export const PrivateRouter = ({ children }) => {
  const user = localStorage.getItem("user");
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
