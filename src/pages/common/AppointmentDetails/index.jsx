import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Video, MessageSquare, Star, User, UserCheck, Package, ChevronLeft, Pencil, Plus, CreditCard } from "lucide-react";
import { getAppointmentStatusText } from "@/utils/enumUtils";
import { getAppointmentStatusColor } from "@/utils/colorUtils";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";
import { getAppointmentDetails, updateAppointmentFeedback, updateAppointmentNote } from "@/api/appointmentApi";
import { AppointmentStatus } from "@/constants/status";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [therapistPackages, setTherapistPackages] = useState([]);
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
      const response = await axios.get(
        `https://harmony-backend-tlgv.onrender.com/api/therapists/${therapistId}`
      );

      if (response.data && response.data.statusCode === 200) {
        const therapistData = response.data.data;
        setTherapistPackages(therapistData.packages || []);

        // Find the matching package by name
        const matchedPackage = therapistData.packages.find(
          pkg => pkg.name === packageName
        );

        if (matchedPackage) {
          setCurrentPackage(matchedPackage);
        }
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

  // Convert USD to VND (1 USD = approximately 24,000 VND)
  const convertToVND = (usdPrice) => {
    if (!usdPrice && usdPrice !== 0) return 0;
    // If price is already a number, use it directly
    const usdAmount = typeof usdPrice === 'number'
      ? usdPrice
      : parseFloat(usdPrice.toString().replace(/[^0-9.]/g, ''));
    return Math.round(usdAmount * 24000);
  };

  const handlePayment = async () => {
    try {
      setIsProcessingPayment(true);

      // Use the price from the therapist API if available, otherwise fallback to packagePrice
      const packagePrice = currentPackage?.price || appointmentDetails?.packagePrice || "0";
      const amountInVND = convertToVND(packagePrice);

      const payload = {
        amount: amountInVND,
        orderInfo: "purchase appointment",
        senderId: appointmentDetails?.memberId,
        receiverId: appointmentDetails?.therapistId,
        appointmentId: appointmentDetails?.id
      };

      const response = await axios.post(
        "https://harmony-backend-tlgv.onrender.com/api/vnpay/pay",
        payload
      );

      if (response.data && response.data.statusCode === 200) {
        // Open the payment URL in a new tab
        window.open(response.data.data, "_blank");
        setPaymentDialogOpen(false);
      } else {
        toast.error("Failed to initiate payment");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("Payment processing failed. Please try again.");
    } finally {
      setIsProcessingPayment(false);
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
              className={`h-8 w-8 ${star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                } hover:text-yellow-400 transition-colors`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (isLoading) return <Spinner />;

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get the formatted price display for UI
  const getFormattedPrice = () => {
    if (currentPackage?.price) {
      return `$${currentPackage.price}`;
    }
    return appointmentDetails?.packagePrice || 'Price not available';
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
              appointmentDetails?.status
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
                    {new Date(appointmentDetails?.startTime).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}{" "}
                    -{" "}
                    {new Date(appointmentDetails?.endTime).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }
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
                  {(currentPackage?.price || appointmentDetails?.packagePrice) && (
                    <p className="text-sm font-medium text-blue-600">
                      {getFormattedPrice()}
                      {currentPackage?.minutesPerAppointment && (
                        <span className="text-gray-500 ml-2">({currentPackage.minutesPerAppointment} min)</span>
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
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Notes</h3>
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
              You're about to pay for your appointment with {appointmentDetails?.therapistFullName}.
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
                <span className="font-medium">{appointmentDetails?.packageName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Duration:</span>
                <span className="font-medium">
                  {currentPackage?.minutesPerAppointment || "N/A"} minutes
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Price (USD):</span>
                <span className="font-medium">${currentPackage?.price || appointmentDetails?.packagePrice?.replace('$', '') || "N/A"}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Price (VND):</span>
                <span className="font-medium">
                  {convertToVND(currentPackage?.price || appointmentDetails?.packagePrice?.replace('$', '')).toLocaleString()} VND
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              You will be redirected to VNPay payment gateway to complete your transaction.
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
