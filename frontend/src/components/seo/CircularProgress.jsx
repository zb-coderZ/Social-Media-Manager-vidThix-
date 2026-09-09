const CircularProgress = ({ score, size = 120, strokeWidth = 10, isDarkMode = false }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  // Get color based on score
  const getColor = (score) => {
    if (score >= 70) return "#10B981"; // emerald
    if (score >= 40) return "#F59E0B"; // amber
    return "#EF4444"; // red
  };

  // Get background stroke color based on theme
  const getBackgroundStroke = () => {
    return isDarkMode ? "#374151" : "#E5E7EB";
  };

  const color = getColor(score);
  const backgroundStroke = getBackgroundStroke();

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundStroke}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
        />
      </svg>

      {/* Score text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">{score}</span>
        <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">/ 100</span>
      </div>
    </div>
  );
};

export default CircularProgress;
