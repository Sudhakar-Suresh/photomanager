# Photography Management System - Deployment Guide

## Prerequisites

1. Supabase account and project
2. Vercel account (for frontend)
3. Render/Railway account (for backend)
4. Gmail account with app password (for emails)

## Supabase Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and anon key
3. Go to Settings > API to find your JWT secret

### 2. Create Storage Bucket

```sql
-- Create photos bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('photos', 'photos', true);

-- Create policy for authenticated users to upload
CREATE POLICY "Authenticated users can upload photos" ON storage.objects
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy for public read access
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'photos');
```

### 3. Database Setup

The Django migrations will handle the database schema, but you can also run these SQL commands in Supabase SQL editor if needed:

```sql
-- Enable RLS (Row Level Security)
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create policies for user data access
CREATE POLICY "Users can view own data" ON auth.users
FOR SELECT USING (auth.uid() = id);
```

## Backend Deployment (Render/Railway)

### 1. Environment Variables

Set these environment variables in your deployment platform:

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_JWT_SECRET=your_supabase_jwt_secret
EMAIL_HOST_USER=your_gmail_address
EMAIL_HOST_PASSWORD=your_gmail_app_password
DJANGO_SECRET_KEY=your_django_secret_key
DEBUG=False
ALLOWED_HOSTS=your_backend_domain.com,localhost
```

### 2. Render Deployment

1. Connect your GitHub repository
2. Set build command: `pip install -r requirements.txt`
3. Set start command: `python backend/manage.py runserver 0.0.0.0:$PORT`
4. Add environment variables
5. Deploy

### 3. Railway Deployment

1. Connect your GitHub repository
2. Railway will auto-detect Django
3. Add environment variables
4. Deploy

## Frontend Deployment (Vercel)

### 1. Environment Variables

Create `.env.local` in frontend directory:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_BASE_URL=https://your_backend_domain.com/api
```

### 2. Vercel Deployment

1. Connect your GitHub repository
2. Set root directory to `frontend`
3. Vercel will auto-detect Vite
4. Add environment variables
5. Deploy

## Post-Deployment Setup

### 1. Create Superuser

SSH into your backend deployment and run:

```bash
python manage.py createsuperuser
```

### 2. Test the Application

1. Visit your frontend URL
2. Register as a client and photographer
3. Test booking flow
4. Test photo upload
5. Verify email notifications

## Email Configuration

### Gmail App Password Setup

1. Enable 2-factor authentication on Gmail
2. Go to Google Account settings
3. Generate an app password for "Mail"
4. Use this password in EMAIL_HOST_PASSWORD

## Monitoring and Maintenance

### Backend Monitoring

- Check Django logs in your deployment platform
- Monitor database usage in Supabase
- Set up error tracking (Sentry recommended)

### Frontend Monitoring

- Check Vercel deployment logs
- Monitor Core Web Vitals
- Set up analytics (Google Analytics recommended)

## Scaling Considerations

### Database

- Supabase free tier: 500MB storage, 2GB bandwidth
- Upgrade to Pro plan for production use

### Storage

- Supabase free tier: 1GB storage
- Consider CDN for better performance

### Backend

- Start with basic plan on Render/Railway
- Scale up based on usage

### Frontend

- Vercel free tier is generous for most use cases
- Pro plan for custom domains and advanced features

## Security Best Practices

1. **Environment Variables**: Never commit secrets to git
2. **HTTPS**: Ensure all deployments use HTTPS
3. **CORS**: Configure CORS properly for production
4. **Rate Limiting**: Implement rate limiting for API endpoints
5. **Input Validation**: Validate all user inputs
6. **File Upload**: Implement file type and size restrictions

## Backup Strategy

1. **Database**: Supabase provides automatic backups
2. **Storage**: Regular backup of photos bucket
3. **Code**: Git repository serves as code backup
4. **Environment**: Document all environment variables

## Troubleshooting

### Common Issues

1. **CORS Errors**: Check CORS_ALLOWED_ORIGINS in Django settings
2. **Authentication Errors**: Verify Supabase JWT secret
3. **File Upload Errors**: Check Supabase storage policies
4. **Email Errors**: Verify Gmail app password and settings

### Debug Steps

1. Check deployment logs
2. Verify environment variables
3. Test API endpoints directly
4. Check Supabase dashboard for errors
5. Monitor network requests in browser dev tools
