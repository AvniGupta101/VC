# VS Code Setup Instructions for VCFinder

## 📁 Step 1: Get the Code

### Option A: From Replit (Recommended)
1. Download your Replit project as a ZIP file
2. Extract to your desired folder
3. Open VS Code and select "Open Folder"
4. Choose the extracted VCFinder folder

### Option B: From GitHub
```bash
git clone https://github.com/your-username/vcfinder.git
cd vcfinder
code .
```

## 🔧 Step 2: VS Code Configuration

When you open the project in VS Code, it will automatically:
- ✅ Suggest recommended extensions
- ✅ Apply optimal settings
- ✅ Configure debugging
- ✅ Set up tasks

### Install Recommended Extensions
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "Extensions: Show Recommended Extensions"
3. Click "Install All" for the recommended extensions

Required extensions:
- **Prettier** - Code formatting
- **TypeScript** - Enhanced TypeScript support
- **Tailwind CSS** - CSS autocomplete
- **Auto Rename Tag** - HTML/JSX tag editing

## ⚙️ Step 3: Install Dependencies

Open the integrated terminal (`Ctrl+` ` or View → Terminal):

```bash
npm install
```

This installs all necessary packages including:
- React, TypeScript, Vite
- Express, Axios, Cheerio
- TailwindCSS, shadcn/ui components
- Database and validation libraries

## 🚀 Step 4: Start Development

### Method 1: Use VS Code Tasks (Recommended)
1. Press `Ctrl+Shift+P`
2. Type "Tasks: Run Task"
3. Select "Start Development Server"
4. The app will start at http://localhost:5000

### Method 2: Terminal Command
```bash
npm run dev
```

### Method 3: Debug Mode
1. Press `F5` to start the debugger
2. Breakpoints will work in both frontend and backend code

## 🔍 Step 5: Understanding the Project

### File Structure
```
vcfinder/
├── client/               # React frontend
│   ├── src/components/   # UI components
│   ├── src/pages/        # Page components
│   └── src/lib/          # Utilities
├── server/               # Express backend
│   ├── index.ts          # Main server
│   ├── routes.ts         # API endpoints
│   ├── scraper.ts        # Web scraping
│   └── storage.ts        # Data management
├── shared/               # Shared types
└── .vscode/              # VS Code config
```

### Key Features to Test
1. **Homepage**: Basic VC showcase
2. **Search Page**: Filter by industry/stage
3. **VC Cards**: Click to view contact info
4. **Refresh Button**: Updates VC data

## 🛠️ Available Commands

### In VS Code Terminal:
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run type-check   # Check TypeScript errors
```

### VS Code Shortcuts:
- `F5` - Start debugging
- `Ctrl+Shift+P` - Command palette
- `Ctrl+Shift+D` - Debug view
- `Ctrl+Shift+E` - Explorer view
- `Ctrl+`` ` - Toggle terminal

## 🐛 Debugging

### Frontend Issues
1. Open browser dev tools (F12)
2. Check Console tab for JavaScript errors
3. Use React Developer Tools extension

### Backend Issues
1. Set breakpoints in VS Code
2. Press F5 to start debugging
3. Check terminal output for server logs

### Common Issues & Solutions

**Port already in use:**
```bash
# Kill process on port 5000
npx kill-port 5000
npm run dev
```

**TypeScript errors:**
```bash
npm run type-check
```

**Missing dependencies:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🌐 Testing the App

1. **Start the server**: `npm run dev`
2. **Open browser**: http://localhost:5000
3. **Test search**: Try filtering by "fintech" or "AI/ML"
4. **View contacts**: Click on any VC card
5. **Refresh data**: Use the "Refresh VCs" button

## 📦 Deployment Ready

The project is pre-configured for deployment on:
- **Vercel**: `npm run build` then deploy
- **Railway**: Connect GitHub repo
- **Render**: Set build/start commands
- **Replit**: Already configured

## 🆘 Getting Help

If you encounter issues:
1. Check the VS Code integrated terminal for error messages
2. Look at the browser console (F12 → Console)
3. Review the `deployment-guide.md` for platform-specific help
4. Ensure all dependencies are installed with `npm install`

## ✅ Quick Verification

Your setup is working correctly if:
- ✅ VS Code shows no TypeScript errors
- ✅ `npm run dev` starts without errors
- ✅ http://localhost:5000 loads the homepage
- ✅ Search functionality works with real VC data
- ✅ You can click on VC cards to view contact info

You're now ready to develop and deploy your VC discovery platform!