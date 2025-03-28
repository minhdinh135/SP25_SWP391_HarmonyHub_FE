import { motion } from "framer-motion";
import heroImage from "@/assets/hero.jpg";

const Hero = () => {
  return (
    <section className=" py-12 px-12 bg-[#F6F4F0]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="grid items-center gap-8 lg:grid-cols-2"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <h1 className="text-[#2E5077] my-6 text-pretty text-4xl font-bold lg:text-6xl">
              Build a Strong Foundation for Your Marriage
            </h1>
            <p className="text-[#4DA1A9] mb-8 max-w-xl text-muted-foreground lg:text-xl">
              Start your journey to a happy marriage with expert-led premarital
              counseling. Build strong communication, resolve conflicts, and
              align your values as a couple.
            </p>
          </motion.div>
          <motion.img
            src={heroImage}
            alt="Hero section image"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="max-h-96 w-full rounded-md object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
