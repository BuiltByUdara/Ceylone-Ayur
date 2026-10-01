import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, 
  ShieldCheck, 
  Star, 
  Clock, 
  MapPin, 
  Globe, 
  Calendar, 
  Search,
  Sparkles,
  CheckCircle,
  Video
} from 'lucide-react';
import { getDoctors } from '../firebase/firebaseConfig';

export default function DoctorDirectory({ onSelectDoctorForConsultation }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');

  const specialties = [
    'All',
    'Nadi Pariksha (Pulse Reading)',
    'Panchakarma',
    'Women\'s Hormonal Balance',
    'Metabolic Reset',
    'Marma Energy Therapy'
  ];

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getDoctors({
      specialty: specialtyFilter,
      search: search
    }).then(data => {
      if (isMounted) {
        setDoctors(data);
        setLoading(false);
      }
    }).catch(err => {
      console.error("Error fetching doctors:", err);
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [specialtyFilter, search]);

  return (
    <section id="doctors-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ayur-gold/15 text-ayur-gold border border-ayur-gold/30 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>SLTDA & Ayurvedic Medical Council Certified</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ayur-dark dark:text-ayur-sand tracking-tight">
          Sri Lankan Ayurvedic Physicians & Vaidyas
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-light">
          Consult master practitioners holding BAMS and MD degrees in ancient Nadi pulse reading, herbal pharmacopoeia, and chronic disease healing.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-ayur-gold/20 mb-10 flex flex-col md:flex-row items-center gap-4">
        
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search doctor by name, specialty, or clinic..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-slate-800 dark:text-ayur-sand placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ayur-gold"
          />
        </div>

        {/* Specialty Filter Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Stethoscope className="w-4 h-4 text-ayur-gold flex-shrink-0" />
          <select
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
            className="w-full md:w-auto py-2.5 px-3 rounded-xl glass-input text-xs sm:text-sm text-slate-800 dark:text-ayur-sand focus:outline-none focus:ring-2 focus:ring-ayur-gold border border-ayur-gold/30"
          >
            {specialties.map(spec => (
              <option key={spec} value={spec} className="bg-ayur-sand dark:bg-ayur-dark text-slate-800 dark:text-ayur-sand">
                {spec === 'All' ? 'All Clinical Specialties' : spec}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Doctor Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-card rounded-2xl h-80 animate-pulse p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-300 dark:bg-ayur-moss/50" />
              <div className="h-5 bg-slate-300 dark:bg-ayur-moss/50 rounded w-3/4" />
              <div className="h-4 bg-slate-200 dark:bg-ayur-moss/30 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : doctors.length === 0 ? (
        <div className="text-center py-12 glass-card rounded-2xl border border-ayur-gold/20 max-w-md mx-auto">
          <p className="text-3xl mb-2">👨‍⚕️</p>
          <h3 className="font-serif text-base font-bold text-ayur-dark dark:text-ayur-sand">No physicians match your search</h3>
          <button
            onClick={() => { setSearch(''); setSpecialtyFilter('All'); }}
            className="mt-3 px-3.5 py-1.5 rounded-lg bg-ayur-gold text-ayur-dark font-bold text-xs"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map(doctor => (
            <div
              key={doctor.id}
              className="glass-card rounded-2xl p-6 shadow-glass border border-ayur-gold/20 hover:border-ayur-gold/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-4">
                
                {/* Header with Avatar and Credentials */}
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img
                      src={doctor.avatar}
                      alt={doctor.name}
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80";
                      }}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-ayur-gold/40 shadow-md group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-ayur-dark flex items-center justify-center text-[10px] text-white" title="Verified Practitioner">
                      ✓
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold mb-0.5">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span className="text-slate-800 dark:text-ayur-sand">{doctor.rating}</span>
                      <span className="text-[10px] text-slate-400 font-normal">({doctor.experienceYears}+ yrs exp)</span>
                    </div>

                    <h3 className="font-serif text-base sm:text-lg font-bold text-ayur-dark dark:text-ayur-sand leading-snug group-hover:text-ayur-gold transition-colors">
                      {doctor.name}
                    </h3>
                    
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {doctor.degree}
                    </p>
                  </div>
                </div>

                {/* Registration & Clinic */}
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-ayur-leaf flex-shrink-0" />
                    <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">{doctor.registrationNumber}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-ayur-gold flex-shrink-0" />
                    <span>{doctor.location}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs">
                    <Globe className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>Speaks: {doctor.languages.join(', ')}</span>
                  </div>
                </div>

                {/* Clinical Specialties Pills */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Core Focus:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {doctor.specialties.map(spec => (
                      <span
                        key={spec}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-ayur-gold/10 text-ayur-dark dark:text-ayur-goldlight border border-ayur-gold/20"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Short Bio */}
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 italic font-light">
                  "{doctor.bio}"
                </p>

              </div>

              {/* Booking CTA */}
              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-ayur-moss/30 flex items-center gap-2">
                <button
                  onClick={() => onSelectDoctorForConsultation(doctor)}
                  className="w-full py-2.5 rounded-xl bg-ayur-emerald/15 hover:bg-ayur-emerald/25 text-ayur-emerald dark:text-emerald-300 border border-emerald-500/30 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Book Pulse / Video Consult</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </section>
  );
}
