export const getWeekDay = (timestamp: number) => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekDays[new Date(timestamp * 1000).getDay()];
};
