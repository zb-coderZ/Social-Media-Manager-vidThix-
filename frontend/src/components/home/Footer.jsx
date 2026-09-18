import { useState } from "react";
import { Link } from "react-router-dom";
import { Send, CheckCircle2 } from "lucide-react";
import { APP_NAME } from "../../utils/constants";
import { FOOTER_LINKS, SOCIAL_LINKS } from "../../utils/dummyData";
import { getIconByName } from "../../utils/iconMap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const legalLinks = [
    { name: "Privacy Policy", href: "/pages/privacy-policy" },
    { name: "Terms of Service", href: "/pages/terms-of-service" },
    { name: "Cookie Policy", href: "/pages/cookie-policy" },
  ];

  const renderFooterLink = (link) => {
    if (link.href.includes("#")) {
      return (
        <a
          href={link.href}
          className="text-xs text-slate-400 hover:text-white transition-colors"
        >
          {link.name}
        </a>
      );
    }

    if (link.href.startsWith("/")) {
      return (
        <Link
          to={link.href}
          className="text-xs text-slate-400 hover:text-white transition-colors"
        >
          {link.name}
        </Link>
      );
    }

    return (
      <a
        href={link.href}
        className="text-xs text-slate-400 hover:text-white transition-colors"
      >
        {link.name}
      </a>
    );
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3.5 group">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-brand-500/20">
                V
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-white via-slate-200 to-brand-400 bg-clip-text text-transparent">
                {APP_NAME}
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The intelligent multi-platform content publishing & video automation studio. Connect, schedule, and scale your social presence.
            </p>

            {/* Newsletter Input */}
            <form onSubmit={handleSubscribe} className="space-y-2 max-w-sm">
              <span className="text-xs font-bold text-slate-300">
                Stay updated on creator growth guides
              </span>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shrink-0 flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe</span>
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-emerald-400 font-bold flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Subscribed successfully!
                </p>
              )}
            </form>

            {/* Social Links */}
            <div className="flex gap-2.5 pt-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = getIconByName(social.icon, "Link");
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-9 h-9 bg-slate-900 hover:bg-brand-600 border border-slate-800 hover:border-brand-600 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-sm"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Product
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.name}>{renderFooterLink(link)}</li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.name}>{renderFooterLink(link)}</li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Support & Status
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.name}>{renderFooterLink(link)}</li>
              ))}
            </ul>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                All Systems Operational
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>© {currentYear} {APP_NAME} Inc. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            {legalLinks.map((link) => (
              <span key={link.name}>{renderFooterLink(link)}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
