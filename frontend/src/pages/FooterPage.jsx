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
        <div className="max-w-3xl mx-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-8 sm:p-10 shadow-card space-y-5">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {page.title}
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            {page.description}
          </p>

          <div className="pt-2">
            <Link
              to="/dashboard"
              className="inline-flex items-center bg-gradient-to-r from-brand-600 to-accent-500 text-white font-medium rounded-xl px-4 py-2.5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-150"
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
