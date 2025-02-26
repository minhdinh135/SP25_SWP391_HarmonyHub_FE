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

  if (isLoading) return <Spinner />;

  return (
    <DashboardLayout role="therapist">
      <ItemList
        className="p-4"
        data={appointments}
        renderItem={(appointment) => (
          <AppointmentCard appointment={appointment} />
        )}
      />
    </DashboardLayout>
  );
};

export default TherapistAppointmentList;
