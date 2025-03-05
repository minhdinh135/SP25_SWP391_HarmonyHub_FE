export const formatTime = (timeString) => {
  if (!timeString) return "";
  return timeString.slice(0, 5);
};

export const formatTimeString = (timeString) => {
  return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Helper function to calculate end time
export const calculateEndTime = (startTimeString, durationMinutes) => {
  const startTime = new Date(`2000-01-01T${startTimeString}`);
  const endTime = new Date(startTime.getTime() + durationMinutes * 60000);
  return endTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
