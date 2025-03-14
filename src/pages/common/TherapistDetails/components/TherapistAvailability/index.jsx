import { useState } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { formatTime } from "@/utils/timeUtils";

const TherapistAvailability = ({ therapistDetails, appointments }) => {
  const [currentWeek, setCurrentWeek] = useState(0);

  // Generate dates for the current week view
  const generateWeekDates = (weekOffset = 0) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() + weekOffset * 7);

    // Adjust to start from current day or beginning of week
    const currentDay = startOfWeek.getDay();
    startOfWeek.setDate(
      startOfWeek.getDate() - currentDay + (currentDay === 0 ? -6 : 1),
    ); // Start from Monday

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = generateWeekDates(currentWeek);

  // Format the date range for display
  const formatDateRange = (dates) => {
    const startDate = dates[0];
    const endDate = dates[6];
    const startMonth = startDate.toLocaleString("default", { month: "short" });
    const endMonth = endDate.toLocaleString("default", { month: "short" });

    if (startMonth === endMonth) {
      return `${startMonth} ${startDate.getDate()}–${endDate.getDate()}, ${endDate.getFullYear()}`;
    }
    return `${startMonth} ${startDate.getDate()}–${endMonth} ${endDate.getDate()}, ${endDate.getFullYear()}`;
  };

  // Check if a time slot is booked
  const isTimeSlotBooked = (date, timeSlot) => {
    if (!appointments || !appointments.length) return false;

    const dateStr = date.toISOString().split("T")[0]; // YYYY-MM-DD
    const [hours, minutes] = timeSlot.split(":");

    // Create a new date object for the slot start time
    const slotStartTime = new Date(date);
    slotStartTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    // Create a new date object for the slot end time (30 minutes later)
    const slotEndTime = new Date(slotStartTime);
    slotEndTime.setMinutes(slotEndTime.getMinutes() + 30);

    // Check if any appointment with status 3 overlaps with this time slot
    return appointments.some((appointment) => {
      if (appointment.status !== 3) return false;

      const appointmentStartTime = new Date(appointment.startTime);
      const appointmentEndTime = new Date(appointment.endTime);

      // Check for overlap
      return (
        (slotStartTime >= appointmentStartTime &&
          slotStartTime < appointmentEndTime) ||
        (slotEndTime > appointmentStartTime &&
          slotEndTime <= appointmentEndTime) ||
        (slotStartTime <= appointmentStartTime &&
          slotEndTime >= appointmentEndTime)
      );
    });
  };

  // Generate time slots for a specific day
  const getTimeSlotsForDay = (date) => {
    const dayOfWeek = date.getDay() === 0 ? 7 : date.getDay(); // Convert Sunday (0) to 7 for compatibility

    const availability = therapistDetails?.availabilities?.find(
      (slot) => slot.dayOfWeek === dayOfWeek,
    );

    if (!availability) return [];

    const { fromTime, toTime } = availability;
    const fromHour = parseInt(fromTime.split(":")[0]);
    const toHour = parseInt(toTime.split(":")[0]);
    const fromMinute = parseInt(fromTime.split(":")[1]);
    const toMinute = parseInt(toTime.split(":")[1]);

    const slots = [];
    let currentHour = fromHour;
    let currentMinute = fromMinute;

    // Generate 30-minute slots
    while (
      currentHour < toHour ||
      (currentHour === toHour && currentMinute < toMinute)
    ) {
      const timeSlot = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;
      const isBooked = isTimeSlotBooked(date, timeSlot);

      slots.push({
        time: timeSlot,
        isBooked,
      });

      currentMinute += 30;
      if (currentMinute >= 60) {
        currentHour += 1;
        currentMinute = 0;
      }
    }

    return slots;
  };

  // Format the schedule date for the URL
  const formatDateForURL = (date) => {
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Schedule</h2>

      <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-center">
        <Info className="h-5 w-5 text-blue-600 mr-2" />
        <p className="text-sm text-blue-800">
          Choose the time for your appointment. The timings are displayed in
          your local timezone.
        </p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex">
          <button
            onClick={() => setCurrentWeek(currentWeek - 1)}
            className="p-3 border rounded-l-lg hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={() => setCurrentWeek(currentWeek + 1)}
            className="p-3 border-t border-b border-r rounded-r-lg hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="font-medium text-gray-800">
          {formatDateRange(weekDates)}
        </div>

        <div className="relative">
          <select
            className="p-2 pr-8 border rounded-lg appearance-none bg-white cursor-pointer"
            defaultValue="Asia/Bangkok"
          >
            <option value="Asia/Bangkok">Asia/Bangkok GMT +7:00</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {weekDates.map((date, index) => {
          const dayName = date.toLocaleString("default", { weekday: "short" });
          const dayNumber = date.getDate();
          const timeSlots = getTimeSlotsForDay(date);
          const dateStr = formatDateForURL(date);

          return (
            <div key={index} className="flex flex-col">
              <div
                className={`text-center p-2 ${timeSlots.length ? "text-gray-800" : "text-gray-400"}`}
              >
                <div className="font-medium">{dayName}</div>
                <div className="text-lg">{dayNumber}</div>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                {timeSlots.map((slot, timeIndex) =>
                  slot.isBooked ? (
                    <div
                      key={timeIndex}
                      className="text-center py-2 px-1 rounded bg-gray-100 border border-gray-200 text-gray-500 font-medium text-sm cursor-not-allowed"
                    >
                      {formatTime(slot.time)} - Booked
                    </div>
                  ) : (
                    <Link
                      key={timeIndex}
                      to={`appointment-booking?date=${dateStr}&time=${slot.time}`}
                      className="text-center py-2 px-1 rounded bg-white border border-gray-200 text-blue-600 hover:bg-blue-50 transition-colors font-medium text-sm"
                    >
                      {formatTime(slot.time)}
                    </Link>
                  ),
                )}

                {timeSlots.length === 0 && (
                  <div className="text-center py-4 text-gray-400 text-sm">
                    No slots
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// This component is not exported in the artifact, so we need to add this for rendering
const ChevronDown = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
};

export default TherapistAvailability;
