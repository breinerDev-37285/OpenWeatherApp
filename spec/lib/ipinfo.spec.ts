import { queryCurrentLocation } from "../../src/lib/services/ipinfo";
import { env } from "../../src/lib/config";

global.fetch = jest.fn();

jest.mock("../../src/lib/config", () => ({
  env: {
    ipInfoKey: "test-ipinfo-key",
    ipInfoUrl: "https://ipinfo.io",
  },
}));

describe("IP Info Service", () => {
  const mockLocationResponse = {
    city: "New York",
    loc: "40.7128,-74.0060",
    country: "US",
    region: "New York",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockLocationResponse),
    });
  });

  it("should make a request to IPInfo API with correct parameters", async () => {
    const expectedUrl = "https://ipinfo.io/json?token=test-ipinfo-key";

    await queryCurrentLocation();

    expect(fetch).toHaveBeenCalledWith(expectedUrl);
  });

  it("should return location data when API call is successful", async () => {
    const result = await queryCurrentLocation();

    expect(result).toEqual(mockLocationResponse);
  });

  it("should handle API errors", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("API Error"));

    await expect(queryCurrentLocation()).rejects.toThrow("API Error");
  });

  it("should use environment variables in API call", async () => {
    await queryCurrentLocation();

    const calledUrl = (fetch as jest.Mock).mock.calls[0][0];
    expect(calledUrl).toContain(`token=${env.ipInfoKey}`);
    expect(calledUrl).toContain(env.ipInfoUrl);
  });

  it("should handle malformed API response", async () => {
    const malformedResponse = { invalid: "response" };
    (fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(malformedResponse),
    });

    const result = await queryCurrentLocation();

    expect(result).toEqual(malformedResponse);
  });

  it("should handle empty response", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({}),
    });

    const result = await queryCurrentLocation();

    expect(result).toEqual({});
  });

  it("should fetch only once per call", async () => {
    await queryCurrentLocation();

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should call json() method on response", async () => {
    const jsonSpy = jest.fn().mockResolvedValue(mockLocationResponse);
    (fetch as jest.Mock).mockResolvedValue({ json: jsonSpy });

    await queryCurrentLocation();

    expect(jsonSpy).toHaveBeenCalled();
  });
});
