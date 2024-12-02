/**
 * Calculates the relative time from the current date to a given date string.
 *
 * @param {string} dateString - A date string representing the past date to calculate the time from.
 * @returns {string} - A human-readable string representing the relative time,
 *                     e.g., "2 days ago", "1 month ago". Returns "0 seconds ago"
 *                     if the date is in the future or the same as the current time.
 */
export const calcDateFromNow = (dateString) => {
  // eslint-disable-next-line no-undef
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const now = new Date();
  const past = new Date(dateString);

  let diffInSeconds = Math.floor((now - past) / 1000);
  diffInSeconds = Math.max(0, diffInSeconds);

  const timeIntervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(timeIntervals)) {
    if (diffInSeconds >= secondsInUnit) {
      const delta = Math.floor(diffInSeconds / secondsInUnit);
      return rtf.format(-delta, unit); // Use negative delta for "X time ago"
    }
  }

  // If less than a minute, return a custom message
  return "Less then a minute ago";
};

/**
 * Formats a given date into the specified format.
 *
 * @param {Date|string|number} date - The date to format. Can be a Date object,
 *                                    a valid date string, or a timestamp.
 * @param {string} [format='YYYY-MM-DD'] - The format to return the date in.
 *                                         Supported formats:
 *                                         - 'YYYY-MM-DD': e.g., 2024-12-31
 *                                         - 'DD-MM-YYYY': e.g., 31-12-2024
 * @returns {string} - The formatted date as a string. Returns an empty string
 *                     if the input date is invalid or not provided.
 */
export const formatDate = (date, format = 'YYYY-MM-DD') => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  if (format === 'YYYY-MM-DD') {
    return `${year}-${month}-${day}`;
  } else if (format === 'DD-MM-YYYY') {
    return `${day}-${month}-${year}`;
  }
};
