import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Frown } from 'lucide-react';
import { getHistory, deleteHistory, getHistoryDetail } from '../api/resumeApi';
import HistoryCard from '../components/HistoryCard';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // "guest" is the default user we are using globally
  const userId = 'guest';

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const data = await getHistory(userId);
      setHistory(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load history.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = async (id) => {
    try {
      const fullRecord = await getHistoryDetail(id);
      navigate('/dashboard', { state: { result: fullRecord } });
    } catch (err) {
      alert('Failed to load this record.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this analysis?")) {
      try {
        await deleteHistory(id);
        setHistory(prev => prev.filter(record => record._id !== id));
      } catch (err) {
        alert('Failed to delete record.');
      }
    }
  };

  return (
    <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      <div className="flex items-center mb-8">
        <Clock className="w-8 h-8 text-primary mr-3" />
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Analysis History</h1>
      </div>

      {error && (
        <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-xl border border-red-200">{error}</div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : history.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map(record => (
            <HistoryCard 
              key={record._id} 
              record={record} 
              onView={() => handleView(record._id)}
              onDelete={() => handleDelete(record._id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-16 text-center bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <Frown className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No history found</h2>
          <p className="text-gray-500 mb-8 max-w-md">You haven't analyzed any resumes yet. Head over to the analyzer to get started!</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary hover:bg-indigo-600 text-white font-medium rounded-xl transition-colors shadow-md shadow-primary/20"
          >
            Go to Analyzer
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
