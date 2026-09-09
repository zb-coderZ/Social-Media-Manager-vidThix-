import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/home/Footer";
import { usePageMeta } from "../hooks/usePageMeta";

const Contact = () => {
  usePageMeta({
    title: "Contact vidThix | vidThix",
    description:
      "Contact vidThix for sales, onboarding, partnerships, and product support.",
    keywords: "contact vidthix, support, sales, partnerships, onboarding",
    canonical: "/contact",
    ogType: "website",
  });

  return (
    <div className="min-h-screen dark:bg-navy-950/20 bg-white/20">
      <Navbar isFixed={false} />

      <main className="px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <div className="max-w-5xl mx-auto space-y-8">
          <section className="rounded-2xl bg-white dark:bg-navy-800/70 border border-gray-200/70 dark:border-indigo-600/30 p-8 sm:p-10 shadow-sm space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900">
              Contact vidThix
            </h1>
            <p className="text-lg dark:text-gray-300 text-gray-600 leading-8">
              Need help with onboarding, SEO workflow setup, or enterprise
              plans? Reach out and our team will get back to you.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <article className="rounded-2xl bg-white dark:bg-navy-800/70 border border-gray-200/70 dark:border-indigo-600/30 p-6 shadow-sm space-y-2">
              <h2 className="text-xl font-bold dark:text-white text-gray-900">
                General Support
              </h2>
              <p className="dark:text-gray-300 text-gray-600">
                support@vidthix.com
              </p>
              <p className="text-sm dark:text-gray-400 text-gray-500">
                Response time: within 24 hours
              </p>
            </article>

            <article className="rounded-2xl bg-white dark:bg-navy-800/70 border border-gray-200/70 dark:border-indigo-600/30 p-6 shadow-sm space-y-2">
              <h2 className="text-xl font-bold dark:text-white text-gray-900">
                Sales and Partnerships
              </h2>
              <p className="dark:text-gray-300 text-gray-600">
                sales@vidthix.com
              </p>
              <p className="text-sm dark:text-gray-400 text-gray-500">
                For demos, pricing, and integration queries
              </p>
            </article>
          </section>

          <section className="rounded-2xl bg-violet-600 text-white p-8 sm:p-10 shadow-sm space-y-4">
            <h2 className="text-2xl font-bold">Prefer self-service?</h2>
            <p className="text-violet-100">
              Check the Help Center and Documentation for setup guides and
              troubleshooting.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/pages/help-center"
                className="inline-flex items-center px-5 py-3 rounded-xl bg-white text-violet-700 font-semibold hover:bg-violet-50 transition-colors duration-200"
              >
                Help Center
              </Link>
              <Link
                to="/pages/documentation"
                className="inline-flex items-center px-5 py-3 rounded-xl bg-violet-700 text-white font-semibold hover:bg-violet-800 transition-colors duration-200 border border-violet-300/20"
              >
                Documentation
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
