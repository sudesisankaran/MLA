# TVK-Themed MLA Public Service & Grievance Portal
### மக்கள் சேவை தளம் | விக்கிரவாண்டி சட்டமன்ற தொகுதி

A modern, high-performance, secure, and fully responsive **Constituency Public Registration & Grievance Redressal Portal** inspired by the **Tamizhaga Vettri Kazhagam (TVK)** color theme and design aesthetic.

---

## 🎨 Visual Identity & Color Theme
- **Primary Maroon / Crimson**: `#8B0000` / `#990000` / `#7A0000`
- **Secondary Radiant Gold / Yellow**: `#F59E0B` / `#FBBF24` / `#FEF08A`
- **Clean Slate & Neutral Dark**: `#0F172A` / `#1E293B` / `#FFFFFF`
- **Bilingual Typography**: Tamil (*Noto Sans Tamil*, *Mukta Malar*) and English (*Inter*)
- **Accessible Contrast**: WCAG AA compliant with clear visual focus rings, accessible form validation, and status badges.

---

## 🚀 Key Features & Pages

1. **Home Page (`/`)**:
   - Verified official representative spotlight with official photo frame, title, and verified badge.
   - Quick action shortcuts: **Register as Citizen**, **File a Grievance**, and **Track Complaint**.
   - Instant Complaint Lookup bar with sample reference IDs.
   - Live constituency metrics bar (48 Wards, 1,25,000+ Citizens, 94.2% Resolution, ₹42.5 Cr Funds).
   - 4-step transparent redressal workflow.
   - Live development projects and announcements preview.

2. **About the Representative**:
   - Official biography, legislative mission, and grassroots public service record.
   - Verified achievements & milestones timeline cross-referenced with Tamil Nadu Legislative Assembly proceedings and Government Gazettes.
   - Core development pillars (24x7 Drinking Water, Education Modernization, Youth Skill Academies).

3. **Public Grievance Portal**:
   - Direct grievance filing across 8 key civic categories (*Roads & Transport, Water & Sanitation, Electricity, Education, Health, Social Welfare Schemes, Women Safety, Other*).
   - Indian mobile number validation (`+91 [6-9]XXXXXXXXX`).
   - Generates unique reference IDs (e.g. `TVK-2026-08142`).
   - Supporting document/photo attachment up to 5MB.
   - **"My Complaints"** tab for authenticated citizens to track previously submitted grievances.
   - Printable official acknowledgment slip with print button and QR/barcode formatting.

4. **Private & Secure Complaint Tracking**:
   - Live status pipeline: `Submitted` ➔ `Under Review` ➔ `In Progress` ➔ `Resolved` ➔ `Closed`.
   - **Strict Privacy Safeguard**: Citizens can only view full details of their own grievance; external searches require entering the registered mobile number to prevent unauthorized exposure of personal data.
   - Authorized public updates log and official resolution remarks.

5. **News & Events**:
   - Categorized updates: Public Meetings, Press Releases, Field Inspections.
   - Modal view with full article text, venue details, and official government press links.

6. **Development Works Tracker**:
   - Infrastructure tracker covering Roads, Drinking Water Pipelines, Hospitals, and STEM Classrooms.
   - Outlay budgets, ward locations, contractor/executing agencies, verified Government Order (G.O.) sources.
   - Interactive progress percentage indicators.

7. **Photo & Video Gallery**:
   - Lightbox modal for high-resolution images.
   - Categorized into Welfare Distribution, Field Works, and Public Gatherings.

