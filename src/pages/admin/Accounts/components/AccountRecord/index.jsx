import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { getAccountStatusColor } from "@/utils/colorUtils";
import { getAccountStatusText, getRoleText } from "@/utils/enumUtils";
import { getFullName } from "@/utils/nameFormat";
import { Edit2, MoreVertical, Trash2 } from "lucide-react";

const AccountRecord = ({
  account,
  index,
  setSelectedAccount,
  setIsEditDialogOpen,
  setIsDeleteDialogOpen,
}) => {
  return (
    <TableRow key={account.id}>
      <TableCell>{index + 1}</TableCell>
      <TableCell className="font-medium">{account.email}</TableCell>
      <TableCell>{account.phone}</TableCell>
      <TableCell>{getFullName(account.firstName, account.lastName)}</TableCell>
      <TableCell>{getRoleText(account.role)}</TableCell>
      <TableCell>
        <Badge className={getAccountStatusColor(account.status)}>
          {getAccountStatusText(account.status)}
        </Badge>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setSelectedAccount(account);
                setIsEditDialogOpen(true);
              }}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => {
                setSelectedAccount(account);
                setIsDeleteDialogOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default AccountRecord;
