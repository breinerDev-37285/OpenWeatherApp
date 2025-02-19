import { render, screen } from "@testing-library/react";
import Home from "../../src/app/page";

jest.mock("../../src/components/base/card", () => ({
  Card: () => <div data-testid="mock-card">Card Component</div>,
}));

describe("Home Page", () => {
  it("renders main element with Card component", () => {
    render(<Home />);

    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();

    expect(screen.getByTestId("mock-card")).toBeInTheDocument();
  });

  it("Card component is a child of main element", () => {
    render(<Home />);

    const mainElement = screen.getByRole("main");
    const cardElement = screen.getByTestId("mock-card");

    expect(mainElement).toContainElement(cardElement);
  });
});
