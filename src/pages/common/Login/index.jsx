import { accountLogin } from "@/api/authApi";
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
import { useToast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: form.email,
      password: form.password,
    };

    try {
      const user = await accountLogin(payload);
      login(user);
      toast({
        title: "Success",
        description: "Login successfully",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Login failed",
      });
    }
  };
  return (
    <main className="min-h-screen w-full flex flex-col md:flex-row ">
      <div className="w-full md:w-1/2 bg-gray-900 text-white p-8 flex flex-col justify-center items-center">
        <div className="max-w-md space-y-6">
          <img
            src="https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?q=80&w=2574&auto=format&fit=crop"
            alt="Decorative workspace"
            className="rounded-lg shadow-xl w-full object-cover aspect-video"
          />
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Welcome To HarmonyHub!</h1>
            <p className="text-gray-400">
              Login to access your account and
              continue your journey.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to login to your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={handleChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full">
                Sign in
              </Button>
              <p className="text-sm text-gray-500 text-center">
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-blue-500 hover:text-blue-700 font-medium"
                >
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
};

export default Login;
