import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';

const ImprovementsList = ({ improvements }) => {
  if (!improvements || improvements.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
      <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">Actionable Improvements</h3>
      <div className="space-y-4">
        {improvements.map((item, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:items-start p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:border-accent/40 transition-colors">
            <div className="flex items-center mb-3 sm:mb-0 sm:mr-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent font-bold text-sm shrink-0">
                {idx + 1}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-2">{item}</p>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-4 shrink-0 flex items-center">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                <Lightbulb className="w-3 h-3 mr-1" />
                Take Action
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImprovementsList;
