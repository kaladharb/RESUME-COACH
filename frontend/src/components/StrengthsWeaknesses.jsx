import React from 'react';
import { CheckCircle2, XOctagon } from 'lucide-react';

const StrengthsWeaknesses = ({ strengths, weaknesses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Strengths */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
          <span className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
          </span>
          Key Strengths
        </h3>
        <ul className="space-y-3">
          {strengths && strengths.length > 0 ? (
            strengths.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-500 italic">No specific strengths identified.</li>
          )}
        </ul>
      </div>

      {/* Weaknesses */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
          <span className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center mr-3">
            <XOctagon className="w-5 h-5 text-red-600 dark:text-red-400" />
          </span>
          Areas for Improvement
        </h3>
        <ul className="space-y-3">
          {weaknesses && weaknesses.length > 0 ? (
            weaknesses.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <XOctagon className="w-5 h-5 text-red-500 mr-3 mt-0.5 shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-500 italic">No specific weaknesses identified.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default StrengthsWeaknesses;
