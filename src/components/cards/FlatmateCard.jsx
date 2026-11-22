import React from 'react';
import { MapPin, DollarSign, Sparkles } from 'lucide-react';
import Button from '../common/Button';

const FlatmateCard = ({
  name = 'Alex Morgan',
  age = 24,
  occupation = 'UX Designer',
  budget = '$850/mo',
  location = 'Downtown, Brooklyn',
  compatibilityScore = 94,
  tags = ['Night Owl', 'Clean & Quiet', 'Pet Friendly'],
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-lg">
              {name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-base">
                {name}, <span className="text-slate-500 font-normal">{age}</span>
              </h3>
              <p className="text-xs text-slate-500">{occupation}</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Sparkles className="w-3 h-3 text-emerald-500" />
            {compatibilityScore}% Match
          </span>
        </div>

        <div className="space-y-1.5 text-xs text-slate-600 mb-4">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-slate-400" />
            <span>Budget: {budget}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-2 border-t border-slate-100">
        <Button variant="outline" size="sm" className="flex-1">
          Pass
        </Button>
        <Button variant="primary" size="sm" className="flex-1">
          Connect
        </Button>
      </div>
    </div>
  );
};

export default FlatmateCard;

