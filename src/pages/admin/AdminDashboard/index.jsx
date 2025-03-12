import { getAllAccounts } from "@/api/accountApi";
import { getAllReports } from "@/api/reportApi";
import { getAllTransactions } from "@/api/transactionApi";
import Spinner from "@/components/Spinner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Users,
  FileText,
  BarChart4,
  Clock,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";

const AdminDashboard = () => {
  // Sample data - replace with your actual data
  const dashboardData = {
    totalUsers: 1234,
    totalTransactions: 5678,
    totalReports: 432,
    recentTransactions: [
      {
        id: 1,
        user: "John Doe",
        amount: "$120.00",
        date: "Today, 2:30 PM",
        status: "Completed",
      },
      {
        id: 2,
        user: "Jane Smith",
        amount: "$85.50",
        date: "Today, 10:15 AM",
        status: "Completed",
      },
      {
        id: 3,
        user: "Robert Johnson",
        amount: "$220.75",
        date: "Yesterday",
        status: "Pending",
      },
      {
        id: 4,
        user: "Sarah Williams",
        amount: "$65.25",
        date: "Mar 8, 2025",
        status: "Completed",
      },
    ],
  };

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
        <span className="text-sm text-gray-500">
          Last updated: Today at 10:45 AM
        </span>
      </div>

      {/* Key Metrics */}
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
              <p className="text-sm text-gray-500 mt-1">
                Generated system reports
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
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
                    <th className="text-left py-2 font-medium text-sm text-gray-500">
                      User
                    </th>
                    <th className="text-left py-2 font-medium text-sm text-gray-500">
                      Amount
                    </th>
                    <th className="text-left py-2 font-medium text-sm text-gray-500">
                      Date
                    </th>
                    <th className="text-left py-2 font-medium text-sm text-gray-500">
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
                      <td className="py-3 text-sm">{transaction.user}</td>
                      <td className="py-3 text-sm">{transaction.amount}</td>
                      <td className="py-3 text-sm text-gray-500">
                        {transaction.date}
                      </td>
                      <td className="py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            transaction.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              System Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-md mr-3">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">New Users Today</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <div className="p-2 bg-green-100 rounded-md mr-3">
                  <BarChart4 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Today's Transactions</p>
                  <p className="text-2xl font-bold">28</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-amber-50 rounded-lg">
                <div className="p-2 bg-amber-100 rounded-md mr-3">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">Pending Reports</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
