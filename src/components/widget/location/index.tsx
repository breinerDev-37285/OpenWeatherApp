import dayjs from '@utils/date';
import Image from 'next/image';
import  { FC } from 'react';
import styles from './style.module.css';
import { ILocation } from '@interfaces/widget/location';

export const Location: FC<ILocation> = ({ name, country_code, timestamp }) => (
  <div className={styles.location_wrapper}>
    <div className={styles.location_container}>
      <Image src="/svg/map-pin.svg" alt="iconPin" width={20} height={20} />
      <span>
        {name}, {country_code}
      </span>
    </div>
    <span className={styles.text_date}>
      {dayjs.unix(timestamp).format("dddd, MMM DD") + "th"}
    </span>
  </div>
);
