import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

const UpdateFeedbackDialog = ({
  appointmentDetails,
  feedbackOpen,
  setFeedbackOpen,
  rating,
  setRating,
  feedbackContent,
  setFeedbackContent,
  handleFeedbackSubmit,
  isSubmitting,
}) => {
  const StarRating = () => {
    return (
      <div className="flex items-center space-x-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="focus:outline-none"
          >
            <Star
              className={`h-8 w-8 ${
                star <= rating
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              } hover:text-yellow-400 transition-colors`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rate Your Session</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="text-center mb-2">
            <p className="text-sm text-gray-500 mb-2">
              How would you rate your session with
            </p>
            <p className="font-medium">
              {appointmentDetails?.therapistFullName}
            </p>
          </div>
          <div className="flex justify-center my-4">
            <StarRating />
          </div>
          <Textarea
            placeholder="Share your experience with this therapist"
            value={feedbackContent}
            onChange={(e) => setFeedbackContent(e.target.value)}
            className="min-h-20"
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setFeedbackOpen(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleFeedbackSubmit}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isSubmitting || rating === 0}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateFeedbackDialog;
