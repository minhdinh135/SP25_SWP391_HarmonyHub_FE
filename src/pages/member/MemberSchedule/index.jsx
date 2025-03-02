import { getMemberAppointments } from "@/api/appointmentApi";
import ScheduleCalendar from "@/components/ScheduleCalendar";
import Spinner from "@/components/Spinner";
import useAuth from "@/hooks/useAuth";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";

const MemberSchedule = () => {
  const { user } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      <ScheduleCalendar appointments={appointments} />
    </DashboardLayout>
  );
};

export default MemberSchedule;
