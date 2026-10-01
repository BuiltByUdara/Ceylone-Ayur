# Ayurveda & Island Wellness (Sri Lanka)

A luxury, interactive wellness web application connecting travelers with authentic Sri Lankan Ayurvedic healing sanctuaries, SLTDA-certified Ayurvedic physicians, and indigenous _Hela Wedakama_ medicinal flora.

Built with **React**, **Tailwind CSS**, **Spline 3D** (`@splinetool/react-spline`), and **Firebase Firestore** (Modular v9+ JS SDK).

---

## 🌿 Key Features

1. **Spline 3D Interactive Hero (`Hero3D.jsx`)**:
   - High-performance 3D scene embedded with glassmorphic overlays and mouse parallax.
   - Interactive 3D triggers (3D Leaf for _Herbal Detox_, 3D Water drop for _Panchakarma_, 3D Sun for _Stress Relief_) syncing directly with the live sanctuary directory filter.
   - Graceful WebGL canvas particle fallback with nature geometry.

2. **Live Firestore Retreats Directory (`RetreatDirectory.jsx`)**:
   - Filter by intention (_Panchakarma_, _Herbal Detox_, _Stress Relief_, _Yoga & Meditation_, _Weight Reset_).
   - District filter (_Kandy, Kalutara, Hambantota, Gampaha, Kurunegala_) & price range slider.
   - Real-time search by name, lead doctor, and Dosha constitution.
   - Interactive treatment details drawer and instant reservation modal.

3. **SLTDA-Certified Doctor Directory (`DoctorDirectory.jsx`)**:
   - Certified Ayurvedic physicians holding BAMS and MD degrees.
   - Specialty filters for _Nadi Pariksha_ (Pulse Reading), _Panchakarma_, _Marma Energy_, and women's _Rasayana_.
   - Direct consultation booking with instant confirmation.

4. **Sri Lankan Herbal Pharmacopoeia (`HerbalGuide.jsx`)**:
   - Interactive indigenous botanical encyclopedia (Gotu Kola, Kothala Himbutu, Venivel, Polpala, Kohomba, Karapincha, etc.).
   - Tridoshic balance ratings (Vata, Pitta, Kapha), phytochemical compounds, and traditional Sinhala home recipes (_Kasaya_, _Mallum_, _Kanda_).

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
