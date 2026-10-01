import React, { useState, useEffect } from "react";
import {
  Leaf,
  Sun,
  Moon,
  Sparkles,
  BookOpen,
  Stethoscope,
  Compass,
  Menu,
  X,
  Database,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { isLiveFirebase } from "../firebase/firebaseConfig";

export default function Navbar({
  onOpenDoshaQuiz,
  onOpenHerbalGuide,
  activeSection,
  setActiveSection,
}) {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-panel shadow-glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ayur-emerald to-ayur-forest border border-ayur-gold/40 flex items-center justify-center text-ayur-gold shadow-gold-glow group-hover:scale-105 transition-transform duration-300">
              <Leaf className="w-5 h-5 text-ayur-goldbright" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-ayur-dark dark:text-ayur-sand">
                  Ceylon<span className="text-gold-gradient italic">Ayur</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-ayur-gold/20 text-ayur-gold font-bold tracking-wider uppercase">
                  SLTDA
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-medium">
                Island Wellness Sanctuary
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => scrollToSection("retreats-section")}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200 hover:text-ayur-gold hover:bg-ayur-gold/10 transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-ayur-gold" />
              <span>Sanctuaries</span>
            </button>

            <button
              onClick={() => scrollToSection("doctors-section")}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200 hover:text-ayur-gold hover:bg-ayur-gold/10 transition-colors flex items-center gap-1.5"
            >
              <Stethoscope className="w-3.5 h-3.5 text-ayur-gold" />
              <span>Certified Doctors</span>
            </button>

            <button
              onClick={onOpenHerbalGuide}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200 hover:text-ayur-gold hover:bg-ayur-gold/10 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>Herbal Guide</span>
            </button>
          </div>

          {/* Right Action Icons & Prakriti Button */}
          <div className="hidden md:flex items-center gap-3">
            {/* Live Firestore Connection Pill */}
            <div
              title={
                isLiveFirebase
                  ? "Connected to live Google Cloud Firestore"
                  : "Running on client Firestore reactive layer"
              }
              className="hidden lg:flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border border-ayur-gold/30 bg-ayur-gold/5 text-slate-600 dark:text-slate-300"
            >
              <span
                className={`w-2 h-2 rounded-full ${isLiveFirebase ? "bg-emerald-500 animate-pulse" : "bg-ayur-gold"}`}
              />
              <Database className="w-3 h-3 text-ayur-gold" />
              <span className="font-mono text-[10px]">
                {isLiveFirebase ? "Firestore Live" : "Firestore Client"}
              </span>
            </div>

            {/* Prakriti Dosha Quiz Button */}
            <button
              onClick={onOpenDoshaQuiz}
              className="px-4 py-2 rounded-xl bg-ayur-gold/15 hover:bg-ayur-gold/25 border border-ayur-gold/50 text-ayur-dark dark:text-ayur-sand text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-ayur-goldbright animate-pulse" />
              <span>Dosha Quiz</span>
            </button>

            {/* Dark / Light Mode Switcher */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl glass-panel border border-ayur-gold/30 flex items-center justify-center text-slate-700 dark:text-ayur-sand hover:text-ayur-gold transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-slate-700 dark:text-ayur-sand"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-slate-700 dark:text-ayur-sand"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl glass-card border border-ayur-gold/30 space-y-2.5 animate-in fade-in slide-in-from-top-3">
            <button
              onClick={() => scrollToSection("retreats-section")}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-ayur-sand hover:bg-ayur-gold/10 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-ayur-gold" />
              <span>Ayurveda Sanctuaries</span>
            </button>

            <button
              onClick={() => scrollToSection("doctors-section")}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-ayur-sand hover:bg-ayur-gold/10 flex items-center gap-2"
            >
              <Stethoscope className="w-4 h-4 text-ayur-gold" />
              <span>Certified Doctors</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHerbalGuide();
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-ayur-sand hover:bg-ayur-gold/10 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Herbal Guide (Medicinal Plants)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDoshaQuiz();
              }}
              className="w-full text-center mt-2 py-2.5 rounded-xl bg-ayur-gold text-ayur-dark font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Take Prakriti Dosha Quiz</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
