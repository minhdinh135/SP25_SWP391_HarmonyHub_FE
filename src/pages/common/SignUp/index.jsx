import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign up logic here
  };
  return (
    <main className="min-h-screen w-full flex flex-col md:flex-row bg-gray-50">
      <div className="w-full md:w-1/2 bg-gray-900 text-white p-8 flex flex-col justify-center items-center">
        <div className="max-w-md space-y-6">
          <img
            src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=2080&auto=format&fit=crop"
            alt="Decorative workspace"
            className="rounded-lg shadow-xl w-full object-cover aspect-video"
          />
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-gray-400">
              Join our session and start your journey with us today.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Sign Up
            </CardTitle>
            <CardDescription className="text-center">
              Enter your details to create your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" required />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full">
                Create Account
              </Button>
              <p className="text-sm text-gray-500 text-center">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="text-blue-500 hover:text-blue-700 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
};

export default SignUp;
