import React from 'react';
import { CalendarDays, Circle } from 'lucide-react';

const CareerRoadmap = ({ roadmap }) => {
  if (!roadmap || roadmap.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 overflow-hidden">
      <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">Career Roadmap — Next 3 Months</h3>
      
      {/* Overall Progress Bar */}
      <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Overall Completion</span>
          <span className="text-sm font-bold text-primary">0%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div className="bg-primary h-2.5 rounded-full" style={{ width: '0%' }}></div>
        </div>
        <p className="text-xs text-gray-500 mt-2 italic">You are just starting out. Stick to the plan!</p>
      </div>

      {/* Horizontal Scrollable Timeline */}
      <div className="flex overflow-x-auto pb-6 pt-2 snap-x hide-scrollbar space-x-6">
        {roadmap.map((weekData, idx) => (
          <div 
            key={idx} 
            className={`min-w-[280px] w-[280px] shrink-0 snap-start p-5 rounded-xl border relative transition-transform hover:-translate-y-1
              ${idx === 0 
                ? 'border-primary bg-primary/5 shadow-md shadow-primary/10' 
                : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'}
            `}
          >
            {idx === 0 && (
              <span className="absolute -top-3 right-4 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                Current
              </span>
            )}
            
            <div className="flex items-center mb-4">
              <CalendarDays className={`w-5 h-5 mr-2 ${idx === 0 ? 'text-primary' : 'text-gray-400'}`} />
              <h4 className={`font-bold text-lg ${idx === 0 ? 'text-primary' : 'text-gray-800 dark:text-gray-200'}`}>
                {weekData.week || `Week ${idx + 1}`}
              </h4>
            </div>
            
            <ul className="space-y-3">
              {weekData.tasks && weekData.tasks.map((task, tIdx) => (
                <li key={tIdx} className="flex items-start text-sm">
                  <Circle className="w-3 h-3 mr-2 mt-1 text-gray-300 dark:text-gray-600 shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">{task}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .hide-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 4px;
        }
        .dark .hide-scrollbar::-webkit-scrollbar-thumb {
          background-color: #475569;
        }
      `}</style>
    </div>
  );
};

export default CareerRoadmap;
