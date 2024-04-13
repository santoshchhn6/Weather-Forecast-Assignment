export const getTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  const hours = date.getHours(); // Get hours in 24-hour format
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Pad minutes with leading zero if needed
  const ampm = hours >= 12 ? "PM" : "AM";
  const adjustedHours = hours % 12 || 12; // Convert to 12-hour format (adjust for midnight/noon)

  return `${adjustedHours}:${minutes} ${ampm}`;
};
