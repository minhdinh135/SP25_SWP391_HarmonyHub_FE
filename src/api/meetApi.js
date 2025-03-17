// 1. Create a utility function to generate Google Meet URLs
// utils/meetingUtils.js
export const generateGoogleMeetUrl = (appointmentId, title) => {
  // Format the title for the URL
  const formattedTitle = encodeURIComponent(title || 'Marital Counseling Session');

  // Create a unique meeting ID based on the appointment ID
  const meetingId = `appointment-${appointmentId}`;

  // Generate the Google Meet URL
  // Note: This is a simplified version. In a real implementation, you'd need to use the Google Calendar API
  return `https://meet.google.com/${meetingId}`;
};
