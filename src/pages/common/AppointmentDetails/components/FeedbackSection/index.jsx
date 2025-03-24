import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AppointmentStatus } from "@/constants/status";
import { formatDateTime } from "@/utils/dateUtils";
import { Pencil, Star } from "lucide-react";

const FeedbackSection = ({ appointmentDetails, openFeedbackDialog }) => {
  return (
    <div>
      <Separator />
      <div className="mt-3 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Feedback</h3>
          {appointmentDetails?.status === AppointmentStatus.Completed && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => openFeedbackDialog(true)}
            >
              <Pencil className="h-3 w-3" />
              Edit Feedback
            </Button>
          )}
        </div>
        <div className="rounded-lg bg-blue-50 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">Client Rating:</span>
              <span className="text-lg font-semibold">
                {appointmentDetails.feedbackRating}/5
              </span>
            </div>
            {appointmentDetails?.feedbackDate && (
              <p className="text-xs text-muted-foreground">
                Submitted on {formatDateTime(appointmentDetails.feedbackDate)}
              </p>
            )}
          </div>
          {appointmentDetails?.feedbackContent && (
            <div className="mt-2">
              <p className="text-blue-800">
                {appointmentDetails.feedbackContent}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;
