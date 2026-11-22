import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Pre-seeded demo user
const DEFAULT_DEMO_USER = {
  id: 'user_demo_1',
  name: 'Alex Johnson',
  email: 'demo@roomigo.com',
  password: 'password123',
  onboardingCompleted: true,
  profile: {
    name: 'Alex Johnson',
    email: 'demo@roomigo.com',
    profilePic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    age: 24,
    gender: 'Non-binary',
    occupationType: 'Working professional',
    institution: 'Spotify',
    occupation: 'UX Designer',
    bio: 'Product designer who loves quiet mornings, specialty pour-overs, and weekend museum walks. Clean and mindful of shared living vibes.',
    // Lifestyle
    smoking: 'No',
    drinking: 'Occasionally',
    sleepSchedule: 'Early bird',
    cleanliness: 'Very Clean',
    pets: 'Comfortable with pets',
    // Room
    bhk: '2 BHK',
    bedroomType: 'Private bedroom',
    bathroomType: 'Private bathroom',
    furnishing: 'Furnished',
    // Location & Budget
    preferredCity: 'New York',
    preferredLocality: 'Williamsburg, Brooklyn',
    minBudget: 1000,
    maxBudget: 1400,
    moveInDate: '2026-12-01',
  },
};

export const AuthProvider = ({ children }) => {
  // Load registered users from localStorage or initialize with demo user
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('roomigo_registered_users');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse registered users from localStorage', e);
    }
    return [DEFAULT_DEMO_USER];
  });

  // Load current session from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('roomigo_current_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse current user from localStorage', e);
    }
    return null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => !!currentUser);

  // Sync registered users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('roomigo_registered_users', JSON.stringify(registeredUsers));
    } catch (e) {
      console.error('Failed to save registered users', e);
    }
  }, [registeredUsers]);

  // Sync current user session to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('roomigo_current_user', JSON.stringify(currentUser));
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('roomigo_current_user');
        setIsAuthenticated(false);
      }
    } catch (e) {
      console.error('Failed to save current user session', e);
    }
  }, [currentUser]);

  // Signup method with password confirmation validation
  const signup = ({ fullName, email, password, confirmPassword }) => {
    if (!fullName || !email || !password) {
      return { success: false, error: 'Please fill in all required fields.' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }
    if (password !== confirmPassword) {
      return { success: false, error: 'Passwords do not match.' };
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = registeredUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (existing) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newUser = {
      id: 'user_' + Date.now(),
      name: fullName.trim(),
      email: normalizedEmail,
      password: password,
      onboardingCompleted: false, // New signup must complete onboarding
      profile: {
        name: fullName.trim(),
        email: normalizedEmail,
        profilePic: '',
        age: 23,
        gender: 'Prefer not to say',
        occupationType: 'Working professional',
        institution: '',
        occupation: '',
        bio: '',
        smoking: 'No',
        drinking: 'Occasionally',
        sleepSchedule: 'Early bird',
        cleanliness: 'Very Clean',
        pets: 'Comfortable with pets',
        bhk: '2 BHK',
        bedroomType: 'Private bedroom',
        bathroomType: 'Private bathroom',
        furnishing: 'Furnished',
        preferredCity: 'New York',
        preferredLocality: 'Williamsburg',
        minBudget: 900,
        maxBudget: 1400,
        moveInDate: '2026-12-01',
      },
    };

    const updatedList = [...registeredUsers, newUser];
    setRegisteredUsers(updatedList);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  // Login method
  const login = (email, password) => {
    const normalizedEmail = email.toLowerCase().trim();
    const user = registeredUsers.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
    );

    if (user) {
      setCurrentUser(user);
      return { success: true, user };
    }

    return { success: false, error: 'Invalid email or password. Please try again.' };
  };

  // Update profile from Onboarding or Settings
  const updateProfile = (profileData) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      name: profileData.name || currentUser.name,
      onboardingCompleted: true,
      profile: {
        ...currentUser.profile,
        ...profileData,
      },
    };

    setCurrentUser(updatedUser);
    setRegisteredUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
    return updatedUser;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('roomigo_current_user');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        signup,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
