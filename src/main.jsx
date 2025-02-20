import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { isAuthenticate } from "./services/authservice.js";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login/Login.jsx";
import DashBoard from "./pages/dashboard/DashBoard.jsx";
import EmployeeTable from "./pages/employee/EmployeeTable.jsx";
import ViewEmployeeDetails from "./pages/employee/ViewEmployeeDetails.jsx";
import EditEmployee from "./pages/employee/EditEmployee.jsx";
import CreateEmployee from "./pages/employee/CreateEmployee.jsx";
import DepartmentTable from "./pages/department/DepartmentTable.jsx";
import CreateDepartment from "./pages/department/CreateDepartment.jsx";
import ViewDepartmentDetails from "./pages/department/ViewDepartmentDetails.jsx";
import EditDepartment from "./pages/department/EditDepartment.jsx";
import Logout from "./pages/login/Logout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="dashboard/employee" />,
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <DashBoard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="employee" />,
      },
      {
        path: "employee",
        element: (
          <ProtectedRoute>
            <EmployeeTable />
          </ProtectedRoute>
        ),
      },
      {
        path: "employee/create",
        element: (
          <ProtectedRoute>
            <CreateEmployee />
          </ProtectedRoute>
        ),
      },
      {
        path: "employee/view/:empId",
        element: (
          <ProtectedRoute>
            <ViewEmployeeDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "employee/edit/:empId",
        element: (
          <ProtectedRoute>
            <EditEmployee />
          </ProtectedRoute>
        ),
      },

      {
        path: "department",
        element: (
          <ProtectedRoute>
            <DepartmentTable />
          </ProtectedRoute>
        ),
      },
      {
        path: "department/create",
        element: (
          <ProtectedRoute>
            <CreateDepartment />
          </ProtectedRoute>
        ),
      },
      {
        path: "department/view/:deptId",
        element: (
          <ProtectedRoute>
            <ViewDepartmentDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "department/edit/:deptId",
        element: (
          <ProtectedRoute>
            <EditDepartment />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </StrictMode>
);
