import DashboardLayout from "@/layouts/DashboardLayout";
import TransactionManagement from "@/pages/common/TransactionManagement";

const MemberTransactionManagement = () => {
  return (
    <DashboardLayout role="member">
      <TransactionManagement />
    </DashboardLayout>
  );
};

export default MemberTransactionManagement;
