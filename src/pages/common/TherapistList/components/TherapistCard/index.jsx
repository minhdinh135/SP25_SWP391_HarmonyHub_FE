import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TherapistCard = ({ therapist }) => {
  const navigate = useNavigate();

  return (
    <div
      key={therapist.id}
      className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <img
            src={therapist.image}
            alt={therapist.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {therapist.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {therapist.credentials}
            </p>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-900">
                {therapist.rating}
              </span>
              <span className="text-sm text-gray-500">
                ({therapist.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              {therapist.experience} experience
            </span>
            {therapist.available ? (
              <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                Available
              </span>
            ) : (
              <span className="text-sm text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                Fully Booked
              </span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {therapist.specializations.map((spec, index) => (
              <span
                key={index}
                className="text-xs bg-[#EFF6FF] text-[#2563EB] px-2 py-1 rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-6">{therapist.bio}</p>
        <div className="space-y-2">
          <Button
            className="w-full bg-[#2563EB] hover:bg-[#3B82F6] text-white font-semibold"
            onClick={() => navigate(`/therapists/${therapist.id}`)}
          >
            Book Appointment
          </Button>
          <Button
            className="w-full bg-white hover:bg-gray-50 text-[#2563EB] border-2 border-[#2563EB] font-semibold"
            onClick={() => navigate(`/therapists/${therapist.id}`)}
          >
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TherapistCard;
