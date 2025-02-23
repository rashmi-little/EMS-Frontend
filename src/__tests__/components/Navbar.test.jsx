import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Navbar from "../../components/Navbar";

describe("Navbar", () => {
  it("renders the correct navigation links", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard/employee"]}>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("Employee")).toBeInTheDocument();
    expect(screen.getByText("Department")).toBeInTheDocument();
  });

  it("applies the active class on the active link", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard/employee"]}>
        <Navbar />
      </MemoryRouter>
    );

    const employeeLink = screen.getByText("Employee");
    const departmentLink = screen.getByText("Department");

    expect(employeeLink).toHaveClass("_active_abf71d");
    expect(departmentLink).not.toHaveClass("_active_abf71d");
  });

  it("renders the logout link", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});
