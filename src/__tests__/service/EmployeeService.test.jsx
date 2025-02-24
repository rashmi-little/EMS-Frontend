import { describe, it } from "vitest";
import * as EmployeeService from "../../services/employeeService.js";
import mockEmployeeResponse from "../data/mockEmployeeResponse.js";
import EmployeeTable from "../../pages/employee/EmployeeTable.jsx";
import { MemoryRouter } from "react-router-dom";
import { act, render, screen } from "@testing-library/react";
import mock from "../setup.js";

describe("Employee service", () => {
  it("check if the method for fetching employees is being called when useeffect is called", async () => {
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
  });

  it("should return the same data as axios mock value", async () => {
    mock.onGet("/employees/batch/1").reply(200, mockEmployeeResponse);

    const result = await EmployeeService.getEmployeeInBatch(1);

    expect(result.data.content).toEqual(mockEmployeeResponse.data.content);
    expect(result.data.totalPages).toBe(1);
    expect(result.data.page).toBe(1);
  });
});
