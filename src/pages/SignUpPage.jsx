
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-white to-[#00A8CC]">
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 bg-[#142850] p-2 rounded-full shadow-md hover:bg-[#0C7B93] transition-colors duration-300"
      >
        <MdArrowBack size={24} className="text-white" />
      </button>
      <div className="w-full flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="text-4xl font-bold text-[#142850] mb-8 text-center">
            Create Your Account
          </h2>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-lg font-medium text-[#142850]"
              >
                Full Name:
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-4 text-lg border border-[#27496D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27496D]"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-lg font-medium text-[#142850]"
              >
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-4 text-lg border border-[#27496D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27496D]"
                placeholder="Enter your email"
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
                placeholder="Create a password"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-lg font-medium text-[#142850]"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full p-4 text-lg border border-[#27496D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27496D]"
                placeholder="Confirm your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 text-lg bg-[#00A8CC] text-white rounded-lg hover:bg-[#27496D] focus:ring-2 focus:ring-orange-500"
            >
              Sign Up
            </button>
          </form>
          <p className="my-6 text-md text-gray-400 text-center">or sign up with</p>
          <div className="mt-6 text-center"></div>
          <div className="text-lg text-gray-600 mt-6 text-center">
            Already have an account?{' '}
            <a href="/login" className="text-[#0C7B93] hover:text-red-500">
              Log In
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
