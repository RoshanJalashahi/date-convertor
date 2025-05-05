
/**
 * Utility for converting between Gregorian (English) and Bikram Sambat (Nepali) calendar systems
 * Implementation based on the algorithms for Nepali date conversion
 */

// Map of Nepali month names
export const nepaliMonths = [
  'Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 
  'Bhadra', 'Ashwin', 'Kartik', 'Mangsir', 
  'Poush', 'Magh', 'Falgun', 'Chaitra'
];

// Map of English month names
export const englishMonths = [
  'January', 'February', 'March', 'April', 
  'May', 'June', 'July', 'August', 
  'September', 'October', 'November', 'December'
];

// Map of day names
export const dayNames = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 
  'Thursday', 'Friday', 'Saturday'
];

// Nepali date data: Number of days in each month of each year
// Format: [year, [days_in_month1, days_in_month2, ..., days_in_month12]]
// Data for years 2000-2090 BS
const nepaliDateData = [
  [2000, [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]],
  [2001, [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2002, [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]],
  [2003, [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]],
  [2004, [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]],
  [2005, [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2006, [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]],
  [2007, [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]],
  [2008, [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31]],
  [2009, [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2010, [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]],
  [2011, [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]],
  [2012, [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30]],
  [2013, [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2014, [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]],
  [2015, [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]],
  [2016, [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30]],
  [2017, [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2018, [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30]],
  [2019, [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]],
  [2020, [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2021, [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2022, [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]],
  [2023, [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]],
  [2024, [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2025, [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2026, [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]],
  [2027, [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]],
  [2028, [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2029, [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]],
  [2030, [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]],
  [2031, [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]],
  [2032, [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2033, [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]],
  [2034, [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]],
  [2035, [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31]],
  [2036, [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2037, [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]],
  [2038, [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]],
  [2039, [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30]],
  [2040, [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2041, [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]],
  [2042, [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]],
  [2043, [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30]],
  [2044, [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2045, [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30]],
  [2046, [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]],
  [2047, [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2048, [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2049, [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]],
  [2050, [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]],
  [2051, [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2052, [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2053, [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]],
  [2054, [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]],
  [2055, [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2056, [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30]],
  [2057, [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]],
  [2058, [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]],
  [2059, [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2060, [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]],
  [2061, [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]],
  [2062, [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31]],
  [2063, [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2064, [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]],
  [2065, [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]],
  [2066, [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31]],
  [2067, [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2068, [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]],
  [2069, [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]],
  [2070, [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30]],
  [2071, [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2072, [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30]],
  [2073, [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]],
  [2074, [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2075, [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2076, [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]],
  [2077, [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]],
  [2078, [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2079, [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]],
  [2080, [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]],
  [2081, [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30]],
  [2082, [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30]],
  [2083, [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30]],
  [2084, [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30]],
  [2085, [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30]],
  [2086, [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30]],
  [2087, [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30]],
  [2088, [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30]],
  [2089, [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30]],
  [2090, [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30]],
];

// Reference date for conversion
// 2000/01/01 BS = 1943/04/14 AD
const referenceEnglishDate = new Date(1943, 3, 14); // Month is 0-based in JavaScript
const referenceNepaliDate = { year: 2000, month: 0, day: 1 }; // Month is 0-based

// Function to check if a year is a leap year in Gregorian calendar
const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

// Function to get total days in a month for Gregorian calendar
const getDaysInMonth = (year: number, month: number): number => {
  return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

// Function to convert English date to Nepali date
export const englishToNepali = (date: Date): { year: number; month: number; day: number; monthName: string; dayName: string } => {
  // Calculate the total days from reference date
  let totalEnglishDays = 0;
  let curDate = new Date(referenceEnglishDate);
  
  // Calculate days between reference date and input date
  while (curDate.getFullYear() < date.getFullYear() || curDate.getMonth() < date.getMonth() || curDate.getDate() < date.getDate()) {
    totalEnglishDays++;
    curDate.setDate(curDate.getDate() + 1);
  }
  
  // Start with reference Nepali date and advance by calculated days
  let nepaliYear = referenceNepaliDate.year;
  let nepaliMonth = referenceNepaliDate.month;
  let nepaliDay = referenceNepaliDate.day;
  
  // Find the year, month and day in Nepali calendar
  let daysInMonth;
  while (totalEnglishDays > 0) {
    // Get the days in current Nepali month
    daysInMonth = nepaliDateData.find(item => item[0] === nepaliYear)?.[1][nepaliMonth] || 30;
    
    if (nepaliDay < daysInMonth) {
      nepaliDay++;
    } else {
      nepaliDay = 1;
      nepaliMonth++;
      
      if (nepaliMonth >= 12) {
        nepaliMonth = 0;
        nepaliYear++;
      }
    }
    
    totalEnglishDays--;
  }

  const dayName = dayNames[date.getDay()];
  const monthName = nepaliMonths[nepaliMonth];
  
  return { year: nepaliYear, month: nepaliMonth, day: nepaliDay, monthName, dayName };
};

// Function to convert Nepali date to English date
export const nepaliToEnglish = (year: number, month: number, day: number): Date => {
  if (year < 2000 || year > 2090) {
    throw new Error("Year out of range (2000-2090 BS)");
  }
  
  // Calculate total days since reference date
  let totalNepaliDays = 0;
  
  // Days from reference year to year before target year
  for (let i = referenceNepaliDate.year; i < year; i++) {
    const yearData = nepaliDateData.find(data => data[0] === i);
    if (yearData) {
      totalNepaliDays += yearData[1].reduce((sum, days) => sum + days, 0);
    }
  }
  
  // Days from months in target year
  const yearData = nepaliDateData.find(data => data[0] === year);
  if (yearData) {
    for (let i = 0; i < month; i++) {
      totalNepaliDays += yearData[1][i];
    }
  }
  
  // Add days of target month
  totalNepaliDays += day - 1; // -1 because we're starting from day 1
  
  // Convert to English date by adding total days to reference date
  const resultDate = new Date(referenceEnglishDate);
  resultDate.setDate(resultDate.getDate() + totalNepaliDays);
  
  return resultDate;
};

// Format Nepali date as string
export const formatNepaliDate = (date: { year: number; month: number; day: number; monthName: string; dayName: string }): string => {
  return `${date.day} ${nepaliMonths[date.month]} ${date.year} (${date.dayName})`;
};

// Format English date as string
export const formatEnglishDate = (date: Date): string => {
  return `${date.getDate()} ${englishMonths[date.getMonth()]} ${date.getFullYear()} (${dayNames[date.getDay()]})`;
};
