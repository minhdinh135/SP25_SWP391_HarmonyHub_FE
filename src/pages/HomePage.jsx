import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";
import EnhancedChatButton from "../components/Button/EnhancedChatButton";
import HomeNavBar from "../components/NavBar/HomeNavBar";
import homepic from "../assets/homepic.png";
import portrait from "../assets/portrait-couple.png"
import therapist from "../assets/therapist.jpg"
import "@fontsource/poppins";
import LandingButton from "../components/Button/LandingButton";
const HomePage = () => {
  return (
    <ParallaxProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-sky-500">
        <header className="backdrop-filter backdrop-blur-lg shadow-lg fixed top-0 left-0 right-0 z-50">
          <HomeNavBar />
        </header>
        <main className="flex-grow">
          <section className="relative h-screen flex flex-col md:flex-row justify-start px-6 md:px-20 md:pt-40 ">
            <div className="md:w-1/2 w-full md:text-left pt-10">
              <Parallax >
                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight text-[#142850] font-poppins"
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  Harmony Hub
                </motion.h1>
                <motion.p
                  className="mt-4 text-base md:text-lg text-gray-600 tracking-wide"
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
                >
                  Pre-marital Counseling Platform
                </motion.p>
                <div className="mt-6 flex justify-center md:justify-start">
                  <LandingButton />
                </div>
              </Parallax>
            </div>
            <div className="md:w-3/4 w-full flex justify-center">
              <Parallax speed={10}>
                <motion.img
                  src={portrait}
                  alt="Harmony Hub"
                  className="md:w-full max-w-xs md:max-w-md lg:max-w-lg "
                  initial={{ opacity: 0, x: 50, scale: 1 }}
                  animate={{ opacity: 1, x: 0, scale: 2 }}
                  transition={{ duration: 0.5 }}
                />
              </Parallax>
            </div>
          </section>
          <section className="relative py-20 bg-white">
            <div className="container mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 w-full mb-8 md:mb-0">
                <Parallax speed={-3}>
                  <motion.h2
                    className="text-3xl md:text-4xl font-bold text-[#142850] mb-4"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    Build Strong Foundations
                  </motion.h2>
                  <motion.p
                    className="text-gray-600 text-base md:text-lg tracking-wide"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
                  >
                    Learn essential communication skills and conflict resolution techniques to ensure a happy and successful marriage.
                  </motion.p>
                </Parallax>
              </div>
              <div className="md:w-1/2 w-full flex justify-center">
                <Parallax speed={5}>
                  <motion.img
                    src={therapist}
                    alt="Build Strong Foundations"
                    className="w-3/4 md:w-full max-w-sm md:max-w-md"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </Parallax>
              </div>
            </div>
          </section>
          <section className="relative py-20 bg-gradient-to-b from-sky-300 to-white">
            <div className="container mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 w-full mb-8 md:mb-0">
                <Parallax speed={-3}>
                  <motion.h2
                    className="text-3xl md:text-4xl font-bold text-[#142850] mb-4"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    Personalized Counseling
                  </motion.h2>
                  <motion.p
                    className="text-gray-600 text-base md:text-lg tracking-wide"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
                  >
                    Get access to tailored counseling sessions designed to meet your specific relationship goals and challenges.
                  </motion.p>
                </Parallax>
              </div>
              <div className="md:w-1/2 w-full flex justify-center">
                <Parallax speed={5}>
                  <motion.img
                    src={homepic}
                    alt="Personalized Counseling"
                    className="w-3/4 md:w-full max-w-sm md:max-w-md"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </Parallax>
              </div>
            </div>
          </section>
        </main>
        <footer className="bg-blue-500 text-white py-4 text-center">
          <p className="text-sm md:text-base">&copy; 2025 Harmony Hub. All Rights Reserved.</p>
          <div className="mt-2">
            <EnhancedChatButton />
          </div>
        </footer>
      </div>
    </ParallaxProvider>
  );
};
export default HomePage;
