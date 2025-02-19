import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import ChatPopUp from "../PopUp/ChatPopUp";
const EnhancedChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <motion.button
        onClick={toggleChat}
        className="bg-blue-500 text-white rounded-full w-16 h-16 shadow-lg flex items-center justify-center text-2xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Chat"
      >
        <FontAwesomeIcon icon={faComments} />
      </motion.button>
      {isChatOpen && <ChatPopUp onClose={toggleChat} />}
    </div>
  );
};

export default EnhancedChatButton;
