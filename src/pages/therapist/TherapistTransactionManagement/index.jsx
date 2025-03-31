import DashboardLayout from "@/layouts/DashboardLayout";

import TransactionManagement from "@/pages/common/TransactionManagement";

const TherapistTransactionManagement = () => {
  return (
    <DashboardLayout role="therapist">
      <TransactionManagement />
    </DashboardLayout>
  );
};

export default TherapistTransactionManagement;
