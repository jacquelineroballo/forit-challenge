# Task Management Application

A full-stack task management application built with React, Node.js, and Express.

## Features

- Create, read, update, and delete tasks
- Task status management
- Responsive design
- Modern UI/UX

## Project Structure

```
├── backend/           # Express server
│   ├── src/
│   │   ├── index.js   # Server entry point
│   │   └── routes/    # API routes
│   ├── .env           # Environment variables
│   └── package.json
└── frontend/          # React application
    ├── src/
    │   ├── components/# React components
    │   ├── App.jsx    # Main component
    │   └── App.css    # Styles
    ├── .env           # Environment variables
    └── package.json
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following content:
   ```
   PORT=5000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following content:
   ```
   VITE_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update an existing task
- `DELETE /api/tasks/:id` - Delete a task

## Technologies Used

- Frontend:
  - React
  - React Router
  - Vite
  - Modern CSS

- Backend:
  - Node.js
  - Express
  - CORS
  - dotenv

## Development

The application uses an in-memory array for data storage. In a production environment, you would want to replace this with a proper database.