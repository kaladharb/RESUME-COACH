import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputSection from '../components/InputSection';
import LoadingOverlay from '../components/LoadingOverlay';
import { analyzeResume } from '../api/resumeApi';
import { Sparkles, Target } from 'lucide-react';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAnalyze = async (formData) => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await analyzeResume(formData);
      // Navigate to dashboard and pass the result through router state
      navigate('/dashboard', { state: { result } });
    } catch (err) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-full py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {isLoading && <LoadingOverlay />}
      
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">AI-Powered</span> Career Coach
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Upload your resume and get instant, actionable feedback. We'll identify skill gaps, suggest the best job roles, and build a personalized 12-week roadmap.
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-2">
          <div className="flex items-center px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <Sparkles className="w-5 h-5 mr-2" />
            <span className="font-medium">Deep AI Analysis</span>
          </div>
          <div className="flex items-center px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            <Target className="w-5 h-5 mr-2" />
            <span className="font-medium">ATS Formatting Tips</span>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="w-full max-w-3xl mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-center animate-fade-in shadow-sm">
          {error}
        </div>
      )}

      {/* Input Section component handles the complex UI logic for tabs/files */}
      <InputSection onAnalyze={handleAnalyze} isLoading={isLoading} />
    </div>
  );
};

export default HomePage;
