import { FC } from "react";
import styles from "./style.module.css";
import { ITemperature } from "@/interfaces/widget/temperature";

export const Temperature: FC<ITemperature> = ({ value, symbol }) => (
  <div className={styles.container}>
    <span className={styles.temperature_value}>
      {value.toFixed(0)}
      <span className={styles.temperature_symbol}>°{symbol}</span>
    </span>
  </div>
);
