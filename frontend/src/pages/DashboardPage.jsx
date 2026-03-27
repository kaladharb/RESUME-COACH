import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Printer, ArrowLeft } from 'lucide-react';
import ResumeScoreCard from '../components/ResumeScoreCard';
import JobRolesCard from '../components/JobRolesCard';
import SkillsSection from '../components/SkillsSection';
import SkillGapChart from '../components/SkillGapChart';
import StrengthsWeaknesses from '../components/StrengthsWeaknesses';
import ImprovementsList from '../components/ImprovementsList';
import CareerRoadmap from '../components/CareerRoadmap';
import ATSTips from '../components/ATSTips';

const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  useEffect(() => {
    // Redirect to home if accessed directly without data
    if (!result) {
      navigate('/');
    }
  }, [result, navigate]);

  if (!result) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-full py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      
      {/* Top Bar Action Buttons */}
      <div className="flex justify-between items-center mb-8 no-print">
        <Link 
          to="/" 
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Analyze Another</span>
        </Link>
        <button 
          onClick={handlePrint}
          className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <Printer className="h-4 w-4 mr-2" />
          <span>Export as PDF</span>
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Score & Jobs */}
        <div className="lg:col-span-1 space-y-8">
          <ResumeScoreCard 
            score={result.resumeScore} 
            reason={result.scoreReason} 
          />
          <JobRolesCard roles={result.jobRoles || []} />
          <ATSTips tips={result.atsTips || []} />
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-8">
          <SkillsSection 
            programming={result.programmingLanguages || []} 
            tools={result.toolsAndTechnologies || []} 
            soft={result.softSkills || []} 
          />
          <SkillGapChart 
            presentCount={(result.programmingLanguages?.length || 0) + (result.toolsAndTechnologies?.length || 0) + (result.softSkills?.length || 0)} 
            missingSkills={result.missingSkills || []} 
          />
          <StrengthsWeaknesses 
            strengths={result.strengths || []} 
            weaknesses={result.weaknesses || []} 
          />
          <ImprovementsList improvements={result.improvements || []} />
          <CareerRoadmap roadmap={result.roadmap || []} />
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
