import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  Building,
  Heart,
  SlidersHorizontal,
  MapPin,
  CheckCircle2,
  Clock,
  Home as HomeIcon,
} from 'lucide-react';
import Button from '../components/common/Button';
import FlatmateCard from '../components/cards/FlatmateCard';
import PropertyCard from '../components/cards/PropertyCard';
import { initialUsers } from '../data/users';
import { initialProperties } from '../data/properties';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Functional requirement:
  // "Find Your Flatmate should navigate to /discover if authenticated, otherwise redirect to login."
  const handleFindFlatmate = () => {
    if (isAuthenticated) {
      navigate('/discover');
    } else {
      navigate('/login', { state: { from: '/discover' } });
    }
  };

  // Functional requirement:
  // "Explore Homes should navigate to the property discovery section or page."
  const handleExploreHomes = () => {
    const el = document.getElementById('explore-homes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/discover');
    }
  };

  // Top 3 sample flatmates for featured section
  const featuredFlatmates = initialUsers.slice(0, 3);

  return (
    <div className="space-y-24 md:space-y-32 pb-16">
      {/* =========================================================================
          2. HERO SECTION
          ========================================================================= */}
      <section
        id="hero"
        className="relative pt-6 sm:pt-10 md:pt-14 pb-12 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F0ECFF] border border-[#7056D8]/20 text-[#7056D8] text-xs font-semibold shadow-sm animate-fadeIn">
              <Sparkles className="w-3.5 h-3.5 text-[#7056D8]" />
              <span>Modern Flatmate Discovery & Shared Living</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#252333] tracking-tight leading-[1.12]">
              Find Your Space.{' '}
              <span className="bg-gradient-to-r from-[#7056D8] to-[#FF8BA7] bg-clip-text text-transparent">
                Meet Your People.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg lg:text-xl text-[#656377] max-w-2xl mx-auto leading-relaxed">
              Your next home is more than just four walls. Find a flatmate who matches
              your vibe and a place that feels like home.
            </p>

            {/* Two CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
              <Button
                variant="primary"
                size="lg"
                icon={Sparkles}
                onClick={handleFindFlatmate}
                className="w-full sm:w-auto text-base px-7 py-3.5 shadow-lg shadow-[#7056D8]/25 hover:shadow-xl hover:shadow-[#7056D8]/30 hover:-translate-y-0.5"
              >
                Find Your Flatmate
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={Building}
                onClick={handleExploreHomes}
                className="w-full sm:w-auto text-base px-7 py-3.5 hover:-translate-y-0.5"
              >
                Explore Homes
              </Button>
            </div>

            {/* Social Trust Strip */}
            <div className="pt-3 flex items-center justify-center gap-3 text-xs text-[#656377]">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Member"
                />
                <img
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80"
                  alt="Member"
                />
                <img
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                  alt="Member"
                />
                <img
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Member"
                />
              </div>
              <span>
                Joined by <strong className="text-[#252333] font-semibold">12,000+ flatmates</strong> in NYC & major cities
              </span>
            </div>
          </div>

          {/* Lifestyle Hero Image & Interactive Floating Badges */}
          <div className="mt-12 sm:mt-16 relative max-w-5xl mx-auto">
            {/* Ambient Background Glow */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-gradient-to-r from-[#7056D8]/15 via-[#FF8BA7]/15 to-transparent blur-3xl rounded-full -z-10" />

            {/* Main Lifestyle Photo Frame */}
            <div className="relative rounded-3xl p-2 sm:p-3 bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-2xl shadow-indigo-900/10 overflow-hidden">
              <div className="relative h-[320px] sm:h-[440px] md:h-[500px] w-full rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1600&q=80"
                  alt="Young flatmates enjoying their modern shared apartment"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#252333]/50 via-transparent to-transparent" />
              </div>

              {/* Floating Badge 1 (Top Right): Compatibility */}
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-xl shadow-slate-900/10 flex items-center gap-3 animate-bounce-subtle">
                <div className="w-10 h-10 rounded-xl bg-[#F0ECFF] text-[#7056D8] flex items-center justify-center font-bold text-sm">
                  <Sparkles className="w-5 h-5 text-[#7056D8]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-extrabold text-[#252333]">
                      98% Lifestyle Match
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#656377]">
                    Quiet hours • Pet friendly • Non-smoker
                  </p>
                </div>
              </div>

              {/* Floating Badge 2 (Bottom Left): Location & Flat Preview */}
              <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-xl shadow-slate-900/10 flex items-center gap-3 max-w-[280px] sm:max-w-xs">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7056D8] to-[#FF8BA7] text-white flex items-center justify-center flex-shrink-0">
                  <HomeIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-[#252333] truncate">
                    Brooklyn Sunlit 2BR
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#656377] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#7056D8]" /> Williamsburg • Move-in Oct 1
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. HOW IT WORKS
          ========================================================================= */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7056D8] bg-[#F0ECFF] px-3.5 py-1 rounded-full border border-[#7056D8]/20">
            Simple & Intuitive
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252333]">
            How Roomigo Works
          </h2>
          <p className="text-base text-[#656377]">
            Finding the right roommate shouldn't feel like a gamble. We made it seamless in three steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#7056D8]/30 transition-all duration-300 relative flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-black text-[#F0ECFF] group-hover:text-[#7056D8] transition-colors">
                  01
                </span>
                <div className="w-12 h-12 rounded-2xl bg-[#F0ECFF] text-[#7056D8] flex items-center justify-center shadow-sm">
                  <SlidersHorizontal className="w-6 h-6 stroke-[2]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#252333] mb-3">
                Create Your Profile
              </h3>
              <p className="text-sm text-[#656377] leading-relaxed">
                Tell us about your lifestyle and preferences. Share your sleep schedule, cleanliness, work habits, budget, and neighborhood goals.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#7056D8]">
              <CheckCircle2 className="w-4 h-4" /> 2-minute lifestyle quiz
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#7056D8]/30 transition-all duration-300 relative flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-black text-[#F0ECFF] group-hover:text-[#7056D8] transition-colors">
                  02
                </span>
                <div className="w-12 h-12 rounded-2xl bg-[#FFE5EC] text-[#FF8BA7] flex items-center justify-center shadow-sm">
                  <Heart className="w-6 h-6 stroke-[2]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#252333] mb-3">
                Discover & Match
              </h3>
              <p className="text-sm text-[#656377] leading-relaxed">
                Swipe right on people you would love to live with. Our compatibility engine highlights mutual matches with 90%+ lifestyle alignment.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#FF8BA7]">
              <Sparkles className="w-4 h-4" /> Smart compatibility scoring
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#7056D8]/30 transition-all duration-300 relative flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-black text-[#F0ECFF] group-hover:text-[#7056D8] transition-colors">
                  03
                </span>
                <div className="w-12 h-12 rounded-2xl bg-[#F0ECFF] text-[#7056D8] flex items-center justify-center shadow-sm">
                  <MessageSquare className="w-6 h-6 stroke-[2]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#252333] mb-3">
                Connect & Move In
              </h3>
              <p className="text-sm text-[#656377] leading-relaxed">
                Chat with your match and find your perfect home. Break the ice, schedule coffee or apartment tours, and sign your shared lease with confidence.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#7056D8]">
              <CheckCircle2 className="w-4 h-4" /> Secure in-app chatting
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. WHY ROOMIGO?
          ========================================================================= */}
      <section id="why-roomigo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7056D8] bg-[#F0ECFF] px-3.5 py-1 rounded-full border border-[#7056D8]/20">
            Why Roomigo?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252333]">
            Built For Meaningful Living Companionship
          </h2>
          <p className="text-base text-[#656377]">
            Say goodbye to awkward Craigslist posts and anonymous listings. Roomigo gives you clarity before you commit.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1: Personality-based matching */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#7056D8]/20 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F0ECFF] text-[#7056D8] flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#252333]">
                Personality-Based Matching
              </h3>
              <p className="text-sm text-[#656377] leading-relaxed">
                Compare sleep cycles, cleanliness standards, work-from-home styles, social energy, and guest policies so living together is effortless.
              </p>
            </div>
          </div>

          {/* Feature 2: Location-based discovery */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#7056D8]/20 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFE5EC] text-[#FF8BA7] flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#252333]">
                Location-Based Discovery
              </h3>
              <p className="text-sm text-[#656377] leading-relaxed">
                Search compatible roommates looking in your exact target neighborhoods, subway routes, commute times, and favorite parks.
              </p>
            </div>
          </div>

          {/* Feature 3: Verified User Profiles (Future Feature Badge) */}
          <div className="bg-gradient-to-br from-white to-[#F0ECFF]/30 p-7 rounded-3xl border border-[#7056D8]/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#F0ECFF] text-[#7056D8] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                {/* Future Feature Badge */}
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#7056D8] text-white shadow-sm">
                  <Clock className="w-3 h-3" /> Future Feature
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#252333]">
                Verified User Profiles
              </h3>
              <p className="text-sm text-[#656377] leading-relaxed">
                We are actively building optional government ID and employment verification so you know exactly who you're speaking with before meeting.
              </p>
            </div>
          </div>

          {/* Feature 4: Easy Communication */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#7056D8]/20 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F0ECFF] text-[#7056D8] flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#252333]">
                Easy Communication
              </h3>
              <p className="text-sm text-[#656377] leading-relaxed">
                Direct in-app messaging lets you break the ice, exchange flat preferences, and arrange video calls without sharing personal phone numbers.
              </p>
            </div>
          </div>

          {/* Feature 5: Property Discovery */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#7056D8]/20 transition-all duration-300 flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F0ECFF] text-[#7056D8] flex items-center justify-center">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#252333]">
                Integrated Property Discovery
              </h3>
              <p className="text-sm text-[#656377] leading-relaxed max-w-xl">
                Browse verified available rooms in already occupied apartments or partner up with a prospective flatmate to apply for a brand new multi-bedroom lease together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. FEATURED FLATMATES
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7056D8] bg-[#F0ECFF] px-3.5 py-1 rounded-full border border-[#7056D8]/20">
              Curated Matches
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252333]">
              Featured Flatmates
            </h2>
            <p className="text-base text-[#656377]">
              Real people looking for compatible roommates right now in your city.
            </p>
          </div>
          <Button
            variant="ghost"
            size="md"
            icon={ArrowRight}
            onClick={handleFindFlatmate}
            className="self-start sm:self-auto text-sm font-semibold text-[#7056D8]"
          >
            Browse All Profiles
          </Button>
        </div>

        {/* 3 Sample Flatmate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {featuredFlatmates.map((flatmate) => (
            <FlatmateCard
              key={flatmate.id}
              name={flatmate.name}
              age={flatmate.age}
              occupation={flatmate.occupation}
              budget={flatmate.budget}
              location={flatmate.location}
              compatibilityScore={flatmate.compatibilityScore}
              image={flatmate.image}
              bio={flatmate.bio}
              tags={flatmate.tags}
              onConnect={handleFindFlatmate}
            />
          ))}
        </div>
      </section>

      {/* =========================================================================
          EXPLORE HOMES (PROPERTY DISCOVERY SECTION)
          ========================================================================= */}
      <section id="explore-homes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7056D8] bg-[#F0ECFF] px-3.5 py-1 rounded-full border border-[#7056D8]/20">
              Curated Spaces
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252333]">
              Explore Available Homes & Rooms
            </h2>
            <p className="text-base text-[#656377]">
              Cozy lofts, modern apartments, and private rooms looking for a flatmate.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {initialProperties.map((property) => (
            <PropertyCard
              key={property.id}
              title={property.title}
              rent={property.rent}
              location={property.location}
              beds={property.beds}
              baths={property.baths}
              type={property.type}
              image={property.image}
              amenities={property.amenities}
              onView={() => navigate('/discover')}
            />
          ))}
        </div>
      </section>

      {/* =========================================================================
          6. FINAL CTA
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#7056D8] via-[#6449cf] to-[#5136b6] p-8 sm:p-14 md:p-16 text-center text-white shadow-2xl shadow-[#7056D8]/25">
          {/* Subtle Ambient Decorative Glows */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#FF8BA7]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-2xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-md text-white border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-[#FF8BA7]" /> Your Next Roommate Is Waiting
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Your perfect flatmate is just one match away.
            </h2>

            <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Create your profile in 2 minutes, swipe through compatible lifestyle matches, and start your next shared living adventure.
            </p>

            <div className="pt-2">
              <Link to="/signup">
                <Button
                  variant="white"
                  size="lg"
                  icon={ArrowRight}
                  className="font-bold text-[#7056D8] hover:bg-white/95 px-8 py-4 shadow-xl hover:scale-105 transition-transform"
                >
                  Join Roomigo
                </Button>
              </Link>
            </div>

            <p className="text-xs text-white/60">
              Free to get started • Verified community • No spam
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
