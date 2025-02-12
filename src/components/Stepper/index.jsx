import React from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const Stepper = ({
  steps,
  initialStep = 1,
  onStepChange = () => {},
  children,
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState("next");

  const goToNext = () => {
    if (currentStep < steps.length) {
      setDirection("next");
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentStep > 1) {
      setDirection("prev");
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepClick = (stepNumber) => {
    setDirection(stepNumber > currentStep ? "next" : "prev");
    setCurrentStep(stepNumber);
  };

  useEffect(() => {
    onStepChange(currentStep);
  }, [currentStep, onStepChange]);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {/* Stepper Header */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={step} className="flex flex-1 items-center">
              {/* Step circle with number or check */}
              <div
                className="relative flex items-center justify-center cursor-pointer"
                onClick={() => handleStepClick(stepNumber)}
              >
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center
                    transition-all duration-200 ease-in-out
                    ${
                      isCompleted
                        ? "bg-blue-600 border-blue-600"
                        : isCurrent
                          ? "border-blue-600 text-blue-600"
                          : "border-gray-300 text-gray-300 hover:border-gray-400 hover:text-gray-400"
                    }`}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <span className={`text-sm font-semibold`}>
                      {stepNumber}
                    </span>
                  )}
                </div>

                {/* Step label */}
                <div className="absolute -bottom-6 w-max text-center">
                  <span
                    className={`text-sm font-medium
                      ${isCompleted || isCurrent ? "text-blue-600" : "text-gray-500"}`}
                  >
                    {step}
                  </span>
                </div>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2">
                  <div
                    className={`h-full transition-all duration-300 ease-in-out ${
                      stepNumber < currentStep ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="min-h-40 p-4">
        <div
          className={`transition-opacity duration-200 ease-in-out ${
            direction === "next" ? "animate-slide-left" : "animate-slide-right"
          }`}
        >
          {React.Children.toArray(children)[currentStep - 1]}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-4">
        <Button
          onClick={goToPrevious}
          disabled={currentStep === 1}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <Button
          onClick={goToNext}
          disabled={currentStep === steps.length}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Stepper;
