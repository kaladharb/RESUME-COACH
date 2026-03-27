import React from 'react';
import { Target, Search } from 'lucide-react';

const ATSTips = ({ tips }) => {
  if (!tips || tips.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl shadow-lg border border-transparent p-6 text-white">
      <div className="flex items-center mb-2">
        <Target className="w-6 h-6 mr-3 text-indigo-200" />
        <h3 className="text-xl font-bold">ATS Optimization Tips</h3>
      </div>
      
      <p className="text-indigo-100 text-sm mb-6 border-b border-indigo-400/30 pb-4">
        Applicant Tracking Systems (ATS) scan your resume before a human does. Follow these tips to pass the filters.
      </p>

      <ul className="space-y-4">
        {tips.map((tip, idx) => (
          <li key={idx} className="flex items-start bg-white/10 p-3 rounded-lg backdrop-blur-sm">
            <Search className="w-5 h-5 mr-3 mt-0.5 text-indigo-200 shrink-0" />
            <span className="text-sm font-medium">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ATSTips;
