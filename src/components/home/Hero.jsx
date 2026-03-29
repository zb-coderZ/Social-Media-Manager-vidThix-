import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { APP_TAGLINE, APP_DESCRIPTION } from "../../utils/constants";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 dark:bg-gradient-to-br dark:from-navy-950/75 dark:via-navy-900/70 dark:to-navy-800/75 bg-gradient-to-br from-white/70 via-gray-50/65 to-gray-100/70 -z-20 pointer-events-none" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM2MzY2ZjEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00djJoLTJ2LTJoMnptLTQgNHYyaC0ydi0yaDJ6bTAtNHYyaC0ydi0yaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] -z-20 opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-500/30 bg-white/60 backdrop-blur-xl border border-indigo-200 rounded-full shadow-sm">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium dark:text-gray-300 text-gray-700">
                Now supporting YouTube with more platforms coming soon
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold dark:text-white text-gray-900 leading-tight">
              {APP_TAGLINE}
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl dark:text-gray-400 text-gray-600 leading-relaxed">
              {APP_DESCRIPTION}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-glow-orange hover:-translate-y-0.5 group transform"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-navy-800/60 hover:bg-navy-700/60 text-cyan-400 font-semibold rounded-xl border-2 border-indigo-600/50 hover:border-cyan-400/50 transition-all duration-200 hover:shadow-glow-cyan group backdrop-blur-xl">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold dark:text-white text-gray-900">
                  10K+
                </p>
                <p className="text-sm dark:text-gray-400 text-gray-600">
                  Active Users
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold dark:text-white text-gray-900">
                  50K+
                </p>
                <p className="text-sm dark:text-gray-400 text-gray-600">
                  Videos Published
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold dark:text-white text-gray-900">
                  95%
                </p>
                <p className="text-sm dark:text-gray-400 text-gray-600">
                  Satisfaction Rate
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard Mockup */}
          <div className="relative">
            <div className="relative z-10 p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl dark:shadow-premium shadow-lg hover:shadow-premium-lg transform hover:scale-[1.02] transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-indigo-600 to-cyan-500 dark:from-indigo-600 dark:to-cyan-500 from-indigo-400 to-cyan-400 rounded-xl flex items-center justify-center overflow-hidden">
                <div className="text-center p-8 space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mx-auto flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">V</span>
                  </div>
                  <p className="dark:text-white text-gray-900 font-medium">
                    Dashboard Preview
                  </p>
                  <p className="text-sm dark:text-gray-200 text-gray-600">
                    Manage all your social media content from one place
                  </p>
                </div>
              </div>

              {/* Feature badges */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="px-3 py-2 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border dark:border-emerald-500/30 bg-emerald-50/60 text-emerald-700 text-xs font-medium rounded-lg text-center border border-emerald-200">
                  ✓ SEO Optimized
                </div>
                <div className="px-3 py-2 dark:bg-cyan-500/20 dark:text-cyan-400 dark:border dark:border-cyan-500/30 bg-cyan-50/60 text-cyan-700 text-xs font-medium rounded-lg text-center border border-cyan-200">
                  ✓ Auto Schedule
                </div>
                <div className="px-3 py-2 dark:bg-indigo-500/20 dark:text-indigo-400 dark:border dark:border-indigo-500/30 bg-indigo-50/60 text-indigo-700 text-xs font-medium rounded-lg text-center border border-indigo-200">
                  ✓ Analytics
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 dark:bg-indigo-600/10 bg-indigo-500/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 dark:bg-cyan-500/10 bg-cyan-500/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
