import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import {
  AlertCircle,
  CheckCircle,
  Eye,
  XCircle,
  MessageSquare,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getAllReports } from "@/api/reportApi";
import Spinner from "@/components/Spinner";

const AdminReportManagement = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [adminResponse, setAdminResponse] = useState("");
  const [isRespondMode, setIsRespondMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getAllReports();
        setReports(data);
      } catch (error) {
        console.log(error);
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusLabel = (status) => {
    switch (status) {
      case 1:
        return {
          label: "Pending",
          color: "bg-yellow-500",
          icon: <AlertCircle className="h-4 w-4 mr-1" />,
        };
      case 2:
        return {
          label: "Resolved",
          color: "bg-green-500",
          icon: <CheckCircle className="h-4 w-4 mr-1" />,
        };
      case 3:
        return {
          label: "Dismissed",
          color: "bg-red-500",
          icon: <XCircle className="h-4 w-4 mr-1" />,
        };
      default:
        return { label: "Unknown", color: "bg-gray-500", icon: null };
    }
  };

  const handleStatusChange = (reportId, newStatus) => {
    setReports(
      reports.map((report) =>
        report.reportId === reportId
          ? { ...report, status: parseInt(newStatus) }
          : report,
      ),
    );
    // In a real application, you would make an API call here
    console.log(`Updated report ${reportId} status to ${newStatus}`);

    // If selecting "Resolved" for the currently open report, switch to response mode
    if (
      selectedReport &&
      selectedReport.reportId === reportId &&
      newStatus === "2"
    ) {
      setIsRespondMode(true);
    }
  };

  // Function to view report details
  const handleViewDetails = (report) => {
    setSelectedReport(report);
    setIsDetailOpen(true);
    setIsRespondMode(false);
    setAdminResponse("");
  };

  // Function to send response
  const handleSendResponse = () => {
    // In a real application, you would make an API call here
    console.log(
      `Sending response to report ${selectedReport.reportId}: ${adminResponse}`,
    );

    // Mark as resolved and close modal
    handleStatusChange(selectedReport.reportId, "2");
    setIsDetailOpen(false);
  };

  // Filter reports based on status
  const filteredReports =
    statusFilter === "all"
      ? reports
      : reports.filter((report) => report.status === parseInt(statusFilter));

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">User Report Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="w-64">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="1">Pending</SelectItem>
                  <SelectItem value="2">Resolved</SelectItem>
                  <SelectItem value="3">Dismissed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead className="w-1/4">Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.id}</TableCell>
                    <TableCell>{report.accountId}</TableCell>
                    <TableCell className="font-medium truncate max-w-xs">
                      {report.title}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          getStatusLabel(report.status).color +
                          " text-white flex items-center w-fit"
                        }
                      >
                        {getStatusLabel(report.status).icon}
                        {getStatusLabel(report.status).label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
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
                            <SelectItem value="1">Pending</SelectItem>
                            <SelectItem value="2">Resolved</SelectItem>
                            <SelectItem value="3">Dismissed</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleViewDetails(report)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-blue-600"
                          onClick={() => {
                            handleViewDetails(report);
                            setIsRespondMode(true);
                          }}
                        >
                          <MessageSquare className="h-4 w-4" />
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

      {/* Report Detail Modal */}
      {isDetailOpen && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-3xl max-h-screen overflow-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                {isRespondMode ? "Respond to Report" : "Report Details"}: #
                {selectedReport.id}
              </CardTitle>
              <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                Close
              </Button>
            </CardHeader>
            <CardContent>
              {!isRespondMode ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Badge
                      className={
                        getStatusLabel(selectedReport.status).color +
                        " text-white flex items-center"
                      }
                    >
                      {getStatusLabel(selectedReport.status).icon}
                      {getStatusLabel(selectedReport.status).label}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-500">Report ID</Label>
                      <p className="font-medium">{selectedReport.id}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">User ID</Label>
                      <p className="font-medium">{selectedReport.accountId}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-500">
                      Report Title
                    </Label>
                    <p className="font-medium">{selectedReport.title}</p>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-500">
                      Report Content
                    </Label>
                    <p className="p-3 bg-gray-50 rounded-md border mt-1">
                      {selectedReport.content}
                    </p>
                  </div>

                  <div className="pt-4 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      className="border-red-600 text-red-600 hover:bg-red-50"
                      onClick={() => handleStatusChange(selectedReport.id, "3")}
                    >
                      Dismiss Report
                    </Button>
                    <Button
                      onClick={() => setIsRespondMode(true)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Respond to User
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm text-gray-500">
                      Report Title
                    </Label>
                    <p className="font-medium">{selectedReport.title}</p>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-500">
                      Report Content
                    </Label>
                    <p className="p-3 bg-gray-50 rounded-md border mt-1">
                      {selectedReport.content}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Label htmlFor="response">Your Response</Label>
                    <Textarea
                      id="response"
                      className="mt-1"
                      rows={6}
                      placeholder="Type your response to the user here..."
                      value={adminResponse}
                      onChange={(e) => setAdminResponse(e.target.value)}
                    />
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center">
                      <Input
                        type="checkbox"
                        id="markAsResolved"
                        className="mr-2 h-4 w-4"
                        defaultChecked
                      />
                      <Label htmlFor="markAsResolved" className="text-sm">
                        Mark report as resolved after sending
                      </Label>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsRespondMode(false)}
                    >
                      Back to Details
                    </Button>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={handleSendResponse}
                      disabled={!adminResponse.trim()}
                    >
                      Send Response
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminReportManagement;
