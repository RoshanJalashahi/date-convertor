
# Nepali Calendar Converter

A web application that allows users to convert dates between English (Gregorian) and Nepali (Bikram Sambat) calendar systems.

![Nepali Calendar Converter Screenshot](https://placeholder.com/screenshot.png)

## Features

- **Date Conversion**: Easily convert between English and Nepali date formats
- **Age Calculator**: Calculate age in both calendar systems
- **Calendar Information**: Learn about the differences between Gregorian and Bikram Sambat calendars
- **Visitor Counter**: Track the number of visitors to the site (powered by Supabase)
- **Responsive Design**: Works on mobile, tablet, and desktop devices

## Technology Stack

- **Frontend**: React with TypeScript
- **UI Components**: Shadcn UI and Tailwind CSS
- **Date Handling**: date-fns
- **Database**: Supabase (PostgreSQL)
- **Routing**: React Router
- **State Management**: React Query

## Prerequisites

Before setting up the project, make sure you have:

- Node.js (v16 or higher)
- A Supabase account and project with the following setup:
  - A `visitor_counter` table with `id` and `count` columns

## Environment Variables

Create a `.env` file in the project root with the following variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Setup Instructions

1. Clone the repository
   ```
   git clone https://github.com/yourusername/nepali-calendar-converter.git
   cd nepali-calendar-converter
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Supabase Database Setup

1. Create a new table named `visitor_counter` with the following schema:
   - `id` (integer, primary key)
   - `count` (integer)

2. Insert an initial record:
   ```sql
   INSERT INTO visitor_counter (id, count) VALUES (1, 0);
   ```

3. Set up Row Level Security (RLS) as needed for your use case

## Deployment

The project can be deployed using services like Vercel, Netlify, or GitHub Pages. Make sure to set the environment variables in your deployment platform.

```
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- The Nepali date conversion algorithm
- Tailwind CSS and Shadcn UI for the beautiful components
- Supabase for the backend services
