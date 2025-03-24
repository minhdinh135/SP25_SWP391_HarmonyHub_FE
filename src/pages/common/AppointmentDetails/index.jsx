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
  User,
  UserCheck,
  Package,
  ChevronLeft,
  CreditCard,
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
  updateAppointmentStatus,
} from "@/api/appointmentApi";
import { AppointmentStatus } from "@/constants/status";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import api from "@/api/apiConfig";
import { getTherapistDetails } from "@/api/accountApi";
import { createVnPayPaymentUrl } from "@/api/vnpayApi";
import useAuth from "@/hooks/useAuth";
import { formatDate, formatTime } from "@/utils/dateUtils";
import { convertToVND } from "@/utils/currencyUtils";
import UpdateFeedbackDialog from "./components/UpdateFeedbackDialog";
import UpdateTherapistNoteDialog from "./components/UpdateTherapistNoteDialog";
import FeedbackSection from "./components/FeedbackSection";
import NoteSection from "./components/NoteSection";

const AppointmentDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackContent, setFeedbackContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [therapistNoteOpen, setTherapistNoteOpen] = useState(false);
  const [therapistNoteContent, setTherapistNoteContent] = useState("");
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isUpdatingMeetUrl, setIsUpdatingMeetUrl] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getAppointmentDetails(id);
      setAppointmentDetails(data);

      // Fetch therapist data to get accurate package prices
      if (data?.therapistId) {
        await fetchTherapistData(data.therapistId, data.packageName);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTherapistData = async (therapistId, packageName) => {
    try {
      const data = await getTherapistDetails(therapistId);

      const matchedPackage = data.packages.find(
        (pkg) => pkg.name === packageName,
      );

      if (matchedPackage) {
        setCurrentPackage(matchedPackage);
      }
    } catch (error) {
      console.error("Error fetching therapist data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const openFeedbackDialog = (edit = false) => {
    if (edit && appointmentDetails?.feedbackRating) {
      setRating(appointmentDetails.feedbackRating);
      setFeedbackContent(appointmentDetails.feedbackContent || "");
    } else {
      setRating(0);
      setFeedbackContent("");
    }
    setFeedbackOpen(true);
  };

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

  const handlePayment = async () => {
    try {
      setIsProcessingPayment(true);

      // Use the price from the therapist API if available, otherwise fallback to packagePrice
      const packagePrice = currentPackage?.price || "0";
      const amountInVND = convertToVND(packagePrice);

      const payload = {
        amount: amountInVND,
        orderInfo: "purchase appointment",
        senderId: appointmentDetails?.memberId,
        receiverId: appointmentDetails?.therapistId,
        appointmentId: appointmentDetails?.id,
      };

      const data = await createVnPayPaymentUrl(payload);
      // Open the payment URL in a new tab
      window.open(data, "_blank");
      setPaymentDialogOpen(false);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  if (isLoading) return <Spinner />;

  // Function to join Google Meet session
  const joinMeeting = async () => {
    if (!appointmentDetails) {
      toast.error("Appointment details not available");
      return;
    }

    try {
      // Check if the meetUrl is valid and has proper format
      let meetUrl = appointmentDetails.meetUrl;

      // If the URL is just "string" or very basic placeholder, create a new Google Meet session
      if (
        !meetUrl ||
        meetUrl === "string" ||
        meetUrl === "https://string/" ||
        meetUrl.length < 10
      ) {
        console.log(
          "Invalid meeting URL detected, creating a new Google Meet session",
        );

        // For members, show a message instructing them to wait and force refresh
        if (user.role === 1) {
          toast.info("Checking for meeting room updates", {
            description: "We're checking with the server for updates...",
            id: "checking-meeting",
          });

          // Force refresh the data
          await fetchData();

          // Check again after refresh
          if (
            !appointmentDetails?.meetUrl ||
            appointmentDetails.meetUrl === "string" ||
            appointmentDetails.meetUrl === "https://string/" ||
            appointmentDetails.meetUrl.length < 10
          ) {
            toast.info("Waiting for therapist to set up meeting", {
              description:
                "The therapist hasn't set up the meeting room yet. We'll notify you when it's ready.",
              duration: 5000,
              id: "waiting-for-meeting",
            });
          } else {
            // Found a valid URL after refresh!
            meetUrl = appointmentDetails.meetUrl;
            toast.success("Meeting room found!", {
              description: "Joining the meeting room now...",
              id: "meeting-found",
            });

            // Format and open the URL
            if (
              !meetUrl.startsWith("http://") &&
              !meetUrl.startsWith("https://")
            ) {
              meetUrl = "https://" + meetUrl;
            }
            window.open(meetUrl, "_blank", "noopener,noreferrer");
            return;
          }

          return;
        }

        // For therapists: Create a new Google Meet meeting and auto-update the URL
        if (user.role === 2) {
          // Launch Google Meet in a new window and store the reference to access it later
          const meetWindow = window.open(
            "https://meet.google.com/new",
            "_blank",
            "noopener",
          );

          // Inform the user
          toast.info("Creating new Google Meet session", {
            description: "New meeting room is being created. Please wait...",
          });

          // Show a prompt to get the URL after a short delay (to give the user time to get to Google Meet)
          setTimeout(() => {
            toast.info("Action required", {
              description:
                "Please copy your Google Meet URL and click 'Update Meeting URL' to share with your client.",
              duration: 8000,
            });

            // Auto-trigger the update dialog
            setTimeout(() => {
              updateMeetingUrl();
            }, 500);
          }, 3000);

          return;
        }
      }

      // Ensure the URL has a protocol
      if (!meetUrl.startsWith("http://") && !meetUrl.startsWith("https://")) {
        meetUrl = "https://" + meetUrl;
      }

      // If it's a Google Meet link but not properly formatted
      if (
        meetUrl.includes("meet.google.com") &&
        !meetUrl.startsWith("https://meet.google.com")
      ) {
        // Extract the meeting code if present in various formats
        const meetCodeMatch = meetUrl.match(
          /(?:meet\.google\.com\/)?([a-z0-9\-]+)(?:\?.*)?$/i,
        );
        if (meetCodeMatch && meetCodeMatch[1]) {
          meetUrl = `https://meet.google.com/${meetCodeMatch[1]}`;
        } else {
          meetUrl =
            "https://meet.google.com/" +
            meetUrl.replace(/.*meet\.google\.com\/?/i, "");
        }
      }

      console.log("Opening meeting URL:", meetUrl);

      // Open Google Meet in a new tab with properly formatted URL
      window.open(meetUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Error opening meeting link:", error);
      toast.error(
        "Failed to open meeting link. Creating a new Google Meet session instead.",
      );
      window.open(
        "https://meet.google.com/new",
        "_blank",
        "noopener,noreferrer",
      );
    }
  };

  // Function for therapists to update the meeting URL
  const updateMeetingUrl = async () => {
    // Try to get the URL from clipboard first
    let clipboardUrl = "";
    try {
      clipboardUrl = await navigator.clipboard.readText();
      // Check if clipboard contains a Google Meet URL
      if (clipboardUrl && clipboardUrl.includes("meet.google.com")) {
        console.log("Found Google Meet URL in clipboard:", clipboardUrl);
      } else {
        clipboardUrl = ""; // Reset if not a Google Meet URL
      }
    } catch (error) {
      console.log("Couldn't access clipboard:", error);
    }

    // Show prompt dialog to get the meeting URL with clipboard value pre-filled
    const meetingUrl = prompt(
      "Please enter the Google Meet URL for this session:",
      clipboardUrl,
    );

    if (!meetingUrl) {
      return; // User cancelled
    }

    // Basic validation
    if (!meetingUrl.includes("meet.google.com")) {
      toast.error("Please enter a valid Google Meet URL");
      return;
    }

    try {
      setIsUpdatingMeetUrl(true);

      // Format the URL properly
      let formattedUrl = meetingUrl;
      if (
        !formattedUrl.startsWith("http://") &&
        !formattedUrl.startsWith("https://")
      ) {
        formattedUrl = "https://" + formattedUrl;
      }

      // Extract the meeting code if present in various formats
      if (
        formattedUrl.includes("meet.google.com") &&
        !formattedUrl.startsWith("https://meet.google.com")
      ) {
        const meetCodeMatch = formattedUrl.match(
          /(?:meet\.google\.com\/)?([a-z0-9\-]+)(?:\?.*)?$/i,
        );
        if (meetCodeMatch && meetCodeMatch[1]) {
          formattedUrl = `https://meet.google.com/${meetCodeMatch[1]}`;
        }
      }

      console.log("Updating meeting URL to:", formattedUrl);

      try {
        // Try the direct meetUrl endpoint
        console.log("Attempting to update via /meet-url endpoint...");
        await api.put(`/appointments/${id}/meet-url`, {
          meetUrl: formattedUrl,
        });
        console.log("Update successful via /meet-url endpoint");
      } catch (directUpdateError) {
        console.error("First update method failed:", directUpdateError);

        // Fallback: Use updateAppointmentStatus as an alternative approach
        console.log("Attempting to update via updateAppointmentStatus...");
        const status = appointmentDetails.status;
        await updateAppointmentStatus(id, {
          status: status, // Keep existing status
          meetUrl: formattedUrl,
        });
        console.log("Update successful via updateAppointmentStatus");
      }

      // Update local state
      setAppointmentDetails({
        ...appointmentDetails,
        meetUrl: formattedUrl,
      });

      toast.success("Meeting URL updated successfully", {
        description: "The client will now be able to join your meeting room.",
      });
    } catch (error) {
      console.error("Error updating meeting URL:", error);
      toast.error(
        "Failed to update meeting URL. Please try again or contact support.",
      );

      // Show detailed error info
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Status code:", error.response.status);
      }
    } finally {
      setIsUpdatingMeetUrl(false);
    }
  };

  // Direct Join button for members when therapist hasn't updated the URL
  const joinDirectly = () => {
    // Show dialog to get the meeting URL from the member
    const meetingUrl = prompt(
      "If your therapist has already sent you a Google Meet link, paste it here to join directly:",
    );

    if (!meetingUrl) {
      return; // User cancelled
    }

    // Basic validation
    if (!meetingUrl.includes("meet.google.com")) {
      toast.error("Please enter a valid Google Meet URL");
      return;
    }

    try {
      // Format the URL properly
      let formattedUrl = meetingUrl;
      if (
        !formattedUrl.startsWith("http://") &&
        !formattedUrl.startsWith("https://")
      ) {
        formattedUrl = "https://" + formattedUrl;
      }

      // Extract the meeting code
      if (
        formattedUrl.includes("meet.google.com") &&
        !formattedUrl.startsWith("https://meet.google.com")
      ) {
        const meetCodeMatch = formattedUrl.match(
          /(?:meet\.google\.com\/)?([a-z0-9\-]+)(?:\?.*)?$/i,
        );
        if (meetCodeMatch && meetCodeMatch[1]) {
          formattedUrl = `https://meet.google.com/${meetCodeMatch[1]}`;
        }
      }

      // Open Google Meet in a new tab
      window.open(formattedUrl, "_blank", "noopener,noreferrer");

      // Also update the meeting URL in the system for future use
      if (formattedUrl !== appointmentDetails?.meetUrl) {
        toast.info("Updating meeting URL in the system...");

        // Update in backend asynchronously (don't wait for it)
        api
          .put(`/appointments/${id}/meet-url`, { meetUrl: formattedUrl })
          .then(() => {
            // Update local state
            setAppointmentDetails({
              ...appointmentDetails,
              meetUrl: formattedUrl,
            });
            toast.success("Meeting URL saved for future sessions");
          })
          .catch((error) => {
            console.error("Failed to update meeting URL:", error);
          });
      }
    } catch (error) {
      console.error("Error joining direct meeting:", error);
      toast.error("Failed to join meeting. Please try again.");
    }
  };

  return (
    <div className="min-h-screen container mx-auto max-w-4xl py-8">
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="h-4 w-4" /> Back to Appointments
      </Button>

      {/* Add a refresh button for members */}
      {user.role === 1 &&
        appointmentDetails?.status === AppointmentStatus.Accepted && (
          <Button
            variant="outline"
            className="mb-6 ml-2"
            onClick={fetchData}
            disabled={isLoading}
          >
            {isLoading ? "Refreshing..." : "Check for Updates"}
          </Button>
        )}

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
            className={`${getAppointmentStatusColor(
              appointmentDetails?.status,
            )} px-3 py-1.5 text-base`}
          >
            {getAppointmentStatusText(appointmentDetails?.status)}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
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
                    {formatTime(appointmentDetails?.startTime)} -{" "}
                    {formatTime(appointmentDetails?.endTime)}
                  </p>
                </div>
              </div>
              {appointmentDetails?.status === AppointmentStatus.Accepted && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Video className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Meeting Link
                      </p>
                      <div className="flex flex-col gap-2">
                        {!appointmentDetails?.meetUrl ||
                        appointmentDetails.meetUrl === "string" ||
                        appointmentDetails.meetUrl === "https://string/" ? (
                          <div>
                            {user.role === 1 ? (
                              <div className="border border-amber-200 bg-amber-50 rounded-md p-3 mb-3">
                                <h4 className="text-sm font-medium text-amber-800 flex items-center">
                                  <Clock className="h-4 w-4 mr-1" /> Waiting for
                                  therapist
                                </h4>
                                <p className="text-xs text-amber-700 mt-1">
                                  Your therapist needs to update the meeting URL
                                  in the system. If they've already shared a
                                  link with you, you can join directly.
                                </p>
                                <div className="mt-2 flex justify-between items-center">
                                  <p className="text-xs text-amber-600">
                                    Last checked:{" "}
                                    {new Date().toLocaleTimeString()}
                                  </p>
                                  <div className="flex space-x-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="h-7 text-xs"
                                      onClick={fetchData}
                                      disabled={isLoading}
                                    >
                                      {isLoading ? "Checking..." : "Check Now"}
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="secondary"
                                      className="h-7 text-xs"
                                      onClick={joinDirectly}
                                    >
                                      Join Directly
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ) : null}

                            <Button
                              onClick={joinMeeting}
                              className="bg-green-600 hover:bg-green-700 text-white w-full flex items-center gap-2 justify-center mb-2"
                            >
                              <Video className="h-4 w-4" />
                              {user.role === 2
                                ? isSessionActive
                                  ? "Join Active Session"
                                  : "Create Meeting Room"
                                : "Check Meeting Status"}
                            </Button>

                            {user.role === 2 && (
                              <div className="mt-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full"
                                  onClick={updateMeetingUrl}
                                  disabled={isUpdatingMeetUrl}
                                >
                                  {isUpdatingMeetUrl
                                    ? "Updating..."
                                    : "Update Meeting URL for Client"}
                                </Button>
                                <p className="text-xs text-amber-600 mt-1">
                                  As a therapist, you must update the meeting
                                  URL so your client can join the same session.
                                </p>
                              </div>
                            )}

                            {user.role === 1 && (
                              <div>
                                <p className="text-xs text-gray-500 mt-1">
                                  Has your therapist already shared a meeting
                                  link with you? Use the "Join Directly" button
                                  above.
                                </p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2">
                            {user.role === 1 && (
                              <div className="border border-green-200 bg-green-50 rounded-md p-3 mb-3">
                                <h4 className="text-sm font-medium text-green-800 flex items-center">
                                  <Video className="h-4 w-4 mr-1" /> Meeting
                                  room is ready
                                </h4>
                                <p className="text-xs text-green-700 mt-1">
                                  Your therapist has created the meeting room.
                                  You can now join the virtual session.
                                </p>
                              </div>
                            )}

                            <Button
                              onClick={joinMeeting}
                              className={`${isSessionActive ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} text-white w-full flex items-center gap-2 justify-center`}
                            >
                              <Video className="h-4 w-4" />
                              {isSessionActive
                                ? "Join Active Session Now"
                                : "Join Meeting Room"}
                            </Button>

                            <div className="text-xs text-gray-500 mt-1">
                              <p>Meeting URL: {appointmentDetails.meetUrl}</p>
                              <p>
                                This is the shared meeting room for your
                                appointment.
                              </p>
                            </div>

                            {user.role === 2 && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={updateMeetingUrl}
                                disabled={isUpdatingMeetUrl}
                              >
                                {isUpdatingMeetUrl
                                  ? "Updating..."
                                  : "Change Meeting URL"}
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Package</p>
                  <p>{appointmentDetails?.packageName}</p>
                  {currentPackage?.price && (
                    <p className="text-sm font-medium text-blue-600">
                      {currentPackage?.price || "Price not available"}
                      {currentPackage?.minutesPerAppointment && (
                        <span className="text-gray-500 ml-2">
                          ({currentPackage.minutesPerAppointment} min)
                        </span>
                      )}
                    </p>
                  )}
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

          <NoteSection
            appointmentDetails={appointmentDetails}
            openTherapistNoteDialog={openTherapistNoteDialog}
          />

          {appointmentDetails?.feedbackRating && (
            <FeedbackSection
              appointmentDetails={appointmentDetails}
              openFeedbackDialog={openFeedbackDialog}
            />
          )}
        </CardContent>
        <CardFooter className="border-t pt-6 flex flex-wrap gap-3 justify-center">
          {appointmentDetails?.status === AppointmentStatus.Pending && (
            <Button
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              onClick={() => setPaymentDialogOpen(true)}
            >
              <CreditCard className="h-4 w-4" />
              Pay for Appointment
            </Button>
          )}

          {appointmentDetails?.status === AppointmentStatus.Accepted &&
            isSessionActive && (
              <Button
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                onClick={joinMeeting}
              >
                <Video className="h-4 w-4" />
                {appointmentDetails?.meetUrl &&
                appointmentDetails.meetUrl !== "string" &&
                appointmentDetails.meetUrl !== "https://string/"
                  ? "Join Existing Session"
                  : "Create/Join Meeting Room"}
              </Button>
            )}

          {appointmentDetails?.status === AppointmentStatus.Completed &&
            !appointmentDetails.feedbackRating && (
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setFeedbackOpen(true)}
              >
                Provide Feedback
              </Button>
            )}
        </CardFooter>
      </Card>

      {/* Payment Confirmation Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Payment</DialogTitle>
            <DialogDescription>
              You're about to pay for your appointment with{" "}
              {appointmentDetails?.therapistFullName}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="border rounded-md p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Appointment ID:</span>
                <span className="font-medium">{appointmentDetails?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Package:</span>
                <span className="font-medium">
                  {appointmentDetails?.packageName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Duration:</span>
                <span className="font-medium">
                  {currentPackage?.minutesPerAppointment || "N/A"} minutes
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Price (USD):</span>
                <span className="font-medium">
                  ${currentPackage?.price || "N/A"}
                </span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Price (VND):</span>
                <span className="font-medium">
                  {convertToVND(
                    currentPackage?.price ||
                      appointmentDetails?.packagePrice?.replace("$", ""),
                  ).toLocaleString()}{" "}
                  VND
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              You will be redirected to VNPay payment gateway to complete your
              transaction.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPaymentDialogOpen(false)}
              disabled={isProcessingPayment}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              className="bg-green-600 hover:bg-green-700"
              disabled={isProcessingPayment}
            >
              {isProcessingPayment ? "Processing..." : "Proceed to Payment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Feedback Dialog */}
      <UpdateFeedbackDialog
        appointmentDetails={appointmentDetails}
        feedbackOpen={feedbackOpen}
        setFeedbackOpen={setFeedbackOpen}
        rating={rating}
        setRating={setRating}
        feedbackContent={feedbackContent}
        setFeedbackContent={setFeedbackContent}
        handleFeedbackSubmit={handleFeedbackSubmit}
        isSubmitting={isSubmitting}
      />

      {/* Therapist Note Dialog */}
      <UpdateTherapistNoteDialog
        appointmentDetails={appointmentDetails}
        therapistNoteContent={therapistNoteContent}
        setTherapistNoteContent={setTherapistNoteContent}
        therapistNoteOpen={therapistNoteOpen}
        setTherapistNoteOpen={setTherapistNoteOpen}
        handleTherapistNoteSubmit={handleTherapistNoteSubmit}
        isSubmittingNote={isSubmittingNote}
      />
    </div>
  );
};

export default AppointmentDetails;
