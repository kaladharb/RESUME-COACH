import React from 'react';
import { Calendar, Trash2, ChevronRight, File, AlignLeft } from 'lucide-react';

const HistoryCard = ({ record, onView, onDelete }) => {
  const dateObj = new Date(record.createdAt);
  const dateStr = dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  const timeStr = dateObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  
  const scoreColor = record.resumeScore >= 75 ? 'text-green-500 border-green-500' :
                     record.resumeScore >= 50 ? 'text-yellow-500 border-yellow-500' : 'text-red-500 border-red-500';

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow border border-gray-200 dark:border-gray-800 p-6 flex flex-col hover:shadow-lg transition-shadow group relative">
      
      {/* Top Header */}
      <div className="flex justify-between items-start mb-4">
        <div className={`w-14 h-14 rounded-full border-4 flex items-center justify-center font-bold text-xl ${scoreColor}`}>
          {record.resumeScore}
        </div>
        <div className="flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
          {record.inputMethod === 'pdf' ? (
            <File className="w-4 h-4 text-red-500 mr-1.5" />
          ) : (
            <AlignLeft className="w-4 h-4 text-blue-500 mr-1.5" />
          )}
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
            {record.inputMethod}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 mb-6">
        <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Top Roles</h4>
        {record.jobRoles && record.jobRoles.length > 0 ? (
          <ul className="space-y-1">
            {record.jobRoles.slice(0, 3).map((role, idx) => (
              <li key={idx} className="text-gray-900 dark:text-gray-100 font-medium text-base truncate">
                • {role}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm italic text-gray-500">No roles identified</p>
        )}
      </div>

      {/* Footer Info & Actions */}
      <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4 mt-auto">
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="w-3.5 h-3.5 mr-1" />
          {dateStr} at {timeStr}
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            title="Delete Record"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button 
            onClick={onView}
            className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg transition-colors font-medium text-sm"
          >
            View <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
