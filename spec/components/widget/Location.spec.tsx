import { render, screen } from "@testing-library/react";
import { Location } from "@components/widget/location";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props:any) => <img {...props} />,
}));

jest.mock("@components/widget/location/style.module.css", () => ({
  location_wrapper: "location_wrapper",
  location_container: "location_container",
  text_date: "text_date",
}));

jest.mock("../../../src/utils/date", () => ({
  unix: jest.fn(() => ({
    format: jest.fn(() => "Monday, Jan 01"),
  })),
}));

describe("Location Component", () => {
  const defaultProps = {
    name: "Guayaquil",
    country_code: "EC",
    timestamp: 1706745600
  };

  it("renders location name and country code correctly", () => {
    render(<Location {...defaultProps} />);

    expect(screen.getByText("Guayaquil, EC")).toBeInTheDocument();
  });

  it("renders icon with correct attributes", () => {
    render(<Location {...defaultProps} />);

    const icon = screen.getByAltText("iconPin");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "/svg/map-pin.svg");
    expect(icon).toHaveAttribute("width", "20");
    expect(icon).toHaveAttribute("height", "20");
  });

  it('renders formatted date with "th" suffix', () => {
    render(<Location {...defaultProps} />);

    expect(screen.getByText("Monday, Jan 01th")).toBeInTheDocument();
  });
});
