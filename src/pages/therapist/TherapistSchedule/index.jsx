import ScheduleCalendar from "@/components/ScheduleCalendar";
import DashboardLayout from "@/layouts/DashboardLayout";

const TherapistSchedule = () => {
  return (
    <DashboardLayout role="therapist">
      <ScheduleCalendar />
    </DashboardLayout>
  );
};

export default TherapistSchedule;
