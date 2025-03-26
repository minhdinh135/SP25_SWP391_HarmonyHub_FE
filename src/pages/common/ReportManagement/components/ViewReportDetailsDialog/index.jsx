import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ViewReportDetailsDialog = ({ dialog, closeDialog }) => {
  return (
    <Dialog open={dialog.type === "viewDetails"} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Report Details</DialogTitle>
          <DialogDescription>
            Detailed information about the selected report
          </DialogDescription>
        </DialogHeader>

        {dialog.data && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium">ID:</span>
              <span className="col-span-3">{dialog.data.id}</span>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium">Title:</span>
              <span className="col-span-3">{dialog.data.title}</span>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium">Content:</span>
              <span className="col-span-3">{dialog.data.content}</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewReportDetailsDialog;
