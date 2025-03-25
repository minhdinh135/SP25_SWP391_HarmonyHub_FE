import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getDayOfWeek } from "@/utils/enumUtils";
import { formatTime } from "@/utils/timeUtils";
import { Edit, Plus, Trash2 } from "lucide-react";

const AvailabilitySection = ({ therapistDetails }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-xl font-medium">Availability</Label>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Availability
        </Button>
      </div>

      {therapistDetails?.availabilities?.length > 0 ? (
        <div className="space-y-2">
          {therapistDetails.availabilities.map((availability) => (
            <div
              key={availability.id}
              className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center justify-between"
            >
              <p className="font-medium">
                {getDayOfWeek(availability.dayOfWeek)}:{" "}
                {formatTime(availability.fromTime)} -{" "}
                {formatTime(availability.toTime)}
              </p>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4 text-blue-500" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
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
