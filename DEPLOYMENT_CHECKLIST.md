# 🚀 Railway Deployment Checklist

## ✅ Step-by-Step Deployment Guide

### 1. Add PostgreSQL Database to Railway
- [ ] Go to your Railway project dashboard
- [ ] Click "New" → "Database" → "Add PostgreSQL"
- [ ] Wait for database to provision (Railway auto-injects `DATABASE_URL`)

### 2. Configure Environment Variables
Go to your service → Variables tab and add:

**Required Variables:**
```
PORT=8080
NODE_ENV=production
JWT_SECRET=care4you_jwt_secret_key_2024_production_secure
ADMIN_PASSWORD=YourSecurePassword123!
```

**Optional (if you have Gemini API):**
```
GEMINI_API_KEY=your_actual_gemini_api_key
```

### 3. Verify Configuration
- [ ] Check that `DATABASE_URL` is automatically set by Railway PostgreSQL plugin
- [ ] Verify all environment variables are saved
- [ ] Check that PORT is set to 8080

### 4. Deploy
- [ ] Push your code to GitHub (if using GitHub integration)
- [ ] Or trigger manual deployment in Railway
- [ ] Wait for build to complete

### 5. Check Deployment Logs
Look for these success messages:
```
✅ Database connected successfully
Server running on port 8080
Environment: production
Database: Railway PostgreSQL
Database schema verified/updated.
```

### 6. Test the Deployment
- [ ] Visit your Railway URL (e.g., https://web-production-ef36e.up.railway.app)
- [ ] You should see: "NabhaCare API is running"
- [ ] Test Socket.io connection from your frontend

### 7. Update Frontend Environment Variable
In your frontend `.env` file:
```
VITE_API_URL=https://web-production-ef36e.up.railway.app
```

## 🔧 Troubleshooting

### Issue: "Migration Error: Port should be >= 0"
**Solution:** Set `PORT=8080` in Railway environment variables

### Issue: 502 Bad Gateway
**Solution:** 
1. Check if PostgreSQL database is added
2. Verify `DATABASE_URL` is set
3. Check deployment logs for database connection errors

### Issue: CORS errors
**Solution:** Already fixed in code - allows all Railway and Vercel domains

### Issue: Database connection timeout
**Solution:**
1. Ensure PostgreSQL plugin is running
2. Check if `DATABASE_URL` format is correct
3. Verify SSL settings in db.js

## 📝 Current Status

Your code is now updated with:
- ✅ Railway DATABASE_URL support
- ✅ Proper PORT parsing
- ✅ SSL support for production databases
- ✅ Better error logging
- ✅ CORS configured for Railway domains

## 🎯 Next Steps

1. **Add PostgreSQL to Railway** (most important!)
2. **Set environment variables** as listed above
3. **Redeploy** and check logs
4. **Test** the API endpoint
5. **Update frontend** to use the Railway URL

## 💡 Pro Tips

- Railway provides free $5 credit monthly
- PostgreSQL database will use some of this credit
- Monitor your usage in Railway dashboard
- Use Railway CLI for easier debugging: `railway logs`
