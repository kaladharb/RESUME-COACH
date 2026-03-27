import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { XCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const SkillGapChart = ({ presentCount, missingSkills }) => {
  const { isDark } = useTheme();
  
  const data = [
    { name: 'Present', count: presentCount || 0 },
    { name: 'Missing', count: missingSkills?.length || 0 }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
      <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">Skill Gap Analysis</h3>
      
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
        {/* Chart */}
        <div className="w-full md:w-1/2 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#9ca3af' : '#4b5563', fontWeight: 600 }} />
              <Tooltip 
                cursor={{ fill: isDark ? '#374151' : '#f3f4f6' }}
                contentStyle={{ backgroundColor: isDark ? '#1f2937' : '#ffffff', borderColor: isDark ? '#374151' : '#e5e7eb', borderRadius: '8px' }}
                itemStyle={{ color: isDark ? '#ffffff' : '#000000' }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={30}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.name === 'Present' ? '#6366f1' : '#ef4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Missing Skills Pills */}
        <div className="w-full md:w-1/2">
          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 block">Critical Missing Skills</h4>
          {missingSkills && missingSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((skill, idx) => (
                <div key={idx} className="flex items-center px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50 rounded-full text-sm font-medium">
                  <XCircle className="w-4 h-4 mr-1.5" />
                  {skill}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No critical missing skills found. Great job!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillGapChart;
