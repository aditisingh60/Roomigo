import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Settings,
  MapPin,
  Sparkles,
  Briefcase,
  GraduationCap,
  Home,
  CheckCircle2,
  Camera,
  Upload,
  Link as LinkIcon,
  X,
  Image as ImageIcon,
} from 'lucide-react';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
];

const Profile = () => {
  const { currentUser, updateProfile } = useAuth();
  const profile = currentUser?.profile || {};

  const profilePic =
    profile.profilePic ||
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80';

  const minB = profile.minBudget ? Number(profile.minBudget).toLocaleString('en-IN') : '12,000';
  const maxB = profile.maxBudget ? Number(profile.maxBudget).toLocaleString('en-IN') : '22,000';

  // Photo upload state & modal
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(profilePic);
  const [urlInput, setUrlInput] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const fileInputRef = useRef(null);

  // Direct file upload handler
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (dataUrl) {
        setSelectedPhoto(dataUrl);
        updateProfile({ profilePic: dataUrl });
        showToast('Profile picture updated successfully! 🌿');
        setPhotoModalOpen(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSavePhotoModal = () => {
    const photoToSave = urlInput.trim() || selectedPhoto;
    updateProfile({ profilePic: photoToSave });
    showToast('Profile picture updated successfully! 🌿');
    setPhotoModalOpen(false);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Hidden file input for direct computer / phone upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Success Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#232B20] text-[#FAF6EE] px-5 py-3 rounded-2xl shadow-2xl border border-[#556852]/30 flex items-center gap-3 animate-fadeIn text-xs sm:text-sm">
          <CheckCircle2 className="w-4 h-4 text-[#F7E599] flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Picture Upload / Change Modal */}
      {photoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#242D21]/60 backdrop-blur-sm"
            onClick={() => setPhotoModalOpen(false)}
          />
          <div className="relative bg-[#FAF6EE] rounded-[32px] p-6 sm:p-8 max-w-md w-full border border-[#556852]/20 shadow-2xl z-10 space-y-6 animate-scaleIn">
            <div className="flex items-center justify-between border-b border-[#556852]/10 pb-4">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#556852]" />
                <h3 className="font-serif text-2xl font-normal text-[#232B20]">
                  Update Your Photo
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPhotoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#EBF1EA] text-[#232B20] flex items-center justify-center hover:bg-[#556852] hover:text-[#FAF6EE] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current Preview */}
            <div className="flex flex-col items-center gap-3">
              <img
                src={selectedPhoto}
                alt="Preview"
                className="w-28 h-28 rounded-3xl object-cover border-4 border-[#FAF6EE] ring-4 ring-[#556852]/20 shadow-lg"
              />
              <span className="text-[11px] uppercase tracking-wider text-[#616E5E] font-medium">
                Photo Preview
              </span>
            </div>

            {/* Option 1: Upload from Device */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-[#556852] uppercase tracking-[0.2em]">
                Option 1: Upload From Computer / Phone
              </label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-[#556852]/30 hover:border-[#556852] bg-white/70 hover:bg-[#EBF1EA]/60 flex items-center justify-center gap-2 text-xs font-semibold text-[#232B20] transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4 text-[#556852]" />
                <span>Choose Image File (JPG, PNG, WebP)</span>
              </button>
            </div>

            {/* Option 2: Choose Curated Avatars */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-[#556852] uppercase tracking-[0.2em]">
                Option 2: Select a Friendly Avatar
              </label>
              <div className="grid grid-cols-6 gap-2">
                {AVATAR_PRESETS.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedPhoto(url);
                      setUrlInput('');
                    }}
                    className={`h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedPhoto === url
                        ? 'border-[#556852] ring-2 ring-[#556852]/40 scale-105'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={url}
                      alt={`Preset ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Option 3: Web URL */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-[#556852] uppercase tracking-[0.2em]">
                Option 3: Paste Photo URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    if (e.target.value.trim()) setSelectedPhoto(e.target.value.trim());
                  }}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 px-3.5 py-2 bg-white border border-[#556852]/25 rounded-xl text-xs text-[#232B20] focus:outline-none focus:ring-1 focus:ring-[#556852]"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center gap-3">
              <Button
                variant="sand"
                size="sm"
                onClick={() => setPhotoModalOpen(false)}
                className="w-1/2 text-xs uppercase tracking-wider"
              >
                Cancel
              </Button>
              <Button
                variant="butter"
                size="sm"
                onClick={handleSavePhotoModal}
                className="w-1/2 text-xs uppercase tracking-wider font-semibold"
              >
                Save Photo
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Header Card */}
      <div className="bg-[#FAF6EE] p-7 sm:p-10 rounded-[32px] border border-[#556852]/20 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-[#556852]/10">
          <div className="flex items-center gap-5">
            {/* Avatar with Camera Overlay Trigger */}
            <div className="relative group cursor-pointer" onClick={() => setPhotoModalOpen(true)}>
              <img
                src={profilePic}
                alt={currentUser?.name}
                className="w-24 h-24 rounded-3xl object-cover border-2 border-[#FAF6EE] ring-4 ring-[#EBF1EA] shadow-md group-hover:opacity-90 transition-opacity"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPhotoModalOpen(true);
                }}
                title="Change profile picture"
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#556852] hover:bg-[#435340] text-[#FAF6EE] flex items-center justify-center border-2 border-[#FAF6EE] shadow-md transition-transform hover:scale-110 cursor-pointer"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#232B20]">
                  {currentUser?.name || profile.name}
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EBF1EA] text-[#374435]">
                  {profile.age || 24} yrs
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-[#556852] mt-1">
                {profile.occupationType === 'College student' ? (
                  <GraduationCap className="w-3.5 h-3.5 text-[#C59B27]" />
                ) : (
                  <Briefcase className="w-3.5 h-3.5 text-[#C59B27]" />
                )}
                <span>
                  {profile.occupation || profile.occupationType || 'Working professional'}
                  {profile.institution && ` @ ${profile.institution}`}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#616E5E]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#556852]" />
                  {profile.preferredLocality || profile.preferredCity || 'Koramangala, Bengaluru'}
                </span>
                <span className="flex items-center gap-1 font-bold text-[#232B20]">
                  ₹{minB} – ₹{maxB} / mo
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Change Photo & Edit Profile */}
          <div className="flex items-center gap-2.5">
            <Button
              variant="butter"
              size="sm"
              icon={Camera}
              onClick={() => setPhotoModalOpen(true)}
              className="text-xs uppercase tracking-wider font-semibold shadow-none"
            >
              Add / Change Picture
            </Button>
            <Link to="/onboarding">
              <Button
                variant="sand"
                size="sm"
                icon={Settings}
                className="border border-[#556852]/25 text-xs uppercase tracking-wider"
              >
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Bio */}
        {profile.bio && (
          <div className="p-4 bg-[#F3ECE0] rounded-2xl border border-[#556852]/10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#556852] block mb-1">
              About Me
            </span>
            <p className="text-xs sm:text-sm text-[#232B20] leading-relaxed">"{profile.bio}"</p>
          </div>
        )}

        {/* Living Habits & Lifestyle */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C59B27]" />
            <h2 className="font-serif text-xl font-normal text-[#232B20]">
              Lifestyle Habits & Preferences
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs sm:text-sm">
            <div className="p-4 bg-white/70 rounded-2xl border border-[#556852]/15">
              <span className="text-[11px] text-[#616E5E] block font-medium mb-1">Smoking</span>
              <span className="font-bold text-[#232B20]">
                {profile.smoking === 'No' ? '🚭 Non-smoker' : '🚬 Smoker'}
              </span>
            </div>

            <div className="p-4 bg-white/70 rounded-2xl border border-[#556852]/15">
              <span className="text-[11px] text-[#616E5E] block font-medium mb-1">Drinking</span>
              <span className="font-bold text-[#232B20]">
                🍷 {profile.drinking || 'Occasionally'}
              </span>
            </div>

            <div className="p-4 bg-white/70 rounded-2xl border border-[#556852]/15">
              <span className="text-[11px] text-[#616E5E] block font-medium mb-1">Sleeping Schedule</span>
              <span className="font-bold text-[#232B20]">
                {profile.sleepSchedule === 'Early bird' ? '🌅 Early Bird' : '🌙 Night Owl'}
              </span>
            </div>

            <div className="p-4 bg-white/70 rounded-2xl border border-[#556852]/15">
              <span className="text-[11px] text-[#616E5E] block font-medium mb-1">Cleanliness</span>
              <span className="font-bold text-[#232B20]">
                ✨ {profile.cleanliness || 'Very Clean'}
              </span>
            </div>

            <div className="p-4 bg-white/70 rounded-2xl border border-[#556852]/15 sm:col-span-2">
              <span className="text-[11px] text-[#616E5E] block font-medium mb-1">Pet Policy</span>
              <span className="font-bold text-[#232B20]">
                🐾 {profile.pets || 'Comfortable with pets'}
              </span>
            </div>
          </div>
        </div>

        {/* Room Preferences */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-[#556852]" />
            <h2 className="font-serif text-xl font-normal text-[#232B20]">
              Room & Apartment Preferences
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm font-medium">
            <div className="p-3.5 bg-[#EBF1EA] rounded-2xl border border-[#556852]/15 text-[#232B20]">
              <span className="text-[10px] text-[#616E5E] block font-normal uppercase tracking-wider">Layout</span>
              {profile.bhk || '2 BHK'}
            </div>
            <div className="p-3.5 bg-[#EBF1EA] rounded-2xl border border-[#556852]/15 text-[#232B20]">
              <span className="text-[10px] text-[#616E5E] block font-normal uppercase tracking-wider">Bedroom</span>
              {profile.bedroomType || 'Private bedroom'}
            </div>
            <div className="p-3.5 bg-[#EBF1EA] rounded-2xl border border-[#556852]/15 text-[#232B20]">
              <span className="text-[10px] text-[#616E5E] block font-normal uppercase tracking-wider">Bathroom</span>
              {profile.bathroomType || 'Private bathroom'}
            </div>
            <div className="p-3.5 bg-[#EBF1EA] rounded-2xl border border-[#556852]/15 text-[#232B20]">
              <span className="text-[10px] text-[#616E5E] block font-normal uppercase tracking-wider">Furnishing</span>
              {profile.furnishing || 'Furnished'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
