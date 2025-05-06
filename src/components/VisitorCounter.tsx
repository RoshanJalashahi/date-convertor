
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

const VisitorCounter: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const { toast } = useToast();
  
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
      
      // Show toast for new visitors
      toast({
        title: "Welcome!",
        description: "You're visitor #" + count,
        duration: 3000,
      });
    }
    
    setVisitorCount(count);
  }, []);

  return (
    <div className="bg-white bg-opacity-70 rounded-lg shadow-md py-1 px-3 text-xs font-medium">
      <span className="font-bold text-primary">{visitorCount}</span> visitors
    </div>
  );
};

export default VisitorCounter;
