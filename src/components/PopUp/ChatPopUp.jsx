const ChatPopUp = ({ onClose }) => {
  return (
    <div className="fixed bottom-24 right-4 w-80 bg-white rounded-lg shadow-lg z-50">
      <div className="bg-blue-500 text-white flex justify-between items-center p-3 rounded-t-lg">
        <span className="text-lg font-semibold">Chat</span>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 focus:outline-none"
          aria-label="Close chat"
        >
          ✖
        </button>
      </div>
      <div className="p-4 h-64 overflow-y-auto">
        <p className="text-gray-700">Welcome to the chat! How can we help you today?</p>
      </div>
      <div className="p-3 border-t">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
};

export default ChatPopUp;

