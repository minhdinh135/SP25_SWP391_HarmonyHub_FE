import { updateTherapistDetails } from "@/api/accountApi";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const PersonalInfoDialog = ({
  therapistDetails,
  isDialogOpen,
  setIsDialogOpen,
  handleCancel,
}) => {
  const [formData, setFormData] = useState(therapistDetails);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthdate: formData.birthdate,
        gender: formData.gender,
        yearsOfExperience: formData.yearsOfExperience,
        bio: formData.bio,
      };
      console.log("Payload", payload);
      await updateTherapistDetails(therapistDetails.id, payload);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Profile Information</DialogTitle>
          <DialogDescription>
            Update your personal details, bio, and relationship goals
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveChanges();
          }}
        >
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData?.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData?.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birthDate">Birth Date</Label>
                <Input
                  id="birthDate"
                  name="birthdate"
                  type="date"
                  value={formData?.birthdate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  name="gender"
                  value={formData?.gender}
                  onValueChange={handleInputChange}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={1}>Male</SelectItem>
                    <SelectItem value={2}>Female</SelectItem>
                    <SelectItem value={3}>Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Experience (years)</Label>
                <Input
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  placeholder="Enter your years of experience"
                  value={formData?.yearsOfExperience}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell us about yourself..."
                className="min-h-24"
                value={formData?.bio}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSaveChanges}>Save All Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PersonalInfoDialog;
