# SkyCinema — Premium Home Theatre Experience Studio

A modern, full-stack web application built with React (Vite), Express.js, and MySQL. Showcases premium home theatre products, services, and projects with an admin dashboard.

## 🚀 Quick Start

### Prerequisites
- **Node.js v22+** (LTS recommended)
- **pnpm v11.11.0** (package manager)
- **MySQL 8.0+** (for database)

### Installation

#### 1. Install NVM and Node.js v22
```bash
# Install NVM (if not already installed)
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install and use Node.js v22
nvm install 22
nvm use 22
```

#### 2. Install pnpm
```bash
npm install -g pnpm@11.11.0
```

#### 3. Install Project Dependencies
```bash
cd ~/Desktop/skycinema/skycirrus
pnpm install
```

#### 4. Setup Environment Variables
Create `.env` file in the `server/` directory:
```bash
# server/.env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=skycinema
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

#### 5. Setup Database
```bash
pnpm db:setup
```

### Running the Project

#### Development Mode (Frontend + Backend)
```bash
pnpm dev
```

This starts:
- 🎨 **Frontend**: http://localhost:5173
- 🔧 **Backend API**: http://localhost:5000

#### Run Separately
```bash
# Terminal 1 - Backend
pnpm dev:server

# Terminal 2 - Frontend
pnpm dev:client
```

---

## 📁 Project Structure

```
skycirrus/
├── client/                    # React frontend (Vite)
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── common/       # SEO, shared components
│   │   │   ├── home/         # Homepage sections
│   │   │   ├── layout/       # Header, Footer, Layout
│   │   │   └── ui/           # UI components (Button, etc)
│   │   ├── pages/            # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── ProductsPage.tsx
│   │   │   ├── ServicesPage.tsx
│   │   │   ├── ProjectsPage.tsx
│   │   │   ├── BlogPage.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   └── admin/        # Admin pages
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utilities (API, constants, mock data)
│   │   ├── types/            # TypeScript types
│   │   └── App.tsx           # Main app component
│   ├── vite.config.ts        # Vite configuration
│   ├── tailwind.config.js    # Tailwind CSS config
│   └── package.json
│
├── server/                    # Express backend
│   ├── src/
│   │   ├── config/           # Database & environment config
│   │   ├── middleware/       # Auth, error handling, file upload
│   │   ├── routes/           # API routes
│   │   └── utils/            # Helpers
│   ├── scripts/
│   │   └── setup-db.js       # Database initialization
│   └── package.json
│
├── pnpm-workspace.yaml       # Monorepo configuration
├── package.json              # Root package config
└── README.md                 # This file
```

---

## 🎨 Customization Guide

### 1. Brand & Colors

**Tailwind Configuration:**
Edit [client/tailwind.config.js](client/tailwind.config.js)
```javascript
// Change primary colors, fonts, spacing
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color'
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif']
      }
    }
  }
}
```

### 2. Site Content

**Constants & Configuration:**
Edit [client/src/lib/constants.ts](client/src/lib/constants.ts)
```typescript
export const SITE_NAME = 'SkyCinema';
export const SITE_DESCRIPTION = 'Your custom description';
export const CONTACT_EMAIL = 'your-email@example.com';
export const PHONE_NUMBER = '+1-XXX-XXX-XXXX';
```

**Mock Data:**
Edit [client/src/lib/mockData.ts](client/src/lib/mockData.ts)
- Add/update products
- Add/update services
- Add/update projects
- Add testimonials

### 3. Homepage Components

Edit files in [client/src/components/home/](client/src/components/home/):
- `HeroSection.tsx` - Main banner
- `FeaturedProductsSection.tsx` - Featured products
- `ServicesSection.tsx` - Services showcase
- `ProjectsSection.tsx` - Case studies
- `TestimonialsSection.tsx` - Customer reviews

### 4. Header & Navigation

Edit [client/src/components/layout/Header.tsx](client/src/components/layout/Header.tsx)
- Change logo/branding
- Update navigation menu
- Adjust styling

### 5. Footer

Edit [client/src/components/layout/Footer.tsx](client/src/components/layout/Footer.tsx)
- Add social media links
- Update contact information
- Add/remove footer sections

### 6. Contact Form Configuration

Edit [client/src/pages/ContactPage.tsx](client/src/pages/ContactPage.tsx)
- Connect to backend email service
- Update form fields
- Configure validation

### 7. Admin Dashboard

Files in [client/src/pages/admin/](client/src/pages/admin/):
- `AdminDashboard.tsx` - Overview
- `AdminProducts.tsx` - Manage products
- `AdminProjects.tsx` - Manage projects
- `AdminTestimonials.tsx` - Manage testimonials
- `AdminAppointments.tsx` - Manage bookings
- `AdminLogin.tsx` - Authentication

---

## 🛠️ API Endpoints

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Services
- `GET /api/services` - List all services
- `GET /api/services/:id` - Get service details

### Projects
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get project details

### Categories
- `GET /api/categories` - List all categories

### Auth
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `POST /api/auth/refresh` - Refresh token

### Contact
- `POST /api/contact` - Submit contact form

---

## 🏗️ Building for Production

### 1. Build Frontend
```bash
pnpm build
```
Output: `client/dist/` (static files ready for hosting)

### 2. Build Backend
```bash
pnpm --filter server build
```
Output: `server/dist/` (compiled server code)

### 3. Test Production Build Locally
```bash
pnpm build
pnpm start
```

---

## 🌐 Deployment to GoDaddy cPanel

### Option A: Static Frontend Only (Recommended)

**Best for:** cPanel hosting, CDN delivery

1. **Build frontend:**
   ```bash
   pnpm build
   ```

2. **Upload to cPanel:**
   - Login to GoDaddy cPanel
   - File Manager → `public_html`
   - Upload all files from `client/dist/`
   - Make sure `index.html` is in the root

3. **Configure API endpoint:**
   - Edit `client/src/lib/api.ts`
   - Change `baseURL` to your backend domain/API
   ```typescript
   const baseURL = 'https://api.yourdomain.com' // or your backend URL
   ```

4. **Setup `.htaccess` for React Router:**
   Create `.htaccess` in `public_html/`:
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

### Option B: Full Stack on Node.js Server (If Supported)

1. Build both parts:
   ```bash
   pnpm build
   pnpm --filter server build
   ```

2. SSH into your server and deploy:
   ```bash
   scp -r client/dist your-server:/var/www/app/public
   scp -r server/dist your-server:/var/www/app/server
   ```

3. Setup environment variables and start:
   ```bash
   cd /var/www/app
   npm install
   pm2 start server/dist/index.js
   ```

### Option C: Using FTP

1. Build the project locally
2. Use FileZilla or similar FTP client
3. Connect with FTP credentials from GoDaddy
4. Upload `client/dist/*` to `public_html/`

---

## 🔧 Environment Variables

### Frontend
Create `.env` in `client/` (if needed):
```
VITE_API_URL=http://localhost:5000
```

### Backend
Create `.env` in `server/`:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=skycinema
JWT_SECRET=your-secret-key
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

---

## 🧪 Testing

### Run Frontend Tests
```bash
cd client
npm run lint
```

### Test API Endpoints
```bash
curl http://localhost:5000/api/products
curl http://localhost:5000/api/services
curl http://localhost:5000/api/categories
```

### Manual Testing Checklist
- [ ] Homepage loads and displays correctly
- [ ] Products page shows all products
- [ ] Services page displays services
- [ ] Projects/portfolio loads
- [ ] Blog page works
- [ ] Contact form submits
- [ ] Admin login works
- [ ] Admin dashboard accessible
- [ ] Product management works
- [ ] Testimonials display

---

## 📦 Dependencies

### Frontend
- **React 19** - UI framework
- **Vite 6** - Build tool & dev server
- **React Router 7** - Routing
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **GSAP** - Advanced animations
- **React Hook Form** - Form management
- **Axios** - HTTP client
- **Zod** - Data validation

### Backend
- **Express.js** - Web framework
- **MySQL2** - Database driver
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Nodemailer** - Email service
- **Helmet** - Security headers
- **CORS** - Cross-origin support

---

## 🚨 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Database Connection Error
- Check MySQL is running
- Verify `.env` credentials
- Run `pnpm db:setup` to initialize

### pnpm not found
```bash
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use 22
npm install -g pnpm@11.11.0
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules
rm -rf client/node_modules
rm -rf server/node_modules
pnpm install
```

### CORS Issues
Check `server/.env` - `CORS_ORIGIN` should match your frontend URL

---

## 📖 Useful Scripts

```bash
# Development
pnpm dev              # Run both frontend and backend
pnpm dev:server       # Run backend only
pnpm dev:client       # Run frontend only

# Production
pnpm build            # Build frontend
pnpm start            # Start production server

# Database
pnpm db:setup         # Initialize database

# Linting
pnpm lint             # Check code quality
```

---

## 📞 Support & Resources

- **React Docs:** https://react.dev
- **Vite Docs:** https://vitejs.dev
- **Express Docs:** https://expressjs.com
- **Tailwind CSS:** https://tailwindcss.com
- **React Router:** https://reactrouter.com

---

## 📝 License

Private project - SkyCinema Premium Home Theatre

---

## 🎯 Deployment Checklist

Before deploying to GoDaddy:

- [ ] Test locally with `pnpm dev`
- [ ] Run `pnpm build` successfully
- [ ] Update API URLs for production
- [ ] Test all main pages load
- [ ] Test forms and submissions
- [ ] Check mobile responsiveness
- [ ] Verify images/assets load
- [ ] Test on GoDaddy staging (if available)
- [ ] Setup SSL certificate
- [ ] Configure email service
- [ ] Setup DNS records
- [ ] Add to search engines
- [ ] Monitor error logs

---

**Last Updated:** 2026-08-14
**Version:** 1.0.0
