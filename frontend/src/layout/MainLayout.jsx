import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import { ToastContainer } from "../components/common/Toast";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen dark:bg-navy-950/30 bg-white/30 overflow-x-hidden">
      <Sidebar />

      {/* Main Content Area */}
      <div className="md:pl-64 min-h-screen flex flex-col w-full min-w-0">
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 min-w-0">
          <div className="animate-[fadeSlide_200ms_ease-out] w-full min-w-0">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
