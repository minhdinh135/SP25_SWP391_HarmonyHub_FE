import DashboardLayout from "@/layouts/DashboardLayout";
import TransactionManagement from "@/pages/common/TransactionManagement";

const transactions = [
  {
    id: 1,
    transactionId: "TX123456",
    description: "Session Payment",
    date: "2023-10-01",
    status: "Completed",
    paymentMethod: "Credit Card",
    senderFullName: "John Doe",
    appointmentReference: "APT789",
    type: "debit",
    amount: 500000, // Amount in VND
  },
  {
    id: 2,
    transactionId: "TX654321",
    description: "Refund",
    date: "2023-10-02",
    status: "Pending",
    paymentMethod: "PayPal",
    senderFullName: "Jane Smith",
    appointmentReference: null, // No associated appointment
    type: "credit",
    amount: 200000, // Amount in VND
  },
];

const MemberTransactionManagement = () => {
  return (
    <DashboardLayout role="member">
      <TransactionManagement role="member" transactions={transactions} />
    </DashboardLayout>
  );
};

export default MemberTransactionManagement;
