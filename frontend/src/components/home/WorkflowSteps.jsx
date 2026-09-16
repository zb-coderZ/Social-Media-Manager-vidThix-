import { getIconByName } from "../../utils/iconMap";

const WorkflowStep = ({ step, title, description, icon, isLast }) => {
  const Icon = getIconByName(icon, "Circle");

  return (
    <div className="relative flex gap-6">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-brand-600 to-accent-500" />
      )}

      {/* Step Number */}
      <div className="relative flex-shrink-0 w-12 h-12 bg-gradient-to-br from-brand-600 to-accent-500 rounded-full flex items-center justify-center z-10 shadow-glow">
        <span className="text-white font-bold">{step}</span>
      </div>

      {/* Content */}
      <div className="flex-1 pb-12">
        <div className="p-6 bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800 rounded-2xl hover:border-brand-500/50 transition-all duration-200 hover:-translate-y-0.5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-brand-50 dark:bg-brand-950/40 rounded-xl flex items-center justify-center flex-shrink-0 border border-brand-200 dark:border-brand-900">
              <Icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">{title}</h3>
              <p className="text-slate-500 dark:text-slate-400">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkflowSteps = ({ steps }) => {
  return (
    <div className="space-y-0">
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
