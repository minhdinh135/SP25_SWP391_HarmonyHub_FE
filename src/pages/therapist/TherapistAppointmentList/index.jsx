import {
  getTherapistAppointments,
  updateAppointmentStatus,
} from "@/api/appointmentApi";
import AppointmentCard from "@/components/AppointmentCard";
import ItemList from "@/components/ItemList";
import Spinner from "@/components/Spinner";
import { AppointmentStatus } from "@/constants/status";
import useAuth from "@/hooks/useAuth";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const TherapistAppointmentList = () => {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getTherapistAppointments(user.accountId);
      const sortedData = data.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
      );
      setAppointments(sortedData);
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user.accountId]);

  const handleAccept = async (appointmentId) => {
    try {
      setIsLoading(true);
      const payload = {
        status: AppointmentStatus.Accepted,
      };
      await updateAppointmentStatus(appointmentId, payload);
      await fetchData();
      console.log("Accepted");
    } catch (error) {
      console.log(error);
      toast.error("Failed to accept appointment");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (appointmentId) => {
    try {
      setIsLoading(true);
      const payload = {
        status: AppointmentStatus.Rejected,
      };
      await updateAppointmentStatus(appointmentId, payload);
      await fetchData();
      console.log("Rejected");
    } catch (error) {
      console.log(error);
      toast.error("Failed to reject appointment");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <DashboardLayout role="therapist">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold mb-6">Your Appointments</h1>
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
      </div>
    </DashboardLayout>
  );
};

export default TherapistAppointmentList;
