// This utility function takes a string which represents a key
// and a type or interface
// It checks if the key is a valid property on the type or interface

export function isValidProperty<T extends object>(
  key: string | number | symbol,
  obj: T
): key is keyof T {
  return key in obj;
}
