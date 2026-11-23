import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUsers } from '../data/users';

const MatchContext = createContext();

export const MatchProvider = ({ children }) => {
  const [likedProfiles, setLikedProfiles] = useState(() => {
    try {
      const saved = localStorage.getItem('roomigo_liked_profiles');
      if (saved !== null) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load liked profiles from localStorage', e);
    }
    // Seed default liked profiles on first launch
    return initialUsers.slice(0, 3);
  });

  const [passedProfileIds, setPassedProfileIds] = useState(() => {
    try {
      const saved = localStorage.getItem('roomigo_passed_ids');
      if (saved !== null) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load passed profile IDs from localStorage', e);
    }
    return [];
  });

  const [matches, setMatches] = useState(() => {
    try {
      const saved = localStorage.getItem('roomigo_matches');
      if (saved !== null) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load matches from localStorage', e);
    }
    // Seed default matches on first launch
    return initialUsers.filter((u) => u.compatibilityScore >= 92).slice(0, 2);
  });

  // Modal state when a mutual match happens
  const [currentMatch, setCurrentMatch] = useState(null);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('roomigo_liked_profiles', JSON.stringify(likedProfiles));
      localStorage.setItem('roomigo_passed_ids', JSON.stringify(passedProfileIds));
      localStorage.setItem('roomigo_matches', JSON.stringify(matches));
    } catch (e) {
      console.error('Failed to sync match state to localStorage', e);
    }
  }, [likedProfiles, passedProfileIds, matches]);

  const likeProfile = (profile, currentUser) => {
    if (!profile) return;

    // Add to liked profiles if not already added
    if (!likedProfiles.some((p) => p.id === profile.id)) {
      setLikedProfiles((prev) => [...prev, profile]);
    }

    // Simulate Bumble mutual match:
    // If compatibility score >= 90% or profile has matched tag, trigger mutual match!
    const isMutualMatch =
      profile.compatibilityScore >= 90 ||
      profile.id === 'u1' ||
      profile.id === 'u2' ||
      profile.id === 'u3' ||
      Math.random() > 0.35;

    if (isMutualMatch && !matches.some((m) => m.id === profile.id)) {
      setMatches((prev) => [...prev, profile]);
      setCurrentMatch(profile);
    }
  };

  const removeMatch = (profileId) => {
    if (!profileId) return;
    setMatches((prev) => prev.filter((m) => m.id !== profileId));
  };

  const removeLikedProfile = (profileId) => {
    if (!profileId) return;
    setLikedProfiles((prev) => prev.filter((p) => p.id !== profileId));
  };

  const passProfile = (profileId) => {
    if (!profileId) return;
    setPassedProfileIds((prev) =>
      prev.includes(profileId) ? prev : [...prev, profileId]
    );
  };

  const resetPassedProfiles = () => {
    setPassedProfileIds([]);
    localStorage.removeItem('roomigo_passed_ids');
  };

  const clearCurrentMatch = () => {
    setCurrentMatch(null);
  };

  return (
    <MatchContext.Provider
      value={{
        likedProfiles,
        passedProfileIds,
        matches,
        currentMatch,
        likeProfile,
        removeMatch,
        removeLikedProfile,
        passProfile,
        resetPassedProfiles,
        clearCurrentMatch,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};

export const useMatch = () => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error('useMatch must be used within a MatchProvider');
  }
  return context;
};

export default MatchContext;
