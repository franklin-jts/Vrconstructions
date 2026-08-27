# VR Construction - Full Stack Website

A complete construction company website built with **Vite + React + TypeScript** frontend and **Python FastAPI** backend.

## 🏗️ Project Structure

```
VR-Construction-Full/
├── src/                          # React Frontend
│   ├── components/               # Shared Components
│   │   ├── TopBar.tsx           # Top bar with social links
│   │   ├── Header.tsx           # Header with logo, nav, contact info
│   │   └── Footer.tsx           # Footer with counters, links, social
│   ├── pages/                    # Page Components
│   │   ├── Home.tsx             # Homepage (banner, services, gallery, blog)
│   │   ├── About.tsx            # About page (team, accordion, clients)
│   │   ├── Services.tsx         # Services page (tabs, why choose us)
│   │   ├── Gallery.tsx          # Gallery page (filterable grid)
│   │   ├── Blog.tsx             # Blog page (posts, sidebar)
│   │   └── Contact.tsx          # Contact page (form, map)
│   ├── styles/
│   │   └── main.css             # All CSS styles
│   ├── App.tsx                   # Router setup
│   └── main.tsx                  # Entry point
├── backend/                      # Python FastAPI Backend
│   ├── main.py                   # API server
│   └── requirements.txt          # Python dependencies
├── public/images/                # Static images
├── package.json                  # Node.js dependencies
├── start.bat                     # Windows startup script
└── README.md                     # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **Python** (3.9 or higher)
- **pip** (Python package manager)

### Step 1: Install Frontend Dependencies
```bash
npm install
```

### Step 2: Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Step 3: Start the Project
**Option A - Windows (Double-click start.bat):**
```bash
start.bat
```

**Option B - Manual Start:**

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
cd backend
python main.py
```

### Step 4: Open in Browser
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000
- **API Documentation:** http://localhost:8000/docs

## 📄 Pages Included

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero banner with form, services, welcome, tabs, gallery, clients, blog, partners |
| About | `/about` | Company info, accordion, team members, client feedback |
| Services | `/services` | Service cards, tabbed services, why choose us, CTA |
| Gallery | `/gallery` | Filterable portfolio grid with categories |
| Blog | `/blog` | Blog posts with sidebar (search, categories, tags, recent) |
| Contact | `/contact` | Contact info, form (connected to API), map placeholder |

## 🔧 Backend API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/api/health` | API health status |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/service-request` | Submit service request |
| GET | `/api/submissions` | List all submissions |
| GET | `/api/submissions/{id}` | Get specific submission |
| DELETE | `/api/submissions/{id}` | Delete submission |

## 🎨 Template Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Animated banner/slider
- ✅ Tabbed services section
- ✅ Filterable gallery
- ✅ Blog with sidebar
- ✅ Contact form with API integration
- ✅ Google Maps placeholder
- ✅ Social media links
- ✅ Counter animations
- ✅ Hover effects and transitions
- ✅ Font Awesome icons
- ✅ Google Fonts (Exo 2, Lato)

## 📝 Adding Images

Place your images in `public/images/` folder. Expected images:

- `logo.png` - Company logo
- `slide-1.jpg`, `slide-2.jpg` - Banner slider images
- `slide-img-1.png`, `slide-img-2.png` - Banner overlay images
- `gallery-img-*.jpg` - Gallery images
- `ser-img-*.jpg` - Service images
- `offer-img.jpg` - Offer section image
- `avatar-*.jpg` - Client avatars
- `team-*.jpg` - Team member photos
- `b-img-*.jpg` - Blog images
- `parthner-img-*.png` - Partner logos
- `footer-img.png` - Footer logo
- `about-img*.jpg` - About page images

## 🛠️ Tech Stack

**Frontend:**
- React 18
- TypeScript
- Vite
- React Router v6
- Font Awesome 4.7

**Backend:**
- Python 3.9+
- FastAPI
- Uvicorn
- Pydantic

## 📄 License

This project is for educational and commercial use.
