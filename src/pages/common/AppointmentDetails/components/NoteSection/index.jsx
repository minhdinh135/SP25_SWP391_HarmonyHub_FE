import { Button } from "@/components/ui/button";
import { AppointmentStatus } from "@/constants/status";
import { MessageSquare, Pencil, Plus } from "lucide-react";

const NoteSection = ({ appointmentDetails, openTherapistNoteDialog }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Notes</h3>
        {appointmentDetails?.status === AppointmentStatus.Completed && (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={openTherapistNoteDialog}
          >
            {appointmentDetails?.therapistNote ? (
              <>
                <Pencil className="h-3 w-3" />
                Edit Note
              </>
            ) : (
              <>
                <Plus className="h-3 w-3" />
                Add Note
              </>
            )}
          </Button>
        )}
      </div>
      {appointmentDetails?.clientNote && (
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="flex items-center space-x-2 mb-2">
            <MessageSquare className="h-4 w-4 text-slate-500" />
            <span className="font-medium">Client Note:</span>
          </div>
          <p className="text-slate-700">{appointmentDetails?.clientNote}</p>
        </div>
      )}
      {appointmentDetails?.therapistNote ? (
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-slate-500" />
              <span className="font-medium">Therapist Note:</span>
            </div>
          </div>
          <p className="text-slate-700">{appointmentDetails?.therapistNote}</p>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-slate-200 p-4 text-center">
          <p className="text-slate-500 mb-3">No therapist notes yet</p>
          {appointmentDetails?.status === AppointmentStatus.Completed && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 mx-auto"
              onClick={openTherapistNoteDialog}
            >
              <Plus className="h-3 w-3" />
              Add Session Notes
            </Button>
          )}
        </div>
      )}
      {!appointmentDetails?.clientNote &&
        !appointmentDetails?.therapistNote && (
          <p className="text-muted-foreground italic">
            No notes available for this appointment.
          </p>
        )}
    </div>
  );
};

export default NoteSection;
