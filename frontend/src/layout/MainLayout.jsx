import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import { ToastContainer } from "../components/common/Toast";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen dark:bg-navy-950/30 bg-white/30">
      <Sidebar />

      {/* Main Content */}
      <div className="md:ml-64 min-h-screen flex flex-col">
        <Outlet />
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
