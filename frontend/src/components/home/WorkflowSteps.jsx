import { getIconByName } from "../../utils/iconMap";

const WorkflowStep = ({ step, title, description, icon, isLast }) => {
  const Icon = getIconByName(icon, "Circle");

  return (
    <div className="relative flex gap-6 sm:gap-8 group">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gradient-to-b from-brand-600 via-indigo-600 to-slate-200 dark:to-slate-800" />
      )}

      {/* Step Number Circle */}
      <div className="relative shrink-0 w-12 h-12 bg-gradient-to-br from-brand-600 via-indigo-600 to-accent-500 rounded-2xl flex items-center justify-center z-10 shadow-lg shadow-brand-500/20 group-hover:scale-110 transition-transform">
        <span className="text-white font-extrabold text-base">{step}</span>
      </div>

      {/* Content Card */}
      <div className="flex-1 pb-10">
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-2xl hover:border-brand-500/40 transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-brand-500/10 border border-brand-500/20 rounded-2xl flex items-center justify-center shrink-0 text-brand-600 dark:text-brand-400">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mb-1.5">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkflowSteps = ({ steps }) => {
  return (
    <div className="space-y-0 max-w-4xl mx-auto">
      {steps.map((step, index) => (
        <WorkflowStep
          key={step.step}
          {...step}
          isLast={index === steps.length - 1}
        />
      ))}
    </div>
  );
};

export default WorkflowSteps;
