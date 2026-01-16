# Production Deployment Checklist for Maskan Real Estate Application

## ⚠️ CRITICAL - Complete Before Deployment

### 1. Update Production API URL
**File:** `src/app/environments/environment.prod.ts`

**Action Required:**
```typescript
// Replace this placeholder with your actual production API URL
baseUrl: "https://your-production-api.com/api/"
```

### 2. Secure Firebase Configuration (RECOMMENDED)
**Files:**
- `src/app/environments/environment.prod.ts`
- `src/firebase-messaging-sw.js`

**Recommendation:** Consider using environment variables or secure configuration management for sensitive Firebase keys in production.

---

## Production Build Process

### Build for Production
```bash
npm run build:prod
```

This will:
- Use `environment.prod.ts` (production: true)
- Enable AOT compilation
- Optimize bundle size
- Remove source maps
- Enable build optimizer
- Hash output files for cache busting
- Output to `dist/coreui-free-angular-admin-template/`

### Production Build Features Enabled
✅ Ahead-of-Time (AOT) compilation  
✅ Build optimization  
✅ Tree shaking  
✅ Minification  
✅ Output hashing  
✅ License extraction  
✅ Vendor chunk optimization  
✅ Source maps disabled  

---

## Pre-Deployment Checklist

### Security
- [ ] Update production API URL in `environment.prod.ts`
- [ ] Verify Firebase configuration is correct
- [ ] Review and remove any remaining console.log statements (see list below)
- [ ] Ensure authentication tokens are handled securely
- [ ] Verify CORS settings on backend API
- [ ] Enable HTTPS on production server

### Configuration
- [ ] Verify `environment.prod.ts` has `production: true`
- [ ] Check base href in `index.html` (currently set to `./`)
- [ ] Update meta tags in `index.html` if needed
- [ ] Verify all external API endpoints are production URLs

### Performance
- [ ] Run production build: `npm run build:prod`
- [ ] Check bundle sizes (target: < 6MB initial)
- [ ] Test on slow 3G network
- [ ] Verify lazy loading is working
- [ ] Test service worker and push notifications

### Testing
- [ ] Run all tests: `npm test`
- [ ] Test authentication flow
- [ ] Test all critical user journeys
- [ ] Verify internationalization (ar/en)
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test responsive design on mobile devices

### Code Quality
- [ ] Remove commented-out code
- [ ] Remove development-only dependencies
- [ ] Verify no hardcoded credentials
- [ ] Review error handling

---

## Console.log Statements to Review

The following files contain console.log statements that should be reviewed/removed:

### High Priority (Active console logs)
- `src/main.ts` - Lines 12, 16, 18, 20
- `src/app/views/LogIn/login.component.ts` - Lines 38, 53
- `src/app/views/Operations/Visits/visit.component.ts` - Multiple occurrences
- `src/app/views/Operations/Visit-Done/visit-done.component.ts` - Lines 39, 61, 75
- `src/app/views/Operations/Unite-Stuff/unite-stuff.component.ts` - Lines 60, 72

**Recommendation:** Replace console.log with proper logging service or remove entirely for production.

---

## Deployment Steps

### 1. Build Production Bundle
```bash
npm run build:prod
```

### 2. Deploy Files
Deploy all files from `dist/coreui-free-angular-admin-template/` to your web server.

### 3. Server Configuration

#### For Apache (.htaccess)
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### For Nginx
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

#### For IIS (web.config)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="Angular Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

### 4. Post-Deployment Verification
- [ ] Verify application loads correctly
- [ ] Test login functionality
- [ ] Verify API connections work
- [ ] Check Firebase push notifications
- [ ] Test navigation and routing
- [ ] Verify assets load correctly (images, fonts, etc.)
- [ ] Check browser console for errors
- [ ] Test on production domain with HTTPS

---

## Environment Comparison

| Feature | Development | Production |
|---------|------------|------------|
| production flag | false | true |
| baseUrl | http://192.168.1.7:2030/api/ | **MUST UPDATE** |
| Source maps | Enabled | Disabled |
| Optimization | Disabled | Enabled |
| AOT Compilation | Optional | Enabled |
| Minification | Disabled | Enabled |

---

## Monitoring & Maintenance

### Post-Launch
1. Monitor error logs
2. Track performance metrics
3. Monitor API response times
4. Check Firebase notification delivery rates
5. Review user feedback

### Regular Updates
- Keep dependencies updated: `npm outdated`
- Apply security patches promptly
- Review Angular security advisories

---

## Support & Resources

- Angular Documentation: https://angular.io/docs
- CoreUI Angular: https://coreui.io/angular/docs/
- Firebase Documentation: https://firebase.google.com/docs

---

## Rollback Plan

In case of issues:
1. Keep previous build version backed up
2. Document current environment configuration
3. Have database backup ready (if applicable)
4. Keep rollback deployment script ready

---

**Last Updated:** January 9, 2026  
**Angular Version:** 18.2.13  
**Node Version Required:** ^16.14.0 || ^18.10.0
