import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import ProtectedRoute from "../../components/ProtectedRoute"
import { isAuthenticate } from "../../services/authservice";

vi.mock("../../services/authservice", () => ({
  isAuthenticate: vi.fn(),
}));

describe("ProtectedRoute", () => {
  it("should render children if user is authenticated", () => {
    isAuthenticate.mockReturnValue(true);

    render(
      <BrowserRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("should redirect to login if user is not authenticated", () => {
    isAuthenticate.mockReturnValue(false);

    render(
      <BrowserRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(window.location.pathname).toBe("/login");
  });
});
