import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Stethoscope, 
  User, 
  Mail, 
  Phone, 
  FileText,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitBooking } from '../firebase/firebaseConfig';

export default function BookingModal({ item, type, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    startDate: '',
    durationOrTime: type === 'retreat' ? item?.durationOptions?.[0] || '7 Days' : '10:00 AM (SLST / GMT+5:30)',
    doshaKnown: 'Unsure / Need Assessment',
    specialNotes: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!item) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        bookingType: type, // 'retreat' or 'doctor'
        targetId: item.id,
        targetName: item.name,
        targetDetail: type === 'retreat' ? item.location : item.title,
        ...formData
      };

      const res = await submitBooking(payload);
      setConfirmedBooking(res);
      setSubmitting(false);

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (err) {
      console.error("Booking error:", err);
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="glass-card max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-ayur-gold/40 relative animate-in zoom-in-95 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {!confirmedBooking ? (
          <div>
            
            {/* Header */}
            <div className="mb-6 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-ayur-gold/15 text-ayur-gold text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>{type === 'retreat' ? 'Sanctuary Reservation' : 'Physician Consultation'}</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-ayur-dark dark:text-ayur-sand">
                {item.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {type === 'retreat' ? item.location : item.title}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Maya Senanayake"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-slate-800 dark:text-ayur-sand focus:ring-2 focus:ring-ayur-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.com"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-slate-800 dark:text-ayur-sand focus:ring-2 focus:ring-ayur-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Phone / WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+94 77 123 4567"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-slate-800 dark:text-ayur-sand focus:ring-2 focus:ring-ayur-gold focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Preferred Start Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-slate-800 dark:text-ayur-sand focus:ring-2 focus:ring-ayur-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    {type === 'retreat' ? 'Package Duration' : 'Preferred Slot'}
                  </label>
                  <select
                    value={formData.durationOrTime}
                    onChange={(e) => setFormData({ ...formData, durationOrTime: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl glass-input text-xs sm:text-sm text-slate-800 dark:text-ayur-sand focus:ring-2 focus:ring-ayur-gold focus:outline-none"
                  >
                    {type === 'retreat' ? (
                      item.durationOptions?.map((d, i) => (
                        <option key={i} value={d} className="bg-ayur-sand dark:bg-ayur-dark text-slate-800 dark:text-ayur-sand">{d}</option>
                      ))
                    ) : (
                      [
                        '09:30 AM (Morning Pulse)',
                        '11:00 AM (Vaidya Consult)',
                        '02:30 PM (Afternoon Telehealth)',
                        '05:00 PM (Sunset Wellness)'
                      ].map((t, i) => (
                        <option key={i} value={t} className="bg-ayur-sand dark:bg-ayur-dark text-slate-800 dark:text-ayur-sand">{t}</option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Primary Health Goal / Notes
                </label>
                <textarea
                  rows="2"
                  value={formData.specialNotes}
                  onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                  placeholder="e.g. Chronic inflammation, stress relief, detox, dietary restrictions..."
                  className="w-full p-3 rounded-xl glass-input text-xs sm:text-sm text-slate-800 dark:text-ayur-sand focus:ring-2 focus:ring-ayur-gold focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-ayur-gold to-ayur-goldbright text-ayur-dark font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Submitting to Firestore...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Confirm {type === 'retreat' ? 'Retreat Reservation' : 'Doctor Appointment'}</span>
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center space-y-5 py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-2xl font-bold text-ayur-dark dark:text-ayur-sand">
                Booking Confirmed!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Your reservation details have been stored in the live wellness database.
              </p>
            </div>

            <div className="p-4 rounded-2xl glass-panel border border-ayur-gold/30 text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-ayur-gold/15 pb-1.5">
                <span className="text-slate-400">Confirmation ID:</span>
                <span className="font-mono font-bold text-ayur-gold">{confirmedBooking.id}</span>
              </div>
              <div className="flex justify-between border-b border-ayur-gold/15 pb-1.5">
                <span className="text-slate-400">Guest / Patient:</span>
                <span className="font-semibold text-slate-800 dark:text-ayur-sand">{confirmedBooking.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-ayur-gold/15 pb-1.5">
                <span className="text-slate-400">Facility / Physician:</span>
                <span className="font-semibold text-slate-800 dark:text-ayur-sand">{confirmedBooking.targetName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date & Slot:</span>
                <span className="font-semibold text-emerald-400">{confirmedBooking.startDate} ({confirmedBooking.durationOrTime})</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
              A verification confirmation with travel preparation & dietary guidelines has been logged to your email ({confirmedBooking.email}).
            </p>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-ayur-gold text-ayur-dark font-bold text-xs uppercase tracking-wider"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
