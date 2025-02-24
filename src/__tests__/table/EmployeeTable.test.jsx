import { render, screen, act, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";
import mockEmployeeResponse from "../data/mockEmployeeResponse";
import * as EmployeeService from "../../services/employeeService";
import EmployeeTable from "../../pages/employee/EmployeeTable";

describe("employee table", () => {
  it("checks if the method for fetching employees is called and the data is rendered", async () => {
    vi.spyOn(EmployeeService, "getEmployeeInBatch").mockResolvedValue(
      mockEmployeeResponse
    );

    await act(async () => {
      render(
        <MemoryRouter>
          <EmployeeTable />
        </MemoryRouter>
      );
    });

    expect(EmployeeService.getEmployeeInBatch).toHaveBeenCalledTimes(1);
    expect(EmployeeService.getEmployeeInBatch).toHaveBeenCalledWith(1,5);

    await waitFor(() => {
      const johnDoe = screen.getByText(/John Doe/i);
      expect(johnDoe).toBeInTheDocument();

      const salary = screen.getByText(/50000/i);
      expect(salary).toBeInTheDocument();

      const dateOfJoining = screen.getByText(/15-06-2022/i);
      expect(dateOfJoining).toBeInTheDocument();
    });
    screen.debug();
  });
});
