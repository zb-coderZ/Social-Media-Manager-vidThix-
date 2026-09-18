import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Zap,
  CheckCircle2,
  Globe,
  Video,
  Layers,
  Sparkles,
  X,
} from "lucide-react";
import { APP_TAGLINE } from "../../utils/constants";

const Hero = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <section className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Background Gradient & Light Flares */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-brand-500/15 via-indigo-500/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column - Headline & CTA */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-sm">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-extrabold tracking-wide dark:text-slate-200 text-slate-700">
                ⚡ Multi-Platform YouTube & LinkedIn OAuth 2.0 Connected
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              {APP_TAGLINE}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
              Publish videos, schedule multi-channel campaigns, and grow your audience seamlessly across YouTube, LinkedIn, and upcoming social platforms from one intelligent dashboard.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-brand-600 via-indigo-600 to-accent-500 hover:from-brand-700 hover:to-accent-600 text-white font-extrabold rounded-2xl shadow-xl shadow-brand-500/25 hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all text-sm group"
              >
                <span>Launch Studio Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={() => setShowDemoModal(true)}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-md hover:shadow-lg transition-all text-sm"
              >
                <Play className="w-4 h-4 text-brand-500 fill-brand-500" />
                <span>Watch Product Tour</span>
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  10,000+
                </p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  Connected Channels
                </p>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  50,000+
                </p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  Posts Published
                </p>
              </div>
              <div>
                <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  99.9%
                </p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  API Uptime
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Dashboard Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 p-5 rounded-3xl bg-white/80 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xl space-y-4 group hover:border-brand-500/40 transition-all duration-300">
              {/* Mock Top Header Bar */}
              <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-slate-400 ml-2 font-mono">
                    vidThix Studio v2.0
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  ● Live Sync
                </span>
              </div>

              {/* Mock Dashboard Preview Card */}
              <div className="space-y-3">
                {/* Active Channels Bar */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center font-bold">
                      YT
                    </div>
                    <div>
                      <p className="text-xs font-extrabold dark:text-white text-slate-900">
                        YouTube Channel
                      </p>
                      <p className="text-[11px] text-emerald-500 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> OAuth Authorized
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600">
                    Ready
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold">
                      IN
                    </div>
                    <div>
                      <p className="text-xs font-extrabold dark:text-white text-slate-900">
                        LinkedIn Profile
                      </p>
                      <p className="text-[11px] text-emerald-500 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> OAuth Authorized
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600">
                    Ready
                  </span>
                </div>

                {/* Queue Preview Item */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-500/10 via-indigo-500/5 to-transparent border border-brand-500/20 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-brand-600 dark:text-brand-400 flex items-center gap-1">
                      <Video className="w-3.5 h-3.5" /> Next Scheduled Video
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Today at 5:00 PM
                    </span>
                  </div>
                  <p className="text-xs font-bold dark:text-white text-slate-900 truncate">
                    "React Tutorial - Building Modern UIs with vidThix"
                  </p>
                </div>
              </div>

              {/* Floating Feature Badges */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center text-[11px] font-bold">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                  ⚡ 1-Click Publishing
                </div>
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                  🔒 OAuth 2.0 Secure
                </div>
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                  📅 Timezone Queue
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  vidThix Studio Platform Demo
                </h3>
              </div>
              <button
                onClick={() => setShowDemoModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video rounded-2xl bg-slate-950 flex flex-col items-center justify-center p-8 text-center space-y-4 border border-slate-800">
              <div className="w-16 h-16 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-500/30">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">
                  Interactive Video Tour & Walkthrough
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  Experience seamless OAuth 2.0 authentication, video scheduling, and instant multi-platform publishing.
                </p>
              </div>
              <Link
                to="/dashboard"
                onClick={() => setShowDemoModal(false)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs shadow-md hover:bg-brand-700 transition-all"
              >
                <span>Try Studio Dashboard Live</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
