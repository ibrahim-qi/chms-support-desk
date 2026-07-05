export function getField(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export function parseEnumValue<T extends string>(
  value: string,
  allowed: readonly T[]
): T | null {
  return allowed.includes(value as T) ? (value as T) : null;
}
