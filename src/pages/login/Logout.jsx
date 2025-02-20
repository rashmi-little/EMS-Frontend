import { Navigate } from "react-router-dom";

export default () => {
  localStorage.clear();
  return <Navigate to="/login" />;
};
