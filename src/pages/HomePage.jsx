import { useRef } from "react";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";
import EnhancedChatButton from "../components/Button/EnhancedChatButton";
import HomeNavBar from "../components/NavBar/HomeNavBar";
import portrait from "../assets/portrait-couple.png"
import therapist from "../assets/therapist.jpg"
import "@fontsource/poppins";
import LandingButton from "../components/Button/LandingButton";
import Feedback from "../components/Feedback";
const HomePage = () => {
  const section1Ref = useRef(null);
  return (
    <ParallaxProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-[#00A8CC]">
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
                  <LandingButton section1Ref={section1Ref} />
                </div>
                <div className="md:w-1/2">
                  {/* <FeedbackCardSlider /> */}
                </div>
              </Parallax>
            </div>
            <div className="md:w-3/4 w-full flex justify-center">
              <Parallax >
                <motion.img
                  src={portrait}
                  alt="Harmony Hub"
                  className="md:w-full max-w-xs md:max-w-md lg:max-w-lg "
                  initial={{ opacity: 0, x: 50, scale: 1 }}
                  animate={{ opacity: 1, x: 0, scale: 2.3 }}
                  transition={{ duration: 0.35 }}
                />
              </Parallax>
            </div>
          </section>
        </main>
        <section ref={section1Ref} className="relative py-20 bg-white">
          <div className="container mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 w-full mb-8 md:mb-0">
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
            <div className="md:w-1/2 w-full flex justify-center">
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
          </div>
        </section>
        <section className="relative h-screen bg-gradient-to-b from-[#D9EAFD] to-white  ">
          <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-7xl px-4">
              <h1 className="text-3xl font-bold text-center mb-8">Customer Feedback</h1>
              <Feedback />
            </div>
          </div>
        </section>
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
