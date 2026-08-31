export type Locale = "id" | "en" | "zh";

/** Picks the `${field}_${locale}` value from a row, falling back to `${field}_id`. */
export function pick(row: Record<string, unknown>, field: string, locale: Locale): string {
  const value = row[`${field}_${locale}`] || row[`${field}_id`];
  return (value as string) ?? "";
}
