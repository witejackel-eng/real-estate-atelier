import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as Indian currency in abbreviated form.
 * Examples: 48000000 → "₹4.8 Cr", 4500000 → "₹45 L"
 */
export function formatPrice(num: number): string {
  if (num >= 10000000) {
    const cr = num / 10000000;
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(1).replace(/\.0$/, '')} Cr`;
  }
  if (num >= 100000) {
    const l = num / 100000;
    return `₹${l % 1 === 0 ? l.toFixed(0) : l.toFixed(1).replace(/\.0$/, '')} L`;
  }
  return `₹${num.toLocaleString('en-IN')}`;
}

/**
 * Format a number as Indian currency with full commas.
 * Example: 48000000 → "₹4,80,00,000"
 */
export function formatPriceFull(num: number): string {
  return `₹${num.toLocaleString('en-IN')}`;
}

/**
 * Parse an Indian currency string back to a number.
 * Handles "₹4.8 Cr" → 48000000, "₹45 L" → 4500000, "₹4,80,00,000" → 48000000
 */
export function parsePriceToNumber(str: string): number {
  const cleaned = str.replace(/[₹,\s]/g, '').trim();
  const crMatch = cleaned.match(/^([\d.]+)\s*Cr$/i);
  if (crMatch) {
    return Math.round(parseFloat(crMatch[1]) * 10000000);
  }
  const lMatch = cleaned.match(/^([\d.]+)\s*L$/i);
  if (lMatch) {
    return Math.round(parseFloat(lMatch[1]) * 100000);
  }
  return parseInt(cleaned, 10) || 0;
}