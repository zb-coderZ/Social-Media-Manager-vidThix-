import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Check,
  Zap,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Clock,
  Globe,
  Video,
} from "lucide-react";
import Navbar from "../components/common/Navbar";
import Hero from "../components/home/Hero";
import FeatureCard from "../components/home/FeatureCard";
import PlatformCard from "../components/home/PlatformCard";
import WorkflowSteps from "../components/home/WorkflowSteps";
import Footer from "../components/home/Footer";
import { FEATURES, PLATFORMS, WORKFLOW_STEPS } from "../utils/dummyData";

const PRICING_PLANS = [
  {
    name: "Creator Starter",
    priceMonthly: 0,
    priceAnnual: 0,
    description: "Perfect for indie creators & solo video publishers.",
    features: [
      "1 YouTube Channel Connection",
      "1 LinkedIn Account Connection",
      "Unlimited Direct Video Uploads",
      "Standard Timezone Scheduling",
      "OAuth 2.0 Security Encryption",
      "Community Support",
    ],
    popular: false,
    cta: "Start Free",
    href: "/dashboard",
  },
  {
    name: "Pro Automator",
    priceMonthly: 29,
    priceAnnual: 24,
    description: "For serious creators & growing digital channels.",
    features: [
      "Unlimited YouTube Channels",
      "Unlimited LinkedIn Profiles",
      "Priority Queue Scheduling",
      "Bulk Video Upload Pipeline",
      "Live OAuth Diagnostic Health Checks",
      "SEO & Analytics Insights Engine",
      "24/7 Priority Support",
    ],
    popular: true,
    cta: "Start 14-Day Free Trial",
    href: "/dashboard",
  },
  {
    name: "Agency Scale",
    priceMonthly: 89,
    priceAnnual: 74,
    description: "For agencies managing multi-brand social portfolios.",
    features: [
      "Multi-Account Team Workspace",
      "Unlimited Platforms & Accounts",
      "Custom Webhook & API Access",
      "Dedicated Account Manager",
      "Custom Branding & Watermarking",
      "99.9% Guaranteed SLA Uptime",
    ],
    popular: false,
    cta: "Contact Sales",
    href: "/contact",
  },
];

const FAQS = [
  {
    q: "How does YouTube & LinkedIn OAuth 2.0 connection work?",
    a: "vidThix uses industry-standard OAuth 2.0 authorization protocol. You click 'Connect Account', approve permissions directly on YouTube or LinkedIn, and vidThix receives encrypted access tokens. We never see or store your account passwords.",
  },
  {
    q: "Can I schedule posts in my local timezone?",
    a: "Yes! vidThix supports global timezone scheduling with UTC, EST, PST, GMT, and local system time zones so your content goes live at peak audience engagement times.",
  },
  {
    q: "Is vidThix free to use for individual creators?",
    a: "Yes! Our Creator Starter plan is 100% free with full support for YouTube and LinkedIn publishing. No credit card is required to sign up.",
  },
  {
    q: "What other social platforms are coming soon?",
    a: "We are actively integrating Instagram Reels, TikTok Shorts, Facebook Pages, and Pinterest video publishing engines into vidThix.",
  },
];

const Home = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900/60 border-y border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>Built for Content Scale</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black dark:text-white text-slate-900 tracking-tight">
              Everything You Need to Succeed
            </h2>
            <p className="text-base sm:text-lg dark:text-slate-400 text-slate-600 leading-relaxed">
              Powerful automation tools engineered to streamline your social media publishing pipeline and maximize reach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Supported Platforms Section */}
      <section id="platforms" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5 text-indigo-500" />
              <span>Multi-Platform Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black dark:text-white text-slate-900 tracking-tight">
              Supported Social Platforms
            </h2>
            <p className="text-base sm:text-lg dark:text-slate-400 text-slate-600 leading-relaxed">
              Connect and manage multiple social accounts from one centralized dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PLATFORMS.map((platform) => (
              <PlatformCard key={platform.id} platform={platform} />
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Timeline Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900/60 border-y border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-brand-500" />
              <span>5-Step Workflow</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black dark:text-white text-slate-900 tracking-tight">
              How vidThix Works
            </h2>
            <p className="text-base sm:text-lg dark:text-slate-400 text-slate-600 leading-relaxed">
              Get started in minutes with a simple, repeatable publishing workflow designed for creators.
            </p>
          </div>

          <WorkflowSteps steps={WORKFLOW_STEPS} />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-emerald-500" />
              <span>Transparent Pricing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black dark:text-white text-slate-900 tracking-tight">
              Choose the Plan That Fits Your Scale
            </h2>
            <p className="text-base sm:text-lg dark:text-slate-400 text-slate-600">
              Simple plans with zero hidden fees. Start free and upgrade as your channel grows.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="flex items-center justify-center gap-3 pt-4">
              <span className={`text-xs font-bold ${billingCycle === "monthly" ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>
                Monthly Billing
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
                className="w-14 h-8 rounded-full bg-slate-200 dark:bg-slate-800 p-1 transition-colors relative"
              >
                <div
                  className={`w-6 h-6 rounded-full bg-brand-600 transition-transform ${
                    billingCycle === "annual" ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
              <span className={`text-xs font-bold flex items-center gap-1.5 ${billingCycle === "annual" ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>
                Annual Billing
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Save 20%
                </span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING_PLANS.map((plan) => {
              const price = billingCycle === "annual" ? plan.priceAnnual : plan.priceMonthly;
              return (
                <div
                  key={plan.name}
                  className={`p-8 rounded-3xl bg-white dark:bg-slate-900 border transition-all duration-300 flex flex-col justify-between relative ${
                    plan.popular
                      ? "border-brand-500 shadow-2xl scale-105 z-10"
                      : "border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-xl"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-extrabold text-xs shadow-md">
                      Most Popular Plan
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold dark:text-white text-slate-900">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {plan.description}
                      </p>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black dark:text-white text-slate-900">
                        ${price}
                      </span>
                      <span className="text-xs font-bold text-slate-400">/ month</span>
                    </div>

                    <ul className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-6">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8">
                    <Link
                      to={plan.href}
                      className={`w-full py-3.5 px-4 font-bold rounded-2xl text-xs transition-all flex items-center justify-center gap-2 ${
                        plan.popular
                          ? "bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-lg shadow-brand-500/20 hover:shadow-xl"
                          : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      <span>{plan.cta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900/60 border-y border-slate-200/60 dark:border-slate-800">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black dark:text-white text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      openFaq === index ? "rotate-180 text-brand-500" : ""
                    }`}
                  />
                </button>

                {openFaq === index && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Bottom Call to Action Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-brand-950 to-indigo-950 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <div className="w-16 h-16 rounded-3xl bg-brand-600/20 border border-brand-500/30 text-brand-400 mx-auto flex items-center justify-center">
            <Video className="w-8 h-8" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Ready to Transform Your Social Content Workflow?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Join thousands of creators automating YouTube and LinkedIn content publishing with vidThix Studio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-950 font-extrabold rounded-2xl shadow-2xl hover:bg-slate-100 transition-all text-sm"
            >
              <span>Launch Studio Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-semibold pt-4">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> OAuth 2.0 Certified
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> Instant Access
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
