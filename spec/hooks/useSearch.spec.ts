import { renderHook, act } from "@testing-library/react";
import { useSearch } from "../../src/hooks/useSearch";
import { search } from "@lib/services/search";
import { debounce, removeSpecialCharsAndTildes } from "@utils/global";
import { setLoading, setSelectedCity } from "@redux/actions";
import { ValidationError } from "yup";

jest.mock("../../src/lib/services/search");
jest.mock("../../src/utils/global", () => ({
  debounce: jest.fn((fn) => fn),
  removeSpecialCharsAndTildes: jest.fn((str) => str),
}));
jest.mock("../../src/redux/actions", () => ({
  setLoading: jest.fn(),
  setSelectedCity: jest.fn(),
}));

const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe("useSearch Hook", () => {
  const mockDispatch = jest.fn();
  const defaultProps = {
    dispatch: mockDispatch,
    loading: false,
  };

  const mockSearchResults = {
    results: [
      {
        formatted: "New York, USA",
        geometry: { lat: 40.7128, lng: -74.006 },
      },
      {
        formatted: "New York Mills, USA",
        geometry: { lat: 41.7128, lng: -75.006 },
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (search as jest.Mock).mockResolvedValue(mockSearchResults);
  });

  it("initializes with default values", () => {
    const { result } = renderHook(() => useSearch(defaultProps));

    expect(result.current.query).toBe("");
    expect(result.current.cities).toEqual([]);
    expect(result.current.activeDropdown).toBe(false);
    expect(result.current.error).toBe("");
  });

  it("handles input change and triggers search", async () => {
    const { result } = renderHook(() => useSearch(defaultProps));

    await act(async () => {
      result.current.handleInputChange({
        target: { value: "New York" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.query).toBe("New York");
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true));
  });

  it("maps and deduplicates search results", async () => {
    const { result } = renderHook(() => useSearch(defaultProps));

    await act(async () => {
      await result.current.handleSearch("New York");
    });

    expect(result.current.cities).toHaveLength(2);
    expect(result.current.cities[0]).toEqual({
      name: "New York, USA",
      lat: 40.7128,
      lng: -74.006,
    });
  });

  it("handles API error correctly", async () => {
    (search as jest.Mock).mockRejectedValueOnce(new Error("API Error"));
    const { result } = renderHook(() => useSearch(defaultProps));

    await act(async () => {
      await result.current.handleSearch("Invalid Query");
    });

    expect(result.current.cities).toEqual([]);
    expect(result.current.activeDropdown).toBe(false);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
  });

  it("handles validation error correctly", async () => {
    const validationError = new ValidationError("Invalid input");
    (search as jest.Mock).mockRejectedValueOnce(validationError);

    const { result } = renderHook(() => useSearch(defaultProps));

    await act(async () => {
      await result.current.handleSearch("a");
    });

    expect(result.current.error).toBe("Invalid input");
    expect(result.current.cities).toEqual([]);
    expect(result.current.activeDropdown).toBe(false);
  });

  it("handles no results error", async () => {
    (search as jest.Mock).mockResolvedValueOnce({ results: null });
    const { result } = renderHook(() => useSearch(defaultProps));

    await act(async () => {
      await result.current.handleSearch("NonExistentCity");
    });

    expect(result.current.cities).toEqual([]);
    expect(result.current.activeDropdown).toBe(false);
  });

  it("handles city selection", async () => {
    const { result } = renderHook(() => useSearch(defaultProps));
    const mockCity = {
      name: "New York",
      lat: 40.7128,
      lng: -74.006,
    };

    await act(async () => {
      result.current.handlerSelectedCity(mockCity);
    });

    expect(mockDispatch).toHaveBeenCalledWith(setSelectedCity(mockCity));
    expect(removeSpecialCharsAndTildes).toHaveBeenCalledWith(mockCity.name);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
    });

    expect(result.current.activeDropdown).toBe(false);
  });

  it("does not handle city selection when loading", () => {
    const { result } = renderHook(() =>
      useSearch({ ...defaultProps, loading: true })
    );
    const mockCity = {
      name: "New York",
      lat: 40.7128,
      lng: -74.006,
    };

    act(() => {
      result.current.handlerSelectedCity(mockCity);
    });

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("updates activeDropdown when cities and query change", async () => {
    const { result } = renderHook(() => useSearch(defaultProps));

    await act(async () => {
      result.current.handleInputChange({
        target: { value: "New York" },
      } as React.ChangeEvent<HTMLInputElement>);
      await result.current.handleSearch("New York");
    });

    expect(result.current.activeDropdown).toBe(true);

    act(() => {
      result.current.handleInputChange({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.activeDropdown).toBe(false);
  });
});
