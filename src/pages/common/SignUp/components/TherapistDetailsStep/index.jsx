import { getAllSpecialties } from "@/api/specialtyApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AwardIcon, PlusCircleIcon, TrashIcon } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";

const TherapistDetailsStep = ({
  formData,
  qualifications,
  setQualifications,
  handleQualificationChange,
  handleInputChange,
  handleSubmit,
}) => {
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllSpecialties();
        setSpecialties(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const addQualification = () => {
    setQualifications([
      ...qualifications,
      { degree: 1, image: null, specialtyId: 1 },
    ]);
  };

  const removeQualification = (index) => {
    const updatedQualifications = qualifications.filter((_, i) => i !== index);
    setQualifications(updatedQualifications);

    // Update the parent form data
    handleInputChange({
      target: {
        name: "qualifications",
        value: updatedQualifications,
      },
    });
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      handleQualificationChange(index, "image", file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3 mb-3">
        <div className="flex items-center">
          <AwardIcon className="w-5 h-5 mr-2" />
          <Label htmlFor="yearsOfExperience">Years of Experience</Label>
        </div>
        <Input
          id="yearsOfExperience"
          name="yearsOfExperience"
          type="number"
          min="0"
          max="70"
          value={formData.yearsOfExperience || ""}
          onChange={handleInputChange}
          placeholder="Enter years of experience"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center">
          <AwardIcon className="w-5 h-5 mr-2" />
          <h3 className="text-lg font-medium">Qualifications</h3>
        </div>

        {qualifications.map((qualification, index) => (
          <div
            key={index}
            className="space-y-3 p-4 border rounded-md bg-gray-50"
          >
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Qualification {index + 1}</h4>
              {index > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeQualification(index)}
                >
                  <TrashIcon className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`specialty-${index}`}>Specialty</Label>
              <Select
                id={`specialty-${index}`}
                value={qualification.specialtyId}
                onValueChange={(value) =>
                  handleQualificationChange(index, "specialtyId", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty, index) => (
                    <SelectItem key={index} value={specialty.id}>
                      {specialty.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`degree-${index}`}>Degree</Label>
              <Select
                id={`degree-${index}`}
                value={qualification.degree}
                onValueChange={(value) =>
                  handleQualificationChange(index, "degree", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select degree" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={1}>Bachelor's in Psychology</SelectItem>
                  <SelectItem value={2}>Master's in Psychology</SelectItem>
                  <SelectItem value={3}>Ph.D. in Psychology</SelectItem>
                  <SelectItem value={4}>Master's in Counseling</SelectItem>
                  <SelectItem value={5}>PsyD - Doctor of Psychology</SelectItem>
                  <SelectItem value={6}>
                    LCSW - Licensed Clinical Social Worker
                  </SelectItem>
                  <SelectItem value="7">
                    LPC - Licensed Professional Counselor
                  </SelectItem>
                  <SelectItem value="8">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`qualification-image-${index}`}>
                Qualification Image
              </Label>
              <Input
                id={`qualification-image-${index}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(index, e)}
              />
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          className="w-full mt-2"
          onClick={addQualification}
        >
          <PlusCircleIcon className="w-4 h-4 mr-2" />
          Add Another Qualification
        </Button>
      </div>

      <Button type="button" className="w-full" onClick={handleSubmit}>
        Register account
      </Button>
    </div>
  );
};

export default TherapistDetailsStep;
