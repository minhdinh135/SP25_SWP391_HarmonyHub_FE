import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faInfoCircle, faPhone, faBars } from "@fortawesome/free-solid-svg-icons";

const HomeNavBar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#27496D] to-[#0C7B93] text-white shadow-lg z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-semibold flex items-center">
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          Harmony Hub
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <a
            href="/"
            className="hover:text-gray-200 transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="/about"
            className="hover:text-gray-200 transition-colors duration-200"
          >
            About
          </a>
          <a
            href="#service"
            className="hover:text-gray-200 transition-colors duration-200"
          >
            Service
          </a>
          <a
            href="#contact"
            className="hover:text-gray-200 transition-colors duration-200"
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-2xl focus:outline-none hover:text-gray-200 transition-colors duration-200"
          aria-label="Toggle Menu"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </nav>
  );
};

export default HomeNavBar;
