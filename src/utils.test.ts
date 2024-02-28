import {
  generateID,
  generateRandomString,
  generateRequirement,
  getRandomInt,
  limit,
} from "./utils";

describe("limit function", () => {
  test("should limit string length", () => {
    const result = limit("Hello, world!", 5);

    expect(result).toBe("Hello...");
  });

  test("should return the full string if under the limit", () => {
    const result = limit("Hi", 5);

    expect(result).toBe("Hi");
  });

  test("should handle empty string input", () => {
    const result = limit("", 5);

    expect(result).toBe("");
  });
});

describe("generateRequirement object", () => {
  test("should return correct requirement object", () => {
    const fieldName = "username";
    const result = generateRequirement(fieldName);

    expect(result).toEqual({
      required: true,
      message: `Please input the ${fieldName}!`,
    });
  });
});

describe("generateRandomString", () => {
  test("should generate a string of correct length", () => {
    const length = 10;
    const result = generateRandomString(length);

    expect(result).toHaveLength(length);
  });
});

describe("generateID", () => {
  test("should generate an ID in the correct format", () => {
    const result = generateID();

    expect(result).toMatch(
      /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/,
    );
  });
});

describe("generate integer", () => {
  test("should return an integer", () => {
    const result = getRandomInt(10);

    expect(Number.isInteger(result)).toBeTruthy();
  });

  test("should return a number within the range 0 to max - 1", () => {
    const max = 10;

    for (let i = 0; i < 100; i++) {
      // Run multiple times to ensure reliability
      const result = getRandomInt(max);

      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(max);
    }
  });

  test("should handle the max value of 1", () => {
    const result = getRandomInt(1);

    expect(result).toBe(0);
  });
});
