import EnhancedChatButton from "../components/Button/EnhancedChatButton";

const Homepage = () => {
  return (
    <div className="font-sans text-center">
      {/* Header Section */}
      <header className="bg-green-500 text-white py-6">
        <h1 className="text-4xl font-bold">Welcome to Our Website</h1>
        <p className="mt-2 text-lg">Your go-to place for relationship and marriage advice!</p>
      </header>

      {/* Content Section */}
      <section className="py-8 px-4">
        <h2 className="text-2xl font-semibold">Get Started</h2>
        <p className="mt-4 text-gray-700">
          Explore articles, tips, and resources to help you build a stronger relationship.
        </p>
        <button className="mt-6 px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition">
          Start Exploring
        </button>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-100 py-4 mt-8">
        <p className="text-gray-600">&copy; 2025 Our Website</p>
        <EnhancedChatButton />
      </footer>
    </div>
  );
};

export default Homepage;
