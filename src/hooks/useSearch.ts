"use client";
import { debounce, removeSpecialCharsAndTildes } from "@utils/global";
import { search } from "@lib/services/search";
import { setLoading, setSelectedCity } from "@redux/actions";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  ICityLocation,
  ISearchLocationProps,
} from "@interfaces/base/searchLocation";
import { searchSchema } from "@/validations/search";
import { ValidationError } from "yup";

export const useSearch = ({
  dispatch,
  loading,
}: Pick<ISearchLocationProps, "dispatch" | "loading">) => {
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);
  const [cities, setCities] = useState<ICityLocation[]>([]);
  const [query, setQuery] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSearch = useCallback(async (value: string) => {
    if (!value) return;
    try {
      dispatch(setLoading(true));
      await searchSchema.validate({ query: value });
      const { results } = await search(value);
      if (!results) throw new Error("No results found");

      const resultsMapped = results.map(({ formatted, geometry }) => ({
        name: formatted,
        lat: geometry.lat,
        lng: geometry.lng,
      }));

      const uniqueResults = Array.from(
        new Map(resultsMapped.map((item) => [item.name, item])).values()
      );

      setCities(uniqueResults);
    } catch (error: any) {
      console.error(error);
      if (error instanceof ValidationError) {
        setError(error.message);
      }
      setActiveDropdown(false);
      setCities([]);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setQuery(value);
    setError("");
    debouncedHandleSearch(value);
  };

  const debouncedHandleSearch = useMemo(
    () => debounce(handleSearch, 500),
    [handleSearch]
  );

  const handlerSelectedCity = useCallback(
    (city: ICityLocation) => {
      if (loading) return;
      dispatch(setSelectedCity(city));
      setQuery(removeSpecialCharsAndTildes(city.name));
      setTimeout(() => setActiveDropdown(false), 300);
    },
    [loading, dispatch]
  );

  useEffect(() => {
    setActiveDropdown(cities.length > 0 && query.length > 0);
  }, [cities, query]);

  return {
    handleSearch,
    handleInputChange,
    handlerSelectedCity,
    activeDropdown,
    query,
    cities,
    error,
  };
};
