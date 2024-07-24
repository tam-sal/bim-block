// Regex for description validation
const descRegex = /^(?!.*([a-zA-Z0-9\s])\1{2})[a-zA-Z0-9\s]{1,40}$/;

// Validate description
const validateDescription = (description) => {
  if (!description || !descRegex.test(description.trim())) {
    return 'Invalid description or exceeds 40 characters';
  }
  return null;
};

// Validate progress
const validateProgress = (progress) => {
  if (isNaN(progress) || progress < 0 || progress > 100) {
    return 'Progress must be a number between 0 and 100';
  }
  return null;
};

// Validate dates
const validateDates = (startDate, endDate) => {
  if (new Date(startDate) >= new Date(endDate)) {
    return 'Start date must be earlier than end date';
  }
  return null;
};

// Validate required fields
const validateRequiredFields = (description, startDate, endDate, progress) => {
  if (!description || !startDate || !endDate || progress === null || isNaN(progress)) {
    return 'Missing required field/s - progress must be a number';
  }
  return null;
};

export { validateDescription, validateProgress, validateDates, validateRequiredFields };
