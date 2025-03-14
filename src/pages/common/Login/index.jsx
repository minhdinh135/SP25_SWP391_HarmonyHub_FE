import { accountLogin } from "@/api/authApi";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, ArrowRightIcon } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    const payload = {
      email: form.email,
      password: form.password,
      rememberMe,
    };

    try {
      const user = await accountLogin(payload);
      login(user);
      toast.success("Welcome back to Harmony Hub!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error?.message || "Login failed. Please check your credentials.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full flex flex-col md:flex-row bg-gray-50">
      {/* Left sidebar - Branding section */}
      <div className="w-full md:w-1/2 lg:w-2/5 bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 sm:p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto space-y-6 py-8">
          <div className="flex items-center mb-6"></div>

          <img
            src="https://damonashworthpsychology.com/wp-content/uploads/2021/12/250f2-pexels-photo-4101143.jpeg?w=1568"
            alt="HarmonyHub Logo"
            className="rounded-lg shadow-xl w-full object-cover aspect-video"
          />

          <div className="space-y-4 mt-6">
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p className="text-gray-300 text-lg">
              Login to access your account and continue your journey with
              HarmonyHub.
            </p>
          </div>
        </div>
      </div>

      {/* Right section - Login form */}
      <div className="w-full md:w-1/2 lg:w-3/5 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <Card className="w-full max-w-md shadow-lg border-0">
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="h-11"
                  required
                  autoComplete="email"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  {/* <Link */}
                  {/*   to="/forgot-password" */}
                  {/*   className="text-sm text-blue-600 hover:text-blue-800 transition-colors" */}
                  {/* > */}
                  {/*   Forgot password? */}
                  {/* </Link> */}
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    className="h-11 pr-10"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* <div className="flex items-center space-x-2 pt-2"> */}
              {/*   <input */}
              {/*     type="checkbox" */}
              {/*     id="remember" */}
              {/*     className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" */}
              {/*     checked={rememberMe} */}
              {/*     onChange={() => setRememberMe(!rememberMe)} */}
              {/*   /> */}
              {/*   <Label htmlFor="remember" className="text-sm text-gray-600"> */}
              {/*     Remember me for 30 days */}
              {/*   </Label> */}
              {/* </div> */}
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-2">
              <Button
                type="submit"
                className="w-full h-11 bg-[#4DA1A9] hover:bg-[#2E5077] transition-colors flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner className="h-5 w-5" />
                ) : (
                  <>
                    Sign in <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <div className="relative py-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  {/* <span className="bg-white px-2 text-sm text-gray-500"> */}
                  {/*   Or continue with */}
                  {/* </span> */}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* <Button */}
                {/*   type="button" */}
                {/*   variant="outline" */}
                {/*   className="h-11" */}
                {/*   onClick={() => toast.info("Google login coming soon!")} */}
                {/* > */}
                {/*   <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24"> */}
                {/*     <path */}
                {/*       d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" */}
                {/*       fill="#4285F4" */}
                {/*     /> */}
                {/*     <path */}
                {/*       d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" */}
                {/*       fill="#34A853" */}
                {/*     /> */}
                {/*     <path */}
                {/*       d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" */}
                {/*       fill="#FBBC05" */}
                {/*     /> */}
                {/*     <path */}
                {/*       d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" */}
                {/*       fill="#EA4335" */}
                {/*     /> */}
                {/*     <path d="M1 1h22v22H1z" fill="none" /> */}
                {/*   </svg> */}
                {/*   Google */}
                {/* </Button> */}
                {/**/}
                {/* <Button */}
                {/*   type="button" */}
                {/*   variant="outline" */}
                {/*   className="h-11" */}
                {/*   onClick={() => toast.info("GitHub login coming soon!")} */}
                {/* > */}
                {/*   <svg */}
                {/*     className="h-5 w-5 mr-2" */}
                {/*     viewBox="0 0 24 24" */}
                {/*     fill="currentColor" */}
                {/*   > */}
                {/*     <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /> */}
                {/*   </svg> */}
                {/*   GitHub */}
                {/* </Button> */}
              </div>

              <p className="text-sm text-gray-600 text-center pt-4">
                Don&apos;t have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Sign up for free
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
