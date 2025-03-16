const { google } = require("googleapis");
const calendar = google.calendar("v3");

async function createMeetEvent(auth, summary, startTime, endTime, attendees) {
  const event = {
    summary: summary,
    start: { dateTime: startTime, timeZone: "UTC" },
    end: { dateTime: endTime, timeZone: "UTC" },
    attendees: attendees.map(email => ({ email })),
    conferenceData: { createRequest: { requestId: "random-string" } },
  };

  const response = await calendar.events.insert({
    auth,
    calendarId: "primary",
    resource: event,
    conferenceDataVersion: 1,
  });

  return response.data.hangoutLink; // Google Meet link
}
