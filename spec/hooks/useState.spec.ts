import { renderHook, act } from "@testing-library/react";
import { useRootState } from "../../src/hooks/useState";
import { queryCurrentLocation } from "@lib/services/ipinfo";
import { queryWeather } from "@/lib/services/weather";
import * as actions from "@redux/actions";

jest.mock("../../src/lib/services/ipinfo");
jest.mock("../../src/lib/services/weather");

jest.mock("../../src/redux/actions", () => ({
  setLoading: jest.fn((value) => ({ type: "SET_LOADING", payload: value })),
  setSelectedCity: jest.fn((city) => ({
    type: "SET_SELECTED_CITY",
    payload: city,
  })),
  setTimeOfDay: jest.fn((time) => ({ type: "SET_TIME_OF_DAY", payload: time })),
  setWeather: jest.fn((weather) => ({ type: "SET_WEATHER", payload: weather })),
}));

jest.mock("../../src/redux/reducer", () => ({
  initialState: {
    loading: false,
    selectedCity: null,
    weather: null,
    timeOfDay: null,
  },
  reducer: (state: any, action: any) => {
    if (!action) return state;
    switch (action.type) {
      case "SET_LOADING":
        return { ...state, loading: action.payload };
      case "SET_SELECTED_CITY":
        return { ...state, selectedCity: action.payload };
      case "SET_WEATHER":
        return { ...state, weather: action.payload };
      case "SET_TIME_OF_DAY":
        return { ...state, timeOfDay: action.payload };
      default:
        return state;
    }
  },
}));

const dayjsReturn = {
  format: jest.fn(),
};

jest.mock("../../src/utils/date", () => {
  const mockDayjs = jest.fn(() => dayjsReturn) as any;
  mockDayjs.unix = jest.fn(() => dayjsReturn);
  return {
    __esModule: true,
    default: mockDayjs,
    getTimeOfDay: jest.fn(() => "day"),
  };
});

describe("useRootState Hook", () => {
  const mockLocation = {
    city: "New York",
    loc: "40.7128,-74.0060",
  };

  const mockWeather = {
    sys: {
      sunrise: 1706745600,
      sunset: 1706788800,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (queryCurrentLocation as jest.Mock).mockResolvedValue(mockLocation);
    (queryWeather as jest.Mock).mockResolvedValue(mockWeather);
  });

  it("initializes loading state", async () => {
    let hookResult: any;

    await act(async () => {
      hookResult = renderHook(() => useRootState());
    });

    expect(hookResult.result.current.loadingFirstRender).toBe(false);
  });

  it("fetches current location on first render", async () => {
    let hookResult: any;

    await act(async () => {
      hookResult = renderHook(() => useRootState());
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(queryCurrentLocation).toHaveBeenCalled();
    expect(actions.setSelectedCity).toHaveBeenCalledWith({
      name: "New York",
      lat: 40.7128,
      lng: -74.006,
    });
  });

  it("handles location fetch error", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (queryCurrentLocation as jest.Mock).mockRejectedValueOnce(
      new Error("Location error")
    );

    await act(async () => {
      renderHook(() => useRootState());
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(actions.setLoading).toHaveBeenCalledWith(false);
    consoleErrorSpy.mockRestore();
  });

  it("fetches weather data when selectedCity changes", async () => {
    let hookResult: any;

    await act(async () => {
      hookResult = renderHook(() => useRootState());
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await act(async () => {
      const { dispatch } = hookResult.result.current;
      dispatch(
        actions.setSelectedCity({
          name: "London",
          lat: 51.5074,
          lng: -0.1278,
        })
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(queryWeather).toHaveBeenCalled();
    expect(actions.setWeather).toHaveBeenCalledWith(mockWeather);
  });

  it("handles weather fetch error", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (queryWeather as jest.Mock).mockRejectedValueOnce(
      new Error("Weather error")
    );

    let hookResult: any;

    await act(async () => {
      hookResult = renderHook(() => useRootState());
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await act(async () => {
      const { dispatch } = hookResult.result.current;
      dispatch(
        actions.setSelectedCity({
          name: "London",
          lat: 51.5074,
          lng: -0.1278,
        })
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(actions.setLoading).toHaveBeenCalledWith(false);
    consoleErrorSpy.mockRestore();
  });

  it("updates time of day when weather changes", async () => {
    let hookResult: any;

    await act(async () => {
      hookResult = renderHook(() => useRootState());
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await act(async () => {
      const { dispatch } = hookResult.result.current;
      dispatch(actions.setWeather(mockWeather));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const dayjs = require("../../src/utils/date").default;
    expect(dayjs.unix).toHaveBeenCalledWith(mockWeather.sys.sunrise);
    expect(dayjs.unix).toHaveBeenCalledWith(mockWeather.sys.sunset);
    expect(actions.setTimeOfDay).toHaveBeenCalled();
  });

  it("sets loadingFirstRender to false after initial data fetch", async () => {
    let hookResult: any;

    await act(async () => {
      hookResult = renderHook(() => useRootState());
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(hookResult.result.current.loadingFirstRender).toBe(false);
  });
});
