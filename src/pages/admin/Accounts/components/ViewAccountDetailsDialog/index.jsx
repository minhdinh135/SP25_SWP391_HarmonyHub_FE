import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AccountStatus } from "@/constants/status";
import { getAccountStatusColor } from "@/utils/colorUtils";
import { formatDateTime } from "@/utils/dateUtils";
import { getAccountStatusText, getRoleText } from "@/utils/enumUtils";
import { getFullName } from "@/utils/nameFormat";
import { CheckCircle, XCircle } from "lucide-react";

const ViewAccountDetailsDialog = ({
  isOpen,
  onClose,
  account,
  onApprove,
  onDisapprove,
}) => {
  if (!account) return null;

  const isPending = account.status === AccountStatus.Pending;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Account Details</DialogTitle>
          <DialogDescription>
            View detailed information for this account.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {/* Status Badge */}
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">Status:</span>
            <Badge className={getAccountStatusColor(account.status)}>
              {getAccountStatusText(account.status)}
            </Badge>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
              <p className="text-sm font-medium">
                {getFullName(account.firstName, account.lastName)}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Role</h4>
              <p className="text-sm font-medium">{getRoleText(account.role)}</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-500">
              Contact Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-sm font-medium">{account.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-sm font-medium">
                  {account.phone || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info (if available) */}
          {account.address && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Address</h4>
              <p className="text-sm">{account.address}</p>
            </div>
          )}

          {/* Account Timestamps */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <p className="text-xs text-gray-500">Created On</p>
              <p className="text-sm">
                {formatDateTime(account.createdAt) || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Last Updated</p>
              <p className="text-sm">
                {formatDateTime(account.updatedAt) || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          {isPending && (
            <>
              <Button
                variant="outline"
                className="border-amber-600 text-amber-600 hover:bg-amber-50"
                onClick={() => onDisapprove(account.id)}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Disapprove
              </Button>
              <Button
                className="bg-green-600 text-white hover:bg-green-700"
                onClick={() => onApprove(account.id)}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </>
          )}
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewAccountDetailsDialog;
