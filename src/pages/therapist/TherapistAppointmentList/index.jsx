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
      setAppointments(data);
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
