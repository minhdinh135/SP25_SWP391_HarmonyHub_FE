import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAuth from "@/hooks/useAuth";
import { formatCurrencyInVND } from "@/utils/currencyFormat";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { getAllTransactions } from "@/api/transactionApi";
import { getTransactionStatusText } from "@/utils/enumUtils";
import { getTransactionStatusColor } from "@/utils/colorUtils";
import { formatDate } from "@/utils/dateUtils";

const TransactionManagement = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const data = await getAllTransactions();

        const formattedTransactions = data.map((transaction) => ({
          id: transaction.transactionId, // Using transactionId as the unique id
          transactionId: transaction.transactionId,
          amount: transaction.amount,
          paymentMethod: getPaymentMethodName(transaction.paymentMethod),
          description: transaction.description,
          senderId: transaction.senderId,
          receiverId: transaction.receiverId,
          status: getTransactionStatusText(transaction.status),
          date: new Date().toLocaleDateString(), // Using current date as API doesn't provide date
          type: determineTransactionType(transaction, user.accountId),
          senderFullName: transaction.senderFullName,
          receiverFullName: transaction.receiverFullName,
          appointmentReference: transaction.appointmentId
            ? `Appointment #${transaction.appointmentId}`
            : null,
        }));

        const filterdTransactions = formattedTransactions
          .filter(
            (item) =>
              item.senderId === user.accountId ||
              item.receiverId === user.accountId,
          )
          .sort((a, b) => new Date(b) - new Date(a));
        console.log(filterdTransactions);

        setTransactions(filterdTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [user.accountId]);

  // Helper function to determine if transaction is credit or debit
  const determineTransactionType = (transaction, currentUserId) => {
    // If the current user is the receiver, it's a credit (incoming)
    // If the current user is the sender, it's a debit (outgoing)
    return transaction.receiverId === currentUserId ? "credit" : "debit";
  };

  // Convert payment method code to name
  const getPaymentMethodName = (methodCode) => {
    const methods = {
      1: "Bank Transfer",
      2: "Credit Card",
      3: "E-Wallet",
      // Add more as needed
    };
    return methods[methodCode] || "Unknown";
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="w-full mx-auto p-4 space-y-6">
      {/* Transactions Card */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"></TableHead> {/* For Icon */}
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Receiver</TableHead>
                  <TableHead>Appointment</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {transaction.type === "credit" ? (
                          <ArrowUpRight className="h-5 w-5 text-green-500" />
                        ) : (
                          <ArrowDownRight className="h-5 w-5 text-red-500" />
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        {transaction.transactionId}
                      </TableCell>

                      {/* Description */}
                      <TableCell className="font-medium">
                        {transaction.description}
                      </TableCell>

                      {/* Date */}
                      <TableCell className="text-gray-500">
                        {formatDate(transaction.date)}
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <Badge
                          className={getTransactionStatusColor(
                            transaction.status,
                          )}
                        >
                          {transaction.status}
                        </Badge>
                      </TableCell>

                      {/* Payment Method */}
                      <TableCell className="text-gray-500">
                        {transaction.paymentMethod}
                      </TableCell>

                      {/* Sender Full Name */}
                      <TableCell className="text-gray-500">
                        {transaction.senderFullName || "N/A"}
                      </TableCell>

                      {/* Receiver Full Name */}
                      <TableCell className="text-gray-500">
                        {transaction.receiverFullName || "N/A"}
                      </TableCell>

                      {/* Associated Appointment Reference */}
                      <TableCell className="text-gray-500">
                        {transaction.appointmentReference || "N/A"}
                      </TableCell>

                      {/* Amount */}
                      <TableCell className="text-right font-semibold">
                        <span
                          className={
                            transaction.type === "credit"
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {transaction.type === "credit" ? "+" : "-"}$
                          {transaction.amount}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-6">
                      No transactions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionManagement;
