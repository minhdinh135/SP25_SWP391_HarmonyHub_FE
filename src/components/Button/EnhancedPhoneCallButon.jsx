import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import PhoneCallPopUp from "../PopUp/PhoneCallPopUp"; // You'll need to create this component
const EnhancedPhoneCallButton = () => {
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [isRinging, setIsRinging] = useState(false);

  const toggleCall = () => {
    setIsCallOpen((prev) => !prev);
    if (!isCallOpen) {
      setIsRinging(true);
      setTimeout(() => {
        setIsRinging(false); // Stop the ringing after a few seconds
      }, 5000); // Adjust this duration to your preference
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <motion.button
        onClick={toggleCall}
        className="bg-green-500 text-white rounded-full w-16 h-16 shadow-lg flex items-center justify-center text-2xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Phone Call"
      >
        <FontAwesomeIcon icon={faPhoneAlt} />
      </motion.button>

      {/* Ringing animation on the icon */}
      {isRinging && (
        <motion.div
          className="absolute w-20 h-20 border-4 border-dashed rounded-full border-yellow-500 animate-ping"
          style={{
            position: "absolute",
            top: "-10px",
            left: "-10px",
            zIndex: -1,
          }}
        />
      )}

      {isCallOpen && <PhoneCallPopUp onClose={toggleCall} />}
    </div>
  );
};

export default EnhancedPhoneCallButton;
