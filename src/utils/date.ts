import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

export const getTimeOfDay = (
  currentTime: dayjs.Dayjs,
  sunrise: dayjs.Dayjs,
  sunset: dayjs.Dayjs
): 'day' | 'night' | 'sunrise' | 'sunset' => {
  if (currentTime.isBefore(sunrise)) {
    const timeBeforeSunrise = sunrise.subtract(30, "minute");
    if (currentTime.isAfter(timeBeforeSunrise)) {
      return "sunrise";
    }
    return "night";
  }

  if (currentTime.isBefore(sunset)) {
    return "day";
  }

  if (currentTime.isBefore(sunset.add(1, "hour"))) {
    return "sunset";
  }

  return "night";
};

export default dayjs;
