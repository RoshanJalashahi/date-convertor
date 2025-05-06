
import React, { useState, useEffect } from 'react';

const VisitorCounter: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  
  useEffect(() => {
    // Get the current count from localStorage
    const storedCount = localStorage.getItem('visitorCount');
    let count = storedCount ? parseInt(storedCount, 10) : 0;
    
    // Check if this is a new session
    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date().toISOString();
    const isNewSession = !lastVisit || 
                         new Date(now).getTime() - new Date(lastVisit).getTime() > 30 * 60 * 1000; // 30 minutes
    
    // Increment count if it's a new session
    if (isNewSession) {
      count += 1;
      localStorage.setItem('visitorCount', count.toString());
      localStorage.setItem('lastVisit', now);
    }
    
    setVisitorCount(count);
  }, []);

  return (
    <div className="text-center py-2 bg-white bg-opacity-70 rounded-lg shadow-sm inline-block px-4">
      <p className="text-sm">
        <span className="font-semibold">{visitorCount}</span> visitors have used this converter
      </p>
    </div>
  );
};

export default VisitorCounter;
