import { Label } from "@/components/ui/label";
import { getDayOfWeek } from "@/utils/enumUtils";

const AvailabilitySection = ({ therapistDetails }) => {
  return (
    <div className="space-y-4">
      <Label className="text-xl font-medium">Availability</Label>
      {therapistDetails?.availabilities?.length > 0 ? (
        <div className="space-y-2">
          {therapistDetails.availabilities.map((availability) => (
            <div
              key={availability.id}
              className="bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <p className="font-medium">
                {getDayOfWeek(availability.dayOfWeek)}: {availability.fromTime}{" "}
                - {availability.toTime}
              </p>
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
