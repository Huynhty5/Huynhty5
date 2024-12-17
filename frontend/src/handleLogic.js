export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const today = new Date();

  // Check if the date is the same as today
  const isSameDate =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isSameDate) {
    // If the date is today, return only the time (HH:mm)
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  } else {
    // Otherwise, return the date in DD/MM/YYYY format
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
};
