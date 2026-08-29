# GoDaddy Deployment Guide for SkyCinema

**Last Updated:** 2026-08-18
**Target:** GoDaddy cPanel Hosting

---

## 🎯 EXECUTIVE SUMMARY

Your SkyCinema project is a **React Frontend + Express Backend** app. For GoDaddy cPanel:

**Recommended Approach: Option A - Frontend Only**
- ✅ Upload React build to `public_html`
- ✅ Use GoDaddy's Node.js or external VPS for backend
- ✅ Most cost-effective & scalable

**Alternative: Option B - Full Stack**
- Only if your GoDaddy plan includes Node.js
- Check your hosting plan details first

---

## 📋 DEPLOYMENT DECISION TREE

```
Do you have a GoDaddy plan with Node.js support?
│
├─ YES → Option B (Full Stack) - Skip to "Option B" section
│
└─ NO (Standard cPanel) → Option A (Frontend Only) - This section
```

**Check your plan:** Login to GoDaddy → Hosting Plans → Features/Add-ons

---

## 🚀 OPTION A: Frontend-Only Deployment (RECOMMENDED)

This uploads your React app to GoDaddy and uses an external backend API.

### Step 1: Prepare Your Project Locally

```bash
cd /home/dbell/Desktop/skycinema/skycirrus

# Install dependencies (if not done)
pnpm install

# Build frontend for production
pnpm build

# Output: client/dist/ folder created
```

**Verify build succeeded:**
```bash
ls -la client/dist/
# Should contain: index.html, assets/, favicon.svg
```

### Step 2: Choose Backend Location

Your backend (Express API) needs to run **somewhere**. Options:

| Option | Cost | Setup | Support |
|--------|------|-------|---------|
| **A1: GoDaddy VPS** | $3-5/mo | Medium | Native |
| **A2: External Node.js Host** | $0-5/mo | Easy | 3rd party |
| **A3: GoDaddy Managed Node** | $5+/mo | Hard | Limited |
| **A4: AWS/Heroku** | $7+/mo | Medium | Scalable |

**Recommended: A2 (External Node.js Host) or A1 (GoDaddy VPS)**

### Step 3: Update API Configuration

Before uploading, tell React where the backend is:

**Edit:** `client/src/lib/api.ts`

Change:
```typescript
const api = axios.create({
  baseURL: '/api',  // ← This proxies to backend
  headers: { 'Content-Type': 'application/json' },
});
```

To (for production):
```typescript
const api = axios.create({
  baseURL: 'https://api.yourdomain.com',  // ← Your backend URL
  headers: { 'Content-Type': 'application/json' },
});
```

Or if backend is on subdomain:
```typescript
const api = axios.create({
  baseURL: 'https://yourbackend.example.com/api',
  headers: { 'Content-Type': 'application/json' },
});
```

**Rebuild after change:**
```bash
pnpm build
```

### Step 4: Upload to GoDaddy cPanel

#### Method 1: FTP Upload (Easiest)

