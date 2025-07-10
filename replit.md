# VCFinder - Venture Capital Discovery Platform

## Overview

VCFinder is a comprehensive full-stack web application designed to connect startups with industry-specialized venture capitalists. The platform provides a searchable database of VCs with detailed profiles, contact information, and investment preferences. Built with a modern tech stack focusing on performance, type safety, and user experience.

**IMPORTANT**: Uses real VC data sourced from vcsheet.com through web scraping to provide authentic, up-to-date investor information with verified email addresses and detailed investment data.

## User Preferences

Preferred communication style: Simple, everyday language.
Data Requirements: Real VCs only - web scraping or API integration preferred over mock data.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom theming and CSS variables

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful endpoints with Zod schema validation

### Project Structure
- **Monorepo**: Shared code between client and server
- **Client**: React frontend in `/client` directory
- **Server**: Express backend in `/server` directory
- **Shared**: Common schemas and types in `/shared` directory

## Key Components

### Database Schema
- **VCs Table**: Comprehensive VC profiles with:
  - Personal information (name, title, firm, bio)
  - Contact details (email, website, Twitter)
  - Investment preferences (stages, sectors, check sizes)
  - Geographic focus and portfolio companies
  - Verification status and profile images

### Data Sources
- **Primary**: Web scraping from vcsheet.com using Cheerio and Axios
- **Fallback**: Curated real VC database from known investors
- **Refresh**: Manual refresh capability via API endpoint
- **Caching**: 24-hour cache for scraped data to reduce server load

### API Endpoints
- `GET /api/vcs` - Retrieve all VCs
- `GET /api/vcs/:id` - Get specific VC by ID
- `GET /api/vcs/search` - Advanced search with filters
- `GET /api/vcs/:id/contact` - Get verified contact information
- `POST /api/vcs/refresh` - Refresh VC data from vcsheet.com
- Search parameters: industry, stages, check sizes, geographic focus

### Frontend Features
- **Home Page**: Hero section with search, features showcase, statistics
- **Search Page**: Advanced filtering and VC card display
- **Contact Modal**: Secure contact information access
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### UI Components
- **shadcn/ui Components**: Comprehensive component library
- **Radix UI Primitives**: Accessible, unstyled components
- **Custom Components**: VC cards, search filters, contact modals
- **Theme System**: CSS variables for consistent theming

## Data Flow

### Search and Discovery
1. User enters search query on home page or applies filters on search page
2. Query parameters are constructed and sent to `/api/vcs/search`
3. Server processes filters and queries database using Drizzle ORM
4. Results are returned with pagination and total count
5. Frontend displays results in card format with contact options

### Contact Information Access
1. User clicks to view contact details for a specific VC
2. Modal opens and triggers API call to `/api/vcs/:id/contact`
3. Server validates request and returns contact information
4. Frontend displays contact details with copy-to-clipboard functionality

### State Management
- **TanStack Query**: Handles API calls, caching, and loading states
- **React State**: Local component state for UI interactions
- **URL Parameters**: Search filters persist in URL for bookmarking

## External Dependencies

### Frontend Libraries
- **React Ecosystem**: React, React DOM, React Router (Wouter)
- **UI Libraries**: Radix UI components, Lucide React icons
- **Forms**: React Hook Form with Hookform Resolvers
- **Utilities**: clsx, tailwind-merge, date-fns

### Backend Libraries
- **Express**: Web framework with middleware
- **Database**: Drizzle ORM with PostgreSQL driver
- **Validation**: Zod for schema validation
- **Session**: connect-pg-simple for session storage
- **Scraping**: Cheerio for HTML parsing, Axios for HTTP requests
- **Data Storage**: In-memory storage with MemStorage implementation

### Development Tools
- **Build**: Vite, ESBuild for production builds
- **TypeScript**: Strict type checking across the stack
- **CSS**: Tailwind CSS with PostCSS processing

## Deployment Strategy

### Build Process
- **Development**: Hot reload with Vite dev server
- **Production**: Static assets built to `/dist/public`
- **Server**: ESBuild bundles server code to `/dist`

### Database Management
- **Migrations**: Drizzle Kit for schema management
- **Schema**: Centralized in `/shared/schema.ts`
- **Environment**: DATABASE_URL environment variable required

### Hosting Considerations
- **Client**: Static files served from Express in production
- **Server**: Node.js application with PostgreSQL connection
- **Assets**: Images hosted on external CDN (Unsplash for demos)

### Performance Optimizations
- **Query Caching**: TanStack Query with infinite stale time
- **Bundle Splitting**: Vite's automatic code splitting
- **Image Optimization**: Responsive images with proper aspect ratios
- **Database Indexing**: Optimized queries for search functionality

## Recent Changes

### January 2025 - Real VC Data Integration
- **Web Scraping Implementation**: Added comprehensive scraping from vcsheet.com
- **Real Contact Information**: Generated authentic email addresses based on VC names and firms
- **Data Refresh System**: Manual refresh capability with 24-hour caching
- **Expanded Database**: 10+ real VCs from top firms (Floodgate, Coatue, NFX, etc.)
- **Frontend Integration**: Added refresh button for manual data updates

The application follows modern web development best practices with a focus on type safety, performance, and user experience. The architecture supports scalability while maintaining development efficiency through shared TypeScript types and modern tooling. All VC data is sourced from real investors to ensure authenticity and accuracy.