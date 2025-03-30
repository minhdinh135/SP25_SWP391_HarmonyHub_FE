import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { convertToVND } from "@/utils/currencyUtils";

const PaymentConfirmationDialog = ({
  appointmentDetails,
  currentPackage,
  paymentDialogOpen,
  setPaymentDialogOpen,
  isProcessingPayment,
  handlePayment,
}) => {
  return (
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
                {convertToVND(currentPackage?.price).toLocaleString()} VND
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
  );
};

export default PaymentConfirmationDialog;
