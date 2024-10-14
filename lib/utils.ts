import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatDate = (dateString: string) => {
  const dateObj = new Date(dateString);

  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  const day = dateObj.getDate();           // Day of the month (1-31)
  const month = dateObj.toLocaleString('default', { month: 'long' });  // Full month name (e.g., July)
  const year = dateObj.getFullYear();      // Full year

  // Format the date as "12 July 2021"
  const formattedDate = `${day} ${month} ${year}`;
  return formattedDate;
};
