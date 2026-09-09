import { Link, Navigate, useParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/home/Footer";
import { getFooterPage } from "../utils/footerPages";
import { usePageMeta } from "../hooks/usePageMeta";

const FooterPage = () => {
  const { slug } = useParams();
  const page = getFooterPage(slug || "");

  usePageMeta({
    title: page ? `${page.title} | vidThix` : "Page | vidThix",
    description:
      page?.description ||
      "vidThix resources for social media growth, SEO, and content automation.",
    keywords: "vidthix, social media, seo, automation, resources, support",
    canonical: page ? `/pages/${slug}` : "/",
    ogType: "website",
  });

  if (!page) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen dark:bg-navy-950/20 bg-white/20">
      <Navbar isFixed={false} />

      <main className="px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <div className="max-w-3xl mx-auto rounded-2xl bg-white dark:bg-navy-800/70 border border-gray-200/70 dark:border-indigo-600/30 p-8 sm:p-10 shadow-sm space-y-5">
          <h1 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900">
            {page.title}
          </h1>
          <p className="text-lg dark:text-gray-300 text-gray-600">
            {page.description}
          </p>

          <div className="pt-2">
            <Link
              to="/dashboard"
              className="inline-flex items-center px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-colors duration-200"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FooterPage;
