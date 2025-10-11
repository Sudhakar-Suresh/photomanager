# Photography Management System

A full-stack photography booking and gallery management system.

## Tech Stack

- **Frontend**: React with Vite
- **Backend**: Django + Django REST Framework
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage
- **Auth**: Supabase Auth
- **Deployment**: Vercel (Frontend), Render/Railway (Backend)

## Features

- User authentication (Photographer/Client roles)
- Session booking management
- Photo upload and gallery
- Email notifications
- Admin panel

## Project Structure

```
photography-system/
├── frontend/          # React frontend
├── backend/           # Django backend
├── requirements.txt   # Python dependencies
└── README.md
```

## Setup Instructions

### Backend Setup

1. Create virtual environment: `python -m venv venv`
2. Activate: `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
3. Install dependencies: `pip install -r requirements.txt`
4. Run migrations: `python manage.py migrate`
5. Start server: `python manage.py runserver`

### Frontend Setup

1. Navigate to frontend: `cd frontend`
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`

### Environment Variables

Create `.env` files in both frontend and backend directories with your Supabase credentials.
