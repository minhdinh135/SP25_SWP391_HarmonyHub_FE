import { getTherapistAppointments } from "@/api/appointmentApi";
import AppointmentCard from "@/components/AppointmentCard";
import ItemList from "@/components/ItemList";
import Spinner from "@/components/Spinner";
import useAuth from "@/hooks/useAuth";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const TherapistAppointmentList = () => {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTherapistAppointments(user.accountId);
        setAppointments(data);
      } catch (error) {
        console.log(error);
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user.accountId]);

  // Handle appointment acceptance
  const handleAccept = async (appointmentId) => {
    try {
      // await updateAppointmentStatus(appointmentId, 2); // Assuming 2 is "Accepted"
      console.log("Accepted");
      refreshAppointments();
    } catch (error) {
      console.log(error);
      toast.error("Failed to accept appointment");
    }
  };

  // Handle appointment rejection
  const handleReject = async (appointmentId) => {
    try {
      // await updateAppointmentStatus(appointmentId, 3); // Assuming 3 is "Rejected"
      console.log("Rejected");
      refreshAppointments();
    } catch (error) {
      console.log(error);
      toast.error("Failed to reject appointment");
    }
  };

  // Refresh appointments after status update
  const refreshAppointments = async () => {
    try {
      const data = await getTherapistAppointments(user.accountId);
      setAppointments(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to refresh appointments");
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <DashboardLayout role="therapist">
      <ItemList
        className="p-4"
        data={appointments}
        renderItem={(appointment) => (
          <AppointmentCard
            onAccept={handleAccept}
            onReject={handleReject}
            appointment={appointment}
          />
        )}
      />
    </DashboardLayout>
  );
};

export default TherapistAppointmentList;
