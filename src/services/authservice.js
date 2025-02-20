export function isAuthenticate() {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  if (username === "admin" && password === "admin") {
    return true;
  }

  return false;
}
