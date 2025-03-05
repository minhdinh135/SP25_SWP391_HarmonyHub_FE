import { getMemberDetails, getTherapistDetails } from "@/api/accountApi";
import Spinner from "@/components/Spinner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { ArrowDownRight, ArrowUpRight, DollarSign } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";

const TransactionManagement = ({ role = "member", transactions }) => {
  const { user } = useAuth();
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data =
          role === "member"
            ? await getMemberDetails(user.accountId)
            : await getTherapistDetails(user.accountId);
        setDetails(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  });

  const getStatusColor = (status) => {
    return status === "completed" ? "bg-green-500" : "bg-yellow-500";
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Balance Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Account Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-8 w-8 text-green-500" />
            <span className="text-3xl font-bold">
              {formatCurrencyInVND(details?.balance)} VND
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
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
                  <TableHead>Appointment</TableHead>
                  <TableHead className="text-right">Amount</TableHead>{" "}
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
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
                      {transaction.date}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge className={getStatusColor(transaction.status)}>
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
                        {transaction.type === "credit" ? "+" : "-"}
                        {formatCurrencyInVND(transaction.amount)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>{" "}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionManagement;
