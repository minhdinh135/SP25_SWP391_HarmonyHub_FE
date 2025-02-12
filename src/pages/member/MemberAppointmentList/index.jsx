import { getMemberAppointments } from "@/api/appointmentApi";
import ItemList from "@/components/ItemList";
import useAuth from "@/hooks/useAuth";
import useToggleState from "@/hooks/useToggleState";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";
import AppointmentCard from "./components/AppointmentCard";
import Spinner from "@/components/Spinner";
import DashboardLayout from "@/layouts/DashboardLayout";

const MemberAppointmentList = () => {
  const { user } = useAuth();

  const [isLoading, toggleIsLoading] = useToggleState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      toggleIsLoading();
      try {
        const data = await getMemberAppointments(user.accountId);
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
    <DashboardLayout role="member">
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

export default MemberAppointmentList;
