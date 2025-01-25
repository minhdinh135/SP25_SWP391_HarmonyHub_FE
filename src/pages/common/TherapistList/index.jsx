import { Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemList from "@/components/ItemList";
import TherapistCard from "./components/TherapistCard";
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
        <ItemList
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          data={therapists}
          renderItem={(therapist) => <TherapistCard therapist={therapist} />}
        />
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
