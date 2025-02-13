import ScheduleCalendar from "@/components/ScheduleCalendar";
import DashboardLayout from "@/layouts/DashboardLayout";

const MemberSchedule = () => {
  return (
    <DashboardLayout role="member">
      <ScheduleCalendar />
    </DashboardLayout>
  );
};

export default MemberSchedule;
