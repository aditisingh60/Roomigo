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
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-2xl text-center space-y-6 animate-fadeIn relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-tr from-[#7056D8]/20 to-[#FF8BA7]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Animated Brand Emblem */}
        <div className="relative mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#7056D8] via-[#7d64e4] to-[#FF8BA7] p-1 shadow-xl shadow-[#7056D8]/25 animate-bounce-subtle">
          <div className="w-full h-full bg-[#7056D8] rounded-[22px] flex items-center justify-center text-white">
            <Home className="w-10 h-10 stroke-[2.2]" />
          </div>
          <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#FF8BA7] text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Welcome Greeting as specified */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7056D8] bg-[#F0ECFF] px-3.5 py-1 rounded-full border border-[#7056D8]/20">
            Welcome to the community
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#252333] tracking-tight">
            Hey, {username}!
          </h1>
          <p className="text-xl font-bold bg-gradient-to-r from-[#7056D8] to-[#FF8BA7] bg-clip-text text-transparent">
            Welcome to Roomigo.
          </p>
        </div>

        <p className="text-sm text-[#656377] leading-relaxed">
          {needsOnboarding
            ? "Let's set up your personal lifestyle and room preferences to match you with compatible flatmates."
            : "Getting your compatible flatmate matches ready for you..."}
        </p>

        {/* Loading Progress indicator & CTA */}
        <div className="pt-2 space-y-4">
          <div className="w-full bg-[#F0ECFF] h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-[#7056D8] to-[#FF8BA7] h-full rounded-full animate-pulse w-3/4" />
          </div>

          <Button
            variant="primary"
            size="md"
            icon={ArrowRight}
            className="w-full shadow-lg shadow-[#7056D8]/25"
            onClick={() => navigate(needsOnboarding ? '/onboarding' : '/discover')}
          >
            {needsOnboarding ? 'Continue to Onboarding' : 'Go to Discover'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

