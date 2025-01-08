import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";
import EnhancedChatButton from "../components/Button/EnhancedChatButton";
import HomeNavBar from "../components/NavBar/HomeNavBar";
import homepic from "../assets/homepic.png";
import "@fontsource/poppins"
import LandingButton from "../components/Button/LandingButton";
const HomePage = () => {
  return (
    <ParallaxProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-sky-300">
        <header className="backdrop-filter backdrop-blur-lg shadow-lg fixed top-0 left-0 right-0 z-50">
          <HomeNavBar />
        </header>
        <main className="flex-grow">
          <section className="relative h-screen flex items-center">
            <div className="w-1/2 px-6 md:px-4">
              <Parallax speed={-5}>
                <motion.h1
                  className="text-10xl md:text-7xl sm:text-6xl font-bold mb-4 leading-tight text-[#142850] font-poppins"
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  Harmony Hub
                </motion.h1>
                <motion.p
                  className="mt-4 text-lg md:text-base sm:text-sm text-gray-600 tracking-wide"
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
                >
                  <LandingButton />
                </motion.p>
              </Parallax>
            </div>
            <div className="w-1/2 flex justify-center">
              <Parallax speed={10}>
                <motion.img
                  src={homepic}
                  alt="Custom Graphic"
                  className="w-3/4 h-auto"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2 }}
                />
              </Parallax>
            </div>
          </section>
        </main>
        <footer className="bg-blue-500 text-white py-4 text-center">
          <p>&copy; 2025 My Website. All Rights Reserved.</p>
          <EnhancedChatButton />
        </footer>
      </div>
    </ParallaxProvider>
  );
};
export default HomePage;
