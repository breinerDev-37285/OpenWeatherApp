import { render, screen } from "@testing-library/react";
import { Time } from "@components/widget/time";


jest.mock("@components/widget/time/style.module.css", () => ({
  container: "container",
  container_main: "container_main",
  img: "img",
  text_weather_state: "text_weather_state",
  container_items: "container_items",
  item: "item",
  item_icon: "item_icon"
}));

const mockProps = {
  weather: {
    icon: "04d",
    main: "Clouds",
    description: "nubes dispersas",
  },
  humidity: 75,
  pressure: 1013,
  wind: 5.5,
};

describe("Time Component", () => {
  it("renders the weather icon and description correctly", () => {
    render(<Time {...mockProps} />);

    const weatherIcon = screen.getByAltText(mockProps.weather.main);
    expect(weatherIcon).toBeInTheDocument();
    expect(weatherIcon).toHaveAttribute(
      "src",
      `https://openweathermap.org/img/wn/${mockProps.weather.icon}@2x.png`
    );

    const weatherDescription = screen.getByText(mockProps.weather.description);
    expect(weatherDescription).toBeInTheDocument();
  });

  it("renders the humidity, pressure, and wind values correctly", () => {
    render(<Time {...mockProps} />);

    const humidityValue = screen.getByText(mockProps.humidity.toString());
    expect(humidityValue).toBeInTheDocument();

    const pressureValue = screen.getByText(mockProps.pressure.toString());
    expect(pressureValue).toBeInTheDocument();

    const windValue = screen.getByText(mockProps.wind.toString());
    expect(windValue).toBeInTheDocument();
  });
});
