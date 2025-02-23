import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, data, MemoryRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";
import * as DepartmentService from "../services/DepartmentService";

vi.mock("../services/DepartmentService", () => ({
  getDepartmentsInBatch: vi.fn(),
  deleteDepartmentById: vi.fn(),
}));

vi.mock("../services/authservice", () => ({
  isAuthenticate: vi.fn(),
}));

describe("DepartmentService", () => {
  it("should return the correct mock data", async () => {
    const mockDepartments = {
      content: [
        { id: 1, name: "Marketing", location: "Los Angeles" },
        { id: 2, name: "Finance", location: "Austin" },
        { id: 3, name: "Customer Support", location: "Boston" },
      ],
      totalPages: 1,
      totalElements: 3,
      size: 5,
      page: 1,
    };

    DepartmentService.getDepartmentsInBatch.mockResolvedValue({
      data: mockDepartments,
    });

    const response = await DepartmentService.getDepartmentsInBatch(1);

    expect(response.data).toEqual(mockDepartments);
  });
});

// describe("department table", () => {
//   it("renders department correctly", async () => {
//     DepartmentService.getDepartmentsInBatch.mockResolvedValueOnce({
//       data: {
//         content: [
//           { id: 1, name: "Marketing", location: "Los Angeles" }
//         ],
//       },
//       status : "200"
//     });

//     render(
//       <MemoryRouter>
//         <DepartmentTable />
//       </MemoryRouter>
//     );

//     const marketing = await screen.findByText(/Marketing/i);

//     expect(marketing).toBeInTheDocument();
//   });
// });
