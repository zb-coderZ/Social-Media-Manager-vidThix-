import { Link } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { APP_NAME } from "../../utils/constants";
import { FOOTER_LINKS, SOCIAL_LINKS } from "../../utils/dummyData";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-glow">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              The ultimate platform for managing and optimizing your social
              media content across multiple platforms from a single dashboard.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = LucideIcons[social.icon] || LucideIcons.Link;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-navy-800 hover:bg-indigo-600 border border-navy-700 hover:border-indigo-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 hover:shadow-glow hover:-translate-y-0.5 group"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Support</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-navy-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-cyan-400 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-cyan-400 transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-cyan-400 transition-colors duration-200"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
