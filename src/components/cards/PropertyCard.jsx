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
    <div className="group bg-[#FAF6EE] rounded-[28px] border border-[#556852]/15 shadow-sm hover:shadow-xl hover:border-[#556852]/35 transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* Property Image with Badge */}
      <div className="relative h-52 bg-[#EBF1EA] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            e.target.src =
              'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute top-3 left-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#FAF6EE]/90 backdrop-blur-md text-[#232B20] border border-[#556852]/15 shadow-sm">
            {type}
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#232B20]/90 backdrop-blur-md text-[#FAF6EE] shadow-sm">
            {rent}
          </span>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-xl text-[#232B20] mb-1.5 line-clamp-1 group-hover:text-[#556852] transition-colors">
            {title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-[#616E5E] mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#556852] flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-[#232B20] pb-3 border-b border-[#556852]/10 mb-3">
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-[#556852]" /> {beds} Beds
            </span>
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-[#556852]" /> {baths} Bath
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {amenities.map((amenity, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium bg-[#EBF1EA] text-[#374435] px-2.5 py-0.5 rounded-full border border-[#556852]/10"
              >
                ✦ {amenity}
              </span>
            ))}
          </div>
        </div>

        <Button
          variant="butter"
          size="sm"
          onClick={onView}
          className="w-full text-xs uppercase tracking-wider"
        >
          View Space
        </Button>
      </div>
    </div>
  );
};

export default PropertyCard;
