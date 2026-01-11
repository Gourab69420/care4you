# Railway Deployment Setup Guide

## Required Environment Variables for Railway

Add these environment variables in your Railway project dashboard:

### Database Configuration (Option 1: Use Railway PostgreSQL)
1. Add PostgreSQL plugin to your Railway project
2. Railway will automatically set `DATABASE_URL`
3. Add these additional variables:

```
PORT=8080
NODE_ENV=production
JWT_SECRET=care4you_jwt_secret_key_2024_production_secure
ADMIN_PASSWORD=your_secure_admin_password
GEMINI_API_KEY=your_gemini_api_key
```

### Database Configuration (Option 2: External Database)
If using external PostgreSQL (like Supabase):

```
DATABASE_URL=postgresql://user:password@host:port/database
PORT=8080
NODE_ENV=production
JWT_SECRET=care4you_jwt_secret_key_2024_production_secure
ADMIN_PASSWORD=your_secure_admin_password
GEMINI_API_KEY=your_gemini_api_key
```

### CORS Origins (Already handled in code)
The code already allows:
- http://localhost:3000
- http://localhost:3001
- https://web-production-ef36e.up.railway.app
- All *.railway.app domains
- All *.vercel.app domains

## Steps to Deploy:

1. **Add PostgreSQL Database to Railway**:
   - Go to your Railway project
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway will automatically inject DATABASE_URL

2. **Set Environment Variables**:
   - Go to your service settings
   - Add all variables listed above

3. **Redeploy**:
   - Railway will automatically redeploy
   - Check logs for successful connection

## Troubleshooting:

- If you see "Migration Error: Port should be >= 0", PORT is not set
- If you see 502 errors, database connection is failing
- Check Railway logs for specific error messages
