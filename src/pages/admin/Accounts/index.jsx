import { useState, useEffect } from "react";
import { getAllAccounts, updateAccountStatus } from "@/api/accountApi";
import Spinner from "@/components/Spinner";
import { Badge } from "@/components/ui/badge";
import { getAccountStatusColor } from "@/utils/colorUtils";
import { getAccountStatusText, getRoleText } from "@/utils/enumUtils";
import { getFullName } from "@/utils/nameFormat";
import {
  Search,
  MoreVertical,
  RefreshCw,
  Eye,
  CheckCircle,
  XCircle,
  Hourglass,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AccountStatus } from "@/constants/status";
import { Roles } from "@/constants/role";
import PaginatedTable from "@/components/PaginatedTable";
import { toast } from "sonner";
import ViewAccountDetailsDialog from "./components/ViewAccountDetailsDialog";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const columns = [
    {
      header: "No.",
      cell: (_, index) => index + 1,
      className: "w-[50px]",
    },
    {
      header: "Email",
      accessor: "email",
      cellClassName: "font-medium",
    },
    {
      header: "Phone",
      accessor: "phone",
    },
    {
      header: "Name",
      cell: (account) => getFullName(account.firstName, account.lastName),
    },
    {
      header: "Role",
      cell: (account) => getRoleText(account.role),
    },
    {
      header: "Status",
      cell: (account) => (
        <Badge className={getAccountStatusColor(account.status)}>
          {getAccountStatusText(account.status)}
        </Badge>
      ),
    },
    {
      header: "Actions",
      className: "w-[100px]",
      cell: (account) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* View Details Action - available for all accounts */}
            <DropdownMenuItem
              onClick={() => {
                setSelectedAccount(account);
                setIsViewDialogOpen(true);
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-yellow-600"
                onClick={() => {
                  onSubmitStatusChange(account.id, AccountStatus.Pending);
                }}
              >
                <Hourglass className="h-4 w-4 mr-2" />
                Set Pending
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-green-600"
                onClick={() => {
                  onSubmitStatusChange(account.id, AccountStatus.Active);
                }}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Account
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-amber-600"
                onClick={() => {
                  onSubmitStatusChange(account.id, AccountStatus.Inactive);
                }}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Disapprove Account
              </DropdownMenuItem>
            </>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const fetchAccounts = async () => {
    try {
      setIsLoading(true);
      const data = await getAllAccounts();
      const filteredData = data
        .filter((x) => getRoleText(x.role) !== "System")
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setAccounts(filteredData);
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const onSubmitStatusChange = async (accountId, status) => {
    try {
      setIsLoading(true);
      await updateAccountStatus(accountId, Number(status));
      fetchAccounts();
      toast.success("Update account status successfully");
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getFullName(account.firstName, account.lastName)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === "all" || account.role === filterRole;
    const matchesStatus =
      filterStatus === "all" || account.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-black">System Accounts</h1>
        <div className="flex gap-2">
          <Button onClick={fetchAccounts} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by email or name..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value={Roles.Member}>Member</SelectItem>
            <SelectItem value={Roles.Therapist}>Therapist</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value={AccountStatus.Active}>Active</SelectItem>
            <SelectItem value={AccountStatus.Inactive}>Inactive</SelectItem>
            <SelectItem value={AccountStatus.Pending}>Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <PaginatedTable
        data={filteredAccounts}
        columns={columns}
        caption={`Total ${filteredAccounts.length} accounts found.`}
        emptyMessage="No accounts found."
        className="w-full"
      />

      <ViewAccountDetailsDialog
        isOpen={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        account={selectedAccount}
      />
    </div>
  );
};

export default Accounts;
