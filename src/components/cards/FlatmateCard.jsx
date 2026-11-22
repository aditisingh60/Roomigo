import React from 'react';
import { MapPin, Sparkles, Heart } from 'lucide-react';
import Button from '../common/Button';

const FlatmateCard = ({
  name = 'Alex Morgan',
  age = 24,
  occupation = 'UX Designer',
  budget = '$950/mo',
  location = 'Williamsburg, Brooklyn',
  compatibilityScore = 95,
  image = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  bio = 'Looking for a tidy, communicative roommate to share a cozy flat.',
  tags = ['Night Owl', 'Clean & Quiet', 'Pet Friendly'],
  onConnect,
}) => {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#7056D8]/20 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Profile Header with Image */}
      <div className="p-5">
        <div className="flex items-start gap-3.5 mb-4">
          <div className="relative flex-shrink-0">
            <img
              src={image}
              alt={name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm ring-2 ring-[#F0ECFF]"
              onError={(e) => {
                // Fallback avatar if external image fails
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div
              style={{ display: 'none' }}
              className="w-16 h-16 rounded-2xl bg-[#F0ECFF] text-[#7056D8] font-bold text-xl items-center justify-center border-2 border-white shadow-sm ring-2 ring-[#F0ECFF]"
            >
              {name.charAt(0)}
            </div>
            <span
              className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"
              title="Active now"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-bold text-[#252333] text-lg truncate">
                {name},{' '}
                <span className="text-[#656377] font-normal text-base">{age}</span>
              </h3>
            </div>
            <p className="text-xs font-medium text-[#7056D8] truncate">{occupation}</p>
            <div className="flex items-center gap-1 text-xs text-[#656377] mt-1 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#7056D8] flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          </div>
        </div>

        {/* Compatibility Match Badge & Budget */}
        <div className="flex items-center justify-between gap-2 mb-3 bg-[#FAF9F6] p-2.5 rounded-xl border border-slate-100">
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F0ECFF] text-[#7056D8]">
            <Sparkles className="w-3 h-3 text-[#7056D8]" />
            {compatibilityScore}% Match
          </span>
          <span className="text-xs font-semibold text-[#252333]">
            Budget: <span className="text-[#7056D8]">{budget}</span>
          </span>
        </div>

        {/* Short Bio */}
        <p className="text-xs text-[#656377] leading-relaxed mb-4 line-clamp-2">
          "{bio}"
        </p>

        {/* Lifestyle Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium bg-[#F0ECFF]/70 text-[#252333] px-2.5 py-0.5 rounded-full border border-[#7056D8]/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-5 py-3.5 bg-[#FAF9F6]/80 border-t border-slate-100 flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          className="flex-1"
          onClick={onConnect}
          icon={Heart}
        >
          Connect
        </Button>
      </div>
    </div>
  );
};

export default FlatmateCard;
