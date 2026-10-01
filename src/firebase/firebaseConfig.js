import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  addDoc, 
  query, 
  where,
  orderBy,
  serverTimestamp 
} from "firebase/firestore";
import { INITIAL_RESORTS, INITIAL_DOCTORS } from "../data/seedData";

// Client-side Firebase configuration
// Replace these with your real Firebase Project credentials in a .env file if desired:
// VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, etc.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAyurvedaIslandWellnessDemoKey2026",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ayurveda-island-wellness.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ayurveda-island-wellness",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ayurveda-island-wellness.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "102938475610",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:102938475610:web:8a7b6c5d4e3f2a1b"
};

// Initialize Firebase app singleton
let app;
let db;
let isLiveFirebase = false;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  // If the user has provided real Firebase keys, getFirestore will talk to their project
  if (import.meta.env.VITE_FIREBASE_PROJECT_ID && import.meta.env.VITE_FIREBASE_API_KEY) {
    db = getFirestore(app);
    isLiveFirebase = true;
  } else {
    // Try initializing Firestore; if in demo/offline mode, fallback will handle gracefully
    db = getFirestore(app);
    isLiveFirebase = false;
  }
} catch (error) {
  console.warn("Firebase initialization notice: Running in local interactive demo mode", error);
}

export { app, db, isLiveFirebase };

// Helper Local Storage Cache for seamless offline/zero-config operation
const STORAGE_KEYS = {
  RESORTS: 'ayur_resorts_cache',
  DOCTORS: 'ayur_doctors_cache',
  BOOKINGS: 'ayur_bookings_cache',
  INITIALIZED: 'ayur_seeded_v1'
};

/**
 * Auto-seeds Firestore on initial app launch if the collections are empty.
 * Also hydrates local cache storage.
 */
export async function autoSeedFirestore() {
  const result = { resortsCount: 0, doctorsCount: 0, mode: isLiveFirebase ? 'firestore' : 'local-cache' };
  
  // 1. Ensure local cache is populated for zero-latency instant rendering
  if (!localStorage.getItem(STORAGE_KEYS.INITIALIZED)) {
    localStorage.setItem(STORAGE_KEYS.RESORTS, JSON.stringify(INITIAL_RESORTS));
    localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(INITIAL_DOCTORS));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
  }

  // 2. If live Firestore is configured, check and seed Firestore collections
  if (isLiveFirebase && db) {
    try {
      // Check resorts collection
      const resortsCol = collection(db, "resorts");
      const resortsSnapshot = await getDocs(resortsCol);
      if (resortsSnapshot.empty) {
        for (const resort of INITIAL_RESORTS) {
          await setDoc(doc(db, "resorts", resort.id), {
            ...resort,
            createdAt: serverTimestamp()
          });
        }
        result.resortsCount = INITIAL_RESORTS.length;
      } else {
        result.resortsCount = resortsSnapshot.docs.length;
      }

      // Check doctors collection
      const doctorsCol = collection(db, "doctors");
      const doctorsSnapshot = await getDocs(doctorsCol);
      if (doctorsSnapshot.empty) {
        for (const doctor of INITIAL_DOCTORS) {
          await setDoc(doc(db, "doctors", doctor.id), {
            ...doctor,
            createdAt: serverTimestamp()
          });
        }
        result.doctorsCount = INITIAL_DOCTORS.length;
      } else {
        result.doctorsCount = doctorsSnapshot.docs.length;
      }
    } catch (err) {
      console.info("Firestore auto-seed fallback: operating in cached local mode.", err.message);
    }
  }

  return result;
}

/**
 * Fetches all wellness resorts from Firestore or fallback cache with category & search filtering
 */
