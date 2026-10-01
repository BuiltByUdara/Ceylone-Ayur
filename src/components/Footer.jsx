import React from 'react';
import { 
  Leaf, 
  ShieldCheck, 
  Mail, 
  MapPin, 
  Phone, 
  Heart, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

export default function Footer({ onOpenDoshaQuiz, onOpenHerbalGuide }) {
  return (
    <footer className="mt-20 border-t border-ayur-gold/20 bg-ayur-forest dark:bg-ayur-dark text-ayur-sand pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Col 1: Brand & SLTDA Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-ayur-emerald/30 border border-ayur-gold/40 flex items-center justify-center text-ayur-gold">
                <Leaf className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="font-serif font-bold text-xl tracking-tight">
                Ceylon<span className="text-gold-gradient italic">Ayur</span>
              </span>
            </div>

            <p className="text-xs text-slate-300 max-w-sm leading-relaxed font-light">
              Sri Lanka's dedicated platform for authentic Vedic healing sanctuaries, Panchakarma rejuvenation, SLTDA-licensed resorts, and indigenous Hela Wedakama flora.
            </p>

            {/* Accreditation Badge */}
            <div className="p-3.5 rounded-xl bg-ayur-deep/80 border border-emerald-500/30 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div className="text-[11px] text-slate-300">
                <p className="font-bold text-white">SLTDA Registered Platform</p>
                <p className="text-slate-400">Collaborating with the Ministry of Indigenous Medicine</p>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-ayur-gold">
              Sanctuaries
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#retreats-section" className="hover:text-ayur-gold transition-colors">Panchakarma Centers</a></li>
              <li><a href="#retreats-section" className="hover:text-ayur-gold transition-colors">Herbal Detox Havens</a></li>
              <li><a href="#retreats-section" className="hover:text-ayur-gold transition-colors">Mountain Eco-Lodges</a></li>
              <li><a href="#retreats-section" className="hover:text-ayur-gold transition-colors">Coastal Solitude Villas</a></li>
            </ul>
          </div>

          {/* Col 3: Wellness Tools */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-ayur-gold">
              Interactive Tools
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={onOpenDoshaQuiz} className="hover:text-ayur-gold transition-colors text-left flex items-center gap-1">
                  <span>Prakriti Dosha Quiz</span>
                  <Sparkles className="w-3 h-3 text-ayur-gold" />
                </button>
              </li>
              <li>
                <button onClick={onOpenHerbalGuide} className="hover:text-ayur-gold transition-colors text-left">
                  Medicinal Herb Guide
                </button>
              </li>
              <li>
                <a href="#doctors-section" className="hover:text-ayur-gold transition-colors">
                  Pulse Diagnosis (Nadi)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Island Inquiries */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-ayur-gold">
              Wellness Dispatch
            </h4>
            <p className="text-xs text-slate-300">
              Receive seasonal Ayurvedic recipes and sacred retreat openings.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing to Ceylon Ayurvedic Dispatch!"); }} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your email..."
                className="w-full px-3.5 py-2 rounded-xl bg-ayur-dark/60 border border-ayur-gold/30 text-xs text-ayur-sand placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-ayur-gold"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-ayur-gold text-ayur-dark font-bold text-xs uppercase tracking-wider hover:bg-ayur-goldlight transition-colors"
              >
                Join Sanctuary Circle
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 border-t border-ayur-gold/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © 2026 Ayurveda & Island Wellness (Sri Lanka). All rights reserved.
          </p>
          
          <div className="flex items-center gap-4 text-[11px]">
            <span>Medical Disclaimer: Consult resident Ayurvedic doctors for clinical guidance.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
