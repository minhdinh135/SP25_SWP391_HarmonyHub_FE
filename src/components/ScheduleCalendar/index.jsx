import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import "@schedule-x/theme-default/dist/index.css";
import { useState } from "react";
import { useEffect } from "react";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createEventRecurrencePlugin } from "@schedule-x/event-recurrence";

const ScheduleCalendar = ({ appointments }) => {
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const eventModal = createEventModalPlugin();
  const eventRecurrence = createEventRecurrencePlugin();

  const calendar = useCalendarApp({
    calendars: {
      personal: {
        colorName: "personal",
        lightColors: {
          main: "#f9d71c",
          container: "#fff5aa",
          onContainer: "#594800",
        },
        darkColors: {
          main: "#fff5c0",
          onContainer: "#fff5de",
          container: "#a29742",
        },
      },
      work: {
        colorName: "work",
        lightColors: {
          main: "#f91c45",
          container: "#ffd2dc",
          onContainer: "#59000d",
        },
        darkColors: {
          main: "#ffc0cc",
          onContainer: "#ffdee6",
          container: "#a24258",
        },
      },
      leisure: {
        colorName: "leisure",
        lightColors: {
          main: "#1cf9b0",
          container: "#dafff0",
          onContainer: "#004d3d",
        },
        darkColors: {
          main: "#c0fff5",
          onContainer: "#e6fff5",
          container: "#42a297",
        },
      },
      school: {
        colorName: "school",
        lightColors: {
          main: "#1c7df9",
          container: "#d2e7ff",
          onContainer: "#002859",
        },
        darkColors: {
          main: "#c0dfff",
          onContainer: "#dee6ff",
          container: "#426aa2",
        },
      },
    },
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    // events: [
    //   {
    //     id: 1,
    //     title: "Event 1",
    //     description: "Meeting with Dr.Strange about the meaning of life",
    //     start: "2025-01-23 00:00",
    //     end: "2025-01-23 02:00",
    //     location: "Google Meet - https://meet.google.com/eby-anvo-mnj",
    //     calendarId: "school",
    //     rrule: "FREQ=WEEKLY",
    //   },
    // ],
    plugins: [eventsService, eventModal, eventRecurrence],
  });

  useEffect(() => {
    if (appointments.length > 0) {
      const transformedEvents = appointments.map((appointment) => ({
        id: appointment.id.toString(),
        people: [appointment.memberFullName],
        start: appointment.startTime.replace("T", " ").slice(0, 16), // Format: "YYYY-MM-DD HH:mm"
        end: appointment.endTime.replace("T", " ").slice(0, 16), // Format: "YYYY-MM-DD HH:mm"
        location: appointment.meetUrl,
        calendarId: "school",
      }));

      // Update calendar events
      eventsService.set(transformedEvents);
    }
  }, [appointments, eventsService]);

  useEffect(() => {
    // get all events
    eventsService.getAll();
  }, []);

  return (
    <div className="flex justify-center my-6">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
};

export default ScheduleCalendar;
