export const filterEventsByDate = <T extends { datetime: string | Date }>(
  events: T[],
  targetDate: Date
): T[] => {
  return events.filter((item) => {
    const itemDate = new Date(item.datetime);
    return (
      itemDate.getFullYear() === targetDate.getFullYear() &&
      itemDate.getMonth() === targetDate.getMonth() &&
      itemDate.getDate() === targetDate.getDate()
    );
  });
};
