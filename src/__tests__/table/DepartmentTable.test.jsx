import { render, screen, act, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";
import mockDepartmentsResponse from "../data/mockDepartmentResponse";
import * as DepartmentService from "../../services/departmentService.js";
import DepartmentTable from "../../pages/department/DepartmentTable";

describe("department table", () => {
  it("check if the method for fetching departments is being called and the data is rendered", async () => {
    vi.spyOn(DepartmentService, "getDepartmentsInBatch").mockResolvedValue(
      mockDepartmentsResponse
    );

    await act(async () => {
      render(
        <MemoryRouter>
          <DepartmentTable />
        </MemoryRouter>
      );
    });

    expect(DepartmentService.getDepartmentsInBatch).toHaveBeenCalledTimes(1); 
    expect(DepartmentService.getDepartmentsInBatch).toHaveBeenCalledWith(1);

    await waitFor(() => {
      const marketing = screen.getByText(/Marketing/i);
      expect(marketing).toBeInTheDocument();
      const location = screen.getByText(/Los Angeles/i);
      expect(location).toBeInTheDocument();
    });
    screen.debug();
  });
});
