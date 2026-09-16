import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import { ToastContainer } from "../components/common/Toast";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen dark:bg-navy-950/30 bg-white/30 overflow-x-hidden">
      <Sidebar />

      {/* Main Content */}
      <div className="md:ml-64 min-h-screen flex flex-col max-w-7xl mx-auto w-full px-4 py-6 sm:px-6 sm:py-8">
        <div className="animate-[fadeSlide_200ms_ease-out]">
          <Outlet />
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
