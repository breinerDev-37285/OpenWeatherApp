import { Weather } from "../services/openweather";

export interface ITime {
  weather: Weather;
  pressure: number;
  humidity: number;
  wind: number;
}