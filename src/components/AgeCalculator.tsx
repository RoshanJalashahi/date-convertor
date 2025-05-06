
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { format, differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';
import { 
  englishMonths, 
  nepaliMonths, 
  getDaysInMonth,
  getDaysInNepaliMonth,
  nepaliToEnglish,
  englishToNepali
} from '@/utils/dateConverter';
import { Calendar, Clock, Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AgeCalculator: React.FC = () => {
  // English calendar states
  const [englishBirthYear, setEnglishBirthYear] = useState<number>(2000);
  const [englishBirthMonth, setEnglishBirthMonth] = useState<number>(0);
  const [englishBirthDay, setEnglishBirthDay] = useState<number>(1);
  
  // Nepali calendar states
  const [nepaliBirthYear, setNepaliBirthYear] = useState<number>(2057);
  const [nepaliBirthMonth, setNepaliBirthMonth] = useState<number>(0);
  const [nepaliBirthDay, setNepaliBirthDay] = useState<number>(1);
  
  // Age result states
  const [englishAge, setEnglishAge] = useState<{years: number; months: number; days: number} | null>(null);
  const [nepaliAge, setNepaliAge] = useState<{years: number; months: number; days: number} | null>(null);

  // Loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Toast for notifications
  const { toast } = useToast();

  // Generate year options for English date (1900 to current year)
  const currentYear = new Date().getFullYear();
  const englishYearOptions = Array.from({ length: currentYear - 1899 }, (_, i) => 1900 + i);
  
  // Generate day options based on selected English month and year
  const englishDayOptions = Array.from(
    { length: getDaysInMonth(englishBirthYear, englishBirthMonth) }, 
    (_, i) => i + 1
  );

  // Generate year options for Nepali date (2000-2090 BS)
  const nepaliYearOptions = Array.from({ length: 91 }, (_, i) => 2000 + i);
  
  // Generate day options based on selected Nepali month and year
  const nepaliBirthDayOptions = Array.from(
    { length: getDaysInNepaliMonth(nepaliBirthYear, nepaliBirthMonth) }, 
    (_, i) => i + 1
  );

  // Calculate age in English calendar with loading
  const calculateEnglishAge = async () => {
    setIsLoading(true);
    
    // Small delay to show loading state for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      const birthDate = new Date(englishBirthYear, englishBirthMonth, englishBirthDay);
      const today = new Date();
      
      if (today < birthDate) {
        toast({
          title: "Invalid Birth Date",
          description: "Birth date cannot be in the future.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      const years = differenceInYears(today, birthDate);
      
      // Calculate remaining months after subtracting years
      const birthDatePlusYears = new Date(birthDate);
      birthDatePlusYears.setFullYear(birthDate.getFullYear() + years);
      const months = differenceInMonths(today, birthDatePlusYears);
      
      // Calculate remaining days after subtracting years and months
      const birthDatePlusYearsAndMonths = new Date(birthDatePlusYears);
      birthDatePlusYearsAndMonths.setMonth(birthDatePlusYears.getMonth() + months);
      let days = differenceInDays(today, birthDatePlusYearsAndMonths);
      
      // Validate and set the age
      if (years >= 0) {
        setEnglishAge({ years, months, days });
        
        // Calculate Nepali age as well based on the English birth date
        const nepaliDate = englishToNepali(birthDate);
        setNepaliBirthYear(nepaliDate.year);
        setNepaliBirthMonth(nepaliDate.month);
        setNepaliBirthDay(nepaliDate.day);
        calculateNepaliAge(nepaliDate.year, nepaliDate.month, nepaliDate.day);
        
        toast({
          title: "Age Calculated Successfully",
          description: `You are ${years} years, ${months} months, and ${days} days old.`
        });
      }
    } catch (error) {
      console.error("Error calculating English age:", error);
      toast({
        title: "Calculation Error",
        description: "An error occurred while calculating your age.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate age in Nepali calendar
  const calculateNepaliAge = async (year = nepaliBirthYear, month = nepaliBirthMonth, day = nepaliBirthDay) => {
    setIsLoading(true);
    
    // Small delay to show loading state for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      const birthDate = nepaliToEnglish(year, month, day);
      const today = new Date();
      
      if (today < birthDate) {
        toast({
          title: "Invalid Birth Date",
          description: "Birth date cannot be in the future.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      const todayNepali = englishToNepali(today);
      
      let years = todayNepali.year - year;
      let months = todayNepali.month - month;
      let days = todayNepali.day - day;
      
      // Adjust for negative days
      if (days < 0) {
        months--;
        const daysInPrevMonth = getDaysInNepaliMonth(
          todayNepali.month === 0 ? todayNepali.year - 1 : todayNepali.year, 
          todayNepali.month === 0 ? 11 : todayNepali.month - 1
        );
        days += daysInPrevMonth;
      }
      
      // Adjust for negative months
      if (months < 0) {
        years--;
        months += 12;
      }
      
      setNepaliAge({ years, months, days });
      
      // Update English birth date based on Nepali date
      const englishDate = nepaliToEnglish(year, month, day);
      setEnglishBirthYear(englishDate.getFullYear());
      setEnglishBirthMonth(englishDate.getMonth());
      setEnglishBirthDay(englishDate.getDate());
      
      toast({
        title: "Age Calculated Successfully",
        description: `You are ${years} years, ${months} months, and ${days} days old in Nepali calendar.`
      });
    } catch (error) {
      console.error("Error calculating Nepali age:", error);
      toast({
        title: "Calculation Error",
        description: "An error occurred while calculating your age.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Clock className="h-6 w-6" />
            Age Calculator
          </CardTitle>
          <CardDescription>
            Calculate your age based on your birth date in both English and Nepali calendars
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="english" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="english">English Birth Date</TabsTrigger>
              <TabsTrigger value="nepali">Nepali Birth Date</TabsTrigger>
            </TabsList>
            
            {/* English Calendar Tab */}
            <TabsContent value="english" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="english-year">Birth Year</Label>
                  <Select
                    value={englishBirthYear.toString()}
                    onValueChange={(value) => setEnglishBirthYear(parseInt(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {englishYearOptions.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="english-month">Birth Month</Label>
                  <Select
                    value={englishBirthMonth.toString()}
                    onValueChange={(value) => setEnglishBirthMonth(parseInt(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {englishMonths.map((month, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="english-day">Birth Day</Label>
                  <Select
                    value={englishBirthDay.toString()}
                    onValueChange={(value) => setEnglishBirthDay(parseInt(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {englishDayOptions.map((day) => (
                          <SelectItem key={day} value={day.toString()}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button onClick={calculateEnglishAge} className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  'Calculate Age'
                )}
              </Button>
            </TabsContent>
            
            {/* Nepali Calendar Tab */}
            <TabsContent value="nepali" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="nepali-year">Birth Year</Label>
                  <Select
                    value={nepaliBirthYear.toString()}
                    onValueChange={(value) => setNepaliBirthYear(parseInt(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {nepaliYearOptions.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="nepali-month">Birth Month</Label>
                  <Select
                    value={nepaliBirthMonth.toString()}
                    onValueChange={(value) => setNepaliBirthMonth(parseInt(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {nepaliMonths.map((month, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="nepali-day">Birth Day</Label>
                  <Select
                    value={nepaliBirthDay.toString()}
                    onValueChange={(value) => setNepaliBirthDay(parseInt(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {nepaliBirthDayOptions.map((day) => (
                          <SelectItem key={day} value={day.toString()}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button onClick={() => calculateNepaliAge()} className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  'Calculate Age'
                )}
              </Button>
            </TabsContent>
          </Tabs>
          
          {/* Age Results Section */}
          {(englishAge || nepaliAge) && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {englishAge && (
                <div className="p-4 border rounded-md bg-muted">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Calendar className="h-5 w-5" /> 
                    English Calendar Age
                  </h3>
                  <p className="text-xl">
                    {englishAge.years} years, {englishAge.months} months, {englishAge.days} days
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Birth date: {englishBirthDay} {englishMonths[englishBirthMonth]} {englishBirthYear}
                  </p>
                </div>
              )}
              
              {nepaliAge && (
                <div className="p-4 border rounded-md bg-muted">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Calendar className="h-5 w-5" /> 
                    Nepali Calendar Age
                  </h3>
                  <p className="text-xl">
                    {nepaliAge.years} years, {nepaliAge.months} months, {nepaliAge.days} days
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Birth date: {nepaliBirthDay} {nepaliMonths[nepaliBirthMonth]} {nepaliBirthYear}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgeCalculator;
