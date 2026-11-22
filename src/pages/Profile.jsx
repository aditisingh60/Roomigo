import React from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Settings,
  MapPin,
  Sparkles,
  Calendar,
  Briefcase,
  GraduationCap,
  Home,
  CheckCircle2,
  IndianRupee,
} from 'lucide-react';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { currentUser } = useAuth();
  const profile = currentUser?.profile || {};

  const profilePic =
    profile.profilePic ||
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80';

  const minB = profile.minBudget ? Number(profile.minBudget).toLocaleString('en-IN') : '12,000';
  const maxB = profile.maxBudget ? Number(profile.maxBudget).toLocaleString('en-IN') : '22,000';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Profile Header Card */}
      <div className="bg-[#FAF6EE] p-7 sm:p-10 rounded-[32px] border border-[#556852]/20 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-[#556852]/10">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={profilePic}
                alt={currentUser?.name}
                className="w-24 h-24 rounded-3xl object-cover border-2 border-[#FAF6EE] ring-4 ring-[#EBF1EA] shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#556852] rounded-full border-2 border-[#FAF6EE]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#232B20]">
                  {currentUser?.name || profile.name}
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EBF1EA] text-[#374435]">
                  {profile.age} yrs
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-[#556852] mt-1">
                {profile.occupationType === 'College student' ? (
                  <GraduationCap className="w-3.5 h-3.5 text-[#C59B27]" />
                ) : (
                  <Briefcase className="w-3.5 h-3.5 text-[#C59B27]" />
                )}
                <span>
                  {profile.occupation || profile.occupationType}
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

          <Link to="/onboarding">
            <Button variant="sand" size="sm" icon={Settings} className="border border-[#556852]/25 text-xs uppercase tracking-wider">
              Edit Profile
            </Button>
          </Link>
        </div>

        {/* Bio */}
        {profile.bio && (
          <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-[#656377] block mb-1">
              About Me
            </span>
            <p className="text-sm text-[#252333] leading-relaxed">"{profile.bio}"</p>
          </div>
        )}

        {/* Living Habits & Lifestyle */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#7056D8]" />
            <h2 className="font-extrabold text-[#252333] text-base">
              Lifestyle Habits & Preferences
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-sm">
            <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-slate-100">
              <span className="text-xs text-[#656377] block font-medium mb-1">Smoking</span>
              <span className="font-bold text-[#252333]">
                {profile.smoking === 'No' ? '🚭 Non-smoker' : '🚬 Smoker'}
              </span>
            </div>

            <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-slate-100">
              <span className="text-xs text-[#656377] block font-medium mb-1">Drinking</span>
              <span className="font-bold text-[#252333]">
                🍷 {profile.drinking || 'Occasionally'}
              </span>
            </div>

            <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-slate-100">
              <span className="text-xs text-[#656377] block font-medium mb-1">Sleeping Schedule</span>
              <span className="font-bold text-[#252333]">
                {profile.sleepSchedule === 'Early bird' ? '🌅 Early Bird' : '🌙 Night Owl'}
              </span>
            </div>

            <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-slate-100">
              <span className="text-xs text-[#656377] block font-medium mb-1">Cleanliness</span>
              <span className="font-bold text-[#252333]">
                ✨ {profile.cleanliness || 'Very Clean'}
              </span>
            </div>

            <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-slate-100 sm:col-span-2">
              <span className="text-xs text-[#656377] block font-medium mb-1">Pet Policy</span>
              <span className="font-bold text-[#252333]">
                🐾 {profile.pets || 'Comfortable with pets'}
              </span>
            </div>
          </div>
        </div>

        {/* Room Preferences */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-[#7056D8]" />
            <h2 className="font-extrabold text-[#252333] text-base">
              Room & Apartment Preferences
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm font-semibold">
            <div className="p-3 bg-[#F0ECFF]/60 rounded-xl border border-[#7056D8]/15 text-[#7056D8]">
              <span className="text-[10px] text-[#656377] block font-normal">Layout</span>
              {profile.bhk || '2 BHK'}
            </div>
            <div className="p-3 bg-[#F0ECFF]/60 rounded-xl border border-[#7056D8]/15 text-[#7056D8]">
              <span className="text-[10px] text-[#656377] block font-normal">Bedroom</span>
              {profile.bedroomType || 'Private bedroom'}
            </div>
            <div className="p-3 bg-[#F0ECFF]/60 rounded-xl border border-[#7056D8]/15 text-[#7056D8]">
              <span className="text-[10px] text-[#656377] block font-normal">Bathroom</span>
              {profile.bathroomType || 'Private bathroom'}
            </div>
            <div className="p-3 bg-[#F0ECFF]/60 rounded-xl border border-[#7056D8]/15 text-[#7056D8]">
              <span className="text-[10px] text-[#656377] block font-normal">Furnishing</span>
              {profile.furnishing || 'Furnished'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
