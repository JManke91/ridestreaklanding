# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based landing page for "Ride Streak", a cycling tracking app for iOS. The project is built with Create React App and uses modern React patterns with hooks. The site is designed to promote and showcase the iOS app's features and pricing plans.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm start

# Run tests in interactive watch mode
npm test

# Create production build
npm run build

# Deploy to GitHub Pages (requires gh-pages setup)
npm run deploy
```

## Technology Stack

- **React 19.1.0** with hooks (useState)
- **Tailwind CSS 3.4.17** for styling with custom theme configuration
- **Shadcn/ui components** - Custom UI component library with variants using `class-variance-authority`
- **Lucide React** for icons
- **Deployed to GitHub Pages** at `https://JManke91.github.io/ridestreaklanding`

## Architecture

### Component Structure
- **Main App Component** (`src/App.js`): Single-page application with all sections included
- **UI Components** (`src/components/ui/`): Reusable shadcn/ui components (Button, Card, Input, etc.)
- **Utility Library** (`src/lib/utils.js`): Contains `cn()` function for className merging using `clsx` and `tailwind-merge`

### Styling System
- **Tailwind CSS** with extensive custom theme configuration
- **CSS Custom Properties** for colors defined in tailwind.config.js
- **Gradient brand color**: `#00D4AA` (teal/green)
- **Dark theme**: Slate color palette with transparency effects
- **Responsive design** with mobile-first approach

### Content Sections
1. **Header/Navigation** with mobile hamburger menu
2. **Hero Section** with app download CTA
3. **App Screenshots** gallery with hover effects
4. **Features Section** showcasing 6 main app features
5. **Pricing Section** with 4 pricing tiers (Free, Monthly Pro, Yearly Pro, Lifetime Pro)
6. **Contact Section** with contact form and information
7. **Footer** with branding

### Key Features Highlighted
- HealthKit integration for iOS
- Cycling workout tracking and analytics
- Personal challenges and goal setting
- iOS widgets for quick access
- Workout history and progress tracking
- German language content

## File Organization

```
src/
├── App.js                 # Main application component
├── lib/utils.js          # Utility functions (cn helper)
├── components/ui/        # Reusable UI components
├── images/               # App screenshots
└── [shadcn components]   # Individual shadcn/ui component files
```

## Development Notes

- **Single Page Application**: All content is in one App.js component
- **Static Content**: No dynamic data fetching or state management beyond UI interactions
- **Mobile Responsive**: Designed mobile-first with breakpoints for larger screens
- **German Content**: All user-facing text is in German
- **Contact Form**: Uses mailto: action for form submission
- **Image Assets**: App screenshots stored in src/images/ and public/images/

## Testing

Uses standard Create React App testing setup with:
- @testing-library/react
- @testing-library/jest-dom  
- @testing-library/user-event

Run tests with `npm test` for interactive watch mode.