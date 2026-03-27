import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const messages = [
  "Reading your resume...",
  "Analyzing skills...",
  "Mapping career paths...",
  "Generating roadmap...",
  "Almost there..."
];

const LoadingOverlay = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Cycle through messages every 2 seconds
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm transition-all duration-300">
      <Loader2 className="h-16 w-16 text-primary animate-spin mb-6" />
      <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-pulse">
        {messages[messageIndex]}
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        This usually takes about 10-15 seconds.
      </p>
    </div>
  );
};

export default LoadingOverlay;
