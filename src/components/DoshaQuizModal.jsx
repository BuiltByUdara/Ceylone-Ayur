import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  RotateCcw, 
  ArrowRight,
  Flame,
  Wind,
  Droplets
} from 'lucide-react';
import confetti from 'canvas-confetti';

const QUESTIONS = [
  {
    id: 1,
    question: "How would you describe your natural physical frame and weight tendency?",
    options: [
      { text: "Slender, light-boned, difficulty gaining weight, prominent joints", dosha: "vata" },
      { text: "Medium build, muscular, stable weight, gains or loses easily", dosha: "pitta" },
      { text: "Solid, heavy-boned, broad frame, gains weight easily, loses slowly", dosha: "kapha" }
    ]
  },
  {
    id: 2,
    question: "What is your typical digestion and appetite pattern (Agni)?",
    options: [
      { text: "Irregular, variable appetite, prone to gas, bloating, and dry stool", dosha: "vata" },
      { text: "Intense, sharp hunger, irritable if meals are delayed, prone to acid reflux", dosha: "pitta" },
      { text: "Slow, steady appetite, can skip meals easily, sluggish digestion after heavy food", dosha: "kapha" }
    ]
  },
  {
    id: 3,
    question: "How do you naturally react to weather and temperatures?",
    options: [
      { text: "I dislike cold, windy, and dry weather; love warm sunshine and humid air", dosha: "vata" },
      { text: "I dislike intense heat and humid sun; easily sweat; crave cool breezes", dosha: "pitta" },
      { text: "I dislike damp, cold, and rainy weather; feel invigorated by dry warmth", dosha: "kapha" }
    ]
  },
  {
    id: 4,
    question: "How is your sleep quality and dream pattern?",
    options: [
      { text: "Light, easily disrupted, prone to waking between 2:00 AM - 4:00 AM", dosha: "vata" },
      { text: "Moderate, uninterrupted 6-7 hours, wake up ready to act, vivid dreams", dosha: "pitta" },
      { text: "Deep, heavy 8+ hours, love sleeping in, difficulty waking early in the morning", dosha: "kapha" }
    ]
  },
  {
    id: 5,
    question: "Under high stress, what is your primary emotional reaction?",
    options: [
      { text: "Anxiety, restless worry, racing thoughts, insomnia, and nervousness", dosha: "vata" },
      { text: "Irritability, perfectionism, impatience, and critical frustration", dosha: "pitta" },
      { text: "Withdrawal, resistance to change, procrastination, and emotional comfort eating", dosha: "kapha" }
    ]
  }
];

