import React from 'react';
import { Briefcase } from 'lucide-react';

const JobRolesCard = ({ roles }) => {
  if (!roles || roles.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Top Job Matches</h3>
      <div className="flex flex-col space-y-3">
        {roles.slice(0, 5).map((role, idx) => (
          <div 
            key={idx} 
            className={`p-4 rounded-xl border flex items-center transition-all hover:scale-[1.02]
              ${idx === 0 
                ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 shadow-sm' 
                : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700'
              }
            `}
          >
            <div className={`p-2 rounded-lg mr-4 ${idx === 0 ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-800 dark:text-yellow-200' : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}>
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className={`font-semibold ${idx === 0 ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200'}`}>{role}</h4>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${idx === 0 ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100' : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200'}`}>
              {idx === 0 ? 'Strong Match' : 'Good Match'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobRolesCard;
