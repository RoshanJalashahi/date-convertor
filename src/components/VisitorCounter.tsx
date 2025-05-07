
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const VisitorCounter: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const incrementAndFetchVisitorCount = async () => {
      try {
        setLoading(true);
        
        // Check if this is a new session
        const lastVisit = localStorage.getItem('lastVisit');
        const now = new Date().toISOString();
        const isNewSession = !lastVisit || 
                            new Date(now).getTime() - new Date(lastVisit).getTime() > 30 * 60 * 1000; // 30 minutes
        
        // Only increment count if this is a new session
        if (isNewSession) {
          // First, get the current count
          const { data: counterData, error: fetchError } = await supabase
            .from('visitor_counter')
            .select('count')
            .eq('id', 1)
            .single();
            
          if (fetchError && fetchError.code !== 'PGRST116') {
            console.error('Error fetching visitor count:', fetchError);
            return;
          }
          
          let newCount = 1; // Default to 1 if no record exists
          
          if (counterData) {
            // Increment the count
            newCount = counterData.count + 1;
            
            // Update the counter in the database
            const { error: updateError } = await supabase
              .from('visitor_counter')
              .update({ count: newCount })
              .eq('id', 1);
              
            if (updateError) {
              console.error('Error updating visitor count:', updateError);
              return;
            }
          } else {
            // Insert the first record
            const { error: insertError } = await supabase
              .from('visitor_counter')
              .insert([{ id: 1, count: 1 }]);
              
            if (insertError) {
              console.error('Error inserting visitor count:', insertError);
              return;
            }
          }
          
          // Store the current visit time in localStorage
          localStorage.setItem('lastVisit', now);
          
          // Show welcome toast
          toast({
            title: "Welcome!",
            description: "You're visitor #" + newCount,
            duration: 3000,
          });
          
          setVisitorCount(newCount);
        } else {
          // Just fetch the current count without incrementing
          const { data: counterData, error: fetchError } = await supabase
            .from('visitor_counter')
            .select('count')
            .eq('id', 1)
            .single();
            
          if (fetchError) {
            console.error('Error fetching visitor count:', fetchError);
            return;
          }
          
          if (counterData) {
            setVisitorCount(counterData.count);
          }
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    incrementAndFetchVisitorCount();
  }, []);

  return (
    <div className="bg-white bg-opacity-70 rounded-lg shadow-md py-1 px-3 text-xs font-medium">
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          <span className="font-bold text-primary">{visitorCount}</span> visitors
        </>
      )}
    </div>
  );
};

export default VisitorCounter;
