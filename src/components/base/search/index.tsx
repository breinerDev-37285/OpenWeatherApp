"use client";
import { ISearchLocationProps } from "@/interfaces/base/searchLocation";
import { FC } from "react";
import styles from "./style.module.css";
import { useSearch } from "@/hooks/useSearch";
import { loaderSize } from "@/helpers/search";

export const SearchLocation: FC<ISearchLocationProps> = ({
  dispatch,
  loading,
  ...props
}) => {
  const {
    handleInputChange,
    query,
    cities,
    handlerSelectedCity,
    activeDropdown,
    error,
  } = useSearch({ dispatch, loading });

  return (
    <div className={`${styles.base_search__container}`}>
      <input
        {...props}
        className={styles.base_search}
        onChange={handleInputChange}
        value={query}
      />

      {error && query && !cities.length && <span className={styles.error}>{error}</span>}

      {loading && (
        <div className={styles.wrapper_loader}>
          <span className="loader" style={loaderSize} />
        </div>
      )}

      <div
        className={`${styles.dropdown} ${
          activeDropdown ? styles.active_expanded : ""
        } ${loading ? "invisible" : "visible"}`}
      >
        <div className={`${styles.dropdown_content}`}>
          <ul>
            {cities.map((city, _idx) => (
              <li
                key={city.name + _idx}
                onClick={() => handlerSelectedCity(city)}
                className={loading ? styles.disabled : ""}
              >
                {city.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
