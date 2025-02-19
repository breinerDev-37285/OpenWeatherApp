"use server";
import { env } from "@lib/config";
import { ICityLocation } from "@/interfaces/base/searchLocation";
import { IOpenWeather } from "@/interfaces/services/openweather";

export const queryWeather = async <T extends IOpenWeather>(
  query: string
): Promise<T> => {
  const queryParse = JSON.parse(query) as ICityLocation;
  const urlSearchParams = new URLSearchParams({
    appid: env.openWeatherApiKey!,
    lat: queryParse.lat.toString(),
    lon: queryParse.lng.toString(),
    lang: "es",
    units: "metric",
  });

  const url = `${
    env.openWeatherUrl
  }/data/2.5/weather?${urlSearchParams.toString()}`;

  return fetch(url).then((res) => res.json());
};
