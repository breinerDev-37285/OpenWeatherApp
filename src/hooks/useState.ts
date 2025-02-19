"use client";
import dayjs, { getTimeOfDay } from "@utils/date";
import { initialState, reducer } from "@redux/reducer";
import { queryCurrentLocation } from "@lib/services/ipinfo";
import { queryWeather } from "@/lib/services/weather";
import {
  setLoading,
  setSelectedCity,
  setTimeOfDay,
  setWeather,
} from "@redux/actions";
import { useCallback, useEffect, useReducer, useState } from "react";

export const useRootState = () => {
  const [loadingFirstRender, setLoadingFirstRender] = useState<boolean>(true);
  const [{ selectedCity, weather, ...state }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const handlerFirstRender = useCallback(async () => {
    if (selectedCity) return;
    try {
      setLoadingFirstRender(true);
      const response = await queryCurrentLocation();
      const coords = response.loc?.split(",")!;
      dispatch(
        setSelectedCity({
          name: response.city ?? "",
          lat: Number(coords[0]),
          lng: Number(coords[1]),
        })
      );
    } catch (error) {
      console.error({ error });
    } finally {
      dispatch(setLoading(false));
    }
  }, [selectedCity, dispatch]);

  const handlerWeatherTime = useCallback(() => {
    if (!weather?.sys) return;

    const sunrise = dayjs.unix(weather.sys.sunrise!);
    const sunset = dayjs.unix(weather.sys.sunset!);
    const now = dayjs();

    dispatch(setTimeOfDay(getTimeOfDay(now, sunrise, sunset)));
  }, [weather, dispatch]);

  const handlerQuerySelectedCity = useCallback(async () => {
    if (!selectedCity) return;

    try {
      dispatch(setLoading(true));
      dispatch(setWeather(await queryWeather(JSON.stringify(selectedCity))));
    } catch (error) {
      console.error({ error });
    } finally {
      dispatch(setLoading(false));
      setLoadingFirstRender(false);
    }
  }, [selectedCity]);

  useEffect(() => {
    handlerQuerySelectedCity();
  }, [handlerQuerySelectedCity]);

  useEffect(() => {
    handlerFirstRender();
  }, [handlerFirstRender]);

  useEffect(() => {
    handlerWeatherTime();
  }, [handlerWeatherTime]);

  return {
    ...state,
    loadingFirstRender,
    weather,
    dispatch,
  };
};
