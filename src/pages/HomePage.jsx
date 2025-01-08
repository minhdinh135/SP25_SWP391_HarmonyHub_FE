import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import EnhancedChatButton from "../components/Button/EnhancedChatButton";
import HomeNavBar from "../components/NavBar/HomeNavBar";

const HomePage = () => {
  return (
    <ParallaxProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-sky-300">
        {/* Header Section */}
        <header className="backdrop-filter backdrop-blur-lg shadow-lg fixed top-0 left-0 right-0 z-50">
          <HomeNavBar />
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          {/* Example Parallax Section */}
          <section className="h-screen flex items-center justify-center">
            <Parallax speed={-10}>
              <h1 className="text-5xl font-bold text-blue-700">
                Harmony Hub
              </h1>
            </Parallax>
          </section>

          {/* Additional Content */}
          <section className="h-screen bg-white flex items-center justify-center">
            <Parallax speed={-5}>
              <h2 className="text-3xl font-bold text-gray-800">Explore More</h2>
            </Parallax>
          </section>
        </main>

        {/* Footer Section */}
        <footer className="bg-blue-500 text-white py-4 text-center">
          <p>&copy; 2025 My Website. All Rights Reserved.</p>
          <EnhancedChatButton />
        </footer>
      </div>
    </ParallaxProvider>
  );
};

export default HomePage;
