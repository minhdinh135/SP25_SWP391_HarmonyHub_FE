import 'react-toastify/dist/ReactToastify.css'
import { MdArrowBack } from 'react-icons/md'
const Login = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-white to-[#00A8CC]">
      <button
        className="absolute top-4 left-4 bg-[#142850] p-2 rounded-full shadow-md hover:bg-[#0C7B93] transition-colors duration-300"
      >
        <MdArrowBack size={24} className="text-white" />
      </button>

      <div className="w-full flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="text-4xl font-bold text-[#142850] mb-8 text-center">
            Log in to continue your journey
          </h2>
          <form className="space-y-6" >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-lg font-medium text-[#142850]"
              >
                Account:
              </label>
              <input
                type="text"
                id="account"
                className="w-full p-4 text-lg border border-[#27496D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27496D]"
                placeholder="Enter your email or username"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-lg font-medium text-[#142850]"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-4 text-lg border border-[#27496D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27496D]"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 text-lg bg-[#00A8CC] text-white rounded-lg hover:bg-[#27496D] focus:ring-2 focus:ring-orange-500"
            >
              Log In
            </button>
          </form>
          <p className="my-6 text-md text-gray-400 text-center">
            or continue with
          </p>
          <div className="mt-6 text-center">
          </div>
          <div className="mt-6 text-center">
            <a
              href="/forgot-password"
              className="text-lg text-[#0C7B93] hover:text-red-500"
            >
              Forgot password?
            </a>
          </div>
          <div className="text-lg text-gray-600 mt-6 text-center">
            Don&apos;t have an account?{' '}
            <a href="/sign-up" className="text-[#0C7B93] hover:text-red-500">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Login
