import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { APP_NAME } from "../../utils/constants";
import { NAV_LINKS } from "../../utils/dummyData";
import { useApp } from "../../context/AppContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? "dark:bg-navy-900/80 dark:backdrop-blur-xl dark:shadow-lg dark:shadow-indigo-600/10 bg-white/80 backdrop-blur-xl shadow-md"
          : "bg-transparent dark:bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-cyan-500 dark:from-indigo-600 dark:to-cyan-500 from-indigo-500 to-cyan-400 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200 hover:shadow-glow">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 dark:from-indigo-400 dark:to-cyan-400 from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              {APP_NAME}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="dark:text-gray-300 dark:hover:text-cyan-400 text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg dark:hover:bg-navy-800 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <Link
              to="/dashboard"
              className="px-4 py-2 dark:text-gray-300 dark:hover:text-cyan-400 text-gray-700 hover:text-indigo-600 font-semibold transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/dashboard"
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-glow-orange hover:-translate-y-0.5 transform"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg dark:hover:bg-navy-800 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 dark:text-cyan-400 text-indigo-600" />
            ) : (
              <Menu className="w-6 h-6 dark:text-cyan-400 text-indigo-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t dark:border-navy-700 border-gray-200">
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 dark:text-gray-300 dark:hover:text-cyan-400 dark:hover:bg-navy-800 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg font-medium transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t dark:border-navy-700 border-gray-200">
                <button
                  onClick={toggleTheme}
                  className="px-3 py-2 rounded-lg dark:hover:bg-navy-800 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2 dark:text-gray-300 text-gray-700"
                >
                  {isDarkMode ? (
                    <>
                      <Sun className="w-5 h-5 text-yellow-400" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5 text-gray-600" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
                <Link
                  to="/dashboard"
                  className="px-3 py-2 text-center dark:text-gray-300 dark:hover:text-cyan-400 dark:hover:bg-navy-800 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/dashboard"
                  className="px-3 py-2 text-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
