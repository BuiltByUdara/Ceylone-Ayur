import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Calendar, 
  Heart, 
  SlidersHorizontal, 
  X, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Info
} from 'lucide-react';
import { getResorts } from '../firebase/firebaseConfig';
import { CATEGORIES } from '../data/seedData';

export default function RetreatDirectory({ activeCategory, setActiveCategory, onSelectResortForBooking }) {
  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [maxPrice, setMaxPrice] = useState(500);
  const [selectedResortDetail, setSelectedResortDetail] = useState(null);

  const districts = ['All', 'Kandy', 'Kalutara', 'Hambantota', 'Gampaha', 'Kurunegala'];

  // Fetch from Firestore/cache whenever filters update
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getResorts({
      category: activeCategory,
      searchQuery: searchQuery,
      maxPrice: maxPrice < 500 ? maxPrice : null,
      district: selectedDistrict
    }).then(data => {
      if (isMounted) {
        setResorts(data);
        setLoading(false);
      }
    }).catch(err => {
      console.error("Error fetching resorts:", err);
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [activeCategory, searchQuery, selectedDistrict, maxPrice]);

  return (
    <section id="retreats-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Header with Title and Subtitle */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ayur-emerald/15 text-ayur-leaf border border-ayur-leaf/30 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Firestore Live Directory</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ayur-dark dark:text-ayur-sand tracking-tight">
          Sri Lankan Ayurvedic Sanctuaries
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-light">
          Filter by therapeutic intention, geographic district, and personalized dosha balancing protocols.
        </p>
      </div>

      {/* Category Filter Pills (Synced with 3D Hero interactions) */}
      <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-300 flex items-center gap-2 border ${
              activeCategory === cat.id
                ? 'bg-ayur-forest text-ayur-goldlight border-ayur-gold shadow-gold-glow dark:bg-ayur-deep dark:text-ayur-goldlight scale-105'
                : 'glass-panel text-slate-700 dark:text-slate-300 border-ayur-gold/20 hover:border-ayur-gold/60'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-ayur-gold/20 mb-10 shadow-sm space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by retreat name, doctor, or treatment..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-slate-800 dark:text-ayur-sand placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ayur-gold"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* District Selector */}
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-ayur-gold flex-shrink-0" />
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="py-2.5 px-3 rounded-xl glass-input text-xs sm:text-sm text-slate-800 dark:text-ayur-sand focus:outline-none focus:ring-2 focus:ring-ayur-gold border border-ayur-gold/30"
          >
            {districts.map(d => (
              <option key={d} value={d} className="bg-ayur-sand dark:bg-ayur-dark text-slate-800 dark:text-ayur-sand">
                {d === 'All' ? 'All Districts' : `${d} District`}
              </option>
            ))}
          </select>
        </div>

        {/* Max Price Slider */}
        <div className="flex items-center gap-3 min-w-[200px] px-2">
          <div className="flex-1">
            <div className="flex justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
              <span>Max Rate:</span>
              <span className="font-bold text-ayur-gold">${maxPrice}/night</span>
            </div>
            <input
              type="range"
              min="150"
              max="500"
              step="25"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-ayur-moss rounded-lg appearance-none cursor-pointer accent-ayur-gold"
            />
          </div>
        </div>

      </div>

      {/* Results Count & Active Category Header */}
      <div className="flex items-center justify-between mb-6 px-1">
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Showing <span className="font-bold text-ayur-dark dark:text-ayur-gold">{resorts.length}</span> verified sanctuaries
        </p>
        {activeCategory !== 'All' && (
          <button
            onClick={() => setActiveCategory('All')}
            className="text-xs text-ayur-gold hover:underline flex items-center gap-1"
          >
            <span>Clear category filter</span>
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Resorts Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-card rounded-2xl h-96 animate-pulse p-4 space-y-4">
              <div className="w-full h-48 bg-slate-300 dark:bg-ayur-moss/50 rounded-xl" />
              <div className="h-5 bg-slate-300 dark:bg-ayur-moss/50 rounded w-3/4" />
              <div className="h-4 bg-slate-200 dark:bg-ayur-moss/30 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : resorts.length === 0 ? (
        <div className="text-center py-16 glass-card rounded-2xl border border-ayur-gold/20 max-w-lg mx-auto">
          <p className="text-4xl mb-3">🍃</p>
          <h3 className="font-serif text-lg font-bold text-ayur-dark dark:text-ayur-sand">No matching retreats found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
            Try adjusting your search keywords or resetting price and district filters.
          </p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
              setSelectedDistrict('All');
              setMaxPrice(500);
            }}
            className="px-4 py-2 rounded-xl bg-ayur-gold text-ayur-dark font-bold text-xs"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resorts.map(resort => (
            <div
              key={resort.id}
              className="glass-card rounded-2xl overflow-hidden shadow-glass border border-ayur-gold/20 hover:border-ayur-gold/60 transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              {/* Image Container with Badges */}
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={resort.image}
                  alt={resort.name}
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full glass-panel text-[11px] font-bold text-ayur-dark dark:text-ayur-goldlight border border-ayur-gold/40 shadow-sm">
                  {resort.category}
                </div>

                {/* SLTDA Badge */}
                {resort.sltdaCertified && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-ayur-forest/90 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>SLTDA Certified</span>
                  </div>
                )}

                {/* Rating Badge */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg glass-panel flex items-center gap-1 text-xs font-bold text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="text-slate-800 dark:text-ayur-sand">{resort.rating}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">({resort.reviewsCount})</span>
                </div>

                {/* Price Overlay */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-ayur-dark/85 text-ayur-gold text-xs font-bold border border-ayur-gold/30">
                  <span>${resort.pricePerNight}</span>
                  <span className="text-[10px] text-slate-300 font-normal"> / night</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Location */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-ayur-gold" />
                    <span>{resort.location}</span>
                  </div>

                  {/* Resort Name */}
                  <h3 className="font-serif text-lg font-bold text-ayur-dark dark:text-ayur-sand leading-snug group-hover:text-ayur-gold transition-colors">
                    {resort.name}
                  </h3>

                  {/* Tagline */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-1 font-light">
                    {resort.tagline}
                  </p>

                  {/* Dosha Focus Tags */}
                  <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Dosha:</span>
                    {resort.doshaFocus?.map(dosha => (
                      <span
                        key={dosha}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-ayur-emerald/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                      >
                        {dosha}
                      </span>
                    ))}
                  </div>

                  {/* Lead Doctor */}
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2.5 flex items-center gap-1">
                    <span className="font-medium text-ayur-gold">Lead Vaidya:</span> {resort.leadDoctor}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-200 dark:border-ayur-moss/40 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedResortDetail(resort)}
                    className="flex-1 py-2 rounded-xl glass-panel text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-ayur-gold hover:border-ayur-gold transition-colors flex items-center justify-center gap-1"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Treatments</span>
                  </button>

                  <button
                    onClick={() => onSelectResortForBooking(resort)}
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-ayur-gold to-ayur-goldbright text-ayur-dark text-xs font-bold shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1"
                  >
                    <span>Enquire & Book</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Resort Details Modal Drawer */}
      {selectedResortDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="glass-card max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl border border-ayur-gold/40 max-h-[90vh] flex flex-col animate-in zoom-in-95">
            
            {/* Modal Image Header */}
            <div className="relative h-48 sm:h-64 w-full">
              <img 
                src={selectedResortDetail.image} 
                alt={selectedResortDetail.name}
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80";
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <button
                onClick={() => setSelectedResortDetail(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase tracking-wider font-bold text-ayur-goldlight">
                  {selectedResortDetail.category} • {selectedResortDetail.district}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold">
                  {selectedResortDetail.name}
                </h3>
              </div>
            </div>

            {/* Modal Content Scrollable */}
            <div className="p-6 overflow-y-auto space-y-6 text-slate-800 dark:text-ayur-sand">
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-ayur-gold mb-2">Sanctuary Overview</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  {selectedResortDetail.description}
                </p>
              </div>

              {/* Treatment Highlights */}
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-ayur-gold mb-2.5">Signature Ayurvedic Therapies</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedResortDetail.treatmentHighlights?.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-ayur-leaf flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Retreat Packages */}
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-ayur-gold mb-2.5">Available Program Durations</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedResortDetail.durationOptions?.map((dur, idx) => (
                    <span key={idx} className="text-xs px-3 py-1.5 rounded-lg glass-panel border border-ayur-gold/30 text-ayur-gold font-medium">
                      {dur}
                    </span>
                  ))}
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-4 rounded-xl bg-ayur-emerald/10 border border-emerald-500/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400">Chief Resident Vaidya</span>
                  <p className="text-sm font-bold">{selectedResortDetail.leadDoctor}</p>
                  <p className="text-[11px] text-slate-400">Accreditation: {selectedResortDetail.sltdaRegistration}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">From</span>
                  <p className="font-serif text-lg font-bold text-ayur-gold">${selectedResortDetail.pricePerNight} <span className="text-xs font-normal">/ night</span></p>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => setSelectedResortDetail(null)}
                  className="w-1/3 py-3 rounded-xl glass-panel text-xs font-bold"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const resort = selectedResortDetail;
                    setSelectedResortDetail(null);
                    onSelectResortForBooking(resort);
                  }}
                  className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-ayur-gold to-ayur-goldbright text-ayur-dark font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Booking Dates</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
