import { getIconByName } from "../../utils/iconMap";

const FeatureCard = ({ icon, title, description }) => {
  const Icon = getIconByName(icon, "Box");

  return (
    <div className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-card hover:shadow-cardHover transition-shadow duration-200 p-6">
      <div className="flex flex-col gap-4">
        {/* Icon */}
        <div className="bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 rounded-xl p-3 shrink-0">
          <Icon className="w-6 h-6" />
        </div>

        {/* Content */}
        <div>
          <h3 className="font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
            {title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
