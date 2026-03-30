import { Suspense, lazy } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { ToastProvider } from "./context/ToastContext";
import ParticlesBackground from "./components/common/ParticlesBackground";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { useApp } from "./context/AppContext";

const MainLayout = lazy(() => import("./layout/MainLayout"));
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Upload = lazy(() => import("./pages/Upload"));
const SEOAnalyzer = lazy(() => import("./pages/SEOAnalyzer"));
const Platforms = lazy(() => import("./pages/Platforms"));
const Settings = lazy(() => import("./pages/Settings"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BlogAdmin = lazy(() => import("./pages/BlogAdmin"));
const FooterPage = lazy(() => import("./pages/FooterPage"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

function AdminRoute({ children }) {
  const { user } = useApp();
  const isAdmin = user?.isAdmin ?? true;

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function AppShell() {
  const location = useLocation();
  const hideParticles =
    location.pathname.startsWith("/blog") ||
    location.pathname.startsWith("/dashboard/blog");

  return (
    <div className="relative isolate min-h-screen">
      {!hideParticles && <ParticlesBackground />}
      <div className="relative z-10 min-h-screen">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center px-4">
              <LoadingSpinner size="lg" text="Loading page..." />
            </div>
          }
        >
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/pages/:slug" element={<FooterPage />} />

            {/* Dashboard Routes */}
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/seo" element={<SEOAnalyzer />} />
              <Route path="/platforms" element={<Platforms />} />
              <Route path="/settings" element={<Settings />} />
              <Route
                path="/dashboard/blog"
                element={
                  <AdminRoute>
                    <BlogAdmin />
                  </AdminRoute>
                }
              />

              {/* Alias routes */}
              <Route
                path="/scheduled"
                element={<Navigate to="/dashboard" replace />}
              />
            </Route>

            {/* 404 - Redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </AppProvider>
    </ToastProvider>
  );
}

export default App;
