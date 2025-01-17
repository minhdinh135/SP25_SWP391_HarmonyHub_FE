import {
  Heart,
  Phone,
  MessageSquare,
  Clock,
  Menu,
  X,
  Search,
  Star,
  Calendar,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const therapists = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    credentials: "Ph.D. in Marriage Counseling",
    specializations: [
      "Marriage Counseling",
      "Relationship Therapy",
      "Pre-marriage Counseling",
    ],
    experience: "15 years",
    rating: 4.9,
    reviewCount: 127,
    available: true,
    bio: "Specializing in helping couples build stronger relationships through evidence-based therapy approaches.",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    credentials: "Psy.D. Clinical Psychology",
    specializations: [
      "Couples Therapy",
      "Family Counseling",
      "Conflict Resolution",
    ],
    experience: "12 years",
    rating: 4.8,
    reviewCount: 98,
    available: true,
    bio: "Dedicated to creating a safe space for couples to grow and heal together.",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    credentials: "Ph.D. in Family Therapy",
    specializations: [
      "Marriage Counseling",
      "Relationship Recovery",
      "Communication",
    ],
    experience: "10 years",
    rating: 4.9,
    reviewCount: 156,
    available: false,
    bio: "Helping couples discover new ways to connect and communicate effectively.",
  },
];
const TherapistList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="w-full min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Expert Relationship Counselors
          </h1>
          <p className="text-lg text-gray-600">
            Meet our team of certified therapists dedicated to helping couples
            build stronger relationships
          </p>
        </div>
        <div className="mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search therapists by name or specialization..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {therapists.map((therapist) => (
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
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Don't see the right therapist for you?
          </p>
          <Button className="bg-[#2563EB] hover:bg-[#3B82F6] text-white font-semibold px-8">
            Request Therapist Match
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TherapistList;
