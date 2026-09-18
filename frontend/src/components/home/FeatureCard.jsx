import { getIconByName } from "../../utils/iconMap";

const FeatureCard = ({ icon, title, description }) => {
  const Icon = getIconByName(icon, "Box");

  return (
    <div className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-2xl hover:border-brand-500/40 transition-all duration-300 p-8 flex flex-col justify-between">
      <div className="space-y-4">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 p-3.5 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm">
          <Icon className="w-7 h-7" />
        </div>

        {/* Content */}
        <div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="pt-4 flex items-center gap-2 text-xs font-bold text-brand-600 dark:text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Learn More</span>
        <span>→</span>
      </div>
    </div>
  );
};

export default FeatureCard;
