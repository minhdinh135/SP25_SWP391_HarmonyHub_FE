import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-12 px-12 bg-blue-100">
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
              variant="outline"
              className="text-blue-600 border-2 border-blue-600"
            >
              Learn More
            </Button>
            <Button className="bg-blue-600">Find Therapists</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
