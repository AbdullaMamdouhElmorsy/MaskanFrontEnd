# Quick Production Deployment Guide

## 🚀 Fast Track to Production

### Step 1: Update Production API URL (REQUIRED)
Edit `src/app/environments/environment.prod.ts`:
```typescript
baseUrl: "https://your-production-api.com/api/"  // Replace this!
```

### Step 2: Build for Production
```bash
npm run build:prod
```

### Step 3: Deploy
Upload everything from `dist/coreui-free-angular-admin-template/` to your web server.

### Step 4: Configure Server
Ensure your web server redirects all routes to `index.html` for Angular routing.

---

## ✅ What's Already Done

- ✅ Production environment configured with `production: true`
- ✅ Build optimizations enabled (AOT, minification, tree-shaking)
- ✅ Source maps disabled for production
- ✅ Output hashing enabled for cache busting
- ✅ File replacement configured (dev → prod environment)
- ✅ Type-safe environment configuration
- ✅ Commented code cleaned up
- ✅ Firebase configuration cleaned

---

## ⚠️ Before You Deploy

1. **Update production API URL** in `environment.prod.ts`
2. **Test the production build locally** (optional)
3. **Review console.log statements** in `PRODUCTION-DEPLOYMENT.md`
4. **Backup current production** (if updating existing deployment)

---

## 📊 Build Output
After running `npm run build:prod`, check:
- Initial bundle size should be < 6MB
- Files should have hashes (e.g., `main.a1b2c3d4.js`)
- Output directory: `dist/coreui-free-angular-admin-template/`

---

## 🔗 Full Documentation
See `PRODUCTION-DEPLOYMENT.md` for complete checklist and detailed instructions.

---

## 💡 Common Issues

**Issue:** "Cannot GET /some-route" on refresh  
**Solution:** Configure server to redirect all routes to index.html

**Issue:** API calls failing  
**Solution:** Verify CORS settings on backend and check baseUrl

**Issue:** Large bundle size  
**Solution:** Review lazy loading, check for duplicate dependencies

---

**Need Help?** Review the full `PRODUCTION-DEPLOYMENT.md` documentation.
