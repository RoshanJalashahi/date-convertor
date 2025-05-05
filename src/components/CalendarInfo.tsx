
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CalendarInfo: React.FC = () => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>About the Bikram Sambat (BS) Calendar</CardTitle>
        <CardDescription>
          The official calendar of Nepal
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          The Bikram Sambat (BS) calendar is the official calendar of Nepal and is approximately 56 years and 8.5 months ahead of the Gregorian (Western) calendar.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Key Features:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Lunar/solar calendar system</li>
              <li>New year typically begins in mid-April</li>
              <li>Months have varying lengths (29-32 days)</li>
              <li>Has been in use for over 1000 years</li>
              <li>Named after King Vikramaditya</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Nepali Month Names:</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p>1. Baisakh (बैशाख)</p>
                <p>2. Jestha (जेठ)</p>
                <p>3. Ashadh (असार)</p>
                <p>4. Shrawan (श्रावण)</p>
                <p>5. Bhadra (भाद्र)</p>
                <p>6. Ashwin (आश्विन)</p>
              </div>
              <div>
                <p>7. Kartik (कार्तिक)</p>
                <p>8. Mangsir (मंसिर)</p>
                <p>9. Poush (पौष)</p>
                <p>10. Magh (माघ)</p>
                <p>11. Falgun (फाल्गुन)</p>
                <p>12. Chaitra (चैत्र)</p>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mt-6">
          The calculator supports dates between 2000 BS (1943 AD) and 2090 BS (2033 AD).
          Nepali dates and Gregorian dates don't align perfectly as the Nepali calendar has varying month lengths.
        </p>
      </CardContent>
    </Card>
  );
};

export default CalendarInfo;