8. **Contact Page**:
   - Verified MLA Secretariat address, working hours, and phone numbers.
   - Emergency numbers (Ambulance 108, Police 100, Fire 101, Women's Helpline 1091, Electricity 1912).
   - Interactive Citizen Enquiry & Feedback form.
   - Verified location map embed.

9. **Secure Staff Admin Dashboard**:
   - Role-protected staff console (accessible via `/admin` or top navigation).
   - Grievance queue with multi-filters (Status, Category, Ward, Search).
   - Detailed dossier editor:
     - Update complaint status
     - Assign nodal officers and departments
     - Post **Public Citizen Updates** (visible on tracker)
     - Log **Confidential Internal Notes** (restricted to staff)
   - Content management: Add/Delete News & Announcements, Add/Update Development Projects.
   - Authorized CSV export of filtered records.

10. **Bilingual Support (Tamil & English)**:
    - Global language toggle in header and drawer with full coverage across all pages, forms, validation messages, and badges.

---

## 🛠️ Technology Stack
- **Frontend**: React 19 + Vite 8
- **Styling**: Tailwind CSS + Custom TVK Color System
- **Icons**: Lucide React
- **Animations**: Lightweight Framer Motion transitions
- **Backend / Authentication**: Firebase Phone Authentication with OTP & Cloud Firestore
- **Storage**: Firebase Storage (with local base64 fallback)
- **Hosting**: Firebase Hosting (`firebase.json`)

---

## 📦 Project Structure
```
MLA/
├── dist/                          # Production build output
├── public/
│   └── tvk-flag.svg               # Vector TVK flag/crest emblem
├── scripts/
│   └── setAdminRole.js            # Firebase Admin SDK role setup script
├── src/
│   ├── components/
│   │   ├── AuthModal.jsx          # Phone OTP & Staff login modal
│   │   ├── ComplaintSlipModal.jsx # Printable official receipt slip
│   │   ├── Footer.jsx             # TVK theme footer with disclaimers
│   │   ├── Navbar.jsx             # Top bar, bilingual toggle, user menu
│   │   └── StatusBadge.jsx        # Standardized color-coded status badges
│   ├── context/
│   │   ├── AuthContext.jsx        # Phone Auth, OTP verification, Admin roles
│   │   └── LanguageContext.jsx    # Tamil / English translation provider
│   ├── data/
│   │   ├── sampleData.js          # Demo complaints, news, projects, gallery
│   │   └── tnDistricts.js         # TN districts, constituencies & categories
│   ├── firebase/
│   │   └── config.js              # Modular Firebase client & fallback detector
│   ├── i18n/
│   │   └── translations.js        # Comprehensive bilingual translation dictionaries
│   ├── pages/
│   │   ├── AboutPage.jsx
│   │   ├── AdminDashboardPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── DevelopmentWorksPage.jsx
│   │   ├── GalleryPage.jsx
│   │   ├── GrievancePage.jsx
│   │   ├── HomePage.jsx
│   │   ├── NewsEventsPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── TrackComplaintPage.jsx
│   ├── services/
│   │   └── dataService.js         # Unified Firestore + local fallback data layer
│   ├── App.jsx                    # Root app routing and providers
│   ├── index.css                  # Tailwind styles and print styling
│   └── main.jsx
├── .env.example                   # Environment template
├── firebase.json                  # Firebase Hosting and rules config
├── firestore.rules                # Production security rules
├── storage.rules                  # Production storage rules
├── tailwind.config.js             # TVK custom color themes & fonts
└── vite.config.js
```

---

## ⚡ Quick Start & Local Testing

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Immediate Testing Without Live Firebase (Zero-Config Demo Mode)
The portal features an intelligent **Hybrid Data Engine**:
- When `.env` credentials are not yet configured, it automatically operates in **Interactive Demo Mode**.
- **Test Phone OTP**: Enter any 10-digit number (e.g. `9876543210`) and enter OTP `123456`.
- **Sample Complaint References**:
  - `TVK-2026-08142` (Phone: `9876543210`) — *Water pipe repair in progress*
  - `TVK-2026-08143` (Phone: `9876543211`) — *Road repair under review*
  - `TVK-2026-08144` (Phone: `9876543212`) — *Streetlight resolved*
- **Staff / Admin Login**:
  - Click **Staff Portal** or **Login** ➔ Select **MLA Staff** tab.
  - Enter Staff Access Key: `TVK-STAFF-2026`
  - Access the full redressal management console, status updater, and CSV export.

---

## 🔥 Connecting to Live Firebase

### Step 1: Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** and name it (e.g. `tvk-mla-public-service`).

### Step 2: Enable Phone Authentication
1. Navigate to **Authentication** ➔ **Sign-in method**.
2. Click on **Phone** and enable it.
3. (Optional for testing) Add test phone numbers under **Phone numbers for testing** (e.g. `+919876543210` with code `123456`).

### Step 3: Enable Cloud Firestore
1. Navigate to **Firestore Database** ➔ **Create database**.
2. Choose a nearby region (e.g. `asia-south1` - Mumbai).
3. Start in **Production mode**.

### Step 4: Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your web app credentials from Firebase Console (*Project settings* ➔ *General* ➔ *Your apps* ➔ *Web*):
```env
VITE_FIREBASE_API_KEY=AIzaSyYourProjectApiKeyHere
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

### Step 5: Deploy Security Rules
Deploy the included security rules:
```bash
firebase deploy --only firestore:rules,storage
```

---

## 🛡️ Admin Role Security Setup
Per security guidelines, **users can never become administrators through public registration**.
To grant official MLA staff admin access in production:

1. Obtain your service account key from **Firebase Console** ➔ **Project settings** ➔ **Service accounts** ➔ **Generate new private key**.
2. Place the JSON file as `scripts/serviceAccountKey.json`.
3. Run the secure role assignment script:
```bash
node scripts/setAdminRole.js +919840123456
```
This sets the trusted custom claim `{ role: 'admin', admin: true }` on the user token.

---

## 🚢 Production Build & Firebase Hosting

### Build for Production
```bash
npm run build
```
This generates the optimized bundle in `dist/`.

### Deploy to Firebase Hosting
```bash
# 1. Login to Firebase CLI
firebase login

# 2. Deploy to Firebase Hosting
firebase deploy --only hosting
```

Your portal will be live at `https://<your-project-id>.web.app`!
