import * as LucideIcons from "lucide-react";

const FeatureCard = ({ icon, title, description }) => {
  const Icon = LucideIcons[icon] || LucideIcons.Box;

  return (
    <div className="group p-6 dark:bg-navy-800/45 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 dark:hover:border-cyan-400/50 dark:hover:shadow-glow-cyan bg-white/45 backdrop-blur-xl border border-gray-200/50 hover:border-indigo-300/50 hover:shadow-md rounded-2xl transition-all duration-200 hover:-translate-y-1">
      <div className="flex flex-col gap-4">
        {/* Icon */}
        <div className="w-12 h-12 dark:bg-gradient-to-br dark:from-indigo-600 dark:to-cyan-500 bg-gradient-to-br from-indigo-400 to-cyan-400 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-200 dark:shadow-glow shadow-md">
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Content */}
        <div>
          <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-2">
            {title}
          </h3>
          <p className="dark:text-gray-400 text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
