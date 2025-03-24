import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const UpdateTherapistNoteDialog = ({
  appointmentDetails,
  therapistNoteContent,
  setTherapistNoteContent,
  therapistNoteOpen,
  setTherapistNoteOpen,
  handleTherapistNoteSubmit,
  isSubmittingNote,
}) => {
  return (
    <Dialog open={therapistNoteOpen} onOpenChange={setTherapistNoteOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {appointmentDetails?.therapistNote
              ? "Edit Session Notes"
              : "Add Session Notes"}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="mb-2">
            <p className="text-sm text-gray-500 mb-2">
              {appointmentDetails?.therapistNote
                ? "Update your notes for this session"
                : "Add your notes for this session with"}
            </p>
            {!appointmentDetails?.therapistNote && (
              <p className="font-medium">
                {appointmentDetails?.memberFullName}
              </p>
            )}
          </div>
          <Textarea
            placeholder="Enter your session notes here..."
            value={therapistNoteContent}
            onChange={(e) => setTherapistNoteContent(e.target.value)}
            className="min-h-40"
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setTherapistNoteOpen(false)}
            disabled={isSubmittingNote}
          >
            Cancel
          </Button>
          <Button
            onClick={handleTherapistNoteSubmit}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isSubmittingNote || !therapistNoteContent.trim()}
          >
            {isSubmittingNote ? "Saving..." : "Save Notes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTherapistNoteDialog;
