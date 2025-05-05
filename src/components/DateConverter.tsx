
import React, { useState } from 'react';
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
  nepaliToEnglish 
} from '@/utils/dateConverter';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const DateConverter: React.FC = () => {
  // English to Nepali state
  const [englishDate, setEnglishDate] = useState<Date>(new Date());
  const [nepaliDate, setNepaliDate] = useState(() => englishToNepali(new Date()));

  // Nepali to English state
  const [nepaliYear, setNepaliYear] = useState<number>(2080);
  const [nepaliMonth, setNepaliMonth] = useState<number>(0);
  const [nepaliDay, setNepaliDay] = useState<number>(1);
  const [convertedEnglishDate, setConvertedEnglishDate] = useState<Date>(() => 
    nepaliToEnglish(2080, 0, 1)
  );

  // Handle English to Nepali conversion
  const handleEnglishDateChange = (date: Date | undefined) => {
    if (date) {
      setEnglishDate(date);
      setNepaliDate(englishToNepali(date));
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

  // Generate year options (2000-2090 BS)
  const yearOptions = Array.from({ length: 91 }, (_, i) => 2000 + i);
  
  // Generate day options based on selected month and year
  const getDaysInNepaliMonth = (year: number, month: number): number => {
    const yearData = [2000, [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]];
    return yearData[1][month];
  };
  
  const dayOptions = Array.from(
    { length: getDaysInNepaliMonth(nepaliYear, nepaliMonth) }, 
    (_, i) => i + 1
  );

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
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal h-14"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {englishDate ? format(englishDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={englishDate}
                        onSelect={handleEnglishDateChange}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="flex items-center justify-center">
                  <ArrowRight className="h-6 w-6 text-primary hidden md:block" />
                </div>
                
                <div className="flex-1">
                  <Label className="text-lg font-semibold mb-4 block">Nepali Date</Label>
                  <div className="w-full p-4 border rounded-md bg-muted">
                    <p className="text-lg">{formatNepaliDate(nepaliDate)}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {nepaliDate.year} साल {nepaliMonths[nepaliDate.month]} {nepaliDate.day} गते {nepaliDate.dayName}
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
                            {dayOptions.map((day) => (
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
