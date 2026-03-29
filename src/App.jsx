import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { ToastProvider } from "./context/ToastContext";
import ParticlesBackground from "./components/common/ParticlesBackground";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import SEOAnalyzer from "./pages/SEOAnalyzer";
import Platforms from "./pages/Platforms";
import Settings from "./pages/Settings";

function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <ParticlesBackground />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />

            {/* Dashboard Routes */}
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/seo" element={<SEOAnalyzer />} />
              <Route path="/platforms" element={<Platforms />} />
              <Route path="/settings" element={<Settings />} />

              {/* Alias routes */}
              <Route
                path="/scheduled"
                element={<Navigate to="/dashboard" replace />}
              />
            </Route>

            {/* 404 - Redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ToastProvider>
  );
}

export default App;
