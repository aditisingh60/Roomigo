import React, { createContext, useContext, useState } from 'react';

const MatchContext = createContext();

export const MatchProvider = ({ children }) => {
  const [matches, setMatches] = useState([]);
  const [likedProfiles, setLikedProfiles] = useState([]);

  const likeProfile = (profile) => {
    setLikedProfiles((prev) => [...prev, profile]);
  };

  const passProfile = (profileId) => {
    // Logic for passing on a profile
  };

  return (
    <MatchContext.Provider value={{ matches, likedProfiles, likeProfile, passProfile }}>
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

