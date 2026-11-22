import React from 'react';
import {
  X,
  MapPin,
  DollarSign,
  Sparkles,
  Home,
  Briefcase,
  GraduationCap,
  Calendar,
} from 'lucide-react';
import Button from '../common/Button';

const ProfileModal = ({ profile, isOpen, onClose }) => {
  if (!isOpen || !profile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#252333]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200/90 shadow-2xl z-10 animate-scaleIn">
        {/* Header Image with Close Button */}
        <div className="relative h-64 bg-slate-900">
          <img
            src={
              profile.image ||
              (profile.images && profile.images[0]) ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
            }
            alt={profile.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#252333]/90 via-transparent to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Compatibility badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#7056D8] font-extrabold text-xs shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#FF8BA7]" />
              {profile.compatibilityScore || 96}% Match
            </span>
          </div>

          {/* Overlay details */}
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <h2 className="text-2xl font-extrabold tracking-tight">
              {profile.name}, <span className="font-normal text-white/90">{profile.age}</span>
            </h2>
            <div className="flex items-center gap-2 text-xs text-white/90 mt-1">
              {profile.occupationType === 'College student' ? (
                <GraduationCap className="w-3.5 h-3.5 text-[#FF8BA7]" />
              ) : (
                <Briefcase className="w-3.5 h-3.5 text-[#FF8BA7]" />
              )}
              <span>{profile.occupation || profile.occupationType}</span>
              {profile.institution && <span>• {profile.institution}</span>}
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Quick stats row */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-[#FAF9F6] p-3.5 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-1.5 text-[#252333]">
              <MapPin className="w-4 h-4 text-[#7056D8]" />
              <span className="truncate">{profile.location || 'New York'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#252333]">
              <DollarSign className="w-4 h-4 text-[#7056D8]" />
              <span className="font-bold">{profile.budget || `$${profile.locationBudget?.maxBudget || 1200}/mo`}</span>
            </div>
          </div>

          {/* Bio */}
          {profile.bio && (
            <div>
              <h4 className="text-xs font-bold text-[#656377] uppercase tracking-wider mb-1.5">
                About Me
              </h4>
              <p className="text-xs sm:text-sm text-[#252333] leading-relaxed">
                "{profile.bio}"
              </p>
            </div>
          )}

          {/* Lifestyle Preferences */}
          <div>
            <h4 className="text-xs font-bold text-[#656377] uppercase tracking-wider mb-2">
              Lifestyle Habits
            </h4>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-[#252333]">
              <span className="bg-[#F0ECFF] px-3 py-1.5 rounded-xl border border-[#7056D8]/15 text-[#7056D8]">
                {profile.lifestyle?.smoking === 'No' ? '🚭 Non-smoker' : '🚬 Smoker'}
              </span>
              <span className="bg-[#FAF9F6] border border-slate-200 px-3 py-1.5 rounded-xl">
                🍷 {profile.lifestyle?.drinking || 'Occasionally'}
              </span>
              <span className="bg-[#FAF9F6] border border-slate-200 px-3 py-1.5 rounded-xl">
                {profile.lifestyle?.sleepSchedule === 'Early bird' ? '🌅 Early Bird' : '🌙 Night Owl'}
              </span>
              <span className="bg-[#FAF9F6] border border-slate-200 px-3 py-1.5 rounded-xl">
                ✨ {profile.lifestyle?.cleanliness || 'Very Clean'}
              </span>
              <span className="bg-[#FAF9F6] border border-slate-200 px-3 py-1.5 rounded-xl">
                🐾 {profile.lifestyle?.pets || 'Comfortable with pets'}
              </span>
            </div>
          </div>

          {/* Room Preferences */}
          <div>
            <h4 className="text-xs font-bold text-[#656377] uppercase tracking-wider mb-2">
              Room & Apartment Preferences
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <div className="p-2.5 bg-[#FAF9F6] rounded-xl border border-slate-100">
                <span className="text-[10px] text-[#656377] block font-normal">Layout</span>
                🏠 {profile.roomPreferences?.bhk || '2 BHK'}
              </div>
              <div className="p-2.5 bg-[#FAF9F6] rounded-xl border border-slate-100">
                <span className="text-[10px] text-[#656377] block font-normal">Bedroom</span>
                🛏️ {profile.roomPreferences?.bedroomType || 'Private bedroom'}
              </div>
              <div className="p-2.5 bg-[#FAF9F6] rounded-xl border border-slate-100">
                <span className="text-[10px] text-[#656377] block font-normal">Bathroom</span>
                🚿 {profile.roomPreferences?.bathroomType || 'Private bathroom'}
              </div>
              <div className="p-2.5 bg-[#FAF9F6] rounded-xl border border-slate-100">
                <span className="text-[10px] text-[#656377] block font-normal">Furnishing</span>
                🛋️ {profile.roomPreferences?.furnishing || 'Furnished'}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button variant="primary" size="md" onClick={onClose} className="w-full">
              Back to Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;