export async function getResorts({ category = "All", searchQuery = "", maxPrice = null, district = "All" } = {}) {
  // If live Firestore is available, attempt fetching from Firestore
  if (isLiveFirebase && db) {
    try {
      const resortsCol = collection(db, "resorts");
      let q = resortsCol;
      
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        let resorts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        return filterResortsData(resorts, { category, searchQuery, maxPrice, district });
      }
    } catch (err) {
      console.warn("Firestore fetch notice, using fallback data:", err.message);
    }
  }

  // Fallback / Instant local storage mode
  let localData = localStorage.getItem(STORAGE_KEYS.RESORTS);
  let resorts = localData ? JSON.parse(localData) : INITIAL_RESORTS;
  return filterResortsData(resorts, { category, searchQuery, maxPrice, district });
}

function filterResortsData(resorts, { category, searchQuery, maxPrice, district }) {
  return resorts.filter(resort => {
    // Category match
    const matchesCategory = 
      category === "All" || 
      resort.category === category || 
      (resort.secondaryCategories && resort.secondaryCategories.includes(category));

    // District match
    const matchesDistrict = 
      district === "All" || 
      resort.district?.toLowerCase() === district.toLowerCase();

    // Max Price match
    const matchesPrice = !maxPrice || resort.pricePerNight <= maxPrice;

    // Search query match
    const queryLower = searchQuery.toLowerCase().trim();
    const matchesSearch = !queryLower || 
      resort.name.toLowerCase().includes(queryLower) ||
      resort.location.toLowerCase().includes(queryLower) ||
      resort.tagline.toLowerCase().includes(queryLower) ||
      resort.leadDoctor.toLowerCase().includes(queryLower) ||
      (resort.doshaFocus && resort.doshaFocus.some(d => d.toLowerCase().includes(queryLower)));

    return matchesCategory && matchesDistrict && matchesPrice && matchesSearch;
  });
}

/**
 * Fetches all SLTDA-certified doctors from Firestore or fallback cache
 */
export async function getDoctors({ specialty = "All", search = "" } = {}) {
  if (isLiveFirebase && db) {
    try {
      const docsCol = collection(db, "doctors");
      const snapshot = await getDocs(docsCol);
      if (!snapshot.empty) {
        let doctors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return filterDoctorsData(doctors, { specialty, search });
      }
    } catch (err) {
      console.warn("Firestore doctors fetch notice, using fallback:", err.message);
    }
  }

  let localData = localStorage.getItem(STORAGE_KEYS.DOCTORS);
  let doctors = localData ? JSON.parse(localData) : INITIAL_DOCTORS;
  return filterDoctorsData(doctors, { specialty, search });
}

function filterDoctorsData(doctors, { specialty, search }) {
  return doctors.filter(doctor => {
    const matchesSpecialty = specialty === "All" || doctor.specialties.some(s => s.toLowerCase().includes(specialty.toLowerCase()));
    const queryLower = search.toLowerCase().trim();
    const matchesSearch = !queryLower || 
      doctor.name.toLowerCase().includes(queryLower) ||
      doctor.title.toLowerCase().includes(queryLower) ||
      doctor.location.toLowerCase().includes(queryLower) ||
      doctor.specialties.some(s => s.toLowerCase().includes(queryLower));

    return matchesSpecialty && matchesSearch;
  });
}

/**
 * Submits a new booking or inquiry directly to Firestore `bookings` collection
 */
export async function submitBooking(bookingData) {
  const payload = {
    ...bookingData,
    id: 'booking_' + Date.now(),
    createdAt: new Date().toISOString(),
    status: 'Confirmed'
  };

  if (isLiveFirebase && db) {
    try {
      const docRef = await addDoc(collection(db, "bookings"), {
        ...payload,
        createdAtServer: serverTimestamp()
      });
      payload.id = docRef.id;
    } catch (err) {
      console.warn("Firestore booking write notice, storing locally:", err.message);
    }
  }

  // Always store in local bookings log for offline view
  const existingBookings = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS) || '[]');
  existingBookings.unshift(payload);
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(existingBookings));

  return payload;
}
