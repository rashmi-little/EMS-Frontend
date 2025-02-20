import { Navigate, useNavigate } from "react-router-dom";

import { isAuthenticate } from "../services/authservice";
export default ({ children }) => {
  if (isAuthenticate()) {
    return children;
  }
  return <Navigate to="/login" />;
};
