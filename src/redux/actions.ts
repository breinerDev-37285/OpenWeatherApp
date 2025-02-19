import { SET_SELECTED_CITY, SET_LOADING, SET_WEATHER, SET_TIME_OF_DAY } from "./types";
import { IAction, IPartialState } from "@interfaces/redux";

export const setSelectedCity = (
  selectedCity: IPartialState["selectedCity"]
): IAction => ({
  type: SET_SELECTED_CITY,
  payload: {
    selectedCity,
  },
});

export const setLoading = (loading: IPartialState["loading"]): IAction => ({
  type: SET_LOADING,
  payload: {
    loading,
  },
});

export const setWeather = (weather: IPartialState["weather"]): IAction => ({
  type: SET_WEATHER,
  payload: {
    weather,
  },
});


export const setTimeOfDay = (timeOfDay: IPartialState["timeOfDay"]): IAction => ({
  type: SET_TIME_OF_DAY,
  payload: {
    timeOfDay,
  },
});