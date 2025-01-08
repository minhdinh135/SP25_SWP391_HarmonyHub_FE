import { motion } from "framer-motion";

const LandingButton = ({ scrollToSection, section1Ref }) => {
  return (
    <div className="flex space-x-4">
      <motion.button
        whileHover={{
          scale: 1.05,
          background:
            'linear-gradient(135deg, #142850 0%, #0C7B93 100%)',
        }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-[#142850] to-[#1B365D] text-white px-6 py-3 text-sm rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        JOIN US
      </motion.button>
      <motion.button
        whileHover={{
          scale: 1.05,
          background:
            'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => scrollToSection(section1Ref)}
        className="bg-white text-[#00A8CC] px-6 py-3 text-sm rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg border border-[#00A8CC]/20"
      >
        MORE ↓
      </motion.button>
    </div>
  );
};

export default LandingButton;
