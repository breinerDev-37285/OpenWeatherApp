import { search } from "../../src/lib/services/search";

global.fetch = jest.fn();

jest.mock("../../src/lib/config", () => ({
  env: {
    openCageApiKey: "test-opencage-key",
    openCageUrl: "https://api.opencagedata.com",
  },
}));

describe("Search Service", () => {
  const mockSearchResponse = {
    results: [
      {
        formatted: "New York, USA",
        geometry: {
          lat: 40.7128,
          lng: -74.006,
        },
      },
      {
        formatted: "New York Mills, USA",
        geometry: {
          lat: 41.7128,
          lng: -75.006,
        },
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockSearchResponse),
    });
  });

  it("should make a request to OpenCage API with correct parameters", async () => {
    const query = "New York";
    const expectedParams = new URLSearchParams({
      q: query,
      key: "test-opencage-key",
      language: "es",
      limit: "4",
    });

    const expectedUrl = `https://api.opencagedata.com/geocode/v1/json?${expectedParams.toString()}`;

    await search(query);

    expect(fetch).toHaveBeenCalledWith(expectedUrl);
  });

  it("should return search results when API call is successful", async () => {
    const result = await search("New York");

    expect(result).toEqual(mockSearchResponse);
  });

  it("should handle API errors", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("API Error"));

    await expect(search("New York")).rejects.toThrow("API Error");
  });


  it("should use environment variables in API call", async () => {
    await search("New York");

    const calledUrl = (fetch as jest.Mock).mock.calls[0][0];
    expect(calledUrl).toContain("key=test-opencage-key");
    expect(calledUrl).toContain("https://api.opencagedata.com");
  });

  it("should encode and decode query parameters correctly", async () => {
    const query = "New York City, NY";
    await search(query);

    const calledUrl = (fetch as jest.Mock).mock.calls[0][0];
    const params = new URLSearchParams(new URL(calledUrl).search);
    expect(params.get("q")).toBe(query);
  });

  it("should handle malformed API response", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({ invalid: "response" }),
    });

    const result = await search("New York");

    expect(result).toHaveProperty("invalid");
  });

  it("should set correct language and limit parameters", async () => {
    await search("New York");

    const calledUrl = (fetch as jest.Mock).mock.calls[0][0];
    expect(calledUrl).toContain("language=es");
    expect(calledUrl).toContain("limit=4");
  });

  it("should handle empty query string", async () => {
    await search("");

    const calledUrl = (fetch as jest.Mock).mock.calls[0][0];
    expect(calledUrl).toContain("q=");
  });

});
