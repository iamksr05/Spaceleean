# S.P.E.E.D. - Space Propulsion Engineering

Advanced space propulsion technology website built with React, TypeScript, and Vite.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Express.js, MongoDB
- **State Management**: TanStack Query

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB (local or Atlas)

### Installation

```bash
# Install dependencies
npm install

# Create .env file with your MongoDB connection string
# MONGODB_URI=your_mongodb_connection_string
# PORT=3333
```

### Development

```bash
# Start the frontend development server
npm run dev

# Start the backend server (in a separate terminal)
npm run server
```

The frontend will be available at `http://localhost:8080`
The backend API will be available at `http://localhost:3333`

## Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   └── lib/            # Utility functions
├── server/
│   └── index.ts        # Express backend server
└── public/             # Static assets
```

## License

MIT
