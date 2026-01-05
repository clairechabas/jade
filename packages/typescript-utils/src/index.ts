/**
 * Collection of TS helpers.
 */
export function assertIsDefined<T>(value: T | null | undefined): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(`Expected value to be defined, but received ${value}`);
  }
}
