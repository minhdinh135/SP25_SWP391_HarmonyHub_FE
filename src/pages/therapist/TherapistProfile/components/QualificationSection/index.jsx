import { Label } from "@/components/ui/label";

const QualificationSection = ({ therapistDetails }) => {
  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Qualifications</Label>
      {therapistDetails?.qualifications?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {therapistDetails.qualifications.map((qualification) => (
            <div
              key={qualification.id}
              className="bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4">
                {qualification.imageUrl && (
                  <img
                    // src={qualification.imageUrl}
                    src="https://www.github.com/shadcn.png"
                    alt={qualification.specialty.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium">{qualification.specialty.name}</p>
                  <p className="text-sm text-gray-600">
                    {qualification.specialty.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No qualifications added yet.</p>
      )}
    </div>
  );
};

export default QualificationSection;
