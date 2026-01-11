# 🎯 QUICK FIX - Railway Environment Variables

## Copy-Paste These Into Railway Dashboard

### Go to: Railway Project → Your Service → Variables Tab

Add these variables:

```
PORT
8080

NODE_ENV
production

JWT_SECRET
care4you_jwt_secret_key_2024_production_secure

ADMIN_PASSWORD
Admin@Care4You2024

GEMINI_API_KEY
(your actual Gemini API key - get from Google AI Studio)
```

## IMPORTANT: Add PostgreSQL Database

1. In Railway project, click **"New"**
2. Select **"Database"**
3. Choose **"Add PostgreSQL"**
4. Railway will automatically add `DATABASE_URL` variable

## After Adding Variables:

1. **Save** all variables
2. Railway will **automatically redeploy**
3. Check **logs** for: "✅ Database connected successfully"
4. Visit your URL: `https://web-production-ef36e.up.railway.app`

## Expected Log Output (Success):

```
✅ Database connected successfully
Server running on port 8080
Environment: production
Database: Railway PostgreSQL
Database schema verified/updated.
```

## If You See Errors:

- **"Port should be >= 0"** → PORT variable not set
- **502 Bad Gateway** → Database not connected
- **Connection timeout** → PostgreSQL plugin not added

## Test Your API:

Open browser: `https://web-production-ef36e.up.railway.app`

Should show: **"NabhaCare API is running"**
