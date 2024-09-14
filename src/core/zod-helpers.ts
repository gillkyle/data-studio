import { z } from "zod";

export function isValidCSV(
  str: string,
  options: { delimiter?: string; requireHeader?: boolean } = {}
): boolean {
  const { delimiter = ",", requireHeader = true } = options;
  const lines = str.trim().split("\n");

  if (lines.length === 0) return false;
  if (requireHeader && lines.length < 2) return false;

  const columnCount = lines[0].split(delimiter).length;

  return lines.every((line) => line.split(delimiter).length === columnCount);
}

// Zod schema for CSV validation
export const csvSchema = z
  .string()
  .refine((str) => isValidCSV(str), { message: "Invalid CSV format" });
