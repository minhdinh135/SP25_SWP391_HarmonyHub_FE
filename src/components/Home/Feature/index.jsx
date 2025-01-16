import { Timer, Zap, ZoomIn } from "lucide-react";

const Feature = () => {
  return (
    <section className="py-12 px-12">
      <div className="container">
        {/* <p className="mb-4 text-sm text-muted-foreground lg:text-base"> */}
        {/*   OUR VALUES */}
        {/* </p> */}
        <h2 className="text-3xl font-medium lg:text-4xl">
          Why Choose Our Counseling Services?
        </h2>
        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Timer className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium">Flexible Scheduling</h3>
            <p className="leading-7 text-muted-foreground">
              Our platform offers personalized session scheduling to fit your
              busy lifestyle. Book sessions at your convenience, and reschedule
              easily if needed.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <ZoomIn className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium">Certified Counselors</h3>
            <p className="leading-7 text-muted-foreground">
              Work with highly trained and experienced therapists who specialize
              in premarital counseling. Our experts are here to help you build a
              stronger bond.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Zap className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium">Innovative Approach</h3>
            <p className="leading-7 text-muted-foreground">
              Leverage proven counseling methods combined with modern tools to
              address your unique needs. Our sessions are tailored for today’s
              couples.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
