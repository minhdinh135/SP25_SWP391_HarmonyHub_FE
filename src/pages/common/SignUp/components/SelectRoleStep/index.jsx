import { Button } from "@/components/ui/button";
import { StethoscopeIcon, Users2Icon } from "lucide-react";

const SelectRoleStep = ({ handleRoleSelection }) => {
  return (
    <div className="w-full flex flex-col items-center space-y-6 py-8">
      <h1 className="text-2xl font-semibold text-[#2E5077]">
        Choose Your Role
      </h1>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
        <Button
          onClick={() => handleRoleSelection("Member")}
          className="w-56 h-36 bg-[#2E5077] text-white hover:bg-[#4DA1A9] transition-all duration-300 group flex flex-col items-center justify-center gap-2"
        >
          <Users2Icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
          <span className="text-lg font-medium">Member</span>
          <span className="text-xs text-center opacity-80">
            For individuals seeking support
          </span>
        </Button>
        <Button
          onClick={() => handleRoleSelection("Therapist")}
          className="w-56 h-36 bg-[#79D7BE] text-[#2E5077] hover:bg-[#2E5077] hover:text-white transition-all duration-300 group flex flex-col items-center justify-center gap-2"
        >
          <StethoscopeIcon className="w-8 h-8 group-hover:scale-110 transition-transform" />
          <span className="text-lg font-medium">Therapist</span>
          <span className="text-xs text-center opacity-80">
            For licensed mental health professionals
          </span>
        </Button>
      </div>
    </div>
  );
};

export default SelectRoleStep;
