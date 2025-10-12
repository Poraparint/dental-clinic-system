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

export const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}

