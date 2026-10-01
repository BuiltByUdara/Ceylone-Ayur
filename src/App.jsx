import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import RetreatDirectory from './components/RetreatDirectory';
import DoctorDirectory from './components/DoctorDirectory';
import HerbalGuide from './components/HerbalGuide';
import DoshaQuizModal from './components/DoshaQuizModal';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';
import { autoSeedFirestore } from './firebase/firebaseConfig';
import { Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isDoshaQuizOpen, setIsDoshaQuizOpen] = useState(false);
  const [isHerbalGuideOpen, setIsHerbalGuideOpen] = useState(false);
  
  // Booking Modal State
  const [bookingItem, setBookingItem] = useState(null);
  const [bookingType, setBookingType] = useState('retreat'); // 'retreat' or 'doctor'
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Auto-seed Firestore collections on initial mount
  useEffect(() => {
    autoSeedFirestore()
      .then(res => {
        console.info(`🌿 Ayurveda Island Wellness initialized successfully in [${res.mode}] mode.`);
      })
      .catch(err => {
        console.warn("Auto-seed notice:", err);
      });
  }, []);

  const handleSelectResortForBooking = (resort) => {
    setBookingItem(resort);
    setBookingType('retreat');
    setIsBookingOpen(true);
  };

  const handleSelectDoctorForConsultation = (doctor) => {
    setBookingItem(doctor);
    setBookingType('doctor');
    setIsBookingOpen(true);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-ayur-sand dark:bg-ayur-dark text-slate-800 dark:text-ayur-sand transition-colors duration-300 flex flex-col justify-between selection:bg-ayur-gold/30 selection:text-ayur-gold">
        
        {/* Top Floating Glass Navigation */}
        <Navbar 
          onOpenDoshaQuiz={() => setIsDoshaQuizOpen(true)}
          onOpenHerbalGuide={() => setIsHerbalGuideOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-grow">
          
          {/* Hero 3D Scene with Glassmorphism Overlays and Category Filter Triggers */}
          <Hero3D 
            activeCategory={activeCategory}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              const el = document.getElementById('retreats-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenDoshaQuiz={() => setIsDoshaQuizOpen(true)}
            onOpenHerbalGuide={() => setIsHerbalGuideOpen(true)}
          />

          {/* Retreats Directory Section (Firestore Live Query) */}
          <RetreatDirectory 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            onSelectResortForBooking={handleSelectResortForBooking}
          />

          {/* SLTDA Certified Doctor Directory Section */}
          <DoctorDirectory 
            onSelectDoctorForConsultation={handleSelectDoctorForConsultation}
          />

        </main>

        {/* Wellness Footer */}
        <Footer 
          onOpenDoshaQuiz={() => setIsDoshaQuizOpen(true)}
          onOpenHerbalGuide={() => setIsHerbalGuideOpen(true)}
        />

        {/* Interactive Modals */}
        {/* 1. Herbal Guide Encyclopedia Modal */}
        <HerbalGuide 
          isOpen={isHerbalGuideOpen}
          onClose={() => setIsHerbalGuideOpen(false)}
        />

        {/* 2. Prakriti Dosha Quiz Modal */}
        <DoshaQuizModal 
          isOpen={isDoshaQuizOpen}
          onClose={() => setIsDoshaQuizOpen(false)}
          onFilterByCategory={(cat) => setActiveCategory(cat)}
        />

        {/* 3. Retreat / Doctor Booking Drawer */}
        {isBookingOpen && (
          <BookingModal 
            item={bookingItem}
            type={bookingType}
            onClose={() => {
              setIsBookingOpen(false);
              setBookingItem(null);
            }}
          />
        )}

      </div>
    </ThemeProvider>
  );
}
