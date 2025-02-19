import dayjs from "dayjs";
import { getTimeOfDay } from "../../src/utils/date";

jest.mock("dayjs", () => {
  const originalDayjs = jest.requireActual("dayjs");
  const mockDayjs = jest.fn((date) => originalDayjs(date)) as any;
  mockDayjs.locale = jest.fn();
  return mockDayjs;
});

describe("date utilities", () => {
  describe("getTimeOfDay", () => {
    const createMockDayjs = (isBefore: boolean, isAfter: boolean) => ({
      isBefore: jest.fn(() => isBefore),
      isAfter: jest.fn(() => isAfter),
      subtract: jest.fn(() => ({
        isAfter: jest.fn(() => isAfter),
      })),
      add: jest.fn(() => ({
        isBefore: jest.fn(() => isBefore),
      })),
    });

    it('returns "night" when time is before sunrise and not close to sunrise', () => {
      const currentTime = createMockDayjs(true, false);
      const sunrise = createMockDayjs(false, false);
      const sunset = createMockDayjs(false, false);

      const result = getTimeOfDay(
        currentTime as unknown as dayjs.Dayjs,
        sunrise as unknown as dayjs.Dayjs,
        sunset as unknown as dayjs.Dayjs
      );

      expect(result).toBe("night");
      expect(currentTime.isBefore).toHaveBeenCalledWith(sunrise);
      expect(currentTime.isAfter).toHaveBeenCalled();
    });

    it('returns "sunrise" when time is within 30 minutes before sunrise', () => {
      const currentTime = createMockDayjs(true, true);
      const sunrise = createMockDayjs(false, false);
      const sunset = createMockDayjs(false, false);

      const result = getTimeOfDay(
        currentTime as unknown as dayjs.Dayjs,
        sunrise as unknown as dayjs.Dayjs,
        sunset as unknown as dayjs.Dayjs
      );

      expect(result).toBe("sunrise");
      expect(currentTime.isBefore).toHaveBeenCalledWith(sunrise);
      expect(sunrise.subtract).toHaveBeenCalledWith(30, "minute");
    });

    it('returns "day" when time is between sunrise and sunset', () => {
      const currentTime = createMockDayjs(false, false);
      currentTime.isBefore.mockImplementation(((time:any) => time === sunset) as any);
      const sunrise = createMockDayjs(false, false);
      const sunset = createMockDayjs(false, false);

      const result = getTimeOfDay(
        currentTime as unknown as dayjs.Dayjs,
        sunrise as unknown as dayjs.Dayjs,
        sunset as unknown as dayjs.Dayjs
      );

      expect(result).toBe("day");
      expect(currentTime.isBefore).toHaveBeenCalledWith(sunset);
    });

    it('returns "sunset" when time is within 1 hour after sunset', () => {
      const currentTime = createMockDayjs(false, false);
      currentTime.isBefore
        .mockImplementationOnce(() => false) 
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => true)

      const sunrise = createMockDayjs(false, false);
      const sunset = createMockDayjs(false, false);

      const result = getTimeOfDay(
        currentTime as unknown as dayjs.Dayjs,
        sunrise as unknown as dayjs.Dayjs,
        sunset as unknown as dayjs.Dayjs
      );

      expect(result).toBe("sunset");
      expect(sunset.add).toHaveBeenCalledWith(1, "hour");
    });

    it('returns "night" when time is more than 1 hour after sunset', () => {
      const currentTime = createMockDayjs(false, false);
      currentTime.isBefore
        .mockImplementationOnce(() => false) 
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => false);

      const sunrise = createMockDayjs(false, false);
      const sunset = createMockDayjs(false, false);

      const result = getTimeOfDay(
        currentTime as unknown as dayjs.Dayjs,
        sunrise as unknown as dayjs.Dayjs,
        sunset as unknown as dayjs.Dayjs
      );

      expect(result).toBe("night");
    });
  });

});
