# VCFinder Deployment Guide

This guide covers multiple deployment options for the VCFinder platform.

## 🚀 Quick Deployment Options

### Option 1: Replit (Recommended - Zero Config)

1. **Import to Replit**
   - Go to [replit.com](https://replit.com)
   - Click "Create Repl" → "Import from GitHub"
   - Paste your repository URL
   - Replit will auto-detect the setup

2. **Deploy**
   - Click the "Deploy" button in Replit
   - Choose "Autoscale" deployment
   - Your app will be live at `https://your-repl-name.your-username.replit.app`

### Option 2: Vercel (Frontend + API)

1. **Setup**
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Configure Environment**
   - Add environment variables in Vercel dashboard
   - Set `NODE_ENV=production`

### Option 3: Railway

1. **Connect Repository**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository
   - Railway auto-deploys on push

2. **Environment Variables**
   ```
   NODE_ENV=production
   PORT=5000
   ```

### Option 4: Render

1. **Create Web Service**
   - Go to [render.com](https://render.com)
   - Connect your repository
   - Set build command: `npm install && npm run build`
   - Set start command: `npm start`

## 🔧 Local Development Setup

### VS Code Setup

1. **Clone and Open**
   ```bash
   git clone <your-repo>
   cd vcfinder
   code .
   ```

2. **Install Recommended Extensions**
   - Open Command Palette (Ctrl+Shift+P)
   - Run "Extensions: Show Recommended Extensions"
   - Install all recommended extensions

3. **Start Development**
   - Press F5 to start debugging OR
   - Press Ctrl+Shift+P → "Tasks: Run Task" → "Start Development Server"
   - Open http://localhost:5000

### Available Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start           # Start production server

# Debugging in VS Code
F5                  # Start debugger
Ctrl+Shift+P        # Command palette
```

## 🌐 Production Configuration

### Environment Variables

Create `.env.production`:
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=your_postgres_url  # Optional
```

### Build Optimization

The project includes:
- ✅ Automatic code splitting
- ✅ TypeScript compilation
- ✅ TailwindCSS optimization
- ✅ Asset minification
- ✅ Source maps for debugging

### Performance Features

- **Caching**: 24-hour cache for scraped VC data
- **Lazy Loading**: Components load on demand
- **Optimized Queries**: Efficient database operations
- **CDN Ready**: Static assets can be served from CDN

## 🔒 Security Considerations

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use HTTPS (handled by most platforms)
- [ ] Set proper CORS origins
- [ ] Rate limit API endpoints
- [ ] Validate all inputs
- [ ] Use environment variables for secrets

### API Security

The platform includes:
- Input validation with Zod schemas
- Error handling without data leaks
- Secure contact information access
- Rate limiting on scraping endpoints

## 📊 Monitoring

### Health Check Endpoints

```bash
GET /api/vcs          # Check if VCs are loading
POST /api/vcs/refresh # Test data refresh
```

### Logging

Production logs include:
- API request/response times
- Scraping success/failure rates
- Database query performance
- Error tracking

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm test
```

## 🎯 Platform-Specific Notes

### Replit
- Zero configuration required
- Automatic HTTPS
- Built-in database options
- Easy custom domain setup

### Vercel
- Excellent for static + serverless
- Automatic SSL certificates
- Global CDN
- Great performance analytics

### Railway
- Full-stack deployment
- Automatic PostgreSQL
- Docker support
- Simple pricing

### Render
- Free tier available
- Automatic SSL
- GitHub integration
- PostgreSQL add-on

## 📞 Support

If you encounter deployment issues:
1. Check the console for error messages
2. Verify environment variables are set
3. Test API endpoints manually
4. Check platform-specific documentation

The application is designed to be deployment-friendly with minimal configuration required.