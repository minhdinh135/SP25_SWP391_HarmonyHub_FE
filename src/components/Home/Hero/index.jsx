import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/homepic.png";

const Hero = () => {
  return (
    <section className="py-12 px-12 bg-blue-200">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              Build a Strong Foundation for Your Marriage
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              Start your journey to a happy, successful marriage with expert-led
              premarital counseling. Learn effective communication, conflict
              resolution, and how to align your values and goals as a couple.
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button className="w-full sm:w-auto">Get Started</Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Learn More
                <ArrowDownRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
          <img
            src={heroImage}
            alt="Hero section image"
            className="max-h-96 w-full rounded-md object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
