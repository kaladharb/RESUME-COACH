import React from 'react';
import { Code2, Wrench, Users } from 'lucide-react';

const SkillsSection = ({ programming, tools, soft }) => {
  const BadgeList = ({ items, icon: Icon, title, colorClass }) => (
    <div className="flex flex-col">
      <div className="flex items-center mb-4 space-x-2">
        <Icon className={`w-5 h-5 ${colorClass.icon}`} />
        <h4 className="font-semibold text-gray-800 dark:text-gray-200">{title}</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.length > 0 ? items.map((item, idx) => (
          <span 
            key={idx} 
            className={`px-3 py-1 text-sm font-medium rounded-lg border ${colorClass.badge}`}
          >
            {item}
          </span>
        )) : (
          <span className="text-sm text-gray-500 italic">No items found</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
      <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">Extracted Skills</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <BadgeList 
          title="Programming" 
          items={programming} 
          icon={Code2} 
          colorClass={{
            icon: 'text-indigo-500',
            badge: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-300 dark:border-indigo-800'
          }}
        />
        <BadgeList 
          title="Tools & Technologies" 
          items={tools} 
          icon={Wrench} 
          colorClass={{
            icon: 'text-violet-500',
            badge: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/40 dark:text-violet-300 dark:border-violet-800'
          }}
        />
        <BadgeList 
          title="Soft Skills" 
          items={soft} 
          icon={Users} 
          colorClass={{
            icon: 'text-cyan-500',
            badge: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/40 dark:text-cyan-300 dark:border-cyan-800'
          }}
        />
      </div>
    </div>
  );
};

export default SkillsSection;
