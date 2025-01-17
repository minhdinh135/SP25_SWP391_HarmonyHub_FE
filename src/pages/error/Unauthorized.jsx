import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock } from "lucide-react";
import unauthorizedImage from "@/assets/resistance-band.svg";

const Unauthorized = () => {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-6">
          <img
            src={unauthorizedImage}
            alt="403 Illustration"
            className="w-full max-w-[300px] mx-auto"
          />
          <div className="flex items-center justify-center gap-2">
            <Lock className="w-8 h-8 text-gray-900" />
            <h1 className="text-6xl font-bold text-gray-900">403</h1>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-700">
              Access Denied
            </h2>
            <p className="text-gray-500">
              Sorry, you don't have permission to access this page. Please
              contact your administrator if you think this is a mistake.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            className="gap-2"
            size="lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={16} />
            Go back
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => (window.location.href = "/")}
          >
            Return to home
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Unauthorized;
