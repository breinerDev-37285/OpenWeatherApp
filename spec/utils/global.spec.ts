import { debounce, removeSpecialCharsAndTildes } from "../../src/utils/global";

jest.mock("next/font/google", () => ({
  Geist: jest.fn(() => ({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  })),
  Geist_Mono: jest.fn(() => ({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  })),
}));

describe("Global Utilities", () => {
  describe("debounce", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("delays function execution", () => {
      const func = jest.fn();
      const debouncedFunc = debounce(func, 1000);

      debouncedFunc();
      expect(func).not.toHaveBeenCalled();

      jest.advanceTimersByTime(500);
      expect(func).not.toHaveBeenCalled();

      jest.advanceTimersByTime(500);
      expect(func).toHaveBeenCalledTimes(1);
    });

    it("only executes the last call", () => {
      const func = jest.fn();
      const debouncedFunc = debounce(func, 1000);

      debouncedFunc(1);
      debouncedFunc(2);
      debouncedFunc(3);

      expect(func).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1000);

      expect(func).toHaveBeenCalledTimes(1);
      expect(func).toHaveBeenCalledWith(3);
    });

    it("passes all arguments to the debounced function", () => {
      const func = jest.fn();
      const debouncedFunc = debounce(func, 1000);

      debouncedFunc("test", 123, { foo: "bar" });

      jest.advanceTimersByTime(1000);

      expect(func).toHaveBeenCalledWith("test", 123, { foo: "bar" });
    });
  });

  describe("removeSpecialCharsAndTildes", () => {
    it("removes accent marks from vowels", () => {
      const input = "áéíóúÁÉÍÓÚ";
      const expected = "aeiouAEIOU";
      expect(removeSpecialCharsAndTildes(input)).toBe(expected);
    });

    it("handles ñ and Ñ", () => {
      const input = "niño NIÑO";
      const expected = "nino NINO";
      expect(removeSpecialCharsAndTildes(input)).toBe(expected);
    });

    it("handles ü and Ü", () => {
      const input = "pingüino PINGÜINO";
      const expected = "pinguino PINGUINO";
      expect(removeSpecialCharsAndTildes(input)).toBe(expected);
    });

    it("removes special characters", () => {
      const input = "!@#$%^&*()_+";
      const expected = "";
      expect(removeSpecialCharsAndTildes(input)).toBe(expected);
    });

    it("preserves alphanumeric characters and spaces", () => {
      const input = "Hello World 123";
      const expected = "Hello World 123";
      expect(removeSpecialCharsAndTildes(input)).toBe(expected);
    });

    it("handles mixed case with accents and special characters", () => {
      const input = "¡Hólá Múndó! @123";
      const expected = "Hola Mundo 123";
      expect(removeSpecialCharsAndTildes(input)).toBe(expected);
    });

    it("handles empty string", () => {
      expect(removeSpecialCharsAndTildes("")).toBe("");
    });

    it("handles string with only special characters", () => {
      const input = "@#$%^&*";
      const expected = "";
      expect(removeSpecialCharsAndTildes(input)).toBe(expected);
    });
  });
});
