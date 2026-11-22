import React from 'react';
import { MapPin, Bed, Bath } from 'lucide-react';
import Button from '../common/Button';

const PropertyCard = ({
  title = 'Sunny 2 BHK with Balcony & Modular Kitchen',
  rent = '₹18,500/mo',
  location = 'Koramangala, Bengaluru',
  beds = 2,
  baths = 2,
  type = 'Private Room in 2 BHK',
  image = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
  amenities = ['Power Backup', 'Modular Kitchen', 'Wi-Fi 300 Mbps'],
  onView,
}) => {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#7056D8]/20 transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* Property Image with Badge */}
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src =
              'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute top-3 left-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#7056D8] shadow-sm">
            {type}
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="text-sm font-bold px-3 py-1 rounded-full bg-[#252333]/90 backdrop-blur-md text-white shadow-sm">
            {rent}
          </span>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-[#252333] text-base mb-1.5 line-clamp-1 group-hover:text-[#7056D8] transition-colors">
            {title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-[#656377] mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#7056D8] flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-[#252333] pb-3 border-b border-slate-100 mb-3">
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-[#7056D8]" /> {beds} Beds
            </span>
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-[#7056D8]" /> {baths} Bath
            </span>
          </div>

          {/* Amenities tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-[#FAF9F6] text-[#656377] px-2 py-0.5 rounded-md border border-slate-100"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full group-hover:bg-[#F0ECFF] group-hover:text-[#7056D8] group-hover:border-[#7056D8]/20"
          onClick={onView}
        >
          Explore Space
        </Button>
      </div>
    </div>
  );
};

export default PropertyCard;
