export const calculateTotalPercentage = (percentages: { [key: string]: number }) => {
  return Object.values(percentages).reduce((sum, value) => sum + value, 0);
};