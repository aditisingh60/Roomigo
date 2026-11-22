import React, { useState, useMemo, useEffect } from 'react';
import {
  Sparkles,
  SlidersHorizontal,
  X,
  Heart,
  RotateCcw,
  Users,
  Compass,
  ArrowRight,
  Filter,
} from 'lucide-react';
import SwipeCard from '../components/cards/SwipeCard';
import FilterDrawer from '../components/discovery/FilterDrawer';
import MatchModal from '../components/discovery/MatchModal';
import Button from '../components/common/Button';
import { initialUsers } from '../data/users';
import { useAuth } from '../context/AuthContext';
import { useMatch } from '../context/MatchContext';

const Discover = () => {
  const { currentUser } = useAuth();
  const {
    likedProfiles,
    passedProfileIds,
    likeProfile,
    passProfile,
    resetPassedProfiles,
    currentMatch,
    clearCurrentMatch,
  } = useMatch();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filters state
  const [filters, setFilters] = useState({
    location: '',
    minAge: 18,
    maxAge: 40,
    gender: 'All',
    occupationType: 'All',
    maxBudget: 2200,
    smoking: 'All',
    bhk: 'All',
    bedroomType: 'All',
  });

  const onResetFilters = () => {
    setFilters({
      location: '',
      minAge: 18,
      maxAge: 40,
      gender: 'All',
      occupationType: 'All',
      maxBudget: 2200,
      smoking: 'All',
      bhk: 'All',
      bedroomType: 'All',
    });
  };

  // Compatibility Calculation Engine
  const calculateCompatibility = (userProfile, candidate) => {
    if (!userProfile) return candidate.compatibilityScore || 90;

    let score = 50;

    // 1. Location match (+20)
    const userCity = (userProfile.preferredCity || '').toLowerCase();
    const candidateCity = (candidate.locationBudget?.preferredCity || candidate.location || '').toLowerCase();
    if (userCity && candidateCity.includes(userCity)) {
      score += 20;
    }

    // 2. Budget compatibility (+15)
    const userMax = userProfile.maxBudget || 1400;
    const candMax = candidate.locationBudget?.maxBudget || 1300;
    if (Math.abs(userMax - candMax) <= 300) {
      score += 15;
    }

    // 3. Room preference (+15)
    if (userProfile.bhk === candidate.roomPreferences?.bhk) score += 8;
    if (userProfile.bedroomType === candidate.roomPreferences?.bedroomType) score += 7;

    // 4. Lifestyle alignment (+15)
    if (userProfile.smoking === candidate.lifestyle?.smoking) score += 5;
    if (userProfile.sleepSchedule === candidate.lifestyle?.sleepSchedule) score += 5;
    if (userProfile.cleanliness === candidate.lifestyle?.cleanliness) score += 5;

    return Math.min(score, 99);
  };

  // Filtered and sorted candidate pool
  const eligibleCandidates = useMemo(() => {
    const userProfile = currentUser?.profile;

    return initialUsers
      // Do not allow users to swipe on their own profile
      .filter((u) => u.id !== currentUser?.id)
      // Avoid showing already-passed profiles repeatedly
      .filter((u) => !passedProfileIds.includes(u.id))
      // Avoid showing already-liked profiles repeatedly
      .filter((u) => !likedProfiles.some((p) => p.id === u.id))
      // Apply user filters
      .filter((u) => {
        // Location filter
        if (filters.location.trim()) {
          const locQuery = filters.location.toLowerCase();
          const candidateLoc = (u.location || u.locationBudget?.preferredLocality || '').toLowerCase();
          if (!candidateLoc.includes(locQuery)) return false;
        }

        // Age filter
        if (u.age < filters.minAge || u.age > filters.maxAge) return false;

        // Gender filter
        if (filters.gender !== 'All' && u.gender !== filters.gender) return false;

        // Student / Working filter
        if (filters.occupationType !== 'All' && u.occupationType !== filters.occupationType) {
          return false;
        }

        // Budget filter
        const candMaxBudget = u.locationBudget?.maxBudget || 1500;
        if (candMaxBudget > filters.maxBudget) return false;

        // Smoking filter
        if (filters.smoking === 'Non-smoker' && u.lifestyle?.smoking !== 'No') return false;
        if (filters.smoking === 'Smoker' && u.lifestyle?.smoking !== 'Yes') return false;

        // BHK filter
        if (filters.bhk !== 'All' && u.roomPreferences?.bhk !== filters.bhk) return false;

        // Bedroom type filter
        if (filters.bedroomType !== 'All' && u.roomPreferences?.bedroomType !== filters.bedroomType) {
          return false;
        }

        return true;
      })
      // Calculate dynamic compatibility score and sort highest first
      .map((u) => ({
        ...u,
        compatibilityScore: calculateCompatibility(userProfile, u),
      }))
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore);
  }, [currentUser, passedProfileIds, likedProfiles, filters]);

  // Handle Swipe Actions (gesture or button clicks)
  const handleSwipe = (direction, candidate) => {
    if (!candidate) return;

    if (direction === 'right') {
      likeProfile(candidate, currentUser);
    } else {
      passProfile(candidate.id);
    }
  };

  // Keyboard navigation (Left Arrow = Pass, Right Arrow = Like)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (eligibleCandidates.length === 0) return;
      const topProfile = eligibleCandidates[0];

      if (e.key === 'ArrowLeft') {
        passProfile(topProfile.id);
      } else if (e.key === 'ArrowRight') {
        likeProfile(topProfile, currentUser);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [eligibleCandidates, currentUser, likeProfile, passProfile]);

  // Active filter count
  const activeFiltersCount = Object.entries(filters).filter(([key, val]) => {
    if (key === 'minAge' && val !== 18) return true;
    if (key === 'maxAge' && val !== 40) return true;
    if (key === 'maxBudget' && val !== 2200) return true;
    if (typeof val === 'string' && val !== '' && val !== 'All') return true;
    return false;
  }).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 space-y-6">
      {/* Header with Title and Filter Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0ECFF] text-[#7056D8] text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FF8BA7]" /> Compatibility Discovery
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#252333] tracking-tight">
            Find Your Roomie
          </h1>
          <p className="text-sm text-[#656377] mt-1">
            People you'll love sharing a home with.
          </p>
        </div>

        {/* Filter Trigger Button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-semibold text-[#252333] hover:border-[#7056D8] hover:text-[#7056D8] transition-all cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#7056D8]" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#7056D8] text-white text-[10px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Swipe Playground */}
      <div className="flex flex-col items-center justify-center pt-2 pb-8">
        {eligibleCandidates.length > 0 ? (
          <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center space-y-6">
            {/* Bumble-Style Card Deck Stack */}
            <div className="relative w-full h-[540px] sm:h-[580px]">
              {eligibleCandidates.slice(0, 3).map((candidate, idx) => {
                const isTop = idx === 0;
                // Underneath cards scaled down and offset for stacked appearance
                const scale = 1 - idx * 0.04;
                const translateY = idx * 10;

                return (
                  <SwipeCard
                    key={candidate.id}
                    profile={candidate}
                    onSwipe={handleSwipe}
                    isTopCard={isTop}
                    scale={scale}
                    translateY={translateY}
                  />
                );
              })}
            </div>

            {/* Like and Pass Action Buttons */}
            <div className="flex items-center justify-center gap-6 pt-2">
              {/* Pass Button */}
              <button
                type="button"
                onClick={() => handleSwipe('left', eligibleCandidates[0])}
                className="w-16 h-16 rounded-full bg-white border border-slate-200/80 shadow-lg hover:shadow-xl text-rose-500 hover:bg-rose-50 hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer group"
                title="Pass (Swipe Left or ←)"
              >
                <X className="w-8 h-8 stroke-[2.5] group-hover:scale-110 transition-transform" />
              </button>

              {/* Reset / Undo passed profiles */}
              <button
                type="button"
                onClick={resetPassedProfiles}
                className="w-11 h-11 rounded-full bg-white border border-slate-200/80 shadow-md hover:shadow-lg text-[#656377] hover:text-[#7056D8] hover:bg-[#F0ECFF] hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                title="Reset passed profiles"
              >
                <RotateCcw className="w-4 h-4 stroke-[2.2]" />
              </button>

              {/* Like Button */}
              <button
                type="button"
                onClick={() => handleSwipe('right', eligibleCandidates[0])}
                className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#7056D8] to-[#FF8BA7] text-white shadow-lg shadow-[#7056D8]/30 hover:shadow-xl hover:shadow-[#7056D8]/40 hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer group"
                title="Like (Swipe Right or →)"
              >
                <Heart className="w-8 h-8 stroke-[2.5] fill-white group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Quick Keyboard Hint */}
            <p className="text-[11px] text-[#656377] text-center hidden sm:block">
              Swipe with mouse or touch • Or press <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border text-[10px]">←</kbd> to Pass, <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border text-[10px]">→</kbd> to Like
            </p>
          </div>
        ) : (
          /* Empty State when all profiles are swiped */
          <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-[#F0ECFF] text-[#7056D8] mx-auto flex items-center justify-center shadow-md">
              <Compass className="w-8 h-8 stroke-[2]" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-[#252333]">
                You're All Caught Up!
              </h3>
              <p className="text-sm text-[#656377]">
                You've reviewed all available flatmates matching your current search criteria.
              </p>
            </div>

            <div className="pt-2 space-y-3">
              <Button
                variant="primary"
                size="md"
                icon={RotateCcw}
                onClick={resetPassedProfiles}
                className="w-full shadow-md shadow-[#7056D8]/20"
              >
                Review Passed Profiles Again
              </Button>

              <Button
                variant="outline"
                size="md"
                icon={SlidersHorizontal}
                onClick={() => setIsFilterOpen(true)}
                className="w-full"
              >
                Broaden Your Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Filter Sliding Drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        onResetFilters={onResetFilters}
        totalResults={eligibleCandidates.length}
      />

      {/* Mutual Match Popup Modal */}
      <MatchModal
        match={currentMatch}
        currentUser={currentUser}
        onClose={clearCurrentMatch}
      />
    </div>
  );
};

export default Discover;
