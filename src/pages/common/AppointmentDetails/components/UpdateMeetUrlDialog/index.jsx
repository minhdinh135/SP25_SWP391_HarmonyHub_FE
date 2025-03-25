import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UpdateMeetUrlDialog = ({
  meetUrlOpen,
  setMeetUrlOpen,
  meetUrlContent,
  setMeetUrlContent,
  handleMeetUrlSubmit,
  isSubmittingMeetUrl,
}) => {
  return (
    <Dialog open={meetUrlOpen} onOpenChange={setMeetUrlOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Meeting URL</DialogTitle>
          <DialogDescription>
            Enter the new Google Meet or video conference link for this
            appointment.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="meetUrl" className="text-right">
              Meeting URL
            </Label>
            <Input
              id="meetUrl"
              value={meetUrlContent}
              onChange={(e) => setMeetUrlContent(e.target.value)}
              placeholder="https://meet.google.com/xxx-xxxx-xxx"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setMeetUrlOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleMeetUrlSubmit}
            disabled={isSubmittingMeetUrl}
          >
            {isSubmittingMeetUrl ? "Updating..." : "Update URL"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateMeetUrlDialog;
