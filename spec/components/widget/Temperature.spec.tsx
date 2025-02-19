import { render, screen } from "@testing-library/react";
import { Temperature } from "@components/widget/temperature";

jest.mock("./style.module.css", () => ({
  container: "container",
  temperature_value: "temperature_value",
  temperature_symbol: "temperature_symbol",
}));

describe("Temperature Component", () => {
  it("renders temperature value and symbol correctly", () => {
    render(<Temperature value={23.6} symbol="C" />);

    expect(screen.getByText(/24/)).toBeInTheDocument();
    expect(screen.getByText(/°C/)).toBeInTheDocument();
  });

  it("rounds decimal values correctly", () => {
    render(<Temperature value={23.4} symbol="F" />);

    expect(screen.getByText(/23/)).toBeInTheDocument();
    expect(screen.getByText(/°F/)).toBeInTheDocument();
  });
});
