import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const CommonLayout = () => {
  return (
    <div className="w-full mx-auto min-h-screen flex flex-col overflow-auto">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default CommonLayout;
