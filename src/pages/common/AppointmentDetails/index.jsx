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
  User,
  Package,
  ChevronLeft,
  CreditCard,
  Video,
  Edit,
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
} from "@/api/appointmentApi";
import { AppointmentStatus } from "@/constants/status";
import { getTherapistDetails } from "@/api/accountApi";
import { createVnPayPaymentUrl } from "@/api/vnpayApi";
import { formatDate, formatTime } from "@/utils/dateUtils";
import { convertToVND } from "@/utils/currencyUtils";
import UpdateFeedbackDialog from "./components/UpdateFeedbackDialog";
import UpdateTherapistNoteDialog from "./components/UpdateTherapistNoteDialog";
import FeedbackSection from "./components/FeedbackSection";
import NoteSection from "./components/NoteSection";
import PaymentConfirmationDialog from "./components/PaymentConfirmationDialog";
import UpdateMeetUrlDialog from "./components/UpdateMeetUrlDialog";
import useAuth from "@/hooks/useAuth";
import DashboardLayout from "@/layouts/DashboardLayout";

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

  const isMember = getRoleText(user.role) === "Member";
  const isTherapist = getRoleText(user.role) === "Therapist";

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getAppointmentDetails(id);
      setAppointmentDetails(data);

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
                Marital Counseling Session{" "}
                {isMember
                  ? appointmentDetails?.therapistFullName
                  : appointmentDetails?.memberFullName}
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
                <div className="flex items-center gap-3">
                  <Video className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Meeting Link
                    </p>
                    {appointmentDetails?.meetUrl ? (
                      <>
                        <Button
                          variant="link"
                          className="p-0 text-blue-600 h-auto"
                          onClick={openGoogleMeetLink}
                        >
                          Join Meeting Session
                        </Button>
                        {isTherapist &&
                          (appointmentDetails?.status ===
                            AppointmentStatus.Accepted ||
                            AppointmentStatus.Booked) && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={openMeetUrlDialog}
                            >
                              <Edit className="h-4 w-4 text-gray-500" />
                            </Button>
                          )}
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        className="ml-2"
                        onClick={openMeetUrlDialog}
                      >
                        Add Meeting URL
                      </Button>
                    )}{" "}
                  </div>
                </div>

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
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">People</h3>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {isMember ? "Therapist" : "Member"}
                    </p>
                    <p>
                      {isMember
                        ? appointmentDetails?.therapistFullName
                        : appointmentDetails?.memberFullName}
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

          {isMember && (
            <div className="my-3 border-t pt-6 flex flex-wrap gap-3 justify-center">
              {appointmentDetails?.status === AppointmentStatus.Accepted && (
                <Button
                  className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                  onClick={() => setPaymentDialogOpen(true)}
                >
                  <CreditCard className="h-4 w-4" />
                  Pay for Appointment
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
            </div>
          )}
          {/* <CardFooter className="border-t pt-6 flex flex-wrap gap-3 justify-center"> */}
          {/*   {appointmentDetails?.status === AppointmentStatus.Accepted && ( */}
          {/*     <Button */}
          {/*       className="bg-green-600 hover:bg-green-700 flex items-center gap-2" */}
          {/*       onClick={() => setPaymentDialogOpen(true)} */}
          {/*     > */}
          {/*       <CreditCard className="h-4 w-4" /> */}
          {/*       Pay for Appointment */}
          {/*     </Button> */}
          {/*   )} */}
          {/**/}
          {/*   {appointmentDetails?.status === AppointmentStatus.Completed && */}
          {/*     !appointmentDetails.feedbackRating && ( */}
          {/*       <Button */}
          {/*         className="bg-blue-600 hover:bg-blue-700" */}
          {/*         onClick={() => setFeedbackOpen(true)} */}
          {/*       > */}
          {/*         Provide Feedback */}
          {/*       </Button> */}
          {/*     )} */}
          {/* </CardFooter> */}
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
