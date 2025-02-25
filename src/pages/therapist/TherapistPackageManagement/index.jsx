import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/layouts/DashboardLayout";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import AddPackageModal from "./components/AddPackageModal";
import { useState } from "react";

// Mock data for packages
const packages = [
  {
    id: 1,
    name: "Basic Counseling",
    description: "A basic counseling session for individuals.",
    minutesPerAppointment: 60,
    price: 50,
    status: "Active",
  },
  {
    id: 2,
    name: "Advanced Therapy",
    description: "An advanced therapy session for couples.",
    minutesPerAppointment: 90,
    price: 80,
    status: "Inactive",
  },
  {
    id: 3,
    name: "Family Counseling",
    description: "A counseling session for families.",
    minutesPerAppointment: 120,
    price: 100,
    status: "Active",
  },
];

const TherapistPackageManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <DashboardLayout role="therapist">
      <div className="flex-1 flex flex-col p-6 bg-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Package Management</h1>
          <Button onClick={() => setIsDialogOpen(true)}>Add New Package</Button>
        </div>

        {/* Package Cards Grid */}
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
                  variant={pkg.status === "Active" ? "default" : "secondary"}
                >
                  {pkg.status}
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
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
      </div>
      <AddPackageModal isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
    </DashboardLayout>
  );
};

export default TherapistPackageManagement;
