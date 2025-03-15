import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";

const AvatarDialog = ({
  onDrop,
  preview,
  handleCancel,
  handleSaveAvatar,
  isDropZoneOpen,
  setIsDropZoneOpen,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <Dialog open={isDropZoneOpen} onOpenChange={setIsDropZoneOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
        </DialogHeader>

        {/* Dropzone Area */}
        <div
          {...getRootProps()}
          className="border-2 border-dashed p-6 text-center cursor-pointer"
        >
          <input {...getInputProps()} />
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 object-cover mx-auto rounded-full"
            />
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <UploadCloud className="h-10 w-10 text-gray-500" />
              <p className="text-gray-500">Drag & drop or click to upload</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSaveAvatar}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarDialog;
