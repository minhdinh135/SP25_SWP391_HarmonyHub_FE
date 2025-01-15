import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-6">
          <img
            src="https://illustrations.popsy.co/white/resistance-band.svg"
            alt="404 Illustration"
            className="w-full max-w-[300px] mx-auto"
          />
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-700">
              Page not found
            </h2>
            <p className="text-gray-500">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
        </div>
        <Button
          className="gap-2"
          size="lg"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={16} />
          Go back
        </Button>
      </div>
    </main>
  );
};
export default NotFound;
