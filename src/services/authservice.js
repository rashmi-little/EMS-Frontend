import { toast } from "react-toastify";
export function isAuthenticate() {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  if (username === "admin" && password === "admin") {
    return true;
  }
  toast.error("Invalid credential");
  return false;
}
