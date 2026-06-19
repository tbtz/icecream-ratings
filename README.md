# Ice Cream Ratings

A full-stack React + Node + MongoDB app for rating ice cream flavors.

## Structure

- `client/` - React app built with Vite
- `server/` - Express backend with MongoDB

## Setup

1. Install dependencies for server:
   ```bash
   cd server
   npm install
   ```

2. Install dependencies for client:
   ```bash
   cd ../client
   npm install
   ```

3. Create a MongoDB connection string in `server/.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/icecream-ratings
   PORT=4000
   ```

4. Start the backend:
   ```bash
   cd server
   npm run dev
   ```

5. Start the frontend:
   ```bash
   cd client
   npm run dev
   ```

## API

- `GET /api/ratings` - fetch all ratings
- `POST /api/ratings` - submit a new rating

## Notes

The client is configured to proxy API calls to `http://localhost:4000`.
