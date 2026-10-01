# Ayurveda & Island Wellness (Sri Lanka)

A luxury, interactive wellness web application connecting travelers with authentic Sri Lankan Ayurvedic healing sanctuaries, SLTDA-certified Ayurvedic physicians, and indigenous *Hela Wedakama* medicinal flora.

Built with **React**, **Tailwind CSS**, **Spline 3D** (`@splinetool/react-spline`), and **Firebase Firestore** (Modular v9+ JS SDK).

---

## 🌿 Key Features

1. **Spline 3D Interactive Hero (`Hero3D.jsx`)**:
   - High-performance 3D scene embedded with glassmorphic overlays and mouse parallax.
   - Interactive 3D triggers (3D Leaf for *Herbal Detox*, 3D Water drop for *Panchakarma*, 3D Sun for *Stress Relief*) syncing directly with the live sanctuary directory filter.
   - Graceful WebGL canvas particle fallback with nature geometry.

2. **Live Firestore Retreats Directory (`RetreatDirectory.jsx`)**:
   - Filter by intention (*Panchakarma*, *Herbal Detox*, *Stress Relief*, *Yoga & Meditation*, *Weight Reset*).
   - District filter (*Kandy, Kalutara, Hambantota, Gampaha, Kurunegala*) & price range slider.
   - Real-time search by name, lead doctor, and Dosha constitution.
   - Interactive treatment details drawer and instant reservation modal.

3. **SLTDA-Certified Doctor Directory (`DoctorDirectory.jsx`)**:
   - Certified Ayurvedic physicians holding BAMS and MD degrees.
   - Specialty filters for *Nadi Pariksha* (Pulse Reading), *Panchakarma*, *Marma Energy*, and women's *Rasayana*.
   - Direct consultation booking with instant confirmation.

4. **Sri Lankan Herbal Pharmacopoeia (`HerbalGuide.jsx`)**:
   - Interactive indigenous botanical encyclopedia (Gotu Kola, Kothala Himbutu, Venivel, Polpala, Kohomba, Karapincha, etc.).
   - Tridoshic balance ratings (Vata, Pitta, Kapha), phytochemical compounds, and traditional Sinhala home recipes (*Kasaya*, *Mallum*, *Kanda*).

5. **Prakriti Dosha Quiz (`DoshaQuizModal.jsx`)**:
   - 5-question Ayurvedic body constitution calculator with percentage breakdown and personalized retreat recommendations.

6. **Firebase Firestore & Zero-Config Auto-Seed (`firebaseConfig.js` & `seedData.js`)**:
   - Auto-seeds initial resort and doctor documents on first load if the database is clean.
   - Operates seamlessly both with real Firebase cloud instances and client-side reactive fallback mode.

---

## 🎨 Theme & Color Palette

- **Deep Forest Green**: `#0C2D24` / `#123A2F`
- **Warm Ayurvedic Gold**: `#C5A866` / `#DFB143`
- **Emerald & Mint**: `#23735B` / `#10B981`
- **Island Sand / Off-White**: `#F9F8F3` / `#EFECE2`
- **Dark Mode**: Deep Vedic Jungle (`#071A14`)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. (Optional) Connect Custom Firebase Project
Create a `.env` file in the root directory using `.env.example`:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```
*Note: If no `.env` is specified, the application will automatically run in local interactive Firestore simulation mode out-of-the-box.*

### 4. Production Build
```bash
npm run build
```
