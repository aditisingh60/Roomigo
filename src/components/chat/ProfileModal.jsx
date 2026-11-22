import React from 'react';
import {
  X,
  MapPin,
  Sparkles,
  Briefcase,
  GraduationCap,
  IndianRupee,
} from 'lucide-react';
import Button from '../common/Button';

const ProfileModal = ({ profile, isOpen, onClose }) => {
  if (!isOpen || !profile) return null;

  const displayBudget =
    profile.budget ||
    (profile.locationBudget?.maxBudget
      ? `₹${profile.locationBudget.maxBudget.toLocaleString('en-IN')}/mo`
      : '₹18,500/mo');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#242D21]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-[#FAF6EE] rounded-[32px] max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[#556852]/20 shadow-2xl z-10 animate-scaleIn">
        {/* Header Image with Close Button */}
        <div className="relative h-64 bg-[#374435]">
          <img
            src={
              profile.image ||
              (profile.images && profile.images[0]) ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
            }
            alt={profile.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#242D21]/90 via-transparent to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Compatibility badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF6EE]/95 backdrop-blur-md text-[#374435] border border-[#556852]/20 font-bold text-xs shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
              {profile.compatibilityScore || 96}% Vibe Match
            </span>
          </div>

          {/* Overlay details */}
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <h2 className="font-serif text-3xl font-normal tracking-tight">
              {profile.name}, <span className="font-normal text-white/90">{profile.age}</span>
            </h2>
            <div className="flex items-center gap-2 text-xs text-white/90 mt-1">
              {profile.occupationType === 'College student' ? (
                <GraduationCap className="w-3.5 h-3.5 text-[#F7E599]" />
              ) : (
                <Briefcase className="w-3.5 h-3.5 text-[#F7E599]" />
              )}
              <span>{profile.occupation || profile.occupationType}</span>
              {profile.institution && <span>• {profile.institution}</span>}
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Quick stats row */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-[#EBF1EA] p-3.5 rounded-2xl border border-[#556852]/15">
            <div className="flex items-center gap-1.5 text-[#232B20]">
              <MapPin className="w-4 h-4 text-[#556852]" />
              <span className="truncate">{profile.location || 'Bengaluru'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#232B20]">
              <span className="font-bold text-[#232B20]">{displayBudget}</span>
            </div>
          </div>

          {/* Bio */}
          {profile.bio && (
            <div>
              <h4 className="text-[11px] font-bold text-[#556852] uppercase tracking-[0.2em] mb-1.5">
                About Me
              </h4>
              <p className="text-xs sm:text-sm text-[#374435] leading-relaxed">
                "{profile.bio}"
              </p>
            </div>
          )}

          {/* Lifestyle tags */}
          {profile.tags && profile.tags.length > 0 && (
            <div>
              <h4 className="text-[11px] font-bold text-[#556852] uppercase tracking-[0.2em] mb-2">
                Lifestyle & Habits
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {profile.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium bg-[#EBF1EA] text-[#374435] border border-[#556852]/15 px-3 py-1 rounded-full"
                  >
                    ✦ {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action button */}
          <div className="pt-2">
            <Button
              variant="butter"
              size="md"
              onClick={onClose}
              className="w-full text-xs uppercase tracking-[0.2em] font-semibold"
            >
              Continue Conversation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
