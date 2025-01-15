import { getAllAccounts } from "@/api/accountApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRoleText, getStatusText } from "@/utils/enumUtils";
import { getFullName } from "@/utils/nameFormat";
import { useEffect, useState } from "react";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAccounts = async () => {
    const data = await getAllAccounts();
    setAccounts(data);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-black">System Accounts</h1>
      <Table>
        <TableCaption>List of all system accounts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{account.email}</TableCell>
              <TableCell>{account.phone}</TableCell>
              <TableCell>
                {getFullName(account.firstName, account.lastName)}
              </TableCell>
              <TableCell>{getRoleText(account.role)}</TableCell>
              <TableCell>{getStatusText(account.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Accounts;
