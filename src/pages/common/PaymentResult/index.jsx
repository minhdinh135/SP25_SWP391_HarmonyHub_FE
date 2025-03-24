import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  CreditCard,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ArrowRight,
} from "lucide-react";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";
import axios from "axios";
import { getAppointmentDetails } from "@/api/appointmentApi";

const PaymentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Parse URL parameters
        const queryParams = new URLSearchParams(location.search);
        const result = queryParams.get("result");
        const orderId = queryParams.get("orderId");
        const amount = queryParams.get("amount");
        const orderInfo = queryParams.get("orderInfo");
        const payDate = queryParams.get("payDate");

        // Set payment data from URL parameters
        const paymentInfo = {
          success: result === "1",
          orderId,
          amount: parseFloat(amount / 100),
          orderInfo,
          payDate,
        };

        setPaymentData(paymentInfo);

        // If payment was successful and it's for an appointment, update the appointment status
        if (paymentInfo.success && orderInfo === "purchase appointment") {
          // TODO:: Recheck this code section
          // Extract the appointmentId from the payment record on your backend
          // This is an example implementation - you'll need to adjust according to your API
          const response = await axios.get(
            `https://harmony-backend-tlgv.onrender.com/api/payments/vnpay/${orderId}`,
          );

          if (response.data && response.data.statusCode === 200) {
            const paymentRecord = response.data.data;
            const appointmentId = paymentRecord.appointmentId;

            // Fetch appointment details if available
            if (appointmentId) {
              const data = await getAppointmentDetails(appointmentId);
              setAppointmentDetails(data);
            }
          }
        }
      } catch (error) {
        console.error("Error processing payment result:", error);
        toast.error(
          "Failed to process payment result. Please contact support.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location.search]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    // If it's in the format YYYYMMDDHHMMSS (like from VNPay)
    if (dateString.length === 14) {
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6, 8);
      const hour = dateString.substring(8, 10);
      const minute = dateString.substring(10, 12);
      const second = dateString.substring(12, 14);

      const date = new Date(
        `${year}-${month}-${day}T${hour}:${minute}:${second}`,
      );

      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    }

    // If it's already in ISO format
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "N/A";
    // Format as VND
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Convert VND to USD (approximately 24,000 VND = 1 USD)
  const convertToUSD = (vndAmount) => {
    if (!vndAmount && vndAmount !== 0) return "N/A";
    const usdAmount = vndAmount / 24000;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(usdAmount);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen container mx-auto max-w-4xl py-8">
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2"
        onClick={() => navigate("/member/appointments")}
      >
        <ChevronLeft className="h-4 w-4" /> Back to Appointments
      </Button>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Payment Reference: {paymentData?.orderId}
            </p>
            <CardTitle className="text-2xl font-bold">
              Payment {paymentData?.success ? "Successful" : "Failed"}
            </CardTitle>
          </div>
          <Badge
            className={`${
              paymentData?.success
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            } px-3 py-1.5 text-base`}
          >
            {paymentData?.success ? "SUCCESSFUL" : "FAILED"}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="rounded-lg bg-slate-50 p-6">
            <div className="flex items-center mb-4">
              {paymentData?.success ? (
                <CheckCircle className="h-12 w-12 text-green-500 mr-4" />
              ) : (
                <XCircle className="h-12 w-12 text-red-500 mr-4" />
              )}
              <div>
                <h3 className="text-lg font-semibold">
                  {paymentData?.success
                    ? "Your payment was successful!"
                    : "Your payment could not be processed"}
                </h3>
                <p className="text-slate-600">
                  {paymentData?.success
                    ? "Thank you for your payment. Your appointment has been confirmed."
                    : "There was an issue processing your payment. Please try again or contact support."}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Payment Details</h3>

              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p>{formatCurrency(paymentData?.amount)}</p>
                  <p className="text-sm text-muted-foreground">
                    ({convertToUSD(paymentData?.amount)})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Payment Date</p>
                  <p>{formatDate(paymentData?.payDate)}</p>
                </div>
              </div>
            </div>

            {appointmentDetails && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Appointment Details</h3>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Session Date
                    </p>
                    <p>{formatDate(appointmentDetails?.startTime)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Package</p>
                    <p>{appointmentDetails?.packageName}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Separator />

          <div>
            <p className="text-muted-foreground text-sm">
              {paymentData?.success
                ? "Your receipt has been emailed to your registered email address."
                : "If you continue to experience issues, please contact our support team."}
            </p>
          </div>
        </CardContent>

        <CardFooter className="border-t pt-6 flex flex-wrap gap-3 justify-center">
          {paymentData?.success ? (
            <Button
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              onClick={() => navigate(`/member/transactions/`)}
            >
              View Appointment Details
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate("/member/appointments")}
            >
              Return to Appointments
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentResult;
