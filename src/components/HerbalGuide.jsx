import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Leaf, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight,
  FlaskConical,
  HeartHandshake
} from 'lucide-react';
import { MEDICINAL_PLANTS } from '../data/seedData';

export default function HerbalGuide({ isOpen, onClose }) {
  const [search, setSearch] = useState('');
  const [selectedPlant, setSelectedPlant] = useState(MEDICINAL_PLANTS[0]);
  const [selectedDoshaFilter, setSelectedDoshaFilter] = useState('All');

  if (!isOpen) return null;

  const filteredPlants = MEDICINAL_PLANTS.filter(plant => {
    const matchesSearch = 
      plant.sinhalaName.toLowerCase().includes(search.toLowerCase()) ||
      plant.botanicalName.toLowerCase().includes(search.toLowerCase()) ||
      plant.englishName.toLowerCase().includes(search.toLowerCase()) ||
      plant.primaryBenefit.toLowerCase().includes(search.toLowerCase()) ||
      plant.description.toLowerCase().includes(search.toLowerCase());

    const matchesDosha = 
      selectedDoshaFilter === 'All' || 
      plant.doshaEffect.toLowerCase().includes(selectedDoshaFilter.toLowerCase());

    return matchesSearch && matchesDosha;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in">
      
      {/* Modal Container */}
      <div className="glass-card max-w-5xl w-full rounded-3xl overflow-hidden shadow-2xl border border-ayur-gold/40 max-h-[92vh] flex flex-col animate-in zoom-in-95">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-ayur-gold/20 flex items-center justify-between bg-ayur-forest/30 dark:bg-ayur-deep/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-ayur-emerald/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-ayur-dark dark:text-ayur-sand flex items-center gap-2">
                <span>Sri Lankan Herbal Pharmacopoeia</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-ayur-gold/20 text-ayur-gold">
                  Hela Wedakama
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Indigenous medicinal flora, dosha balancing actions & traditional home formulations
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl glass-panel text-slate-400 hover:text-slate-600 dark:hover:text-white flex items-center justify-center hover:bg-ayur-gold/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Dosha Filter Bar */}
        <div className="p-4 border-b border-ayur-gold/15 bg-ayur-sand/50 dark:bg-ayur-dark/40 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Sinhala name (e.g. Gotu Kola), botanical name, or benefit..."
              className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-xs sm:text-sm text-slate-800 dark:text-ayur-sand placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ayur-gold"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Vata', 'Pitta', 'Kapha'].map(dosha => (
              <button
                key={dosha}
                onClick={() => setSelectedDoshaFilter(dosha)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedDoshaFilter === dosha
                    ? 'bg-ayur-gold text-ayur-dark shadow-sm'
                    : 'glass-panel text-slate-600 dark:text-slate-300 hover:text-ayur-gold'
                }`}
              >
                {dosha === 'All' ? 'All Doshas' : `${dosha} Balancing`}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Main Content: Left List & Right Detail */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-0">
          
          {/* Left: Plant Cards List */}
          <div className="md:col-span-5 p-4 overflow-y-auto space-y-2.5 border-r border-ayur-gold/15 max-h-[50vh] md:max-h-none">
            {filteredPlants.length === 0 ? (
              <div className="text-center py-10 text-xs text-slate-500">
                No medicinal plants match your query.
              </div>
            ) : (
              filteredPlants.map(plant => (
                <div
                  key={plant.id}
                  onClick={() => setSelectedPlant(plant)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all duration-200 border flex items-center justify-between ${
                    selectedPlant?.id === plant.id
                      ? 'bg-ayur-forest/20 dark:bg-ayur-deep/70 border-ayur-gold shadow-sm text-ayur-gold'
                      : 'glass-card border-transparent hover:border-ayur-gold/30 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={plant.image}
                      alt={plant.sinhalaName}
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80";
                      }}
                      className="w-12 h-12 rounded-xl object-cover border border-ayur-gold/30"
                    />
                    <div>
                      <h4 className="font-serif text-xs sm:text-sm font-bold leading-tight">
                        {plant.sinhalaName}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                        {plant.botanicalName}
                      </p>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                        {plant.primaryBenefit.split(',')[0]}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 flex-shrink-0 ${selectedPlant?.id === plant.id ? 'text-ayur-gold' : 'text-slate-400'}`} />
                </div>
              ))
            )}
          </div>

          {/* Right: Active Plant Detailed Dossier */}
          {selectedPlant && (
            <div className="md:col-span-7 p-6 overflow-y-auto space-y-6 text-slate-800 dark:text-ayur-sand">
              
              {/* Plant Dossier Header */}
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <img
                  src={selectedPlant.image}
                  alt={selectedPlant.sinhalaName}
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80";
                  }}
                  className="w-full sm:w-36 h-36 rounded-2xl object-cover border-2 border-ayur-gold/40 shadow-md"
                />

                <div className="space-y-1.5 flex-1">
                  <span className="text-[11px] font-bold text-ayur-gold uppercase tracking-wider">
                    Indigenous Botanical Profile
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-ayur-dark dark:text-ayur-sand">
                    {selectedPlant.sinhalaName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic font-mono">
                    Botanical: {selectedPlant.botanicalName}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Common: {selectedPlant.englishName}
                  </p>

                  <div className="pt-1">
                    <span className="inline-block text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-semibold">
                      {selectedPlant.doshaEffect}
                    </span>
                  </div>
                </div>
              </div>

              {/* Therapeutic Action */}
              <div className="p-4 rounded-2xl glass-panel border border-ayur-gold/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ayur-gold">
                  <Sparkles className="w-4 h-4 text-ayur-gold" />
                  <span>Primary Therapeutic Benefit</span>
                </div>
                <p className="text-sm font-semibold text-slate-800 dark:text-ayur-sand">
                  {selectedPlant.primaryBenefit}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  {selectedPlant.description}
                </p>
              </div>

              {/* Traditional Sri Lankan Preparation */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-widest font-bold text-ayur-gold flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4" />
                  <span>Traditional Hela Preparation & Recipe</span>
                </h4>
                <div className="p-4 rounded-xl bg-ayur-gold/10 border border-ayur-gold/30 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                  {selectedPlant.traditionalPreparation}
                </div>
              </div>

              {/* Ayurvedic Taste & Active Phytochemicals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl glass-panel border border-ayur-gold/20 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Rasa (Taste Profile)</span>
                  <p className="text-xs font-semibold">{selectedPlant.tasteProfile}</p>
                </div>

                <div className="p-3.5 rounded-xl glass-panel border border-ayur-gold/20 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                    <FlaskConical className="w-3 h-3 text-ayur-leaf" />
                    Key Phytochemicals
                  </span>
                  <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                    {selectedPlant.keyCompounds.join(' • ')}
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
