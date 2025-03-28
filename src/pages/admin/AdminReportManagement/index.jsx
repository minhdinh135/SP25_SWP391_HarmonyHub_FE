import { useState, useEffect } from "react";
import { getAllReports } from "@/api/reportApi";
import Spinner from "@/components/Spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { toast } from "sonner";
import { getReportStatusText } from "@/utils/enumUtils";
import { getReportStatusColor } from "@/utils/colorUtils";

const AdminReportManagement = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        const data = await getAllReports();
        setReports(data);
      } catch (error) {
        console.error("Failed to fetch reports", error);
        toast.error("Failed to load reports");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleStatusChange = async (reportId, newStatus) => {
    try {
      const updatedReports = reports.map((report) =>
        report.id === reportId
          ? { ...report, status: parseInt(newStatus) }
          : report,
      );
      setReports(updatedReports);

      if (selectedReport && selectedReport.id === reportId) {
        setSelectedReport((prev) => ({
          ...prev,
          status: parseInt(newStatus),
        }));
      }

      toast.success(`Report #${reportId} status updated`);
    } catch (error) {
      console.error("Failed to update report status", error);
      toast.error("Failed to update report status");
      if (selectedReport) {
        setSelectedReport(
          reports.find((r) => r.id === selectedReport.id) || null,
        );
      }
    }
  };

  const handleViewDetails = (report) => {
    setSelectedReport(report);
    setIsDetailOpen(true);
  };

  const filteredReports =
    statusFilter === "all"
      ? reports
      : reports.filter((report) => report.status === parseInt(statusFilter));

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Report Management</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Status Filter */}
          <div className="mb-4 w-64">
            <Select
              defaultValue="2"
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                <SelectItem value="2">Pending</SelectItem>
                <SelectItem value="1">Resolved</SelectItem>
                <SelectItem value="0">Dismissed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.id}</TableCell>
                    <TableCell className="font-medium truncate max-w-xs">
                      {report.title}
                    </TableCell>
                    <TableCell>
                      <Badge className={getReportStatusColor(report.status)}>
                        {getReportStatusText(report.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {/* Status Change Dropdown */}
                        <Select
                          value={report.status.toString()}
                          onValueChange={(value) =>
                            handleStatusChange(report.id, value)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Change Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2">Pending</SelectItem>
                            <SelectItem value="1">Resolved</SelectItem>
                            <SelectItem value="0">Dismissed</SelectItem>
                          </SelectContent>
                        </Select>

                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleViewDetails(report)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No reports found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Report Details Modal */}
      {isDetailOpen && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-3xl max-h-screen overflow-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Report Details</CardTitle>
              <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                Close
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Status Badge */}
                <div className="flex justify-between items-center mb-4">
                  <Badge
                    className={getReportStatusColor(selectedReport.status)}
                  >
                    {getReportStatusText(selectedReport.status)}
                  </Badge>
                </div>

                {/* Report Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Report ID</p>
                    <p className="font-medium">{selectedReport.id}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Report Title</p>
                  <p className="font-medium">{selectedReport.title}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Report Content</p>
                  <p className="p-3 bg-gray-50 rounded-md border mt-1">
                    {selectedReport.content}
                  </p>
                </div>

                {/* Status Change Buttons */}
                <div className="pt-4 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    className="border-red-600 text-red-600 hover:bg-red-50"
                    onClick={() => handleStatusChange(selectedReport.id, "0")}
                  >
                    Dismiss Report
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleStatusChange(selectedReport.id, "1")}
                  >
                    Mark as Resolved
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminReportManagement;
