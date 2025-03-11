import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/layouts/DashboardLayout";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import api from "@/api/apiConfig";

const TherapistPackageManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditStatusDialogOpen, setIsEditStatusDialogOpen] = useState(false);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    minutesPerAppointment: 30,
    price: 10
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
  const [statusUpdateError, setStatusUpdateError] = useState(null);
  const [statusUpdateSuccess, setStatusUpdateSuccess] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      // Get accountId from localStorage
      const userDataString = localStorage.getItem("user");
      if (!userDataString) {
        throw new Error("User data not found in localStorage");
      }

      const userData = JSON.parse(userDataString);
      const accountId = userData.accountId;

      // Fetch therapist data using the accountId
      const response = await fetch(
        `https://sp25-swp391-harmonyhub-be.onrender.com/api/therapists/${accountId}`
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();

      if (result.statusCode === 200 && result.data && result.data.packages) {
        console.log("Packages data:", result.data.packages);
        setPackages(result.data.packages);
      } else {
        setPackages([]);
      }
    } catch (err) {
      console.error("Error fetching packages:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "minutesPerAppointment" || name === "price") {
      processedValue = Number(value);
    }

    setFormData({
      ...formData,
      [name]: processedValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Get accountId from localStorage
      const userDataString = localStorage.getItem("user");
      if (!userDataString) {
        throw new Error("User data not found in localStorage");
      }

      const userData = JSON.parse(userDataString);
      const accountId = userData.accountId;

      // Create the request body exactly as specified without auto-labeling
      const requestBody = {
        name: formData.name,
        description: formData.description,
        minutesPerAppointment: formData.minutesPerAppointment,
        price: formData.price
      };

      const response = await fetch(
        `https://sp25-swp391-harmonyhub-be.onrender.com/api/therapists/${accountId}/packages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      // Set success state
      setSubmitSuccess(true);

      // Reset form
      setFormData({
        name: "",
        description: "",
        minutesPerAppointment: 30,
        price: 10
      });

      // Refresh packages
      await fetchPackages();

      // Close modal after short delay
      setTimeout(() => {
        setIsDialogOpen(false);
        setSubmitSuccess(false);
      }, 1500);
    } catch (err) {
      console.error("Error adding package:", err);
      setSubmitError(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  // Function to open status edit dialog
  const openEditStatusDialog = (pkg) => {
    console.log("Package selected for edit:", pkg);
    setCurrentPackage(pkg);
    setNewStatus(pkg.status.toString());
    setStatusUpdateError(null);
    setStatusUpdateSuccess(false);
    setIsEditStatusDialogOpen(true);
  };

  // Function to update package status
  const updatePackageStatus = async () => {
    if (!currentPackage) {
      setStatusUpdateError("Package information is missing");
      return;
    }

    console.log("Updating package with ID:", currentPackage.id);

    setStatusUpdateLoading(true);
    setStatusUpdateError(null);
    setStatusUpdateSuccess(false);

    try {
      const packageId = currentPackage.id;

      if (!packageId) {
        throw new Error("Package ID is missing or invalid");
      }

      // Changed from PATCH to PUT method as per API requirements
      const response = await fetch(
        `https://sp25-swp391-harmonyhub-be.onrender.com/api/packages/${packageId}/status`,
        {
          method: "PUT", // Changed from PATCH to PUT
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: parseInt(newStatus)
          }),
        }
      );

      // Log the full response for debugging
      console.log("Status update response:", response);

      if (!response.ok) {
        let errorMessage = `API request failed with status ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If parsing JSON fails, use the default error message
        }
        throw new Error(errorMessage);
      }

      // Set success state
      setStatusUpdateSuccess(true);

      // Refresh packages
      await fetchPackages();

      // Close modal after short delay
      setTimeout(() => {
        setIsEditStatusDialogOpen(false);
        setStatusUpdateSuccess(false);
      }, 1500);
    } catch (err) {
      console.error("Error updating package status:", err);
      setStatusUpdateError(err.message);
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  // Helper function to map status code to text
  const getStatusText = (statusCode) => {
    const statusMap = {
      1: "Active",
      2: "Inactive"
    };
    return statusMap[statusCode] || "Unknown";
  };

  return (
    <DashboardLayout role="therapist">
      <div className="flex-1 flex flex-col p-6 bg-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Package Management</h1>
          <Button onClick={() => setIsDialogOpen(true)}>Add New Package</Button>
        </div>

        {/* Loading and Error States */}
        {loading && <p className="text-center py-8">Loading packages...</p>}
        {error && (
          <div className="text-center py-8 text-red-500">
            Error: {error}. Please try again later.
          </div>
        )}

        {/* Package Cards Grid */}
        {!loading && !error && packages.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No packages found. Click "Add New Package" to create your first package.
          </div>
        )}

        {!loading && !error && packages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Package Name */}
                <h2 className="text-xl font-semibold mb-2">{pkg.name}</h2>
                {/* Description */}
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                {/* Duration and Price */}
                <div className="flex items-center gap-4 mb-4">
                  <p className="text-sm text-gray-500">
                    {pkg.minutesPerAppointment} minutes
                  </p>
                  <p className="text-sm font-semibold">${pkg.price}</p>
                </div>
                {/* Status */}
                <div className="mb-4">
                  <Badge
                    variant={getStatusText(pkg.status) === "Active" ? "default" : "secondary"}
                  >
                    {getStatusText(pkg.status)}
                  </Badge>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditStatusDialog(pkg)}
                    title="Edit Status"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Package Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Package</DialogTitle>
          </DialogHeader>

          {submitError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          {submitSuccess && (
            <Alert className="mb-4 bg-green-50 text-green-700 border-green-200">
              <AlertDescription>Package added successfully!</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Package Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., All in one"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="e.g., Description for Package"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="minutesPerAppointment">Duration (minutes)</Label>
              <Input
                id="minutesPerAppointment"
                name="minutesPerAppointment"
                type="number"
                min={5}
                step={5}
                value={formData.minutesPerAppointment}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min={0}
                step={0.01}
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={submitLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitLoading}>
                {submitLoading ? "Adding..." : "Add Package"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Status Dialog */}
      <Dialog open={isEditStatusDialogOpen} onOpenChange={setIsEditStatusDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Package Status</DialogTitle>
          </DialogHeader>

          {statusUpdateError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{statusUpdateError}</AlertDescription>
            </Alert>
          )}

          {statusUpdateSuccess && (
            <Alert className="mb-4 bg-green-50 text-green-700 border-green-200">
              <AlertDescription>Package status updated successfully!</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">
                Current package: <span className="font-medium text-gray-700">{currentPackage?.name}</span>
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Current status: <Badge variant={getStatusText(currentPackage?.status) === "Active" ? "default" : "secondary"}>
                  {getStatusText(currentPackage?.status)}
                </Badge>
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Select New Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Active</SelectItem>
                  <SelectItem value="2">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditStatusDialogOpen(false)}
                disabled={statusUpdateLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={updatePackageStatus}
                disabled={statusUpdateLoading || newStatus === currentPackage?.status?.toString()}
              >
                {statusUpdateLoading ? "Updating..." : "Update Status"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default TherapistPackageManagement;
