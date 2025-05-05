
import React from 'react';
import DateConverter from '@/components/DateConverter';
import CalendarInfo from '@/components/CalendarInfo';
import AgeCalculator from '@/components/AgeCalculator';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen nepali-pattern">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-2">Nepali Calendar Converter</h1>
          <h2 className="text-xl text-muted-foreground">Convert between English (Gregorian) and Nepali (Bikram Sambat) dates</h2>
          <div className="w-24 h-1 bg-accent mx-auto my-6"></div>
        </header>
        
        <main>
          <DateConverter />
          <AgeCalculator />
          <CalendarInfo />
        </main>
        
        <footer className="text-center mt-16 pt-6 border-t text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Nepali Calendar Converter</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
