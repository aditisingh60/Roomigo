import React from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Settings,
  MapPin,
  DollarSign,
  Sparkles,
  Calendar,
  Briefcase,
  GraduationCap,
  Home,
  CheckCircle2,
} from 'lucide-react';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { currentUser } = useAuth();
  const profile = currentUser?.profile || {};

  const profilePic =
    profile.profilePic ||
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Profile Header Card */}
      <div className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={profilePic}
                alt={currentUser?.name}
                className="w-24 h-24 rounded-3xl object-cover border-2 border-white ring-4 ring-[#F0ECFF] shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#252333]">
                  {currentUser?.name || profile.name}
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F0ECFF] text-[#7056D8]">
                  {profile.age} yrs
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-[#7056D8] mt-1">
                {profile.occupationType === 'College student' ? (
                  <GraduationCap className="w-3.5 h-3.5 text-[#FF8BA7]" />
                ) : (
                  <Briefcase className="w-3.5 h-3.5 text-[#FF8BA7]" />
                )}
                <span>
                  {profile.occupation || profile.occupationType}
                  {profile.institution && ` @ ${profile.institution}`}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#656377]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#7056D8]" />
                  {profile.preferredLocality || profile.preferredCity || 'New York'}
                </span>
                <span className="flex items-center gap-1 font-bold text-[#252333]">
                  <DollarSign className="w-3.5 h-3.5 text-[#7056D8]" />
                  ${profile.minBudget || 900} – ${profile.maxBudget || 1400} / mo
                </span>
              </div>
            </div>
          </div>

          <Link to="/onboarding">
            <Button variant="outline" size="sm" icon={Settings}>
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
