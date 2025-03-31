import { Label } from "@/components/ui/label";
import { formatTime } from "@/utils/timeUtils";

const AvailabilitySection = ({ therapistDetails }) => {
  // Group availabilities by day of week
  const groupedAvailabilities = () => {
    const grouped = Array(7)
      .fill()
      .map(() => []);

    therapistDetails?.availabilities?.forEach((availability) => {
      // dayOfWeek is 1-7 (Monday-Sunday), arrays are 0-indexed
      const index = availability.dayOfWeek - 1;
      grouped[index].push(availability);
    });

    return grouped;
  };

  // Days of week names
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="space-y-4">
      <Label className="text-xl font-medium">Availability</Label>
      {therapistDetails?.availabilities?.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groupedAvailabilities().map((dayAvailabilities, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2 text-gray-800">
                {daysOfWeek[index]}
              </h3>
              {dayAvailabilities.length > 0 ? (
                <div className="space-y-2">
                  {dayAvailabilities.map((availability) => (
                    <div
                      key={availability.id}
                      className="bg-white p-3 rounded-md flex items-center justify-between"
                    >
                      <p className="font-medium">
                        {formatTime(availability.fromTime)} -{" "}
                        {formatTime(availability.toTime)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic">
                  No availabilities
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No availability added yet.</p>
      )}
    </div>
  );
};

export default AvailabilitySection;
