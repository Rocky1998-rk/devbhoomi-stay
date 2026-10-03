import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const WebsiteLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9] text-[#101828]">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default WebsiteLayout;

