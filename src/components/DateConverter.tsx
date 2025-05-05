
import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { 
  englishMonths, 
  nepaliMonths, 
  formatEnglishDate, 
  formatNepaliDate,
  englishToNepali, 
  nepaliToEnglish,
  getDaysInNepaliMonth
} from '@/utils/dateConverter';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const DateConverter: React.FC = () => {
  // English to Nepali state
  const [englishYear, setEnglishYear] = useState<number>(new Date().getFullYear());
  const [englishMonth, setEnglishMonth] = useState<number>(new Date().getMonth());
  const [englishDay, setEnglishDay] = useState<number>(new Date().getDate());
  const [convertedNepaliDate, setConvertedNepaliDate] = useState(() => 
    englishToNepali(new Date())
  );

  // Nepali to English state
  const [nepaliYear, setNepaliYear] = useState<number>(2080);
  const [nepaliMonth, setNepaliMonth] = useState<number>(0);
  const [nepaliDay, setNepaliDay] = useState<number>(1);
  const [convertedEnglishDate, setConvertedEnglishDate] = useState<Date>(() => 
    nepaliToEnglish(2080, 0, 1)
  );

  // Handle English to Nepali conversion
  const handleEnglishDateChange = () => {
    try {
      const englishDate = new Date(englishYear, englishMonth, englishDay);
      setConvertedNepaliDate(englishToNepali(englishDate));
    } catch (error) {
      console.error("Conversion error:", error);
    }
  };

  // Handle Nepali to English conversion
  const handleNepaliDateChange = () => {
    try {
      const englishDate = nepaliToEnglish(nepaliYear, nepaliMonth, nepaliDay);
      setConvertedEnglishDate(englishDate);
    } catch (error) {
      console.error("Conversion error:", error);
    }
  };

  // Generate year options for English date (current year ± 100 years)
  const currentYear = new Date().getFullYear();
  const englishYearOptions = Array.from({ length: 201 }, (_, i) => currentYear - 100 + i);
  
  // Generate day options based on selected English month and year
  const getEnglishDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const englishDayOptions = Array.from(
    { length: getEnglishDaysInMonth(englishYear, englishMonth) }, 
    (_, i) => i + 1
  );

  // Generate year options for Nepali date (2000-2090 BS)
  const yearOptions = Array.from({ length: 91 }, (_, i) => 2000 + i);
  
  // Generate day options based on selected Nepali month and year
  const nepaliDayOptions = Array.from(
    { length: getDaysInNepaliMonth(nepaliYear, nepaliMonth) }, 
    (_, i) => i + 1
  );

  // Update the day if it exceeds the days in the month when month/year changes
  useEffect(() => {
    const daysInMonth = getEnglishDaysInMonth(englishYear, englishMonth);
    if (englishDay > daysInMonth) {
      setEnglishDay(daysInMonth);
    }
  }, [englishYear, englishMonth]);

  useEffect(() => {
    const daysInMonth = getDaysInNepaliMonth(nepaliYear, nepaliMonth);
    if (nepaliDay > daysInMonth) {
      setNepaliDay(daysInMonth);
    }
  }, [nepaliYear, nepaliMonth]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="english-to-nepali" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="english-to-nepali">English to Nepali</TabsTrigger>
          <TabsTrigger value="nepali-to-english">Nepali to English</TabsTrigger>
        </TabsList>
        
        {/* English to Nepali Tab */}
        <TabsContent value="english-to-nepali">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Convert English Date to Nepali</CardTitle>
              <CardDescription>
                Select an English date to see its equivalent in the Nepali calendar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                <div className="flex-1">
                  <Label className="text-lg font-semibold mb-4 block">English Date</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="english-year">Year</Label>
                      <Select
                        value={englishYear.toString()}
                        onValueChange={(value) => setEnglishYear(parseInt(value))}
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
                      <Label htmlFor="english-month">Month</Label>
                      <Select
                        value={englishMonth.toString()}
                        onValueChange={(value) => setEnglishMonth(parseInt(value))}
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
                      <Label htmlFor="english-day">Day</Label>
                      <Select
                        value={englishDay.toString()}
                        onValueChange={(value) => setEnglishDay(parseInt(value))}
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
                  <Button 
                    className="w-full mt-4" 
                    onClick={handleEnglishDateChange}
                  >
                    Convert
                  </Button>
                </div>
                
                <div className="flex items-center justify-center">
                  <ArrowRight className="h-6 w-6 text-primary hidden md:block" />
                </div>
                
                <div className="flex-1">
                  <Label className="text-lg font-semibold mb-4 block">Nepali Date</Label>
                  <div className="w-full p-4 border rounded-md bg-muted">
                    <p className="text-lg">{formatNepaliDate(convertedNepaliDate)}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {convertedNepaliDate.year} साल {nepaliMonths[convertedNepaliDate.month]} {convertedNepaliDate.day} गते {convertedNepaliDate.dayName}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Nepali to English Tab */}
        <TabsContent value="nepali-to-english">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Convert Nepali Date to English</CardTitle>
              <CardDescription>
                Select a Nepali date to see its equivalent in the English calendar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                <div className="flex-1">
                  <Label className="text-lg font-semibold mb-4 block">Nepali Date</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="nepali-year">Year</Label>
                      <Select
                        value={nepaliYear.toString()}
                        onValueChange={(value) => setNepaliYear(parseInt(value))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {yearOptions.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="nepali-month">Month</Label>
                      <Select
                        value={nepaliMonth.toString()}
                        onValueChange={(value) => setNepaliMonth(parseInt(value))}
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
                      <Label htmlFor="nepali-day">Day</Label>
                      <Select
                        value={nepaliDay.toString()}
                        onValueChange={(value) => setNepaliDay(parseInt(value))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Day" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {nepaliDayOptions.map((day) => (
                              <SelectItem key={day} value={day.toString()}>
                                {day}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    onClick={handleNepaliDateChange}
                  >
                    Convert
                  </Button>
                </div>
                
                <div className="flex items-center justify-center">
                  <ArrowRight className="h-6 w-6 text-primary hidden md:block" />
                </div>
                
                <div className="flex-1">
                  <Label className="text-lg font-semibold mb-4 block">English Date</Label>
                  <div className="w-full p-4 border rounded-md bg-muted">
                    <p className="text-lg">
                      {formatEnglishDate(convertedEnglishDate)}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {format(convertedEnglishDate, "EEEE, MMMM do, yyyy")}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              <p>Note: Nepali dates are available between 2000 BS and 2090 BS</p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DateConverter;
