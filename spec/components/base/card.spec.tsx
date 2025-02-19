import { render, screen } from "@testing-library/react";
import { Card } from "@components/base/card";
import { useRootState } from "@hooks/useState";

jest.mock("../../../src/components/base/search", () => ({
  SearchLocation: jest.fn(() => <div data-testid="mock-search">Search</div>),
}));

jest.mock("../../../src/components/widget/temperature", () => ({
  Temperature: jest.fn(() => (
    <div data-testid="mock-temperature">Temperature</div>
  )),
}));

jest.mock("../../../src/components/widget/time", () => ({
  Time: jest.fn(() => <div data-testid="mock-time">Time</div>),
}));

jest.mock("../../../src/components/widget/location", () => ({
  Location: jest.fn(() => <div data-testid="mock-location">Location</div>),
}));

jest.mock("../../../src/hooks/useState");

jest.mock("@components/base/card/style.module.css", () => ({
  base_card: "base_card",
  img: "img",
  content: "content",
  wrapper_loader: "wrapper_loader",
  content_widgets: "content_widgets",
}));

describe("Card Component", () => {
  const mockWeather = {
    name: "London",
    sys: { country: "UK" },
    dt: 1706745600,
    main: {
      temp: 20,
      humidity: 65,
      pressure: 1013,
    },
    weather: [
      {
        main: "Clear",
        description: "clear sky",
      },
    ],
    wind: {
      speed: 5.5,
    },
  };

  it("renders all child components with correct data", () => {
    const mockDispatch = jest.fn();
    (useRootState as jest.Mock).mockReturnValue({
      dispatch: mockDispatch,
      loading: true,
      weather: mockWeather,
      timeOfDay: "day",
      loadingFirstRender: false,
    });

    render(<Card />);

    expect(screen.getByTestId("mock-search")).toBeInTheDocument();
    expect(screen.getByTestId("mock-temperature")).toBeInTheDocument();
    expect(screen.getByTestId("mock-location")).toBeInTheDocument();
    expect(screen.getByTestId("mock-time")).toBeInTheDocument();
  });

  it("renders correct background image based on timeOfDay", () => {
    (useRootState as jest.Mock).mockReturnValue({
      dispatch: jest.fn(),
      loading: false,
      weather: mockWeather,
      timeOfDay: "night",
      loadingFirstRender: false,
    });

    render(<Card />);

    const img = screen.getByAltText("timeWeatherImg");
    expect(img).toHaveAttribute("src", "/img/night.png");
  });

  it("shows loader when in first render loading state", () => {
    (useRootState as jest.Mock).mockReturnValue({
      dispatch: jest.fn(),
      loading: false,
      weather: null,
      timeOfDay: "day",
      loadingFirstRender: true,
    });

    const { container } = render(<Card />);

    expect(container.querySelector(".loader")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-search")).not.toBeInTheDocument();
  });

  it("uses default sunrise image when timeOfDay is null", () => {
    (useRootState as jest.Mock).mockReturnValue({
      dispatch: jest.fn(),
      loading: false,
      weather: mockWeather,
      timeOfDay: null,
      loadingFirstRender: false,
    });

    render(<Card />);

    const img = screen.getByAltText("timeWeatherImg");
    expect(img).toHaveAttribute("src", "/img/sunrise.png");
  });

  it("handles case when weather is null", () => {
    (useRootState as jest.Mock).mockReturnValue({
      dispatch: jest.fn(),
      loading: false,
      weather: null,
      timeOfDay: "day",
      loadingFirstRender: false,
    });

    render(<Card />);

    expect(screen.getByTestId("mock-location")).toBeInTheDocument();
    expect(screen.getByTestId("mock-temperature")).toBeInTheDocument();
    expect(screen.getByTestId("mock-time")).toBeInTheDocument();
  });

  it("handles case when weather properties are undefined", () => {
    (useRootState as jest.Mock).mockReturnValue({
      dispatch: jest.fn(),
      loading: false,
      weather: {
        name: undefined,
        sys: undefined,
        dt: undefined,
        main: undefined,
        weather: undefined,
        wind: undefined,
      },
      timeOfDay: "day",
      loadingFirstRender: false,
    });

    render(<Card />);

    expect(screen.getByTestId("mock-location")).toBeInTheDocument();
    expect(screen.getByTestId("mock-temperature")).toBeInTheDocument();
    expect(screen.getByTestId("mock-time")).toBeInTheDocument();
  });

  it("handles case when weather has partial data", () => {
    (useRootState as jest.Mock).mockReturnValue({
      dispatch: jest.fn(),
      loading: false,
      weather: {
        name: "London",
        sys: { country: "UK" },
        dt: 1706745600,
        main: undefined,
        weather: undefined,
        wind: undefined,
      },
      timeOfDay: "day",
      loadingFirstRender: false,
    });

    render(<Card />);

    expect(screen.getByTestId("mock-location")).toBeInTheDocument();
    expect(screen.getByTestId("mock-temperature")).toBeInTheDocument();
    expect(screen.getByTestId("mock-time")).toBeInTheDocument();
  });
});
