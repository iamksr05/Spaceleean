# SPACELEEAN Admin Dashboard

A standalone admin dashboard for viewing contact form submissions.

## Setup

```bash
# Install dependencies
npm install

# Create .env file
# VITE_API_URL=https://your-backend-url.onrender.com
```

## Development

```bash
npm run dev
```

The admin dashboard will be available at `http://localhost:3000`

## Deployment

### Deploy to Vercel

1. Create a new Vercel project
2. Import this folder
3. Set environment variable:
   - `VITE_API_URL` = Your Render backend URL (e.g., `https://spaceleean-api.onrender.com`)
4. Deploy

### Deploy to Netlify

1. Create a new Netlify site
2. Connect to your repo and set base directory to `admin-dashboard`
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variable: `VITE_API_URL`

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- date-fns
- Lucide React Icons
