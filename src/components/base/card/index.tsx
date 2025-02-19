"use client";
import styles from "./style.module.css";
import { FC } from "react";
import { ICardProps } from "@interfaces/base/card";
import { SearchLocation } from "../search";
import { useRootState } from "@hooks/useState";
import { Temperature } from "@components/widget/temperature";
import { Time } from "@components/widget/time";
import { Location } from "@/components/widget/location";

export const Card: FC<ICardProps> = () => {
  const { dispatch, loading, weather, timeOfDay, loadingFirstRender } =
    useRootState();

  return (
    <section className={styles.base_card}>
      <img
        className={styles.img}
        src={`/img/${timeOfDay ?? "sunrise"}.png`}
        alt="timeWeatherImg"
      />
      <article className={styles.content}>
        {loadingFirstRender ? (
          <div className={styles.wrapper_loader}>
            <span className="loader" />
          </div>
        ) : (
          <>
            <SearchLocation
              type="text"
              placeholder="Search location"
              dispatch={dispatch}
              loading={loading}
            />

            <div className={`${styles.content_widgets}`}>
              <Location
                name={weather?.name ?? ""}
                country_code={weather?.sys?.country ?? ""}
                timestamp={weather?.dt ?? 0}
              />
              <Temperature value={weather?.main?.temp ?? 0} symbol="C" />
              <Time
                weather={weather?.weather?.[0] ?? {}}
                humidity={weather?.main?.humidity ?? 0}
                pressure={weather?.main?.pressure ?? 0}
                wind={weather?.wind?.speed ?? 0}
              />
            </div>
          </>
        )}
      </article>
    </section>
  );
};
