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
  Package,
  ChevronLeft,
  CreditCard,
  Video,
  Edit,
  CheckCircle,
} from "lucide-react";
import { getAppointmentStatusText, getRoleText } from "@/utils/enumUtils";
import { getAppointmentStatusColor } from "@/utils/colorUtils";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";
import {
  getAppointmentDetails,
  updateAppointmentFeedback,
  updateAppointmentMeetUrl,
  updateAppointmentNote,
  updateAppointmentStatus,
} from "@/api/appointmentApi";
import { AppointmentStatus, TransactionStatus } from "@/constants/status";
import { getAccountById, getTherapistDetails } from "@/api/accountApi";
import { createVnPayPaymentUrl } from "@/api/vnpayApi";
import { formatDate, formatTime } from "@/utils/dateUtils";
import UpdateFeedbackDialog from "./components/UpdateFeedbackDialog";
import UpdateTherapistNoteDialog from "./components/UpdateTherapistNoteDialog";
import FeedbackSection from "./components/FeedbackSection";
import NoteSection from "./components/NoteSection";
import PaymentConfirmationDialog from "./components/PaymentConfirmationDialog";
import UpdateMeetUrlDialog from "./components/UpdateMeetUrlDialog";
import useAuth from "@/hooks/useAuth";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAllTransactions } from "@/api/transactionApi";

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
  const [meetUrlOpen, setMeetUrlOpen] = useState(false);
  const [meetUrlContent, setMeetUrlContent] = useState("");
  const [isSubmittingMeetUrl, setIsSubmittingMeetUrl] = useState(false);
  const [isMarkingCompleted, setIsMarkingCompleted] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  const isMember = getRoleText(user.role) === "Member";
  const isTherapist = getRoleText(user.role) === "Therapist";

  const userFullName = isMember
    ? appointmentDetails?.therapistFullName
    : appointmentDetails?.memberFullName;
  const userRole = isMember ? "Therapist" : "Member";

  // Get initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const isAppointmentPast = () => {
    const appointmentEndTime = new Date(appointmentDetails?.endTime);
    const currentTime = new Date();
    return currentTime > appointmentEndTime;
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getAppointmentDetails(id);
      setAppointmentDetails(data);

      if (data?.therapistId) {
        await fetchTherapistData(data.therapistId, data.packageName);
      }

      await fetchAppointmentTransactionData();

      // Fetch avatar data
      const userId = isMember ? data.therapistId : data.memberId;
      const accountData = await getAccountById(userId);
      setAvatarUrl(accountData.avatarUrl);
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAppointmentTransactionData = async () => {
    try {
      const data = await getAllTransactions();

      // Convert id to string for consistent comparison
      const appointmentIdString = String(id);

      const matchedTransaction = data.find(
        (item) =>
          String(item.appointmentId) === appointmentIdString &&
          item.status === TransactionStatus.Successful,
      );

      if (matchedTransaction) {
        setIsPaid(true);
      } else {
        setIsPaid(false); // Explicitly set to false if no match found
      }
    } catch (error) {
      console.error("Error fetching appointment transaction data:", error);
      // Consider showing a toast error here if payment verification is critical
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

  const openGoogleMeetLink = () => {
    if (appointmentDetails?.meetUrl) {
      window.open(appointmentDetails.meetUrl, "_blank", "noopener,noreferrer");
    } else {
      toast.error("Meeting link is not available");
    }
  };

  const openMeetUrlDialog = () => {
    setMeetUrlContent(appointmentDetails?.meetUrl || "");
    setMeetUrlOpen(true);
  };

  const handleMeetUrlSubmit = async () => {
    // Basic URL validation
    const urlPattern =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!meetUrlContent.trim()) {
      toast.error("Meeting URL cannot be empty");
      return;
    }

    if (!urlPattern.test(meetUrlContent)) {
      toast.error("Please enter a valid URL");
      return;
    }

    try {
      setIsSubmittingMeetUrl(true);
      const payload = {
        meetingUrl: meetUrlContent.trim(),
      };
      await updateAppointmentMeetUrl(id, payload);
      toast.success("Meeting URL updated successfully");
      setMeetUrlOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error updating meeting URL:", error);
      toast.error("Failed to update meeting URL. Please try again.");
    } finally {
      setIsSubmittingMeetUrl(false);
    }
  };

  const openFeedbackDialog = (edit = false) => {
    if (edit && appointmentDetails?.feedbackRating) {
      setRating(appointmentDetails?.feedbackRating);
      setFeedbackContent(appointmentDetails?.feedbackContent || "");
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

  const handleMarkAsCompleted = async () => {
    try {
      setIsLoading(true);
      setIsMarkingCompleted(true);
      const payload = {
        status: AppointmentStatus.Completed,
      };
      await updateAppointmentStatus(id, payload);
      toast.success("Appointment marked as completed");
      fetchData();
    } catch (error) {
      console.error("Error marking appointment as completed:", error);
      toast.error("Failed to mark appointment as completed. Please try again.");
    } finally {
      setIsMarkingCompleted(false);
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      setIsProcessingPayment(true);

      // Use the price from the therapist API if available, otherwise fallback to packagePrice
      const packagePrice = currentPackage?.price || "0";

      const payload = {
        amount: packagePrice,
        orderInfo: "Pay for appointment",
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

  return (
    <DashboardLayout role={getRoleText(user.role).toLowerCase()}>
      {" "}
      <div className="min-h-screen container mx-auto max-w-4xl py-8">
        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4" /> Back to Appointments
        </Button>

        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">
                Marital Counseling Session with {userRole}
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
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Left side - Avatar and name */}
              <div className="flex flex-col items-center sm:items-start sm:w-1/4">
                <Avatar className="h-20 w-20 mb-3">
                  <AvatarImage src={avatarUrl} alt={userFullName} />
                  <AvatarFallback className="bg-blue-100 text-blue-800">
                    {getInitials(userFullName)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                  <div className="font-medium text-lg">{userFullName}</div>
                  <div className="text-sm text-gray-500">{userRole}</div>
                </div>
              </div>

              {/* Right side - Appointment details */}
              <div className="sm:w-3/4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
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
                    <div className="flex items-center gap-3">
                      <Video className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Meeting Link
                        </p>
                        {appointmentDetails?.meetUrl ? (
                          <div className="flex items-center">
                            <Button
                              variant="link"
                              className="p-0 text-blue-600 h-auto"
                              onClick={openGoogleMeetLink}
                            >
                              Join Meeting Session
                            </Button>
                            {isTherapist &&
                              appointmentDetails?.status ===
                                AppointmentStatus.Accepted && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={openMeetUrlDialog}
                                >
                                  <Edit className="h-4 w-4 text-gray-500" />
                                </Button>
                              )}
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            disabled={!isTherapist}
                            className="mt-1"
                            onClick={openMeetUrlDialog}
                          >
                            Add Meeting URL
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Package</p>
                        <p>{appointmentDetails?.packageName}</p>
                        {currentPackage?.price && (
                          <p className="text-sm font-medium text-blue-600">
                            {"$" + currentPackage?.price || "N/A"}
                            {currentPackage?.minutesPerAppointment && (
                              <span className="text-blue-600 ml-2">
                                ({currentPackage.minutesPerAppointment} min)
                              </span>
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
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

          <CardFooter className="my-3 border-t pt-6 flex flex-wrap gap-3 justify-center">
            {isMember &&
              !isPaid &&
              appointmentDetails?.status === AppointmentStatus.Accepted && (
                <Button
                  className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                  onClick={() => setPaymentDialogOpen(true)}
                >
                  <CreditCard className="h-4 w-4" />
                  Pay for Appointment
                </Button>
              )}
            {isMember &&
              appointmentDetails?.status === AppointmentStatus.Completed &&
              !appointmentDetails?.feedbackRating && (
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => setFeedbackOpen(true)}
                >
                  Provide Feedback
                </Button>
              )}
            {isTherapist &&
              appointmentDetails?.therapistNote &&
              isAppointmentPast() &&
              appointmentDetails?.status !== AppointmentStatus.Completed && (
                <Button
                  className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                  onClick={handleMarkAsCompleted}
                  disabled={isMarkingCompleted}
                >
                  <CheckCircle className="h-4 w-4" />
                  {isMarkingCompleted ? "Updating..." : "Mark as Completed"}
                </Button>
              )}
          </CardFooter>
        </Card>

        <PaymentConfirmationDialog
          appointmentDetails={appointmentDetails}
          currentPackage={currentPackage}
          paymentDialogOpen={paymentDialogOpen}
          setPaymentDialogOpen={setPaymentDialogOpen}
          isProcessingPayment={isProcessingPayment}
          handlePayment={handlePayment}
        />

        <UpdateMeetUrlDialog
          meetUrlOpen={meetUrlOpen}
          setMeetUrlOpen={setMeetUrlOpen}
          meetUrlContent={meetUrlContent}
          setMeetUrlContent={setMeetUrlContent}
          handleMeetUrlSubmit={handleMeetUrlSubmit}
          isSubmittingMeetUrl={isSubmittingMeetUrl}
        />

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
    </DashboardLayout>
  );
};

export default AppointmentDetails;
