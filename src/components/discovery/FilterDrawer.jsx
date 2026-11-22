import React from 'react';
import { X, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';
import Button from '../common/Button';

const FilterDrawer = ({
  isOpen,
  onClose,
  filters,
  setFilters,
  onResetFilters,
  totalResults,
}) => {
  if (!isOpen) return null;

  const update = (key, val) => {
    setFilters((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#252333]/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#F0ECFF] text-[#7056D8] flex items-center justify-center">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-[#252333]">Filters</h2>
                <p className="text-xs text-[#656377]">
                  Showing {totalResults} potential matches
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#656377] hover:text-[#252333] hover:bg-[#FAF9F6] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Controls Scroll Area */}
          <div className="p-6 space-y-6 overflow-y-auto flex-1">
            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-2">
                Location (City or Locality)
              </label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => update('location', e.target.value)}
                placeholder="e.g. Williamsburg, Brooklyn, Manhattan"
                className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7056D8]"
              />
            </div>

            {/* Max Budget Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider">
                  Maximum Rent Budget
                </label>
                <span className="text-xs font-bold text-[#7056D8]">
                  ${filters.maxBudget} / mo
                </span>
              </div>
              <input
                type="range"
                min="600"
                max="2500"
                step="50"
                value={filters.maxBudget}
                onChange={(e) => update('maxBudget', Number(e.target.value))}
                className="w-full accent-[#7056D8] cursor-pointer"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-2">
                Gender
              </label>
              <div className="grid grid-cols-4 gap-2 text-xs font-semibold">
                {['All', 'Female', 'Male', 'Non-binary'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => update('gender', g)}
                    className={`py-2 px-1 rounded-xl border transition-all ${
                      filters.gender === g
                        ? 'bg-[#7056D8] text-white border-[#7056D8]'
                        : 'bg-[#FAF9F6] text-[#252333] border-slate-200 hover:bg-[#F0ECFF]/60'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Student or Working */}
            <div>
              <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-2">
                Student or Working
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                {[
                  { label: 'All', val: 'All' },
                  { label: 'Student', val: 'College student' },
                  { label: 'Working', val: 'Working professional' },
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => update('occupationType', item.val)}
                    className={`py-2 px-1 rounded-xl border transition-all ${
                      filters.occupationType === item.val
                        ? 'bg-[#7056D8] text-white border-[#7056D8]'
                        : 'bg-[#FAF9F6] text-[#252333] border-slate-200 hover:bg-[#F0ECFF]/60'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Age Range */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider">
                  Age Range
                </label>
                <span className="text-xs font-bold text-[#7056D8]">
                  {filters.minAge} – {filters.maxAge} yrs
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  min="18"
                  max={filters.maxAge}
                  value={filters.minAge}
                  onChange={(e) => update('minAge', Number(e.target.value))}
                  className="px-3 py-2 bg-[#FAF9F6] border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-[#7056D8]"
                />
                <input
                  type="number"
                  min={filters.minAge}
                  max="60"
                  value={filters.maxAge}
                  onChange={(e) => update('maxAge', Number(e.target.value))}
                  className="px-3 py-2 bg-[#FAF9F6] border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-[#7056D8]"
                />
              </div>
            </div>

            {/* Smoking Preference */}
            <div>
              <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-2">
                Smoking Preference
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                {['All', 'Non-smoker', 'Smoker'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => update('smoking', s)}
                    className={`py-2 px-1 rounded-xl border transition-all ${
                      filters.smoking === s
                        ? 'bg-[#7056D8] text-white border-[#7056D8]'
                        : 'bg-[#FAF9F6] text-[#252333] border-slate-200 hover:bg-[#F0ECFF]/60'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* 1 BHK / 2 BHK / 3 BHK */}
            <div>
              <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-2">
                Apartment Type
              </label>
              <div className="grid grid-cols-4 gap-2 text-xs font-semibold">
                {['All', '1 BHK', '2 BHK', '3 BHK'].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => update('bhk', b)}
                    className={`py-2 px-1 rounded-xl border transition-all ${
                      filters.bhk === b
                        ? 'bg-[#7056D8] text-white border-[#7056D8]'
                        : 'bg-[#FAF9F6] text-[#252333] border-slate-200 hover:bg-[#F0ECFF]/60'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Shared or Private Room */}
            <div>
              <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-2">
                Room Type
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                {['All', 'Private bedroom', 'Shared bedroom'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => update('bedroomType', r)}
                    className={`py-2 px-1 rounded-xl border transition-all ${
                      filters.bedroomType === r
                        ? 'bg-[#7056D8] text-white border-[#7056D8]'
                        : 'bg-[#FAF9F6] text-[#252333] border-slate-200 hover:bg-[#F0ECFF]/60'
                    }`}
                  >
                    {r.replace(' bedroom', '')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-slate-100 bg-[#FAF9F6] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs font-bold text-[#656377] hover:text-[#252333] flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All
            </button>
            <Button variant="primary" size="md" icon={Check} onClick={onClose}>
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterDrawer;

