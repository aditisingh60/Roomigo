import React, { useState } from 'react';
import { User, Settings, Shield, MapPin, DollarSign, Sparkles } from 'lucide-react';
import Button from '../components/common/Button';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    occupation: 'Software Developer',
    budget: '$1,000/mo',
    preferredLocation: 'Brooklyn / Lower Manhattan',
    lifestyle: {
      sleepSchedule: 'Night Owl (12 AM - 8 AM)',
      cleanliness: 'Very Clean',
      workStyle: 'Hybrid (3 days WFH)',
      pets: 'Pet Friendly',
      smoking: 'Non-smoker',
    },
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 text-white font-bold text-2xl flex items-center justify-center shadow-md">
              {profile.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">{profile.name}</h1>
              <p className="text-sm text-slate-500">{profile.occupation}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {profile.preferredLocation}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-slate-400" />
                  {profile.budget}
                </span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" icon={Settings}>
            Edit Profile
          </Button>
        </div>

        {/* Lifestyle Preferences */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h2 className="font-semibold text-slate-900 text-sm">
              Roommate Preferences & Lifestyle Habits
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-xs text-slate-400 block font-medium">Sleep Schedule</span>
              <span className="font-semibold text-slate-800">{profile.lifestyle.sleepSchedule}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-xs text-slate-400 block font-medium">Cleanliness Level</span>
              <span className="font-semibold text-slate-800">{profile.lifestyle.cleanliness}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-xs text-slate-400 block font-medium">Work Routine</span>
              <span className="font-semibold text-slate-800">{profile.lifestyle.workStyle}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-xs text-slate-400 block font-medium">Pet Policy</span>
              <span className="font-semibold text-slate-800">{profile.lifestyle.pets}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 sm:col-span-2">
              <span className="text-xs text-slate-400 block font-medium">Smoking Policy</span>
              <span className="font-semibold text-slate-800">{profile.lifestyle.smoking}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

