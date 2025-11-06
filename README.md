# Transaction Management Dashboard

A React application for managing and visualizing transactions with interactive charts and table filtering capabilities.

## Features

### 📊 Dashboard

- Interactive area charts using Recharts
- Revenue visualization by currency (USD, EUR, BRL, BTC, ETH)
- Period-based data filtering
- Real-time data updates

### 📋 Transactions Table

- Virtualized table using TanStack Table and TanStack Virtual for optimal performance
- Filtering system with multiple presets:
  - Transaction status
  - Transaction type
  - Currency
  - Payment gateway
- URL-based filter state management
- Copy-to-clipboard functionality
- Skeleton loading states

### 🗺️ Geolocation

- Interactive map using Leaflet and React Leaflet
- Click-to-select locations on the map
- Save and manage favorite locations
- Location properties display (coordinates, address)
- Browser geolocation API integration
- Resizable panel layout

## Tech Stack

### Core

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** (Rolldown) - Build tool and dev server

### Routing & State Management

- **TanStack Router** - Type-safe routing with file-based routing
- **TanStack Query** - Server state management and data fetching

### UI Components

- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Recharts** - Chart library
- **React Resizable Panels** - Resizable layout components

### Data & Tables

- **TanStack Table** - Headless table library
- **TanStack Virtual** - Virtual scrolling for performance
- **Axios** - HTTP client
- **Zod** - Schema validation

### Maps

- **Leaflet** - Interactive maps
- **React Leaflet** - React bindings for Leaflet

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd blank
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm preview` - Preview the production build locally
- `pnpm lint` - Run ESLint to check for code issues
- `pnpm format` - Format code using Prettier
- `pnpm format:check` - Check code formatting without making changes

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── filters/        # Filter components and presets
│   ├── table/          # Table components
│   └── ui/             # Base UI components (Radix UI wrappers)
├── containers/         # Feature-based containers
│   ├── dashboard/      # Dashboard with charts
│   ├── transactions/   # Transactions table and logic
│   └── geolocation/    # Map and location management
├── hooks/              # Custom React hooks
├── lib/                # Utilities and constants
├── routes/             # TanStack Router file-based routes
└── main.tsx           # Application entry point
```

## Key Technologies

- **File-based Routing**: Routes are automatically generated from the `routes/` directory
- **Type-safe Routing**: Full TypeScript support for routes and search params
- **Virtual Scrolling**: Efficient rendering of large datasets
- **Query Caching**: Automatic caching and background updates with TanStack Query
- **Schema Validation**: Zod schemas for runtime type checking

## Development

The project uses:

- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type checking
- **SWC** for fast compilation
