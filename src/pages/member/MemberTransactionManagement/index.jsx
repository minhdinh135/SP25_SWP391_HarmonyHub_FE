import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import DashboardLayout from "@/layouts/DashboardLayout";
import { formatCurrencyInVND } from "@/utils/currencyFormat";
import { ArrowDownRight, ArrowUpRight, DollarSign } from "lucide-react";
import { useState } from "react";

const MemberTransactionManagement = () => {
  const [balance, setBalance] = useState(5840);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "credit",
      amount: 1200,
      description: "Client Payment",
      date: "2025-02-20",
      status: "completed",
    },
    {
      id: 2,
      type: "debit",
      amount: 450,
      description: "Office Supplies",
      date: "2025-02-19",
      status: "completed",
    },
    {
      id: 3,
      type: "credit",
      amount: 3000,
      description: "Project Revenue",
      date: "2025-02-18",
      status: "pending",
    },
  ]);

  const getStatusColor = (status) => {
    return status === "completed" ? "bg-green-500" : "bg-yellow-500";
  };

  return (
    <DashboardLayout role="member">
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
                {formatCurrencyInVND(balance)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center space-x-4">
                      {transaction.type === "credit" ? (
                        <ArrowUpRight className="h-6 w-6 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-6 w-6 text-red-500" />
                      )}
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-500">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                      <span
                        className={`font-semibold ${
                          transaction.type === "credit"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {transaction.type === "credit" ? "+" : "-"}
                        {formatCurrencyInVND(transaction.amount)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MemberTransactionManagement;
