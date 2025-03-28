import { motion } from "framer-motion";
import teamImage from "@/assets/thinking-guy.jpg";
import { useNavigate } from "react-router-dom";

const AboutUsPage = () => {
  const navigate = useNavigate();
  // Animation variants for consistent effects
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: delay * 0.2 },
    }),
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      {/* Header Section with gradient background */}
      <section className="rounded-2xl bg-gradient-to-br from-[#4DA1A9] to-[#79D7BE] p-8 mb-16 shadow-lg">
        <div className="flex flex-col items-center space-y-6 text-center">
          <motion.h1
            className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeIn}
          >
            About HarmonyHub
          </motion.h1>
          <motion.div
            className="h-1 w-24 bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <motion.p
            className="text-lg text-white sm:text-xl md:text-2xl max-w-3xl"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeIn}
          >
            HarmonyHub is dedicated to providing expert pre-marital counseling
            to help couples build strong, lasting relationships. We focus on
            communication, trust-building, and resolving conflicts before
            marriage to ensure a harmonious future together.
          </motion.p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="mt-24 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2 flex flex-col">
          <motion.h2
            className="text-3xl font-semibold text-[#2E5077] sm:text-4xl md:text-5xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeIn}
          >
            Our Mission
          </motion.h2>
          <motion.div
            className="h-1 w-16 bg-[#79D7BE] rounded-full mt-2"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.p
            className="text-lg text-gray-700 sm:text-xl mt-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeIn}
          >
            Our mission is to help couples prepare for a lifetime of happiness
            by offering comprehensive pre-marital counseling that covers
            everything from effective communication to conflict management and
            emotional support.
          </motion.p>
        </div>

        {/* Image with enhanced hover effect */}
        <motion.div
          className="md:w-1/2 flex justify-center overflow-hidden rounded-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative group">
            <img
              src={teamImage}
              alt="HarmonyHub Team"
              className="rounded-lg shadow-xl group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2E5077]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
              <p className="text-white font-medium p-6">
                Our expert counseling team
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Our Approach with cards */}
      <section className="mt-24">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl font-semibold text-[#4DA1A9] sm:text-4xl md:text-5xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeIn}
          >
            Our Approach
          </motion.h2>
          <motion.div
            className="h-1 w-24 bg-[#79D7BE] rounded-full mx-auto mt-2"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {[
            {
              title: "Communication",
              description:
                "Learn effective communication techniques to express needs, desires, and concerns.",
            },
            {
              title: "Conflict Resolution",
              description:
                "Master the art of resolving disagreements constructively and with mutual respect.",
            },
            {
              title: "Emotional Support",
              description:
                "Develop skills to provide meaningful emotional support during challenging times.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index + 1}
              variants={fadeIn}
            >
              <div className="h-12 w-12 rounded-full bg-[#79D7BE] flex items-center justify-center mb-4">
                <span className="text-white text-2xl font-bold">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-[#2E5077] mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section with enhanced cards */}
      <section className="mt-24 mb-16">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl font-semibold text-[#2E5077] sm:text-4xl md:text-5xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeIn}
          >
            What Our Clients Say
          </motion.h2>
          <motion.div
            className="h-1 w-24 bg-[#4DA1A9] rounded-full mx-auto mt-2"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              quote:
                "HarmonyHub's counseling helped us communicate better and prepared us for the challenges of marriage. We are now more confident in our relationship!",
              authors: "Sarah & John",
              img: "👩‍❤️‍👨",
            },
            {
              quote:
                "We learned so much about each other and the importance of emotional support. The tools we gained from our sessions have been invaluable.",
              authors: "Emily & Mark",
              img: "💑",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-8 border border-gray-100"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index + 1}
              variants={fadeIn}
            >
              <div className="text-6xl mb-4">{testimonial.img}</div>
              <blockquote className="italic text-gray-700 text-lg mb-4">
                "{testimonial.quote}"
              </blockquote>
              <div className="font-medium text-[#4DA1A9]">
                – {testimonial.authors}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        className="mt-24 text-center bg-[#2E5077] text-white p-12 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-6">
          Ready to Begin Your Journey?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Take the first step toward a harmonious marriage by scheduling your
          consultation today.
        </p>
        <motion.button
          className="bg-[#79D7BE] hover:bg-[#4DA1A9] text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/quizzes")}
        >
          Take Quiz
        </motion.button>
      </motion.section>
    </div>
  );
};

export default AboutUsPage;
