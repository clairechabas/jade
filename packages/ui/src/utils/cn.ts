import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Streamline CSS classes management by merging
 * - clsx : conditional classes application
 * - tailwind-merge : classes conflict resolution
 *
 * Usage:
 * const exampleClass = cn(
 *  'text-center p-6',
 *  isActive ? 'bg-blue-500' : 'bg-gray-500',
 *  { 'text-white': isActive },
 *  props.className,
 * );
 *
 * <div className={exampleClass}>...</div>
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
