import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  Video,
  MessageSquare,
  Star,
  User,
  UserCheck,
  Package,
  ChevronLeft,
  Pencil,
  Plus,
} from "lucide-react";
import { getAppointmentStatusText } from "@/utils/enumUtils";
import { getAppointmentStatusColor } from "@/utils/colorUtils";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";
import {
  getAppointmentDetails,
  updateAppointmentFeedback,
  updateAppointmentNote,
} from "@/api/appointmentApi";
import { AppointmentStatus } from "@/constants/status";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackContent, setFeedbackContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New state for therapist note dialog
  const [therapistNoteOpen, setTherapistNoteOpen] = useState(false);
  const [therapistNoteContent, setTherapistNoteContent] = useState("");
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getAppointmentDetails(id);
      setAppointmentDetails(data);
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const openFeedbackDialog = (edit = false) => {
    // If in edit mode, pre-populate with existing values
    if (edit && appointmentDetails?.feedbackRating) {
      setRating(appointmentDetails.feedbackRating);
      setFeedbackContent(appointmentDetails.feedbackContent || "");
    } else {
      // Reset values for new feedback
      setRating(0);
      setFeedbackContent("");
    }

    setFeedbackOpen(true);
  };

  // New function to open therapist note dialog
  const openTherapistNoteDialog = () => {
    setTherapistNoteContent(appointmentDetails?.therapistNote || "");
    setTherapistNoteOpen(true);
  };

  const handleFeedbackSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating before submitting");
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        feedbackRating: rating,
        feedbackContent: feedbackContent,
        feedbackDate: new Date().toISOString(),
      };
      console.log(payload);
      await updateAppointmentFeedback(id, payload);
      toast.success("Feedback submitted successfully");
      setFeedbackOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // New function to handle therapist note submission
  const handleTherapistNoteSubmit = async () => {
    try {
      setIsSubmittingNote(true);
      const payload = {
        therapistNote: therapistNoteContent,
      };
      await updateAppointmentNote(id, payload);
      toast.success("Therapist note saved successfully");
      setTherapistNoteOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error submitting therapist note:", error);
      toast.error("Failed to save therapist note. Please try again.");
    } finally {
      setIsSubmittingNote(false);
    }
  };

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

  if (isLoading) return <Spinner />;

  // Format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format just date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen container mx-auto max-w-4xl py-8">
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Appointments
      </Button>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Appointment ID: {appointmentDetails?.id}
            </p>
            <CardTitle className="text-2xl font-bold">
              Marital Counseling Session
            </CardTitle>
          </div>
          <Badge
            className={`${getAppointmentStatusColor(appointmentDetails?.status)} px-3 py-1.5 text-base`}
          >
            {getAppointmentStatusText(appointmentDetails?.status)}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Session details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Session Details</h3>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p>{formatDate(appointmentDetails?.startTime)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p>
                    {new Date(appointmentDetails?.startTime).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      },
                    )}{" "}
                    -{" "}
                    {new Date(appointmentDetails?.endTime).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      },
                    )}
                  </p>
                </div>
              </div>

              {appointmentDetails?.meetUrl && (
                <div className="flex items-center gap-3">
                  <Video className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Meeting Link
                    </p>
                    <a
                      href={appointmentDetails?.meetUrl}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join Virtual Session
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Package</p>
                  <p>{appointmentDetails?.packageName}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">People</h3>

              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Client</p>
                  <p>{appointmentDetails?.memberFullName}</p>
                  <p className="text-xs text-muted-foreground">
                    ID: {appointmentDetails?.memberId}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <UserCheck className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Therapist</p>
                  <p>{appointmentDetails?.therapistFullName}</p>
                  <p className="text-xs text-muted-foreground">
                    ID: {appointmentDetails?.therapistId}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Notes section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Notes</h3>

              {/* Show Add/Edit Note button for therapists */}
              {appointmentDetails?.status === AppointmentStatus.Completed && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={openTherapistNoteDialog}
                >
                  {appointmentDetails?.therapistNote ? (
                    <>
                      <Pencil className="h-3 w-3" />
                      Edit Note
                    </>
                  ) : (
                    <>
                      <Plus className="h-3 w-3" />
                      Add Note
                    </>
                  )}
                </Button>
              )}
            </div>

            {appointmentDetails?.clientNote && (
              <div className="rounded-lg bg-slate-50 p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-slate-500" />
                  <span className="font-medium">Client Note:</span>
                </div>
                <p className="text-slate-700">
                  {appointmentDetails?.clientNote}
                </p>
              </div>
            )}

            {appointmentDetails?.therapistNote ? (
              <div className="rounded-lg bg-slate-50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4 text-slate-500" />
                    <span className="font-medium">Therapist Note:</span>
                  </div>
                </div>
                <p className="text-slate-700">
                  {appointmentDetails?.therapistNote}
                </p>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-slate-200 p-4 text-center">
                <p className="text-slate-500 mb-3">No therapist notes yet</p>
                {appointmentDetails?.status === AppointmentStatus.Completed && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 mx-auto"
                    onClick={openTherapistNoteDialog}
                  >
                    <Plus className="h-3 w-3" />
                    Add Session Notes
                  </Button>
                )}
              </div>
            )}

            {!appointmentDetails?.clientNote &&
              !appointmentDetails?.therapistNote && (
                <p className="text-muted-foreground italic">
                  No notes available for this appointment.
                </p>
              )}
          </div>

          {/* Feedback section */}
          {appointmentDetails?.feedbackRating && (
            <>
              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Feedback</h3>

                  {appointmentDetails?.status ===
                    AppointmentStatus.Completed && (
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
                        Submitted on{" "}
                        {formatDateTime(appointmentDetails.feedbackDate)}
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
            </>
          )}
        </CardContent>

        {appointmentDetails?.status === AppointmentStatus.Completed &&
          !appointmentDetails.feedbackRating && (
            <CardFooter className="border-t pt-6 flex justify-center">
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setFeedbackOpen(true)}
              >
                Provide Feedback
              </Button>
            </CardFooter>
          )}
      </Card>

      {/* Feedback Dialog */}
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

      {/* Therapist Note Dialog */}
      <Dialog open={therapistNoteOpen} onOpenChange={setTherapistNoteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {appointmentDetails?.therapistNote
                ? "Edit Session Notes"
                : "Add Session Notes"}
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <div className="mb-2">
              <p className="text-sm text-gray-500 mb-2">
                {appointmentDetails?.therapistNote
                  ? "Update your notes for this session"
                  : "Add your notes for this session with"}
              </p>
              {!appointmentDetails?.therapistNote && (
                <p className="font-medium">
                  {appointmentDetails?.memberFullName}
                </p>
              )}
            </div>

            <Textarea
              placeholder="Enter your session notes here..."
              value={therapistNoteContent}
              onChange={(e) => setTherapistNoteContent(e.target.value)}
              className="min-h-40"
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setTherapistNoteOpen(false)}
              disabled={isSubmittingNote}
            >
              Cancel
            </Button>
            <Button
              onClick={handleTherapistNoteSubmit}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isSubmittingNote || !therapistNoteContent.trim()}
            >
              {isSubmittingNote ? "Saving..." : "Save Notes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentDetails;
