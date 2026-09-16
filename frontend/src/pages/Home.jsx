import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Hero from "../components/home/Hero";
import FeatureCard from "../components/home/FeatureCard";
import PlatformCard from "../components/home/PlatformCard";
import WorkflowSteps from "../components/home/WorkflowSteps";
import Footer from "../components/home/Footer";
import { FEATURES, PLATFORMS, WORKFLOW_STEPS } from "../utils/dummyData";

const Home = () => {
  return (
    <div className="relative min-h-screen bg-surface-light dark:bg-surface-dark">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-4 sm:px-6 lg:px-8 dark:bg-navy-950/5 bg-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg sm:text-xl dark:text-gray-400 text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to streamline your social media
              workflow and maximize your content's reach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section
        id="platforms"
        className="py-20 px-4 sm:px-6 lg:px-8 dark:bg-navy-900/5 bg-gray-50/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">
              Supported Platforms
            </h2>
            <p className="text-lg sm:text-xl dark:text-gray-400 text-gray-600 max-w-3xl mx-auto">
              Connect and manage multiple social media platforms from one
              unified dashboard. More platforms coming soon!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLATFORMS.map((platform) => (
              <PlatformCard key={platform.id} platform={platform} />
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 dark:bg-navy-950/5 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl dark:text-gray-400 text-gray-600 max-w-3xl mx-auto">
              Get started in minutes with our simple, 5-step workflow designed
              for maximum efficiency.
            </p>
          </div>

          <WorkflowSteps steps={WORKFLOW_STEPS} />
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="pricing"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950/90 via-indigo-950/85 to-cyan-950/80"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Content Strategy?
          </h2>
          <p className="text-lg sm:text-xl dark:text-indigo-100 text-indigo-50 mb-8 max-w-2xl mx-auto">
            Join thousands of content creators who are already managing their
            social media presence more efficiently with vidThix.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center bg-gradient-to-r from-brand-600 to-accent-500 text-white font-medium rounded-xl px-4 py-2.5 shadow-sm hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] transition-all duration-150 focus-visible:outline-none focus-visible:shadow-focus"
            >
              Start Free Trial
            </Link>
            <button className="inline-flex items-center justify-center bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-150">
              Schedule a Demo
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-white/90 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