**Requirements:**
- FileZilla (download: https://filezilla-project.org)
- FTP credentials from GoDaddy

**Steps:**
1. Open FileZilla
2. Connect to GoDaddy:
   - Host: `ftp.yourdomain.com`
   - Username: From GoDaddy
   - Password: From GoDaddy
   - Port: 21

3. Navigate to `public_html`
4. Delete existing files (or backup first)
5. Drag & drop files from `client/dist/` to `public_html`

#### Method 2: cPanel File Manager (Web)

1. Login to GoDaddy cPanel
2. Find: **File Manager** (or **Files**)
3. Navigate to: `public_html`
4. Upload: All files from `client/dist/`
   - Right-click → Upload
   - Select all files from `client/dist`
   - Wait for completion

#### Method 3: Command Line (SSH)

```bash
# From your local machine
cd /home/dbell/Desktop/skycinema/skycirrus

# Upload via SCP
scp -r client/dist/* your-cpanel-user@yourdomain.com:~/public_html/

# Verify
ssh your-cpanel-user@yourdomain.com
ls ~/public_html/
```

### Step 5: Setup React Router .htaccess

For React Router to work on cPanel, you need `.htaccess`:

**Create file:** `public_html/.htaccess`

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # Don't rewrite actual files or directories
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Rewrite all requests to index.html for React Router
  RewriteRule ^ index.html [QSA,L]
</IfModule>
```

**How to add:**

**Option A: Via cPanel File Manager**
1. In `public_html`, click "Create New File"
2. Name: `.htaccess`
3. Paste code above
4. Save

**Option B: Via FTP**
1. Create `.htaccess` locally
2. Upload via FileZilla

**Option C: Via SSH**
```bash
ssh your-user@yourdomain.com
cd public_html
cat > .htaccess << 'EOF'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [QSA,L]
</IfModule>
EOF
```

### Step 6: Deploy Backend (Choose One)

#### Backend Option A1: GoDaddy VPS

1. SSH into GoDaddy VPS
2. Install Node.js:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   source ~/.bashrc
   nvm install 22
   npm install -g pnpm
   ```

3. Upload project:
   ```bash
   scp -r server/ your-user@your-vps-ip:/home/app/
   ```

4. Setup environment:
   ```bash
   cd /home/app/server
   cp .env.example .env
   # Edit .env with production values
   nano .env
   ```

5. Install & run:
   ```bash
   pnpm install
   pnpm db:setup
   pnpm start
   ```

6. Setup PM2 for auto-restart:
   ```bash
   npm install -g pm2
   pm2 start server/dist/index.js --name skycinema-api
   pm2 startup
   pm2 save
   ```

#### Backend Option A2: External Node.js Host

Popular options:
- **Render.com** (free tier available)
- **Railway.app** ($5/mo starting)
- **Heroku** ($7+/mo)
- **Fly.io** ($5+/mo)

**Example: Deploy to Render.com**

1. Go to render.com
2. Click "New" → "Web Service"
3. Connect your GitHub repo
4. Configure:
   - Build command: `pnpm install && pnpm --filter server build`
   - Start command: `pnpm start`
   - Environment: Add all variables from `.env`
5. Deploy
6. Copy the generated URL (e.g., `https://skycinema-api.render.com`)
7. Update React API URL to this URL

### Step 7: Test Deployment

**Test Frontend:**
```
Open: https://yourdomain.com
```

Should see:
- ✅ Homepage loads
- ✅ Can navigate to all pages
- ✅ No 404 errors for routes
- ✅ Images/CSS load properly

**Test API Integration:**

Open browser console and test:
```javascript
fetch('https://yourdomain.com/api/products')
  .then(r => r.json())
  .then(d => console.log(d))
```

Or from terminal:
```bash
curl https://yourdomain.com/api/products
curl https://yourdomain.com/api/categories
curl https://yourdomain.com/api/health
```

Should return JSON data.

### Step 8: Setup SSL Certificate

**GoDaddy provides free SSL:**

1. Login to GoDaddy cPanel
2. Find: "SSL/TLS" or "Security" section
3. Click "Install SSL" (usually auto-installed)
4. Force HTTPS: Update `.htaccess`

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # Force HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  
  # React Router
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [QSA,L]
</IfModule>
```

### Step 9: Email Configuration

**For contact forms to work:**

Update backend `.env`:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=your-email@yourdomain.com
```

**Get Gmail App Password:**
1. Go to myaccount.google.com
2. Security → 2-Step Verification (enable if not done)
3. Create "App Password" for Mail
4. Use 16-character password in `.env`

### Step 10: Monitor & Maintain

**Check error logs:**
```bash
# via cPanel
Hosting → Logs → Error Log
# or
tail -f ~/public_html/error_log
```

**Monitor backend:**
- If using PM2: `pm2 logs`
- If using external host: Check their dashboard
- Setup alerts for downtime

---

## 🚀 OPTION B: Full Stack on GoDaddy (If Supported)

Only use if your GoDaddy plan includes **Node.js Hosting**.

### Requirements
- GoDaddy plan with Node.js support
- Typically higher tier plans ($15+/mo)

### Deployment Steps

```bash
# 1. Build everything
pnpm build
pnpm --filter server build

# 2. Upload to GoDaddy
# Upload entire project to GoDaddy's Node environment
# Follow GoDaddy's Node.js deployment docs

# 3. Set environment variables via cPanel
# Use their control panel to set .env variables

# 4. Install dependencies
npm install

# 5. Start server
npm start
```

**Check GoDaddy's Node.js hosting guide** - steps differ by plan type.

---

## 🐛 TROUBLESHOOTING

### Issue: 404 on all routes except home
**Solution:** `.htaccess` not working
```bash
# Verify .htaccess exists and is correct
cat public_html/.htaccess

# Check mod_rewrite is enabled
# Contact GoDaddy support if needed
```

### Issue: API calls fail (CORS error)
**Solution:** Update backend CORS config
```bash
# In server/.env
CLIENT_URL=https://yourdomain.com

# Restart backend
pm2 restart all
```

### Issue: Images/CSS not loading
**Solution:** Check relative paths
```bash
# Verify assets in dist folder
ls -la client/dist/assets/

# Check HTML references
grep 'src=' client/dist/index.html | head -5
```

### Issue: Forms don't send email
**Solution:** Verify SMTP config
```bash
# Test connection to Gmail
telnet smtp.gmail.com 587

# Check backend logs for error
tail -f server/logs/error.log
```

### Issue: Database connection fails
**Solution:** Update connection string
```bash
# If backend on different server, update:
# server/.env
DB_HOST=your-db-server.com
DB_USER=dbuser
DB_PASSWORD=secure_password

# Restart
pm2 restart all
```

---

## 📊 DEPLOYMENT COSTS

### Option A (Frontend-Only)

| Component | Service | Cost/Month | Notes |
|-----------|---------|-----------|-------|
| Frontend | GoDaddy cPanel | $5-10 | Included with most plans |
| Backend | Render.com | Free-$7 | Free tier available |
| Database | GoDaddy MySQL | Free | Included with hosting |
| **Total** | | **$5-17** | Most affordable |

### Option B (Full Stack on GoDaddy)

| Component | Service | Cost/Month |
|-----------|---------|-----------|
| Hosting | GoDaddy Node Plan | $15-50 |
| Database | Included | Free |
| **Total** | | **$15-50** | Premium option |

---

## ✅ PRE-DEPLOYMENT CHECKLIST

### Code Quality
- [ ] All dependencies updated: `pnpm install`
- [ ] No build errors: `pnpm build`
- [ ] No console errors in dev: `pnpm dev`
- [ ] All routes work locally
- [ ] Contact form works locally
- [ ] Admin login works locally

### Configuration
- [ ] `.env` configured for production
- [ ] API URL updated in React
- [ ] JWT secret is secure
- [ ] SMTP credentials correct
- [ ] CORS origins configured
- [ ] Database credentials secure

### Testing
- [ ] Build output verified: `ls client/dist/`
- [ ] All pages load
- [ ] API endpoints respond
- [ ] Forms submit
- [ ] Images load properly
- [ ] Mobile responsive

### Infrastructure
- [ ] GoDaddy account active
- [ ] Domain registered/pointed
- [ ] cPanel access working
- [ ] FTP credentials obtained
- [ ] SSL ready/auto-enabled
- [ ] Backend hosting ready

### Post-Deploy
- [ ] Frontend loads at domain
- [ ] All routes accessible
- [ ] API calls work
- [ ] Forms functional
- [ ] Email sending works
- [ ] Error logs monitored

---

## 🎯 QUICK START COMMAND REFERENCE

```bash
# Local Development
pnpm install
pnpm dev

# Build for Production
pnpm build

# Deploy to GoDaddy
# 1. Upload client/dist/* to public_html via FTP
# 2. Add .htaccess to public_html
# 3. Deploy backend (see Section: Deploy Backend)
# 4. Update API URLs
# 5. Test at yourdomain.com

# Useful Commands
pnpm lint              # Check code quality
pnpm --filter server build  # Build backend only
pnpm db:setup         # Initialize database
```

---

## 📞 SUPPORT RESOURCES

- **GoDaddy Help:** https://www.godaddy.com/help
- **cPanel Documentation:** https://docs.cpanel.net
- **React Deployment:** https://vitejs.dev/guide/build.html
- **Express Deployment:** https://expressjs.com/en/advanced/best-practice-security.html
- **Contact Us:** Your project team

---

## 🎓 NEXT STEPS

1. **Decide:** Option A or B?
2. **Prepare:** Complete pre-deployment checklist
3. **Build:** Run `pnpm build`
4. **Deploy:** Upload to GoDaddy
5. **Test:** Verify at yourdomain.com
6. **Monitor:** Watch error logs
7. **Maintain:** Regular updates & backups

---

**Ready to deploy? Start with the checklist above!**

Status: Ready for Deployment
Last Updated: 2026-08-18
