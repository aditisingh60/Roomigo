import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Sparkles,
  Home,
  MapPin,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  Check,
  Camera,
  Briefcase,
  GraduationCap,
  Calendar,
  Smile,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

// Avatar presets so the user can easily pick an aesthetic photo in 1 click
const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
];

const Onboarding = () => {
  const { currentUser, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  // Form state pre-populated from current user
  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    profilePic: currentUser?.profile?.profilePic || AVATAR_PRESETS[0],
    name: currentUser?.name || currentUser?.profile?.name || '',
    age: currentUser?.profile?.age || 24,
    gender: currentUser?.profile?.gender || 'Female',
    occupationType: currentUser?.profile?.occupationType || 'Working professional',
    institution: currentUser?.profile?.institution || '',
    occupation: currentUser?.profile?.occupation || 'Product Designer',
    bio:
      currentUser?.profile?.bio ||
      'Looking for a tidy, communicative roommate who values good vibes, personal space, and weekend coffee.',

    // Step 2: Lifestyle Preferences
    smoking: currentUser?.profile?.smoking || 'No',
    drinking: currentUser?.profile?.drinking || 'Occasionally',
    sleepSchedule: currentUser?.profile?.sleepSchedule || 'Early bird',
    cleanliness: currentUser?.profile?.cleanliness || 'Very Clean',
    pets: currentUser?.profile?.pets || 'Comfortable with pets',

    // Step 3: Room Preferences
    bhk: currentUser?.profile?.bhk || '2 BHK',
    bedroomType: currentUser?.profile?.bedroomType || 'Private bedroom',
    bathroomType: currentUser?.profile?.bathroomType || 'Private bathroom',
    furnishing: currentUser?.profile?.furnishing || 'Furnished',

    // Step 4: Location & Budget
    preferredCity: currentUser?.profile?.preferredCity || 'New York',
    preferredLocality: currentUser?.profile?.preferredLocality || 'Williamsburg, Brooklyn',
    minBudget: currentUser?.profile?.minBudget || 900,
    maxBudget: currentUser?.profile?.maxBudget || 1400,
    moveInDate: currentUser?.profile?.moveInDate || '2026-12-01',
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(formData);
    navigate('/discover');
  };

  const stepTitles = [
    { num: 1, title: 'Personal Details', subtitle: 'Tell us who you are' },
    { num: 2, title: 'Lifestyle Preferences', subtitle: 'How you like to live' },
    { num: 3, title: 'Room Preferences', subtitle: 'Your ideal shared home' },
    { num: 4, title: 'Location & Budget', subtitle: 'Where and how much' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Progress Header */}
      <div className="mb-8 space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0ECFF] text-[#7056D8] text-xs font-bold border border-[#7056D8]/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Profile Onboarding • Step {currentStep} of 4</span>
        </div>

        <h1 className="text-3xl font-extrabold text-[#252333]">
          {stepTitles[currentStep - 1].title}
        </h1>
        <p className="text-sm text-[#656377]">
          {stepTitles[currentStep - 1].subtitle}
        </p>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto pt-2">
          <div className="w-full bg-[#F0ECFF] h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#7056D8] to-[#FF8BA7] h-full rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-semibold text-[#656377] mt-2">
            <span>Details</span>
            <span>Lifestyle</span>
            <span>Room</span>
            <span>Location & Budget</span>
          </div>
        </div>
      </div>

      {/* Main Multi-Step Form Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-6 sm:p-10">
        {/* STEP 1: PERSONAL DETAILS */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Profile Picture Picker */}
            <div>
              <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-2">
                Profile Picture
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="relative">
                  <img
                    src={formData.profilePic}
                    alt="Profile Preview"
                    className="w-24 h-24 rounded-3xl object-cover border-2 border-white ring-4 ring-[#F0ECFF] shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#7056D8] rounded-full flex items-center justify-center text-white shadow-sm">
                    <Camera className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex-1 w-full space-y-2">
                  <p className="text-xs text-[#656377]">
                    Choose an avatar or paste a custom photo URL:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {AVATAR_PRESETS.map((picUrl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => updateField('profilePic', picUrl)}
                        className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                          formData.profilePic === picUrl
                            ? 'border-[#7056D8] ring-2 ring-[#7056D8]/30 scale-105'
                            : 'border-slate-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={picUrl} alt={`Preset ${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                  <input
                    type="url"
                    value={formData.profilePic}
                    onChange={(e) => updateField('profilePic', e.target.value)}
                    placeholder="https://example.com/your-photo.jpg"
                    className="w-full px-3 py-1.5 text-xs bg-[#FAF9F6] border border-slate-200 rounded-lg text-[#252333] focus:outline-none focus:ring-1 focus:ring-[#7056D8]"
                  />
                </div>
              </div>
            </div>

            {/* Name & Age */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Maya Lin"
                  className="w-full px-4 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7056D8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-1.5">
                  Age
                </label>
                <input
                  type="number"
                  min="18"
                  max="99"
                  required
                  value={formData.age}
                  onChange={(e) => updateField('age', Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7056D8]"
                />
              </div>
            </div>

            {/* Gender Selection */}
            <div>
              <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-2">
                Gender
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {['Female', 'Male', 'Non-binary', 'Prefer not to say'].map((gen) => (
                  <button
                    key={gen}
                    type="button"
                    onClick={() => updateField('gender', gen)}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      formData.gender === gen
                        ? 'bg-[#7056D8] text-white border-[#7056D8] shadow-sm'
                        : 'bg-[#FAF9F6] text-[#252333] border-slate-200 hover:bg-[#F0ECFF]/60'
                    }`}
                  >
                    {gen}
                  </button>
                ))}
              </div>
            </div>

            {/* Student vs Working Professional */}
            <div>
              <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-2">
                Are you a Student or Working Professional?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => updateField('occupationType', 'College student')}
                  className={`p-4 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer text-left ${
                    formData.occupationType === 'College student'
                      ? 'border-[#7056D8] bg-[#F0ECFF]/50 ring-2 ring-[#7056D8]/20'
                      : 'border-slate-200 bg-[#FAF9F6] hover:bg-slate-50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#7056D8]">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#252333]">College Student</p>
                    <p className="text-xs text-[#656377]">Undergrad, grad, or exchange</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => updateField('occupationType', 'Working professional')}
                  className={`p-4 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer text-left ${
                    formData.occupationType === 'Working professional'
                      ? 'border-[#7056D8] bg-[#F0ECFF]/50 ring-2 ring-[#7056D8]/20'
                      : 'border-slate-200 bg-[#FAF9F6] hover:bg-slate-50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#7056D8]">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#252333]">Working Professional</p>
                    <p className="text-xs text-[#656377]">Full-time, remote, or freelance</p>
                  </div>
                </button>
              </div>
            </div>

            {/* College or Company Name + Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-1.5">
                  {formData.occupationType === 'College student' ? 'College / University Name' : 'Company Name'}
                </label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => updateField('institution', e.target.value)}
                  placeholder={formData.occupationType === 'College student' ? 'NYU / Columbia' : 'Stripe / Google'}
                  className="w-full px-4 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7056D8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-1.5">
                  {formData.occupationType === 'College student' ? 'Field of Study' : 'Job Title'}
                </label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => updateField('occupation', e.target.value)}
                  placeholder="UX Researcher"
                  className="w-full px-4 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7056D8]"
                />
              </div>
            </div>

            {/* Short Bio */}
            <div>
              <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-1.5">
                Short Bio & Introduction
              </label>
              <textarea
                rows="3"
                value={formData.bio}
                onChange={(e) => updateField('bio', e.target.value)}
                placeholder="Share your interests, weekend routine, and what makes you a great roommate..."
                className="w-full px-4 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7056D8]"
              />
            </div>
          </div>
        )}

        {/* STEP 2: LIFESTYLE PREFERENCES */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Smoking */}
            <div>
              <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-2">
                Smoking
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['No', 'Yes'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => updateField('smoking', opt)}
                    className={`p-3.5 rounded-2xl border text-sm font-semibold transition-all cursor-pointer ${
                      formData.smoking === opt
                        ? 'bg-[#7056D8] text-white border-[#7056D8] shadow-sm'
                        : 'bg-[#FAF9F6] text-[#252333] border-slate-200 hover:bg-[#F0ECFF]/60'
                    }`}
                  >
                    {opt === 'No' ? '🚭 Non-smoker' : '🚬 Smoker'}
                  </button>
                ))}
              </div>
            </div>

            {/* Drinking */}
            <div>
              <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-2">
                Drinking
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['No', 'Occasionally', 'Yes'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => updateField('drinking', opt)}
                    className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      formData.drinking === opt
                        ? 'bg-[#7056D8] text-white border-[#7056D8] shadow-sm'
                        : 'bg-[#FAF9F6] text-[#252333] border-slate-200 hover:bg-[#F0ECFF]/60'
                    }`}
                  >
                    {opt === 'No' && '🚫 Non-drinker'}
                    {opt === 'Occasionally' && '🍷 Occasionally'}
                    {opt === 'Yes' && '🍻 Regular'}
                  </button>
                ))}
              </div>
            </div>

            {/* Sleeping Schedule */}
            <div>
              <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-2">
                Sleeping Schedule
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Early bird', 'Night owl'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => updateField('sleepSchedule', opt)}
                    className={`p-3.5 rounded-2xl border text-sm font-semibold transition-all cursor-pointer ${
                      formData.sleepSchedule === opt
                        ? 'bg-[#7056D8] text-white border-[#7056D8] shadow-sm'
                        : 'bg-[#FAF9F6] text-[#252333] border-slate-200 hover:bg-[#F0ECFF]/60'
                    }`}
                  >
                    {opt === 'Early bird' ? '🌅 Early Bird (Up before 8 AM)' : '🌙 Night Owl (Up past midnight)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Cleanliness Preference */}
            <div>
              <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-2">
                Cleanliness Preference
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['Very Clean', 'Moderate', 'Relaxed'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => updateField('cleanliness', opt)}
                    className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      formData.cleanliness === opt
                        ? 'bg-[#7056D8] text-white border-[#7056D8] shadow-sm'
                        : 'bg-[#FAF9F6] text-[#252333] border-slate-200 hover:bg-[#F0ECFF]/60'
                    }`}
                  >
                    {opt === 'Very Clean' && '✨ Very Clean'}
                    {opt === 'Moderate' && '🧹 Moderate'}
                    {opt === 'Relaxed' && '🛋️ Relaxed'}
                  </button>
                ))}
              </div>
            </div>

            {/* Pets */}
            <div>
              <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-2">
                Pets
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['No', 'Comfortable with pets', 'Yes'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => updateField('pets', opt)}
                    className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      formData.pets === opt
                        ? 'bg-[#7056D8] text-white border-[#7056D8] shadow-sm'
                        : 'bg-[#FAF9F6] text-[#252333] border-slate-200 hover:bg-[#F0ECFF]/60'
                    }`}
                  >
                    {opt === 'No' && '🚫 No Pets'}
                    {opt === 'Comfortable with pets' && '🐾 Pet Friendly'}
                    {opt === 'Yes' && '🐕 I Have a Pet'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: ROOM PREFERENCES */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            {/* 1 BHK / 2 BHK / 3 BHK */}
            <div>
              <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-2">
                Preferred Apartment Layout
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['1 BHK', '2 BHK', '3 BHK'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => updateField('bhk', opt)}
                    className={`p-3.5 rounded-2xl border text-sm font-semibold transition-all cursor-pointer ${
                      formData.bhk === opt
                        ? 'bg-[#7056D8] text-white border-[#7056D8] shadow-sm'
                        : 'bg-[#FAF9F6] text-[#252333] border-slate-200 hover:bg-[#F0ECFF]/60'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Shared bedroom / Private bedroom */}
            <div>
              <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-2">
                Bedroom Preference
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Private bedroom', 'Shared bedroom'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => updateField('bedroomType', opt)}
                    className={`p-3.5 rounded-2xl border text-sm font-semibold transition-all cursor-pointer ${
                      formData.bedroomType === opt
                        ? 'bg-[#7056D8] text-white border-[#7056D8] shadow-sm'
                        : 'bg-[#FAF9F6] text-[#252333] border-slate-200 hover:bg-[#F0ECFF]/60'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Shared bathroom / Private bathroom */}
            <div>
              <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-2">
                Bathroom Preference
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Private bathroom', 'Shared bathroom'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => updateField('bathroomType', opt)}
                    className={`p-3.5 rounded-2xl border text-sm font-semibold transition-all cursor-pointer ${
                      formData.bathroomType === opt
                        ? 'bg-[#7056D8] text-white border-[#7056D8] shadow-sm'
                        : 'bg-[#FAF9F6] text-[#252333] border-slate-200 hover:bg-[#F0ECFF]/60'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Furnished / Semi-furnished / Unfurnished */}
            <div>
              <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-2">
                Furnishing Status
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['Furnished', 'Semi-furnished', 'Unfurnished'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => updateField('furnishing', opt)}
                    className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      formData.furnishing === opt
                        ? 'bg-[#7056D8] text-white border-[#7056D8] shadow-sm'
                        : 'bg-[#FAF9F6] text-[#252333] border-slate-200 hover:bg-[#F0ECFF]/60'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: LOCATION AND BUDGET */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Preferred City */}
            <div>
              <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-1.5">
                Preferred City
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#7056D8] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={formData.preferredCity}
                  onChange={(e) => updateField('preferredCity', e.target.value)}
                  placeholder="New York, NY"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7056D8]"
                />
              </div>
            </div>

            {/* Preferred Locality */}
            <div>
              <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-1.5">
                Preferred Locality / Neighborhoods
              </label>
              <input
                type="text"
                required
                value={formData.preferredLocality}
                onChange={(e) => updateField('preferredLocality', e.target.value)}
                placeholder="Williamsburg, Lower East Side, Brooklyn..."
                className="w-full px-4 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7056D8]"
              />
            </div>

            {/* Monthly Rent Budget (Min & Max) */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider">
                  Monthly Rent Budget Range
                </label>
                <span className="text-xs font-bold text-[#7056D8]">
                  ${formData.minBudget} – ${formData.maxBudget} / mo
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-[#656377] block mb-1">Min Budget ($)</span>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-[#656377] absolute left-3.5 top-3.5" />
                    <input
                      type="number"
                      step="50"
                      value={formData.minBudget}
                      onChange={(e) => updateField('minBudget', Number(e.target.value))}
                      className="w-full pl-9 pr-3 py-2 bg-[#FAF9F6] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7056D8]"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-xs text-[#656377] block mb-1">Max Budget ($)</span>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-[#656377] absolute left-3.5 top-3.5" />
                    <input
                      type="number"
                      step="50"
                      value={formData.maxBudget}
                      onChange={(e) => updateField('maxBudget', Number(e.target.value))}
                      className="w-full pl-9 pr-3 py-2 bg-[#FAF9F6] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7056D8]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Move-in Date */}
            <div>
              <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-1.5">
                Target Move-In Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-[#656377] absolute left-3.5 top-3.5" />
                <input
                  type="date"
                  value={formData.moveInDate}
                  onChange={(e) => updateField('moveInDate', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7056D8]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Wizard Navigation Actions */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="outline"
              size="md"
              icon={ArrowLeft}
              onClick={handlePrev}
            >
              Previous
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <Button
              type="button"
              variant="primary"
              size="md"
              icon={ArrowRight}
              onClick={handleNext}
              className="shadow-md shadow-[#7056D8]/20"
            >
              Continue to Step {currentStep + 1}
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              size="lg"
              icon={Check}
              onClick={handleSaveProfile}
              className="shadow-lg shadow-[#7056D8]/30 font-bold"
            >
              Save Profile & Start Discovering
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

