import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';

const InputSection = ({ onAnalyze, isLoading }) => {
  const [activeTab, setActiveTab] = useState('pdf');
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Tab Switching
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFile(null);
    setText('');
  };

  // Drag and Drop Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange({ target: { files: e.dataTransfer.files } });
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit.");
        return;
      }
      setFile(selectedFile);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const removeFile = () => {
    setFile(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = () => {
    const formData = new FormData();
    if (activeTab === 'pdf' && file) {
      formData.append('resume', file);
    } else if (activeTab === 'text' && text.trim()) {
      formData.append('resumeText', text);
    }
    onAnalyze(formData);
  };

  const canSubmit = (activeTab === 'pdf' && file) || (activeTab === 'text' && text.trim().length > 50);

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300">
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 relative">
        <button
          className={`flex-1 py-4 text-center font-medium transition-colors flex items-center justify-center space-x-2
            ${activeTab === 'pdf' ? 'text-primary bg-primary/5' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}
          `}
          onClick={() => handleTabChange('pdf')}
        >
          <UploadCloud className="h-5 w-5" />
          <span>Upload PDF</span>
        </button>
        <button
          className={`flex-1 py-4 text-center font-medium transition-colors flex items-center justify-center space-x-2
            ${activeTab === 'text' ? 'text-primary bg-primary/5' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}
          `}
          onClick={() => handleTabChange('text')}
        >
          <FileText className="h-5 w-5" />
          <span>Paste Text</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="p-8">
        {activeTab === 'pdf' ? (
          <div 
            className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-colors
              ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 dark:border-gray-700'}
              ${file ? 'bg-gray-50 dark:bg-gray-800/50' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer'}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => !file && fileInputRef.current.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="application/pdf"
              onChange={handleFileChange}
            />
            
            {file ? (
              <div className="flex flex-col items-center text-center animate-fade-in">
                <FileText className="h-12 w-12 text-primary mb-3" />
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{file.name}</p>
                <p className="text-sm text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); removeFile(); }}
                  className="mt-4 flex items-center text-sm text-red-500 hover:text-red-700 transition-colors"
                >
                  <X className="h-4 w-4 mr-1" /> Remove File
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center pointer-events-none">
                <UploadCloud className="h-12 w-12 text-gray-400 mb-3" />
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">Click or drag PDF to upload</p>
                <p className="text-sm text-gray-500 mt-1">Maximum file size 5MB (PDF only)</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col animate-fade-in relative">
            <textarea
              className="w-full h-64 p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-shadow"
              placeholder="Paste your resume text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
              <span>{text.length} characters</span>
              {text.length > 0 && (
                <button onClick={() => setText('')} className="hover:text-red-500 transition-colors">
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-8">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || isLoading}
            className={`w-full py-4 px-6 rounded-xl font-bold text-lg text-white shadow-lg transition-all
              ${!canSubmit || isLoading 
                ? 'bg-gray-400 cursor-not-allowed opacity-70' 
                : 'bg-gradient-to-r from-primary to-secondary hover:shadow-primary/25 hover:-translate-y-1'
              }
            `}
          >
            {isLoading ? 'Processing...' : 'Analyze My Resume'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputSection;
