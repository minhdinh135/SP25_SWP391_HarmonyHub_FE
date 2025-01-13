import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
const PhoneCallPopUp = ({ onClose }) => {
  return (
    <div className="fixed bottom-20 right-4 bg-white shadow-lg rounded-lg p-6 w-64">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-green-500">Incoming Call</h3>
        <button onClick={onClose} className="text-gray-600 hover:text-red-500">
          <FontAwesomeIcon icon={faPhoneAlt} />
        </button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-gray-700">Someone is calling you!</p>
        <button
          onClick={onClose}
          className="mt-4 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-all"
        >
          Answer Call
        </button>
      </div>
    </div>
  );
};
export default PhoneCallPopUp;
