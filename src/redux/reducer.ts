import { IAction, IPartialState } from "@interfaces/redux";
import {
  SET_SELECTED_CITY,
  SET_LOADING,
  SET_WEATHER,
  SET_TIME_OF_DAY,
} from "@redux/types";

export const initialState: IPartialState = {
  selectedCity: undefined,
  loading: false,
  timeOfDay: undefined,
  weather: undefined
};

export const reducer = (
  state = initialState,
  { type, payload }: IAction
): IPartialState => {
  switch (type) {
    case SET_SELECTED_CITY:
      return {
        ...state,
        selectedCity: payload?.selectedCity,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: payload?.loading,
      };
    case SET_WEATHER:
      return {
        ...state,
        weather: payload?.weather,
      };
    case SET_TIME_OF_DAY:
      return {
        ...state,
        timeOfDay: payload?.timeOfDay,
      };
    default:
      return state;
  }
};
