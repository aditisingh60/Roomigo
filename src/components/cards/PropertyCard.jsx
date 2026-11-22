import React from 'react';
import { MapPin, Bed, Bath, Home } from 'lucide-react';
import Button from '../common/Button';

const PropertyCard = ({
  title = 'Sunny 2-Bedroom Apartment',
  rent = '$1,200/mo',
  location = 'Greenwich Village, NY',
  beds = 2,
  baths = 1,
  type = 'Private Room',
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between">
      <div className="h-36 bg-slate-100 flex items-center justify-center text-slate-400 border-b border-slate-100">
        <Home className="w-10 h-10 stroke-1" />
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              {type}
            </span>
            <span className="font-bold text-slate-900 text-sm">{rent}</span>
          </div>

          <h3 className="font-semibold text-slate-900 text-sm mb-2">{title}</h3>

          <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{location}</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-600 mb-4">
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-slate-400" /> {beds} Beds
            </span>
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-slate-400" /> {baths} Bath
            </span>
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-full">
          View Details
        </Button>
      </div>
    </div>
  );
};

export default PropertyCard;

