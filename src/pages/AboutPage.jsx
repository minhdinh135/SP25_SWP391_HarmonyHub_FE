import { motion } from "framer-motion";
const AboutUsPage = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <section className="flex flex-col items-center space-y-6 text-center">
        <motion.h1
          className="text-4xl font-extrabold text-primary sm:text-5xl md:text-6xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          About HarmonyHub
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 sm:text-xl md:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          HarmonyHub is dedicated to providing expert pre-marital counseling to
          help couples build strong, lasting relationships. We focus on
          communication, trust-building, and resolving conflicts before marriage
          to ensure a harmonious future together.
        </motion.p>
      </section>

      {/* Our Mission */}
      <section className="mt-12 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        <div className="md:w-1/2 flex flex-col items-center md:items-start">
          <motion.h2
            className="text-3xl font-semibold text-primary sm:text-4xl md:text-5xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Our Mission
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 sm:text-xl md:text-2xl mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Our mission is to help couples prepare for a lifetime of happiness
            by offering comprehensive pre-marital counseling that covers
            everything from effective communication to conflict management and
            emotional support.
          </motion.p>
        </div>

        {/* Image */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="/path-to-your-image.jpg" // Update with the correct path
            alt="HarmonyHub Team"
            className="max-w-xs md:max-w-lg rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
      </section>

      {/* Our Approach */}
      <section className="mt-12 text-center">
        <motion.h2
          className="text-3xl font-semibold text-primary sm:text-4xl md:text-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Our Approach
        </motion.h2>
        <motion.p
          className="text-lg text-gray-700 sm:text-xl md:text-2xl mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          At HarmonyHub, we use research-backed techniques and real-world
          strategies to help couples build the necessary tools for a successful
          marriage. Our counselors guide you through practical exercises in
          communication, empathy, and conflict resolution.
        </motion.p>
      </section>

      {/* Testimonials Section */}
      <section className="mt-12 text-center">
        <motion.h2
          className="text-3xl font-semibold text-primary sm:text-4xl md:text-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          What Our Clients Say
        </motion.h2>
        <div className="mt-6 space-y-6 sm:space-y-8">
          <motion.blockquote
            className="italic text-gray-700 text-lg sm:text-xl md:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            "HarmonyHub's counseling helped us communicate better and prepared
            us for the challenges of marriage. We are now more confident in our
            relationship!" – Sarah & John
          </motion.blockquote>
          <motion.blockquote
            className="italic text-gray-700 text-lg sm:text-xl md:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            "We learned so much about each other and the importance of emotional
            support. The tools we gained from our sessions have been
            invaluable." – Emily & Mark
          </motion.blockquote>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
