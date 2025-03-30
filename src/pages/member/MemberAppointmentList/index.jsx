import {
  getMemberAppointments,
  updateAppointmentStatus,
} from "@/api/appointmentApi";
import ItemList from "@/components/ItemList";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";
import DashboardLayout from "@/layouts/DashboardLayout";
import AppointmentCard from "@/components/AppointmentCard";
import { AppointmentStatus } from "@/constants/status";

const MemberAppointmentList = () => {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getMemberAppointments(user.accountId);
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

  const handleCancelAppointment = async (appointmentId) => {
    try {
      setIsLoading(true);
      const payload = {
        status: AppointmentStatus.Cancelled,
      };
      await updateAppointmentStatus(appointmentId, payload);
      toast.success("Cancel appointment successfully");
      await fetchData();
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

  if (isLoading) return <Spinner />;

  return (
    <DashboardLayout role="member">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold mb-6">Your Appointments</h1>
        <ItemList
          className="p-4"
          data={appointments}
          renderItem={(appointment) => (
            <AppointmentCard
              appointment={appointment}
              handleCancelAppointment={handleCancelAppointment}
            />
          )}
        />
      </div>
    </DashboardLayout>
  );
};

export default MemberAppointmentList;
