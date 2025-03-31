import { addAvailability } from "@/api/availabilityApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatTime } from "@/utils/timeUtils";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AvailabilitySection = ({ therapistDetails, setIsLoading, fetchData }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAvailability, setNewAvailability] = useState({
    dayOfWeek: "",
    fromTime: "",
    toTime: "",
    therapistId: therapistDetails?.id || 0,
  });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAvailability((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDayChange = (value) => {
    setNewAvailability((prev) => ({
      ...prev,
      dayOfWeek: parseInt(value),
    }));
  };

  const handleSubmit = async () => {
    // Validate input before submission
    if (
      !newAvailability.dayOfWeek ||
      !newAvailability.fromTime ||
      !newAvailability.toTime
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        dayOfWeek: newAvailability.dayOfWeek,
        fromTime: newAvailability.fromTime + ":00",
        toTime: newAvailability.toTime + ":00",
        therapistId: therapistDetails?.id,
      };
      console.log("Payload:", payload);

      await addAvailability(payload);
      fetchData();
      toast.success("Add availability successfully");
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setIsLoading(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-xl font-medium">Availability</Label>
        <Button
          onClick={() => setIsDialogOpen(true)}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Availability
        </Button>
      </div>

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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Availability</DialogTitle>
            <DialogDescription>
              Set the day and time range for the new availability slot.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="dayOfWeek">Day of Week</Label>
              <Select
                onValueChange={handleDayChange}
                value={newAvailability.dayOfWeek.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a day" />
                </SelectTrigger>
                <SelectContent>
                  {daysOfWeek.map((day, index) => (
                    <SelectItem key={index} value={(index + 1).toString()}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fromTime">From Time</Label>
              <Input
                id="fromTime"
                name="fromTime"
                type="time"
                value={newAvailability.fromTime}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="toTime">To Time</Label>
              <Input
                id="toTime"
                name="toTime"
                type="time"
                value={newAvailability.toTime}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSubmit}>
              Add Availability
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AvailabilitySection;
