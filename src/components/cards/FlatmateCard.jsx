import React from 'react';
import { MapPin, Sparkles, Heart } from 'lucide-react';
import Button from '../common/Button';

const FlatmateCard = ({
  name = 'Ananya Sharma',
  age = 24,
  occupation = 'UX Designer',
  budget = '₹18,500/mo',
  location = 'Koramangala, Bengaluru',
  compatibilityScore = 98,
  image = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  bio = 'Looking for a tidy, communicative roommate to share a cozy 2 BHK in Bengaluru.',
  tags = ['Early Bird', 'Filter Coffee', 'Non-smoker'],
  onConnect,
}) => {
  return (
    <div className="group bg-[#FAF6EE] rounded-[28px] border border-[#556852]/15 shadow-sm hover:shadow-xl hover:border-[#556852]/35 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Profile Header with Image */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-3.5 mb-4">
          <div className="relative flex-shrink-0">
            <img
              src={image}
              alt={name}
              className="w-16 h-16 rounded-2xl object-cover border border-[#556852]/20 shadow-sm"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div
              style={{ display: 'none' }}
              className="w-16 h-16 rounded-2xl bg-[#EBF1EA] text-[#556852] font-serif font-bold text-xl items-center justify-center border border-[#556852]/20"
            >
              {name.charAt(0)}
            </div>
            <span
              className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#556852] border-2 border-[#FAF6EE] rounded-full"
              title="Verified flatmate"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-serif font-normal text-[#232B20] text-xl truncate">
                {name},{' '}
                <span className="text-[#616E5E] font-normal text-base">{age}</span>
              </h3>
            </div>
            <p className="text-xs font-medium text-[#556852] truncate">{occupation}</p>
            <div className="flex items-center gap-1 text-xs text-[#616E5E] mt-1 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#556852] flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          </div>
        </div>

        {/* Compatibility Match Badge & Budget in INR */}
        <div className="flex items-center justify-between gap-2 mb-3 bg-[#F3ECE0] p-2.5 rounded-xl border border-[#556852]/10">
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EBF1EA] text-[#374435]">
            <Sparkles className="w-3 h-3 text-[#C59B27]" />
            {compatibilityScore}% Vibe
          </span>
          <span className="text-xs font-medium text-[#232B20] flex items-center gap-1">
            Budget: <span className="text-[#232B20] font-bold">{budget}</span>
          </span>
        </div>

        {/* Short Bio */}
        <p className="text-xs text-[#616E5E] leading-relaxed mb-4 line-clamp-2">
          "{bio}"
        </p>

        {/* Lifestyle Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium bg-[#EBF1EA] text-[#374435] px-2.5 py-0.5 rounded-full border border-[#556852]/10"
            >
              ✦ {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action Button */}
      <div className="p-5 sm:p-6 pt-0">
        <Button
          variant="sand"
          size="sm"
          onClick={onConnect}
          className="w-full text-xs uppercase tracking-wider border border-[#556852]/25 hover:border-[#556852]"
        >
          View Profile & Connect
        </Button>
      </div>
    </div>
  );
};

export default FlatmateCard;
