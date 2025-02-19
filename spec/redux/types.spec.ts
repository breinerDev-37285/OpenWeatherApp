import {
  SET_SELECTED_CITY,
  SET_LOADING,
  SET_WEATHER,
  SET_TIME_OF_DAY,
} from "../../src/redux/types";

describe("Redux Action Constants", () => {
  it("SET_SELECTED_CITY should have correct value", () => {
    expect(SET_SELECTED_CITY).toBe("SET_SELECTED_CITY");
  });

  it("SET_LOADING should have correct value", () => {
    expect(SET_LOADING).toBe("SET_LOADING");
  });

  it("SET_WEATHER should have correct value", () => {
    expect(SET_WEATHER).toBe("SET_WEATHER");
  });

  it("SET_TIME_OF_DAY should have correct value", () => {
    expect(SET_TIME_OF_DAY).toBe("SET_TIME_OF_DAY");
  });

  it("constants should be unique", () => {
    const constants = [
      SET_SELECTED_CITY,
      SET_LOADING,
      SET_WEATHER,
      SET_TIME_OF_DAY,
    ];
    const uniqueConstants = new Set(constants);

    expect(constants.length).toBe(uniqueConstants.size);
  });
});
