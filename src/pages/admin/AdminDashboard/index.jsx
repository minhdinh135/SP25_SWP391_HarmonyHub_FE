import { getAllAccounts } from "@/api/accountApi";
import { getAllReports } from "@/api/reportApi";
import { getAllTransactions } from "@/api/transactionApi";
import Spinner from "@/components/Spinner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getTransactionStatusColor } from "@/utils/colorUtils";
import { getTransactionStatusText } from "@/utils/enumUtils";
import { Users, FileText, BarChart4, Clock } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAccounts = async () => {
    try {
      setIsLoading(true);
      const accounts = await getAllAccounts();
      setAccounts(accounts);
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const transactions = await getAllTransactions();
      setTransactions(transactions);
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      const reports = await getAllReports();
      setReports(reports);
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
    fetchTransactions();
    fetchReports();
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black">Dashboard Overview</h1>
        {/* <span className="text-sm text-gray-500"> */}
        {/*   Last updated: Today at 10:45 AM */}
        {/* </span> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-500 text-sm font-medium flex items-center">
              <Users className="mr-2 h-4 w-4" />
              TOTAL USERS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <p className="text-3xl font-bold">{accounts.length}</p>
              <p className="text-sm text-gray-500 mt-1">
                Registered in the system
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-500 text-sm font-medium flex items-center">
              <BarChart4 className="mr-2 h-4 w-4" />
              TRANSACTIONS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <p className="text-3xl font-bold">{transactions.length}</p>
              <p className="text-sm text-gray-500 mt-1">
                Total processed transactions
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-500 text-sm font-medium flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              REPORTS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <p className="text-3xl font-bold">{reports.length}</p>
              <p className="text-sm text-gray-500 mt-1">Sent reports</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              All Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium text-sm text-gray-500 w-1/6">
                      Transaction Id
                    </th>
                    <th className="text-left py-2 font-medium text-sm text-gray-500 w-1/6">
                      Sender
                    </th>
                    <th className="text-left py-2 font-medium text-sm text-gray-500 w-1/6">
                      Receiver
                    </th>
                    <th className="text-left py-2 font-medium text-sm text-gray-500 w-1/6">
                      Amount
                    </th>
                    <th className="text-left py-2 font-medium text-sm text-gray-500 w-1/6">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-gray-100"
                    >
                      <td className="py-3 text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">
                        {transaction.transactionId}
                      </td>
                      <td className="py-3 text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">
                        {transaction.senderFullName}
                      </td>
                      <td className="py-3 text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">
                        {transaction.receiverFullName}
                      </td>
                      <td className="py-3 text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">
                        {transaction.amount} VND
                      </td>
                      <td className="py-3 text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getTransactionStatusColor(transaction.status)}`}
                        >
                          {getTransactionStatusText(transaction.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
