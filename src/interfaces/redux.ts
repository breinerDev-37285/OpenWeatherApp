import type { ICityLocation } from "@interfaces/base/searchLocation";
import type { IOpenWeather } from "@interfaces/services/openweather";

export interface IState {
  selectedCity: ICityLocation | null;
  loading: boolean;
  weather: IOpenWeather;
  timeOfDay: 'day' | 'night' | 'sunrise' | 'sunset';
}

export type IPartialState = Partial<IState>;

export interface IAction {
  type: string;
  payload?: IPartialState;
}
