import React, { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login/Login.jsx";
import Logout from "./pages/login/Logout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const DashBoard = React.lazy(() => import("./pages/dashboard/DashBoard.jsx"));
const EmployeeTable = React.lazy(() =>
  import("./pages/employee/EmployeeTable.jsx")
);
const CreateEmployee = React.lazy(() =>
  import("./pages/employee/CreateEmployee.jsx")
);
const ViewEmployeeDetails = React.lazy(() =>
  import("./pages/employee/ViewEmployeeDetails.jsx")
);
const EditEmployee = React.lazy(() =>
  import("./pages/employee/EditEmployee.jsx")
);
const DepartmentTable = React.lazy(() =>
  import("./pages/department/DepartmentTable.jsx")
);
const CreateDepartment = React.lazy(() =>
  import("./pages/department/CreateDepartment.jsx")
);
const ViewDepartmentDetails = React.lazy(() =>
  import("./pages/department/ViewDepartmentDetails.jsx")
);
const EditDepartment = React.lazy(() =>
  import("./pages/department/EditDepartment.jsx")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="dashboard/employee" />,
  },
  {
    path: "dashboard",
    element: (
      <Suspense fallback={<div>Dashboard is loading ...</div>}>
        <ProtectedRoute>
          <DashBoard />
        </ProtectedRoute>
      </Suspense>
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
