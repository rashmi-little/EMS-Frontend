import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import EmployeeRegisterForm from "../../components/EmployeeRegisterForm";
import { addEmployee, updateEmployee } from "../../services/employeeService";
import {
  getDepartments,
  getEmployeeWithDepartments,
} from "../../services/departmentService";

vi.mock("../../services/employeeService", () => ({
  addEmployee: vi.fn(),
  updateEmployee: vi.fn(),
}));

vi.mock("../../services/departmentService", () => ({
  getDepartments: vi.fn(),
  getEmployeeWithDepartments: vi.fn(),
}));

describe("Employee Register Form", () => {
  const mockDepartments = [
    { id: 1, name: "IT" },
    { id: 2, name: "HR" },
  ];

  const mockEmployee = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    salary: "50000",
    dateOfJoining: "2022-01-01",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the form for adding a new employee", async () => {
    getDepartments.mockResolvedValue({ status: 200, data: mockDepartments });

    render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={<EmployeeRegisterForm empId={undefined} type={"Add"} />}
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Enter employee name/i)).toBeInTheDocument();
      expect(
        screen.getByLabelText(/Enter employee email/i)
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText(/Enter employee salary/i)
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText(/Enter date of joining/i)
      ).toBeInTheDocument();
    });
  });

  it("should call the addEmployee service on form submit", async () => {
    getDepartments.mockResolvedValue({ status: 200, data: mockDepartments });

    addEmployee.mockResolvedValue({ status: 201 });

    render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={<EmployeeRegisterForm empId={undefined} type={"Add"} />}
          />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Enter employee name/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Enter employee email/i), {
      target: { value: "jane.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Enter employee salary/i), {
      target: { value: "60000" },
    });
    fireEvent.change(screen.getByLabelText(/Enter date of joining/i), {
      target: { value: "2023-01-01" },
    });

    await waitFor(() => {
      const addButton = screen.getByTestId("save");
      fireEvent.click(addButton);
    });

    await waitFor(() => {
      expect(addEmployee).toHaveBeenCalledTimes(1);
      expect(addEmployee).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Jane Doe",
          email: "jane.doe@example.com",
          salary: "60000",
          dateOfJoining: "2023-01-01",
        }),
        expect.any(Set)
      );
    });
  });
});
