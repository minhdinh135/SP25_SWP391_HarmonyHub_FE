import ItemList from "@/components/ItemList";
import { Search } from "lucide-react";
import { useState } from "react";
import TherapistCard from "./components/TherapistCard";
import { useEffect } from "react";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";
import { getAllTherapists } from "@/api/accountApi";
import { getFullName } from "@/utils/nameFormat";

const TherapistList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [therapists, setTherapists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getAllTherapists();
        setTherapists(data);
      } catch (error) {
        console.log(error);
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredTherapists = therapists.filter((therapist) =>
    getFullName(therapist.firstName, therapist.lastName)
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  if (isLoading) return <Spinner />;

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
                placeholder="Search therapists by name"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        {filteredTherapists.length > 0 ? (
          <ItemList
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            data={filteredTherapists}
            renderItem={(therapist) => (
              <TherapistCard key={therapist.id} therapist={therapist} />
            )}
          />
        ) : (
          <div className="text-center text-gray-500 mt-8">
            No therapists found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default TherapistList;
