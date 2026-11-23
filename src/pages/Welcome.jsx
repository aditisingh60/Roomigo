import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Home, ArrowRight, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

const Welcome = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const username = currentUser?.name?.split(' ')[0] || currentUser?.name || 'Friend';
  const needsOnboarding = !currentUser?.onboardingCompleted;

  useEffect(() => {
    // Automatically transition after 2.2 seconds
    const timer = setTimeout(() => {
      if (needsOnboarding) {
        navigate('/onboarding');
      } else {
        navigate('/discover');
      }
    }, 2200);

    return () => clearTimeout(timer);
  }, [needsOnboarding, navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-[#FAF6EE] rounded-[32px] p-8 sm:p-10 border border-[#556852]/20 shadow-2xl text-center space-y-6 animate-fadeIn relative overflow-hidden">
        {/* Animated Brand Emblem */}
        <div className="relative mx-auto w-20 h-20 rounded-full bg-[#EBF1EA] border border-[#556852]/25 p-1 shadow-md flex items-center justify-center">
          <span className="font-serif text-3xl text-[#556852]">❋</span>
          <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#F7E599] text-[#232B20] flex items-center justify-center shadow-sm text-xs">
            ✦
          </span>
        </div>

        {/* Welcome Greeting */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#556852] bg-[#EBF1EA] px-3.5 py-1 rounded-full border border-[#556852]/20">
            Welcome to the sanctuary
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#232B20] tracking-tight">
            Hey, {username}!
          </h1>
          <p className="font-serif text-xl text-[#556852]">
            Welcome to Roomigo.
          </p>
        </div>

        <p className="text-xs sm:text-sm text-[#616E5E] leading-relaxed">
          {needsOnboarding
            ? "Let's curate your personal lifestyle, rhythms, and room preferences to match you with compatible flatmates."
            : "Getting your compatible flatmate sanctuaries ready for you..."}
        </p>

        {/* Loading Progress indicator & CTA */}
        <div className="pt-2 space-y-4">
          <div className="w-full bg-[#EBF1EA] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#556852] h-full rounded-full animate-pulse w-3/4" />
          </div>

          <Button
            variant="butter"
            size="md"
            icon={ArrowRight}
            className="w-full text-xs uppercase tracking-wider font-semibold shadow-none"
            onClick={() => navigate(needsOnboarding ? '/onboarding' : '/discover')}
          >
            {needsOnboarding ? 'Continue to Profile Setup' : 'Go to Discover'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
