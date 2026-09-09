import { getIconByName } from "../../utils/iconMap";

const WorkflowStep = ({ step, title, description, icon, isLast }) => {
  const Icon = getIconByName(icon, "Circle");

  return (
    <div className="relative flex gap-6">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-indigo-500 to-cyan-500" />
      )}

      {/* Step Number */}
      <div className="relative flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-600 to-cyan-500 rounded-full flex items-center justify-center z-10 shadow-glow">
        <span className="text-white font-bold">{step}</span>
      </div>

      {/* Content */}
      <div className="flex-1 pb-12">
        <div className="p-6 bg-navy-800/60 backdrop-blur-xl border border-indigo-600/30 rounded-2xl hover:border-cyan-400/50 hover:shadow-glow-cyan transition-all duration-200 hover:-translate-y-0.5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-indigo-600/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-indigo-500/30">
              <Icon className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
              <p className="text-gray-400">{description}</p>
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
