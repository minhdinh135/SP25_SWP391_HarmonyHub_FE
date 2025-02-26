import { getMemberAppointments } from "@/api/appointmentApi";
import ItemList from "@/components/ItemList";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";
import DashboardLayout from "@/layouts/DashboardLayout";
import AppointmentCard from "@/components/AppointmentCard";

const MemberAppointmentList = () => {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMemberAppointments(user.accountId);
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
    <DashboardLayout role="member">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold mb-6">Appointment History</h1>
        <ItemList
          className="p-4"
          data={appointments}
          renderItem={(appointment) => (
            <AppointmentCard appointment={appointment} />
          )}
        />
      </div>
    </DashboardLayout>
  );
};

export default MemberAppointmentList;
