export const calculateNewPercentages = (
  currentPercentages: { [key: string]: number },
  optionId: string,
  newValue: number,
  oldValue: number
) => {
  const newPercentages = { ...currentPercentages };
  newPercentages[optionId] = newValue;

  // Calculate the change in value
  const valueDiff = newValue - oldValue;
  const totalPercentage = Object.values(currentPercentages).reduce((sum, value) => sum + value, 0);
  
  // Calculate remaining percentage that can be distributed
  const remainingPercentage = 100 - (totalPercentage + valueDiff);
  
  if (remainingPercentage < 0) {
    // If we need to reduce other values
    const otherOptionIds = Object.keys(currentPercentages).filter(id => id !== optionId);
    const totalOtherValues = otherOptionIds.reduce((sum, id) => sum + newPercentages[id], 0);
    
    if (totalOtherValues > 0) {
      // Distribute the excess proportionally among other options
      otherOptionIds.forEach(id => {
        const proportion = newPercentages[id] / totalOtherValues;
        newPercentages[id] = Math.max(0, Math.round(newPercentages[id] + (remainingPercentage * proportion)));
      });
    }
  }

  return newPercentages;
};

export const calculateTotalPercentage = (percentages: { [key: string]: number }) => {
  return Object.values(percentages).reduce((sum, value) => sum + value, 0);
};