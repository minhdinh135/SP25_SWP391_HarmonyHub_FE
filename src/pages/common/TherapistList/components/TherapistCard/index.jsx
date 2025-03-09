import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getGenderText } from "@/utils/enumUtils";
import { getFullName } from "@/utils/nameFormat";
import { ChevronDown, ChevronUp, Star, UserCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TherapistCard = ({ therapist }) => {
  const navigate = useNavigate();

  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const specialties = therapist.qualifications.map(
    (qualification) => qualification.specialty.name,
  );

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl group overflow-hidden">
      <div className="p-6 relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex space-x-6 items-center">
            <Avatar className="w-28 h-28 ring-4 ring-blue-50 transition-all group-hover:ring-blue-100">
              <AvatarImage
                src={therapist.avatarUrl}
                className="w-28 h-28 rounded-full object-cover"
              />
              <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                {getFullName(therapist.firstName, therapist.lastName)
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <h3 className="text-2xl font-bold text-gray-800">
                  {getFullName(therapist.firstName, therapist.lastName)}
                </h3>
                <UserCheck className="h-5 w-5 text-green-500" />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {getGenderText(therapist.gender)}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {therapist.yearsOfExperience} years experience
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {specialties.map((spec, index) => (
                  <span
                    key={index}
                    className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-2 rounded-full">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="text-sm font-bold text-yellow-600">
              {therapist.rating || "4.9"}
            </span>
            <span className="text-sm text-gray-500 ml-1">
              ({therapist.reviewCount || "9999"} reviews)
            </span>
          </div>
        </div>

        {/* Bio Section with Expand/Collapse */}
        <div className="mt-4 border-t border-gray-100 pt-4">
          <div className="flex items-start justify-between mb-4">
            <div className="w-full pr-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-700">About me</h4>
                <button
                  onClick={() => setIsBioExpanded(!isBioExpanded)}
                  className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium"
                >
                  {isBioExpanded ? (
                    <>
                      Show less <ChevronUp className="h-4 w-4 ml-1" />
                    </>
                  ) : (
                    <>
                      Read more <ChevronDown className="h-4 w-4 ml-1" />
                    </>
                  )}
                </button>
              </div>
              <p
                className={`text-sm text-gray-600 ${isBioExpanded ? "" : "line-clamp-2"}`}
              >
                {therapist.bio ||
                  "Licensed therapist specializing in anxiety, depression, and relationship issues. I believe in a holistic approach that combines evidence-based techniques with compassionate care tailored to each individual's unique needs and goals."}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2"></div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50 font-semibold"
                onClick={() => navigate(`/therapists/${therapist.id}`)}
              >
                View Profile
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                onClick={() =>
                  navigate(`/therapists/${therapist.id}/appointment-booking`)
                }
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistCard;
