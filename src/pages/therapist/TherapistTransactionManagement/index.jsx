import DashboardLayout from "@/layouts/DashboardLayout";

import TransactionManagement from "@/pages/common/TransactionManagement";

const transactions = [
  {
    id: 1,
    type: "credit",
    amount: 1200,
    description: "Client Payment",
    date: "2025-02-20",
    status: "completed",
  },
  {
    id: 2,
    type: "debit",
    amount: 450,
    description: "Office Supplies",
    date: "2025-02-19",
    status: "completed",
  },
  {
    id: 3,
    type: "credit",
    amount: 3000,
    description: "Project Revenue",
    date: "2025-02-18",
    status: "pending",
  },
];

const TherapistTransactionManagement = () => {
  return (
    <DashboardLayout role="therapist">
      <TransactionManagement role="therapist" transactions={transactions} />
    </DashboardLayout>
  );
};

export default TherapistTransactionManagement;
