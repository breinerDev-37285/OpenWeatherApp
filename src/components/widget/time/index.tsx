import { ITime } from "@interfaces/widget/time";
import { FC } from "react";
import styles from "./style.module.css";

export const Time: FC<ITime> = ({ weather, humidity, pressure, wind }) => (
  <div className={styles.container}>
    <div className={styles.container_main}>
      <img
        className={styles.img}
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={weather.main}
      />
      <span className={styles.text_weather_state}>{weather.description}</span>
    </div>

    <div className={styles.container_items}>
      <div className={styles.item}>
        <img
          className={styles.item_icon}
          src="/svg/humidity.svg"
          alt="itemIcon"
        />
        <span>{humidity}</span>
      </div>

      <div className={styles.item}>
        <img
          className={styles.item_icon}
          src="/svg/atmospheric.svg"
          alt="itemIcon"
        />
        <span>{pressure}</span>
      </div>

      <div className={styles.item}>
        <img
          className={styles.item_icon}
          src="/svg/wind.svg"
          alt="itemIcon"
        />
        <span>{wind}</span>
      </div>
    </div>
  </div>
);