export default function DoshaQuizModal({ isOpen, onClose, onFilterByCategory }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const handleSelectOption = (dosha) => {
    const updatedAnswers = { ...answers, [currentStep]: dosha };
    setAnswers(updatedAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate final Dosha
      calculateResult(updatedAnswers);
    }
  };

  const calculateResult = (finalAnswers) => {
    const counts = { vata: 0, pitta: 0, kapha: 0 };
    Object.values(finalAnswers).forEach(d => {
      counts[d] = (counts[d] || 0) + 1;
    });

    const total = QUESTIONS.length;
    const vataPct = Math.round((counts.vata / total) * 100);
    const pittaPct = Math.round((counts.pitta / total) * 100);
    const kaphaPct = Math.round((counts.kapha / total) * 100);

    let dominant = 'Vata';
    let max = counts.vata;
    if (counts.pitta > max) { dominant = 'Pitta'; max = counts.pitta; }
    if (counts.kapha > max) { dominant = 'Kapha'; max = counts.kapha; }

    const profileData = {
      dominant,
      percentages: { Vata: vataPct, Pitta: pittaPct, Kapha: kaphaPct },
      description: dominant === 'Vata'
        ? "Your constitution is dominated by Air & Ether (Vata). You are creative, lively, and quick-thinking, but susceptible to nervous exhaustion, dry skin, and digestive irregularity."
        : dominant === 'Pitta'
        ? "Your constitution is dominated by Fire & Water (Pitta). You possess sharp intellect, decisive leadership, and strong metabolism, but are prone to inflammation, burnout, and acidity."
        : "Your constitution is dominated by Earth & Water (Kapha). You are grounded, deeply loyal, and naturally strong, but prone to lethargy, fluid retention, and slow digestion.",
      recommendedTreatment: dominant === 'Vata' ? 'Stress Relief' : dominant === 'Pitta' ? 'Panchakarma' : 'Herbal Detox',
      recommendedHerb: dominant === 'Vata' ? 'Gotu Kola & Ashwagandha' : dominant === 'Pitta' ? 'Venivel & Kohomba' : 'Kothala Himbutu & Polpala'
    };

    setResult(profileData);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div className="glass-card max-w-xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-ayur-gold/40 relative animate-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {!result ? (
          <div>
            {/* Progress Bar & Header */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between text-xs text-ayur-gold font-semibold uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Ayurvedic Prakriti Assessment
                </span>
                <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
              </div>
              
              <div className="w-full h-1.5 bg-slate-200 dark:bg-ayur-moss/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-ayur-gold to-ayur-goldbright transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Current Question */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-ayur-dark dark:text-ayur-sand">
                {QUESTIONS[currentStep].question}
              </h3>

              <div className="space-y-3">
                {QUESTIONS[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.dosha)}
                    className="w-full text-left p-4 rounded-2xl glass-panel border border-ayur-gold/20 hover:border-ayur-gold hover:bg-ayur-gold/10 transition-all duration-200 text-xs sm:text-sm text-slate-700 dark:text-slate-200 flex items-start gap-3 group"
                  >
                    <div className="w-6 h-6 rounded-full border border-ayur-gold/50 flex items-center justify-center text-xs text-ayur-gold group-hover:bg-ayur-gold group-hover:text-ayur-dark transition-colors flex-shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="leading-relaxed">{opt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Result View */
          <div className="space-y-6 text-center">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ayur-gold/15 text-ayur-gold text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Assessment Complete</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ayur-dark dark:text-ayur-sand">
              Dominant Constitution: <span className="text-gold-gradient">{result.dominant}</span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
              {result.description}
            </p>

            {/* Dosha Breakdown Bars */}
            <div className="space-y-3 py-2 text-left">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center gap-1 text-cyan-400"><Wind className="w-3.5 h-3.5" /> Vata (Air/Ether)</span>
                  <span>{result.percentages.Vata}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-ayur-moss/50 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400" style={{ width: `${result.percentages.Vata}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center gap-1 text-amber-400"><Flame className="w-3.5 h-3.5" /> Pitta (Fire/Water)</span>
                  <span>{result.percentages.Pitta}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-ayur-moss/50 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400" style={{ width: `${result.percentages.Pitta}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center gap-1 text-emerald-400"><Droplets className="w-3.5 h-3.5" /> Kapha (Earth/Water)</span>
                  <span>{result.percentages.Kapha}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-ayur-moss/50 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400" style={{ width: `${result.percentages.Kapha}%` }} />
                </div>
              </div>
            </div>

            {/* Recommended Sanctuary & Herb */}
            <div className="p-4 rounded-2xl bg-ayur-emerald/10 border border-emerald-500/30 text-left space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Prescribed Island Care</span>
              <p className="text-xs font-semibold text-slate-800 dark:text-ayur-sand">
                Recommended Therapy: <span className="text-ayur-gold font-bold">{result.recommendedTreatment}</span>
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Key Indigenous Herbs: <span className="font-medium text-emerald-400">{result.recommendedHerb}</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={resetQuiz}
                className="py-3 px-4 rounded-xl glass-panel text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake</span>
              </button>
              
              <button
                onClick={() => {
                  onFilterByCategory(result.recommendedTreatment);
                  onClose();
                  const el = document.getElementById('retreats-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-ayur-gold to-ayur-goldbright text-ayur-dark font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2"
              >
                <span>View Matching {result.recommendedTreatment} Retreats</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
