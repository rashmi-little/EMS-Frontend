import { MemoryRouter } from "react-router-dom";
import DepartmentTable from "../../pages/department/DepartmentTable";
import mock from "../setup";
import * as DepartmentService from "../../services/departmentService";
import { act, render, screen, waitFor } from "@testing-library/react";
import mockDepartmentsResponse from "../data/mockDepartmentResponse";
import { it } from "vitest";
import mockDepartments from "../data/mockDepartments";

describe("Department service", () => {
  it("check if the method for fetching departments is being called when useeffect is called", async () => {
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
    screen.debug();
  });

  it("should return the same data as axios mock value", async () => {
    mock.onGet("/departments/batch/1").reply(200, mockDepartmentsResponse);

    const result = await DepartmentService.getDepartmentsInBatch(1);

    expect(result.data.content).toEqual(mockDepartmentsResponse.data.content);
    expect(result.data.totalPages).toBe(1);
    expect(result.data.page).toBe(1);
  });
});