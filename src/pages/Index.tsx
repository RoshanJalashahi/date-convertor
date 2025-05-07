
import React from 'react';
import DateConverter from '@/components/DateConverter';
import CalendarInfo from '@/components/CalendarInfo';
import AgeCalculator from '@/components/AgeCalculator';
import VisitorCounter from '@/components/VisitorCounter';
import { format } from 'date-fns';

const Index: React.FC = () => {
  // Get today's date in both English and Nepali formats
  const today = new Date();
  const todayFormatted = format(today, "EEEE, MMMM d, yyyy");
  
  return (
    <div className="min-h-screen nepali-pattern relative">
      {/* Fixed position visitor counter */}
      <div className="fixed top-4 right-4 z-10">
        <VisitorCounter />
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-2">Nepali Calendar Converter</h1>
          <h2 className="text-xl text-muted-foreground">Convert between English (Gregorian) and Nepali (Bikram Sambat) dates</h2>
          <div className="w-24 h-1 bg-accent mx-auto my-6"></div>
          <div className="mt-4 p-2 rounded-lg bg-white bg-opacity-70 inline-block shadow-sm">
            <p className="text-lg">Today: <span className="font-semibold">{todayFormatted}</span></p>
          </div>
        </header>
        
        <main>
          <DateConverter />
          <AgeCalculator />
          <CalendarInfo />
        </main>
        
        <footer className="text-center mt-16 pt-6 border-t text-sm text-muted-foreground flex flex-col items-center gap-4">
          <VisitorCounter />
          <p>© {new Date().getFullYear()} Nepali Calendar Converter  ©powered by Desvu Techonolgy</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
