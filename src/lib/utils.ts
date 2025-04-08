
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  // Check if dateString is already in YYYY-MM-DD format
  const isValidDateFormat = /^\d{4}-\d{2}-\d{2}$/.test(dateString);
  if (isValidDateFormat) return dateString;
  
  // Try to parse the date
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  
  // Format to YYYY-MM-DD
  return date.toISOString().split('T')[0];
}
