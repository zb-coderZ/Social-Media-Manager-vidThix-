import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/home/Footer";
import { usePageMeta } from "../hooks/usePageMeta";

const About = () => {
  usePageMeta({
    title: "About vidThix | vidThix",
    description:
      "Learn how vidThix helps teams optimize SEO, automate publishing, and scale social media workflows from one dashboard.",
    keywords:
      "about vidthix, social media automation, content workflow, seo publishing",
    canonical: "/about",
    ogType: "website",
  });

  return (
    <div className="min-h-screen dark:bg-navy-950/20 bg-white/20">
      <Navbar isFixed={false} />

      <main className="px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <div className="max-w-5xl mx-auto space-y-8">
          <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-8 sm:p-10 shadow-card space-y-4">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              About vidThix
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-8">
              vidThix is built for creators, agencies, and social teams that
              need a faster way to plan, optimize, and publish content across
              platforms. Instead of juggling multiple tools, vidThix gives you
              one workflow for SEO scoring, scheduling, and distribution.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <article className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 shadow-card">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
                SEO-First Content
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Improve discoverability with actionable SEO scoring and
                optimization suggestions.
              </p>
            </article>

            <article className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 shadow-card">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
                Automation Ready
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Build repeatable publishing systems that reduce manual work and
                save team time.
              </p>
            </article>

            <article className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 shadow-card">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
                Multi-Platform Workflow
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Coordinate YouTube, LinkedIn, and social channels from one
                unified dashboard.
              </p>
            </article>
          </section>

          <section className="rounded-2xl bg-brand-950 text-white p-8 sm:p-10 shadow-card space-y-4">
            <h2 className="text-2xl font-bold">
              Start publishing smarter with vidThix
            </h2>
            <p className="text-brand-100">
              Join teams using vidThix to scale content operations with better
              consistency and reach.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-5 py-3 rounded-xl bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 font-semibold transition-colors duration-200"
            >
              Try vidThix Free
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
