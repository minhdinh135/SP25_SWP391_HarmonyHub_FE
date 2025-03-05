import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getFullName } from "@/utils/nameFormat";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TherapistCard = ({ therapist }) => {
  const navigate = useNavigate();
  const specialties = therapist.qualifications.map(
    (qualification) => qualification.specialty.name,
  );

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-md ring-2">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex space-x-4">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={therapist.avatarUrl}
                className="w-24 h-24 rounded-full object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {getFullName(therapist.firstName, therapist.lastName)}
              </h3>
              <span className="inline-block text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                Available
              </span>

              <span className="block text-sm text-gray-600">
                {therapist.yearsOfExperience} years experience
              </span>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {specialties.map((spec, index) => (
                    <span
                      key={index}
                      className="text-xs bg-[#EFF6FF] text-[#2563EB] px-2 py-1 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <p>{therapist.bio}</p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-900">4.9</span>
            <span className="text-sm text-gray-500">(9999 reviews)</span>
          </div>
        </div>

        <div className="flex flex-col space-y-2 items-end">
          <Button
            className="w-32 bg-[#2563EB] hover:bg-[#3B82F6] text-white font-semibold"
            onClick={() => navigate(`/therapists/${therapist.id}`)}
          >
            Book Appointment
          </Button>
          <Button
            className="w-32 bg-white hover:bg-gray-50 text-[#2563EB] border-2 border-[#2563EB] font-semibold"
            onClick={() => navigate(`/therapists/${therapist.id}`)}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TherapistCard;
