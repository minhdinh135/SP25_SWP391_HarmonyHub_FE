import { getAllReports } from "@/api/reportApi";
import Spinner from "@/components/Spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAuth from "@/hooks/useAuth";
import DashboardLayout from "@/layouts/DashboardLayout";
import { getReportStatusColor } from "@/utils/colorUtils";
import { formatDate } from "@/utils/dateUtils";
import { getReportStatusText } from "@/utils/enumUtils";
import { Eye, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";

const ReportManagement = ({ role = "member" }) => {
  const { user } = useAuth();

  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getAllReports();
        const memberReports = data.filter(
          (report) => report.accountId === user.accountId,
        );
        console.log(memberReports);
        setReports(memberReports);
      } catch (error) {
        console.error("Error fetching reports:", error);
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user.accountId]);

  if (isLoading) return <Spinner />;

  return (
    <DashboardLayout role={role}>
      <div className="max-w-4xl mx-auto pb-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Report Management
          </h1>
          <Button>Create New Report</Button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.id}</TableCell>
                  <TableCell className="font-medium">{report.title}</TableCell>
                  <TableCell>
                    <Badge className={getReportStatusColor(report.status)}>
                      {getReportStatusText(report.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(report.createdAt)}</TableCell>
                  <TableCell>{formatDate(report.updatedAt)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {reports.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No reports found
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportManagement;
