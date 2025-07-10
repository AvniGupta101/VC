# VCFinder - Venture Capital Discovery Platform

A comprehensive web application that connects startups with industry-specialized venture capitalists. Features real VC data sourced from vcsheet.com with advanced filtering and search capabilities.

## Features

- **Real VC Data**: Scraped from vcsheet.com with authentic contact information
- **Industry-Based Search**: Filter by fintech, AI/ML, climate tech, PropTech, and more
- **Investment Stage Filtering**: Pre-seed through Series C+ options
- **Geographic Focus**: North America, Global, Europe, Latin America
- **Contact Information**: Verified email addresses, websites, and social profiles
- **Refresh Capability**: Manual data refresh from source

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, TailwindCSS, shadcn/ui
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Data Source**: Web scraping from vcsheet.com using Cheerio and Axios
- **State Management**: TanStack Query (React Query)

## Setup Instructions

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (optional - uses in-memory storage by default)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd vcfinder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables** (optional)
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/vcfinder
   NODE_ENV=development
   PORT=5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5000
   - API: http://localhost:5000/api

## API Endpoints

- `GET /api/vcs` - Get all VCs
- `GET /api/vcs/search?industry=fintech&stages=Seed` - Search VCs with filters
- `GET /api/vcs/:id` - Get specific VC details
- `GET /api/vcs/:id/contact` - Get VC contact information
- `POST /api/vcs/refresh` - Refresh VC data from vcsheet.com

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Route components
│   │   ├── hooks/          # Custom hooks
│   │   └── lib/            # Utilities
├── server/                 # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage layer
│   └── scraper.ts         # Web scraping logic
├── shared/                 # Shared types and schemas
└── package.json
```

## Deployment

### Option 1: Replit (Recommended)
The project is optimized for Replit deployment:
1. Import the project to Replit
2. Install dependencies automatically
3. Run with `npm run dev`
4. Deploy using Replit's deployment feature

### Option 2: Vercel/Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in your hosting platform

### Option 3: Traditional Hosting
1. Set up Node.js environment
2. Install dependencies: `npm install`
3. Build: `npm run build`
4. Start: `npm start`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details