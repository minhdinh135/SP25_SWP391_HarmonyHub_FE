import { getAllAccounts } from "@/api/accountApi";
import Spinner from "@/components/Spinner";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { getStatusColor } from "@/utils/colorUtils";
import { getRoleText, getStatusText } from "@/utils/enumUtils";
import { getFullName } from "@/utils/nameFormat";
import { useEffect, useState } from "react";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAccounts = async () => {
    try {
      const data = await getAllAccounts();
      setAccounts(data);
    } catch (error) {
      console.log(error);
      toast({ title: "Error", description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-black">System Accounts</h1>
      <Table>
        <TableCaption>List of all system accounts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-right">No.</TableHead>
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
              <TableCell className="w-[50px] text-right">{index + 1}</TableCell>
              <TableCell>{account.email}</TableCell>
              <TableCell>{account.phone}</TableCell>
              <TableCell>
                {getFullName(account.firstName, account.lastName)}
              </TableCell>
              <TableCell>{getRoleText(account.role)}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(account.status)}>
                  {getStatusText(account.status)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Accounts;
