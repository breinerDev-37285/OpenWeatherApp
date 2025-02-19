import { reducer, initialState } from "../../src/redux/reducer";
import {
  SET_SELECTED_CITY,
  SET_LOADING,
  SET_WEATHER,
  SET_TIME_OF_DAY,
} from "@redux/types";

describe("Reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, { type: "INIT" })).toEqual(initialState);
  });

  it("should handle SET_SELECTED_CITY", () => {
    const city = {
      name: "London",
      lat: 51.5074,
      lng: -0.1278,
    };

    const action = {
      type: SET_SELECTED_CITY,
      payload: { selectedCity: city },
    };

    const expectedState = {
      ...initialState,
      selectedCity: city,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle SET_LOADING", () => {
    const action = {
      type: SET_LOADING,
      payload: { loading: true },
    };

    const expectedState = {
      ...initialState,
      loading: true,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle SET_WEATHER", () => {
    const weather = {
      temp: 20,
      humidity: 65,
      pressure: 1013,
      description: "Clear sky",
    };

    const action: any = {
      type: SET_WEATHER,
      payload: { weather },
    };

    const expectedState = {
      ...initialState,
      weather,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle SET_TIME_OF_DAY", () => {
    const action: any = {
      type: SET_TIME_OF_DAY,
      payload: { timeOfDay: "day" },
    };

    const expectedState = {
      ...initialState,
      timeOfDay: "day",
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle undefined payload values", () => {
    const action: any = {
      type: SET_SELECTED_CITY,
      payload: undefined,
    };

    const expectedState = {
      ...initialState,
      selectedCity: undefined,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle unknown action type", () => {
    const action: any = {
      type: "UNKNOWN_ACTION",
      payload: { someData: "test" },
    };

    expect(reducer(initialState, action)).toEqual(initialState);
  });

  it("should preserve existing state when updating single property", () => {
    const stateWithCity = {
      ...initialState,
      selectedCity: {
        name: "London",
        lat: 51.5074,
        lng: -0.1278,
      },
    };

    const action = {
      type: SET_LOADING,
      payload: { loading: true },
    };

    const expectedState = {
      ...stateWithCity,
      loading: true,
    };

    expect(reducer(stateWithCity, action)).toEqual(expectedState);
  });

  it("should handle multiple sequential actions", () => {
    let state = initialState;

    state = reducer(state, {
      type: SET_SELECTED_CITY,
      payload: {
        selectedCity: {
          name: "London",
          lat: 51.5074,
          lng: -0.1278,
        },
      },
    });

    state = reducer(state, {
      type: SET_LOADING,
      payload: { loading: true },
    });

    state = reducer(state, {
      type: SET_WEATHER,
      payload: {
        weather: {
          temp: 20,
          humidity: 65,
        },
      },
    } as any);

    expect(state).toEqual({
      selectedCity: {
        name: "London",
        lat: 51.5074,
        lng: -0.1278,
      },
      loading: true,
      weather: {
        temp: 20,
        humidity: 65,
      },
      timeOfDay: undefined,
    });
  });
});
