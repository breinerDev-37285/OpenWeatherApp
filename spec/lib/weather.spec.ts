import { queryWeather } from "../../src/lib/services/weather";

global.fetch = jest.fn();

jest.mock("../../src/lib/config", () => ({
  env: {
    openWeatherApiKey: "test-api-key",
    openWeatherUrl: "https://api.openweathermap.org",
  },
}));

describe("Weather Service", () => {
  const mockCity = {
    name: "London",
    lat: 51.5074,
    lng: -0.1278,
  };

  const mockWeatherResponse = {
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
    sys: {
      sunrise: 1706745600,
      sunset: 1706788800,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockWeatherResponse),
    });
  });

  it("should make a request to OpenWeather API with correct parameters", async () => {
    const expectedParams = new URLSearchParams({
      appid: "test-api-key",
      lat: mockCity.lat.toString(),
      lon: mockCity.lng.toString(),
      lang: "es",
      units: "metric",
    });

    const expectedUrl = `https://api.openweathermap.org/data/2.5/weather?${expectedParams.toString()}`;

    await queryWeather(JSON.stringify(mockCity));

    expect(fetch).toHaveBeenCalledWith(expectedUrl);
  });

  it("should return weather data when API call is successful", async () => {
    const result = await queryWeather(JSON.stringify(mockCity));

    expect(result).toEqual(mockWeatherResponse);
  });

  it("should handle API errors", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("API Error"));

    await expect(queryWeather(JSON.stringify(mockCity))).rejects.toThrow(
      "API Error"
    );
  });

  it("should handle invalid JSON in query parameter", async () => {
    const invalidQuery = "invalid json";

    await expect(queryWeather(invalidQuery)).rejects.toThrow(SyntaxError);
  });

  it("should use environment variables in API call", async () => {
    await queryWeather(JSON.stringify(mockCity));

    const calledUrl = (fetch as jest.Mock).mock.calls[0][0];
    expect(calledUrl).toContain("appid=test-api-key");
    expect(calledUrl).toContain("https://api.openweathermap.org");
  });

  it("should handle malformed weather API response", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({ invalid: "response" }),
    });

    const result = await queryWeather(JSON.stringify(mockCity));

    expect(result).toHaveProperty("invalid");
  });

  it("should parse coordinates correctly", async () => {
    const cityWithDecimalCoords = {
      name: "Test City",
      lat: 12.345,
      lng: -98.765,
    };

    await queryWeather(JSON.stringify(cityWithDecimalCoords));

    const calledUrl = (fetch as jest.Mock).mock.calls[0][0];
    expect(calledUrl).toContain("lat=12.345");
    expect(calledUrl).toContain("lon=-98.765");
  });

  it("should set correct language and units", async () => {
    await queryWeather(JSON.stringify(mockCity));

    const calledUrl = (fetch as jest.Mock).mock.calls[0][0];
    expect(calledUrl).toContain("lang=es");
    expect(calledUrl).toContain("units=metric");
  });
});
