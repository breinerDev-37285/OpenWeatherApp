import {
  setSelectedCity,
  setLoading,
  setWeather,
  setTimeOfDay,
} from "../../src/redux/actions";
import {
  SET_SELECTED_CITY,
  SET_LOADING,
  SET_WEATHER,
  SET_TIME_OF_DAY,
} from "../../src/redux/types";

describe("Redux Actions", () => {
  describe("setSelectedCity", () => {
    it("should create an action to set selected city", () => {
      const city = {
        name: "London",
        lat: 51.5074,
        lng: -0.1278,
      };

      const expectedAction = {
        type: SET_SELECTED_CITY,
        payload: {
          selectedCity: city,
        },
      };

      expect(setSelectedCity(city)).toEqual(expectedAction);
    });

    it("should handle undefined city", () => {
      const expectedAction = {
        type: SET_SELECTED_CITY,
        payload: {
          selectedCity: undefined,
        },
      };

      expect(setSelectedCity(undefined)).toEqual(expectedAction);
    });
  });

  describe("setLoading", () => {
    it("should create an action to set loading state", () => {
      const expectedAction = {
        type: SET_LOADING,
        payload: {
          loading: true,
        },
      };

      expect(setLoading(true)).toEqual(expectedAction);
    });

    it("should handle false loading state", () => {
      const expectedAction = {
        type: SET_LOADING,
        payload: {
          loading: false,
        },
      };

      expect(setLoading(false)).toEqual(expectedAction);
    });
  });

  describe("setWeather", () => {
    it("should create an action to set weather data", () => {
      const weather:any = {
        temp: 20,
        humidity: 65,
        pressure: 1013,
        description: "Clear sky",
      };

      const expectedAction = {
        type: SET_WEATHER,
        payload: {
          weather,
        },
      };

      expect(setWeather(weather)).toEqual(expectedAction);
    });

    it("should handle undefined weather data", () => {
      const expectedAction = {
        type: SET_WEATHER,
        payload: {
          weather: undefined,
        },
      };

      expect(setWeather(undefined)).toEqual(expectedAction);
    });
  });

  describe("setTimeOfDay", () => {
    it("should create an action to set time of day", () => {
      const expectedAction = {
        type: SET_TIME_OF_DAY,
        payload: {
          timeOfDay: "day",
        },
      };

      expect(setTimeOfDay("day")).toEqual(expectedAction);
    });

    it("should handle different time of day values", () => {
      ["day", "night", "sunrise", "sunset"].forEach((time:any) => {
        const expectedAction = {
          type: SET_TIME_OF_DAY,
          payload: {
            timeOfDay: time,
          },
        };

        expect(setTimeOfDay(time)).toEqual(expectedAction);
      });
    });

    it("should handle undefined time of day", () => {
      const expectedAction = {
        type: SET_TIME_OF_DAY,
        payload: {
          timeOfDay: undefined,
        },
      };

      expect(setTimeOfDay(undefined)).toEqual(expectedAction);
    });
  });

  describe("Action structure", () => {
    it("all actions should have the correct structure", () => {
      const actions = [
        setSelectedCity({ name: "Test", lat: 0, lng: 0 }),
        setLoading(true),
        setWeather({ temp: 20 } as any),
        setTimeOfDay("day"),
      ];

      actions.forEach((action) => {
        expect(action).toHaveProperty("type");
        expect(action).toHaveProperty("payload");
        expect(Object.keys(action)).toHaveLength(2);
      });
    });
  });
});
