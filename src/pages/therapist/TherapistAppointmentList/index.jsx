import { getTherapistAppointments } from "@/api/appointmentApi";
import ItemList from "@/components/ItemList";
import Spinner from "@/components/Spinner";
import useAuth from "@/hooks/useAuth";
import useToggleState from "@/hooks/useToggleState";
import DashboardLayout from "@/layouts/DashboardLayout";
import AppointmentCard from "@/pages/member/MemberAppointmentList/components/AppointmentCard";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const TherapistAppointmentList = () => {
  const { user } = useAuth();

  const [isLoading, toggleIsLoading] = useToggleState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      toggleIsLoading();
      try {
        const data = await getTherapistAppointments(user.accountId);
        setAppointments(data);
      } catch (error) {
        console.log(error);
        toast.error(error);
      } finally {
        toggleIsLoading();
      }
    };

    fetchData();
  }, [toggleIsLoading, user.accountId]);

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
