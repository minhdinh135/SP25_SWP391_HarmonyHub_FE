import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


const CTA = () => {
  return (
    <section className="py-12 px-12 bg-[#F6F4F0]">
      <div className="container">
        <div className="flex w-full flex-col gap-16 overflow-hidden rounded-lg p-8 md:rounded-xl lg:flex-row lg:items-center lg:p-16">
          <div className="flex-1">
            <h3 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              Start Your Journey to a Stronger Relationship
            </h3>
            <p className="text-muted-foreground lg:text-lg">
              Build a solid foundation for your future together. Explore our
              personalized premarital counseling sessions designed to help
              couples communicate effectively and prepare for a lasting
              partnership.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="w-full sm:w-auto bg-[#2E5077] hover:bg-[#79D7BE]"
              onClick={() => navigate("/sign-up")}
            >
              Learn More
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto text-[#2E5077] border-2 border-[#2E5077]"
              onClick={() => navigate("/therapists")}
            >
              Find Therapists
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
