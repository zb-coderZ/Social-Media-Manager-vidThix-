// vidThix - Helper Functions
// Utility functions used throughout the application

import { format, formatDistanceToNow, parseISO } from "date-fns";

/**
 * Format a date to a readable string
 * @param {Date|string} date - Date object or ISO string
 * @param {string} formatString - Format pattern (default: 'MMM dd, yyyy')
 * @returns {string} - Formatted date string
 */
export function formatDate(date, formatString = "MMM dd, yyyy") {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return format(dateObj, formatString);
  } catch (error) {
    return "Invalid date";
  }
}

/**
 * Format a date to relative time (e.g., "2 hours ago")
 * @param {Date|string} date - Date object or ISO string
 * @returns {string} - Relative time string
 */
export function formatRelativeTime(date) {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return formatDistanceToNow(dateObj, { addSuffix: true });
  } catch (error) {
    return "Unknown";
  }
}

/**
 * Format a number with thousand separators
 * @param {number} num - Number to format
 * @returns {string} - Formatted number string
 */
export function formatNumber(num) {
  if (typeof num !== "number") return "0";
  return new Intl.NumberFormat("en-US").format(num);
}

/**
 * Format a number to compact form (e.g., 1.2M, 5.3K)
 * @param {number} num - Number to format
 * @returns {string} - Compact number string
 */
export function formatCompactNumber(num) {
  if (typeof num !== "number") return "0";

  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

/**
 * Format file size to human-readable string
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add when truncated (default: '...')
 * @returns {string} - Truncated text
 */
export function truncateText(text, maxLength, suffix = "...") {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Generate a random ID
 * @returns {string} - Random ID
 */
export function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Debounce a function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} - Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle a function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in ms
 * @returns {Function} - Throttled function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Get file extension from filename
 * @param {string} filename - File name
 * @returns {string} - File extension (lowercase)
 */
export function getFileExtension(filename) {
  if (!filename) return "";
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "";
}

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 * @param {*} value - Value to check
 * @returns {boolean} - True if empty
 */
export function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}

/**
 * Clamp a number between min and max
 * @param {number} num - Number to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Clamped number
 */
export function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} - Initials (max 2 characters)
 */
export function getInitials(name) {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Calculate percentage
 * @param {number} value - Current value
 * @param {number} total - Total value
 * @returns {number} - Percentage (0-100)
 */
export function calculatePercentage(value, total) {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * Sleep for specified duration (for async operations)
 * @param {number} ms - Duration in milliseconds
 * @returns {Promise} - Promise that resolves after duration
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} - True if valid
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - True if successful
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Get a random item from an array
 * @param {Array} array - Source array
 * @returns {*} - Random item
 */
export function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Shuffle an array (Fisher-Yates algorithm)
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled array
 */
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
