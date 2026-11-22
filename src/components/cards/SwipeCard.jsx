import React, { useState, useRef } from 'react';
import {
  MapPin,
  Sparkles,
  Heart,
  X,
  Briefcase,
  GraduationCap,
  Calendar,
  Home,
  ChevronLeft,
  ChevronRight,
  IndianRupee,
} from 'lucide-react';

const SwipeCard = ({
  profile,
  onSwipe,
  isTopCard = true,
  scale = 1,
  translateY = 0,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  // Dragging state
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isExiting, setIsExiting] = useState(null);

  const cardRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });

  const photos = profile.images && profile.images.length > 0 ? profile.images : [profile.image];

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    if (!isTopCard || isExiting) return;
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isTopCard || isExiting) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    setDragOffset({ x: dx, y: dy });
  };

  const handleMouseUp = () => {
    if (!isDragging || !isTopCard) return;
    setIsDragging(false);
    finalizeSwipe(dragOffset.x);
  };

  // Touch drag handlers
  const handleTouchStart = (e) => {
    if (!isTopCard || isExiting) return;
    const touch = e.touches[0];
    setIsDragging(true);
    startPos.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !isTopCard || isExiting) return;
    const touch = e.touches[0];
    const dx = touch.clientX - startPos.current.x;
    const dy = touch.clientY - startPos.current.y;
    setDragOffset({ x: dx, y: dy });
  };

  const handleTouchEnd = () => {
    if (!isDragging || !isTopCard) return;
    setIsDragging(false);
    finalizeSwipe(dragOffset.x);
  };

  const finalizeSwipe = (dx) => {
    const threshold = 90;
    if (dx > threshold) {
      setIsExiting('right');
      setTimeout(() => onSwipe('right', profile), 260);
    } else if (dx < -threshold) {
      setIsExiting('left');
      setTimeout(() => onSwipe('left', profile), 260);
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const rotation = dragOffset.x * 0.08;
  const likeOpacity = Math.min(Math.max(dragOffset.x / 100, 0), 1);
  const passOpacity = Math.min(Math.max(-dragOffset.x / 100, 0), 1);

  const prevPhoto = (e) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  const displayBudget =
    profile.budget ||
    (profile.locationBudget?.maxBudget
      ? `₹${profile.locationBudget.maxBudget.toLocaleString('en-IN')}/mo`
      : '₹18,000/mo');

  return (
    <div
      ref={cardRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: isTopCard
          ? `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) rotate(${rotation}deg)`
          : `scale(${scale}) translateY(${translateY}px)`,
        transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
        touchAction: 'none',
      }}
      className={`absolute inset-0 bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl select-none flex flex-col justify-between ${
        isTopCard ? 'cursor-grab active:cursor-grabbing z-20' : 'pointer-events-none z-10'
      }`}
    >
      {/* Visual Swipe Stamps */}
      {isTopCard && (
        <>
          <div
            style={{ opacity: likeOpacity }}
            className="absolute top-8 left-8 z-30 border-4 border-emerald-500 text-emerald-500 font-black text-2xl sm:text-3xl px-4 py-1.5 rounded-2xl -rotate-12 uppercase tracking-wider backdrop-blur-sm bg-emerald-50/40 pointer-events-none transition-opacity"
          >
            LIKE
          </div>

          <div
            style={{ opacity: passOpacity }}
            className="absolute top-8 right-8 z-30 border-4 border-rose-500 text-rose-500 font-black text-2xl sm:text-3xl px-4 py-1.5 rounded-2xl rotate-12 uppercase tracking-wider backdrop-blur-sm bg-rose-50/40 pointer-events-none transition-opacity"
          >
            PASS
          </div>
        </>
      )}

      {/* Top Image & Gallery Header */}
      <div className="relative h-[55%] sm:h-[58%] w-full bg-slate-900 overflow-hidden">
        <img
          src={photos[photoIndex]}
          alt={profile.name}
          className="w-full h-full object-cover object-center pointer-events-none transition-all duration-300"
          draggable="false"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#252333]/90 via-[#252333]/30 to-transparent pointer-events-none" />

        {/* Compatibility Pill */}
        <div className="absolute top-4 left-4 z-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#7056D8] font-extrabold text-xs shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#FF8BA7]" />
            {profile.compatibilityScore || 95}% Match
          </span>
        </div>

        {/* Photo Indicators */}
        {photos.length > 1 && (
          <div className="absolute top-4 right-4 z-20 flex gap-1.5">
            {photos.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  photoIndex === i ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Photo Nav Arrows */}
        {photos.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
            <button
              onClick={prevPhoto}
              className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center pointer-events-auto backdrop-blur-sm hover:bg-black/60"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextPhoto}
              className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center pointer-events-auto backdrop-blur-sm hover:bg-black/60"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Primary Profile Details in INR */}
        <div className="absolute bottom-4 left-5 right-5 z-20 text-white">
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {profile.name},{' '}
              <span className="font-normal text-white/90 text-2xl">{profile.age}</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-white/90 mt-1 font-medium">
            <span className="flex items-center gap-1">
              {profile.occupationType === 'College student' ? (
                <GraduationCap className="w-3.5 h-3.5 text-[#FF8BA7]" />
              ) : (
                <Briefcase className="w-3.5 h-3.5 text-[#FF8BA7]" />
              )}
              {profile.occupation || profile.occupationType}
              {profile.institution && ` • ${profile.institution}`}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-white/80 mt-1">
            <span className="flex items-center gap-1 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#FF8BA7] flex-shrink-0" />
              {profile.location || profile.locationBudget?.preferredLocality || 'Bengaluru'}
            </span>
            <span className="font-extrabold text-sm text-white bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-lg ml-2 flex-shrink-0">
              {displayBudget}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Profile Details */}
      <div className="p-5 flex-1 overflow-y-auto space-y-4 bg-white text-[#252333]">
        {/* Short Introduction Bio */}
        <div>
          <h4 className="text-xs font-bold text-[#656377] uppercase tracking-wider mb-1">
            About Me
          </h4>
          <p className="text-xs sm:text-sm text-[#252333] leading-relaxed">
            "{profile.bio}"
          </p>
        </div>

        {/* Lifestyle Preferences Pills */}
        <div>
          <h4 className="text-xs font-bold text-[#656377] uppercase tracking-wider mb-1.5">
            Lifestyle Preferences
          </h4>
          <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold text-[#252333]">
            <span className="bg-[#FAF9F6] border border-slate-200/80 px-2.5 py-1 rounded-xl">
              {profile.lifestyle?.smoking === 'No' ? '🚭 Non-smoker' : '🚬 Smoker'}
            </span>
            <span className="bg-[#FAF9F6] border border-slate-200/80 px-2.5 py-1 rounded-xl">
              🍷 {profile.lifestyle?.drinking || 'Occasionally'}
            </span>
            <span className="bg-[#FAF9F6] border border-slate-200/80 px-2.5 py-1 rounded-xl">
              {profile.lifestyle?.sleepSchedule === 'Early bird' ? '🌅 Early Bird' : '🌙 Night Owl'}
            </span>
            <span className="bg-[#FAF9F6] border border-slate-200/80 px-2.5 py-1 rounded-xl">
              ✨ {profile.lifestyle?.cleanliness || 'Very Clean'}
            </span>
            <span className="bg-[#FAF9F6] border border-slate-200/80 px-2.5 py-1 rounded-xl">
              🐾 {profile.lifestyle?.pets || 'Comfortable with pets'}
            </span>
          </div>
        </div>

        {/* Room Preferences */}
        <div>
          <h4 className="text-xs font-bold text-[#656377] uppercase tracking-wider mb-1.5">
            Room Preferences
          </h4>
          <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold text-[#7056D8]">
            <span className="bg-[#F0ECFF] px-2.5 py-1 rounded-xl border border-[#7056D8]/15">
              🏠 {profile.roomPreferences?.bhk || '2 BHK'}
            </span>
            <span className="bg-[#F0ECFF] px-2.5 py-1 rounded-xl border border-[#7056D8]/15">
              🛏️ {profile.roomPreferences?.bedroomType || 'Private bedroom'}
            </span>
            <span className="bg-[#F0ECFF] px-2.5 py-1 rounded-xl border border-[#7056D8]/15">
              🚿 {profile.roomPreferences?.bathroomType || 'Private bathroom'}
            </span>
            <span className="bg-[#F0ECFF] px-2.5 py-1 rounded-xl border border-[#7056D8]/15">
              🛋️ {profile.roomPreferences?.furnishing || 'Furnished'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwipeCard;
