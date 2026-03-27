import React, { useEffect, useState } from 'react';

const ResumeScoreCard = ({ score, reason }) => {
  const [displayScore, setDisplayScore] = useState(0);

  // Animate score from 0
  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = score / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [score]);

  // Determine colors based on score
  const getColor = (val) => {
    if (val >= 75) return 'text-success stroke-success'; // Green
    if (val >= 50) return 'text-warning stroke-warning'; // Yellow
    return 'text-danger stroke-danger'; // Red
  };

  const getLabel = (val) => {
    if (val >= 90) return 'Excellent';
    if (val >= 75) return 'Good';
    if (val >= 50) return 'Needs Work';
    return 'Poor';
  };

  const colorClass = getColor(score);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 flex flex-col items-center text-center">
      <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">Resume Score</h3>
      
      <div className="relative w-40 h-40 mb-6 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
          {/* Background circle */}
          <circle
            cx="70" cy="70" r={radius}
            className="stroke-gray-200 dark:stroke-gray-700"
            strokeWidth="12"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="70" cy="70" r={radius}
            className={`transition-all duration-300 ease-out ${colorClass.split(' ')[1]}`}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-extrabold ${colorClass.split(' ')[0]}`}>
            {displayScore}
          </span>
          <span className="text-sm font-medium text-gray-500 uppercase tracking-widest mt-1">
            {getLabel(displayScore)}
          </span>
        </div>
      </div>

      {reason && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
          {reason}
        </p>
      )}
    </div>
  );
};

export default ResumeScoreCard;
