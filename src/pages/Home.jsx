import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  MapPin,
  Heart,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  IndianRupee,
  Coffee,
  Sun,
  Smile,
  Compass,
} from 'lucide-react';
import Button from '../components/common/Button';
import FlatmateCard from '../components/cards/FlatmateCard';
import { initialUsers } from '../data/users';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Curated Spaces Carousel State
  const curatedSpaces = [
    {
      id: 1,
      name: 'Full Moon Koramangala',
      city: 'Bengaluru',
      locality: 'Koramangala 4th Block',
      rent: '₹18,500',
      type: 'Private Balcony Room in 3 BHK',
      image:
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      subtitle: 'Unleash your inner calm under leafy green canopies and gentle morning light.',
      description:
        'This sanctuary guides you into peaceful routines, deep creative focus, and harmonious co-living with high ceilings, private bathroom, modular kitchen, and curated flatmate matching.',
      amenities: ['Private Balcony', 'High-Speed Wi-Fi', 'Power Backup', 'Gated Security'],
    },
    {
      id: 2,
      name: 'The Indiranagar Glasshouse',
      city: 'Bengaluru',
      locality: '100ft Road, Indiranagar',
      rent: '₹22,000',
      type: 'Master Suite in Penthouse',
      image:
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      subtitle: 'Where natural light meets vibrant city energy in Bengaluru’s cultural core.',
      description:
        'Floor-to-ceiling glass windows overlooking rain trees, a terrace garden for sunset chai, dedicated standing desks, and a warm community of designers and tech founders.',
      amenities: ['Terrace Garden', 'Bathtub Suite', 'Modular Kitchen', 'Daily Housekeeping'],
    },
    {
      id: 3,
      name: 'Bandra Sea Breeze Loft',
      city: 'Mumbai',
      locality: 'Pali Hill, Bandra West',
      rent: '₹26,000',
      type: 'Sunlit Private Room',
      image:
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      subtitle: 'Wake up to coastal breezes, heritage charm, and mindful quiet in Bandra.',
      description:
        'A warm art-deco apartment with lime-washed walls, spacious private study room, walk-in closet, and close proximity to yoga studios, organic cafés, and Bandstand.',
      amenities: ['Sea View Balcony', 'Vintage Study', 'Fully Furnished', 'Water Purifier'],
    },
    {
      id: 4,
      name: 'The HSR Layout Sunroom',
      city: 'Bengaluru',
      locality: 'Sector 2, HSR Layout',
      rent: '₹16,500',
      type: 'Private Room in 2 BHK',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      subtitle: 'Thoughtful minimalism crafted for focus, restful sleep, and morning routines.',
      description:
        'Spacious bedroom with wooden flooring, ergonomic workstation, double-glazed soundproof windows, and a friendly flatmate who loves weekend cooking and filter coffee.',
      amenities: ['Ergonomic Setup', 'High Speed Fibre', 'Kitchen Access', 'Parking'],
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % curatedSpaces.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + curatedSpaces.length) % curatedSpaces.length);
  };

  const handleStartNow = () => {
    if (isAuthenticated) {
      navigate('/discover');
    } else {
      navigate('/signup');
    }
  };

  const handleExploreSpaces = () => {
    const el = document.getElementById('explore-spaces');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/discover');
    }
  };

  const featuredFlatmates = initialUsers.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* =========================================================================
          1. HERO SECTION: 3-IMAGE CURVED COLLAGE & EDITORIAL INTRO
          ========================================================================= */}
      <section className="pt-6 sm:pt-10 px-4 sm:px-6 lg:px-10 max-w-6xl mx-auto">
        {/* 3-Image Aesthetic Collage */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center">
          {/* Left Vertical Image: Coastal / Nature Nook */}
          <div className="md:col-span-3 hidden md:block">
            <div className="relative h-[360px] lg:h-[420px] rounded-[32px] overflow-hidden shadow-md group">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                alt="Tranquil natural coastline and tropical greenery"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>
          </div>

          {/* Center Image: Roommates Laughing in Sunlight + Rotating Flower Badge */}
          <div className="md:col-span-6 relative">
            <div className="relative h-[340px] sm:h-[400px] lg:h-[450px] rounded-[36px] overflow-hidden shadow-xl border-4 border-[#FAF6EE] group">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80"
                alt="Warm group of friends laughing together in sunlit nature"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>

            {/* Aesthetic Rotating Floral Stamp Badge Inspired by Screenshot */}
            <div className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:-right-4 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#556852] text-[#F7E599] p-1 shadow-xl flex items-center justify-center border-4 border-[#FAF6EE] select-none pointer-events-none">
              <div className="relative w-full h-full flex items-center justify-center">
                <svg
                  className="w-full h-full animate-spin-slow"
                  viewBox="0 0 100 100"
                >
                  <path
                    id="stampCircle"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[10px] uppercase font-bold tracking-[0.24em] fill-[#FAF6EE]">
                    <textPath xlinkHref="#stampCircle">
                      ✦ ROOMIGO ✦ SOULFUL LIVING ✦
                    </textPath>
                  </text>
                </svg>
                {/* Center 8-petal daisy icon */}
                <span className="absolute text-xl sm:text-2xl text-[#F7E599]">❋</span>
              </div>
            </div>
          </div>

          {/* Right Vertical Image: Scenic Mountain / Terrace Lounging */}
          <div className="md:col-span-3 hidden md:block">
            <div className="relative h-[360px] lg:h-[420px] rounded-[32px] overflow-hidden shadow-md group">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
                alt="Friends relaxing in green mountain landscape"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>
          </div>
        </div>

        {/* Centered Editorial Paragraphs & Start Now Button */}
        <div className="text-center max-w-2xl mx-auto mt-10 sm:mt-12 space-y-5">
          <p className="text-base sm:text-lg text-[#374435] leading-relaxed font-normal">
            Embrace self-discovery and authentic connection at Roomigo, a boutique co-living
            platform designed for young professionals and students across India.
          </p>

          <p className="text-sm sm:text-base text-[#616E5E] leading-relaxed">
            Here, in a haven of tranquility, embark on a journey of belonging, peaceful routines,
            and shared warmth within a supportive community of like-minded roommates.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="sand"
              size="pill"
              onClick={handleStartNow}
              className="border border-[#556852]/30 hover:border-[#556852] hover:bg-[#FAF6EE] shadow-none min-w-[170px]"
            >
              Start Now
            </Button>
            <Button
              variant="ghost"
              size="pill"
              onClick={handleExploreSpaces}
              className="min-w-[170px] border border-transparent hover:border-[#556852]/20"
            >
              Explore Spaces
            </Button>
          </div>

          {/* Trust strip */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-[#616E5E]">
            <span className="text-[#556852]">✦</span>
            <span>Over 12,000 verified flatmates across Bengaluru, Mumbai, Delhi NCR & Pune</span>
            <span className="text-[#556852]">✦</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. BUTTER YELLOW MARQUEE BANNER
          ========================================================================= */}
      <section className="w-full bg-[#F7E599] border-y border-[#E2CD75]/70 py-3.5 overflow-hidden select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-[#232B20] text-xs sm:text-sm font-medium tracking-[0.22em] uppercase font-serif">
          <span>MINDFUL HOMES</span>
          <span className="text-[#877222]">❋</span>
          <span>VIBE-MATCHED FLATMATES</span>
          <span className="text-[#877222]">❋</span>
          <span>ZERO BROKERAGE</span>
          <span className="text-[#877222]">❋</span>
          <span>BENGALURU</span>
          <span className="text-[#877222]">❋</span>
          <span>MUMBAI</span>
          <span className="text-[#877222]">❋</span>
          <span>DELHI NCR</span>
          <span className="text-[#877222]">❋</span>
          <span>NO DRAMA SHARED LIVING</span>
          <span className="text-[#877222]">❋</span>
          <span>VERIFIED COMMUNITES</span>
          <span className="text-[#877222]">❋</span>
          <span>PUNE</span>
          <span className="text-[#877222]">❋</span>
          <span>PEACE OF MIND</span>
          <span className="text-[#877222]">❋</span>

          {/* Duplicated for seamless loop */}
          <span>MINDFUL HOMES</span>
          <span className="text-[#877222]">❋</span>
          <span>VIBE-MATCHED FLATMATES</span>
          <span className="text-[#877222]">❋</span>
          <span>ZERO BROKERAGE</span>
          <span className="text-[#877222]">❋</span>
          <span>BENGALURU</span>
          <span className="text-[#877222]">❋</span>
          <span>MUMBAI</span>
          <span className="text-[#877222]">❋</span>
          <span>DELHI NCR</span>
          <span className="text-[#877222]">❋</span>
          <span>NO DRAMA SHARED LIVING</span>
          <span className="text-[#877222]">❋</span>
          <span>VERIFIED COMMUNITES</span>
          <span className="text-[#877222]">❋</span>
          <span>PUNE</span>
          <span className="text-[#877222]">❋</span>
          <span>PEACE OF MIND</span>
          <span className="text-[#877222]">❋</span>
        </div>
      </section>

      {/* =========================================================================
          3. SCENIC FEATURE SECTION: "Spark Soulful Moments" + 3 FROSTED CARDS
          ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="relative rounded-[36px] overflow-hidden min-h-[560px] sm:min-h-[620px] flex flex-col justify-between p-6 sm:p-12 lg:p-16">
          {/* Scenic Nature & Azure Waters Background Photo */}
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80"
            alt="Scenic tropical lagoon and lush green canopy"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Lush Greenery & Soft Sunlight Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#242D21]/50 via-[#374435]/35 to-[#242D21]/65" />

          {/* Heading in Serene Editorial Serif */}
          <div className="relative z-10 text-center max-w-2xl mx-auto pt-6 sm:pt-10">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-tight">
              Spark Divine Moments
            </h2>
            <p className="text-white/85 text-sm sm:text-base mt-3 max-w-lg mx-auto font-light">
              Where shared living becomes a harmonious sanctuary of warmth, friendship, and peace.
            </p>
          </div>

          {/* 3 Floating Frosted Glass Cards (Connection, Sanctuary/Healing, Joy) */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 pt-10 sm:pt-14 pb-4">
            {/* Card 1: Connection */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-lg border border-white/80 flex flex-col justify-between text-center hover:-translate-y-1 transition-transform duration-300">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#232B20] mb-3">
                  Connection
                </h3>
                <p className="text-xs sm:text-sm text-[#4A5546] leading-relaxed">
                  Surround yourself with supportive, like-minded flatmates on a shared journey of
                  growth. Forge lasting bonds through shared dinners, evening chai, and heartfelt
                  conversations.
                </p>
              </div>
              <div className="pt-4 text-xs font-semibold text-[#556852] tracking-wider uppercase">
                ✦ Vibe Compatibility
              </div>
            </div>

            {/* Card 2: Sanctuary / Healing */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-lg border border-white/80 flex flex-col justify-between text-center hover:-translate-y-1 transition-transform duration-300">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#232B20] mb-3">
                  Sanctuary
                </h3>
                <p className="text-xs sm:text-sm text-[#4A5546] leading-relaxed">
                  Step into curated, sunlit homes that protect your peace. Spaces where you can
                  unwind without friction, co-work in flow, and retreat into your authentic personal
                  haven.
                </p>
              </div>
              <div className="pt-4 text-xs font-semibold text-[#556852] tracking-wider uppercase">
                ✦ Mindful Spaces
              </div>
            </div>

            {/* Card 3: Joy */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-lg border border-white/80 flex flex-col justify-between text-center hover:-translate-y-1 transition-transform duration-300">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#232B20] mb-3">
                  Joy
                </h3>
                <p className="text-xs sm:text-sm text-[#4A5546] leading-relaxed">
                  Reconnect with your playful energy and enjoy the simple warmth of communal living.
                  From weekend terrace brunches to cozy movie nights, experience everyday moments of
                  pure belonging.
                </p>
              </div>
              <div className="pt-4 text-xs font-semibold text-[#556852] tracking-wider uppercase">
                ✦ Shared Memories
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. CURATED SPACES CAROUSEL: "Which Roomigo Space calls you?"
          ========================================================================= */}
      <section id="explore-spaces" className="px-4 sm:px-6 lg:px-10 max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#232B20] tracking-tight">
            Which Roomigo Retreat calls you?
          </h2>
          <p className="text-sm sm:text-base text-[#616E5E] mt-2 max-w-lg mx-auto">
            Explore verified sanctuaries across Bengaluru, Mumbai, Delhi NCR, and Pune.
          </p>
        </div>

        {/* Carousel Slider Card with Left & Right Arrows */}
        <div className="relative flex items-center">
          {/* Previous Arrow Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous Space"
            className="absolute -left-3 sm:-left-6 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#FAF6EE] text-[#232B20] border border-[#556852]/25 shadow-md flex items-center justify-center hover:bg-[#556852] hover:text-[#FAF6EE] transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Current Slide Container */}
          <div className="w-full bg-[#F5ECE0] rounded-[32px] sm:rounded-[36px] overflow-hidden border border-[#556852]/15 shadow-lg transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left Slide Image */}
              <div className="lg:col-span-6 relative h-[280px] sm:h-[360px] lg:h-[440px] overflow-hidden p-3 sm:p-4">
                <img
                  src={curatedSpaces[activeSlide].image}
                  alt={curatedSpaces[activeSlide].name}
                  className="w-full h-full object-cover rounded-[24px] sm:rounded-[28px] shadow-sm transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-6 left-6">
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#232B20] border border-[#556852]/15 shadow-sm">
                    {curatedSpaces[activeSlide].type}
                  </span>
                </div>
              </div>

              {/* Right Info Box */}
              <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#556852] uppercase tracking-[0.2em] mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#556852]" />
                    <span>
                      {curatedSpaces[activeSlide].locality}, {curatedSpaces[activeSlide].city}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#232B20] tracking-tight mb-3">
                    {curatedSpaces[activeSlide].name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#435240] font-medium leading-relaxed mb-3">
                    {curatedSpaces[activeSlide].subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-[#616E5E] leading-relaxed mb-6">
                    {curatedSpaces[activeSlide].description}
                  </p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {curatedSpaces[activeSlide].amenities.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-[#FAF6EE] text-[#374435] px-3 py-1 rounded-full border border-[#556852]/15"
                      >
                        ✦ {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Price & Pill CTA Button Styled like BOOK NOW in the Screenshot */}
                <div className="pt-4 border-t border-[#556852]/15 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#616E5E] block">
                      Monthly Contribution
                    </span>
                    <span className="text-xl sm:text-2xl font-serif text-[#232B20] font-bold">
                      {curatedSpaces[activeSlide].rent}
                      <span className="text-xs font-sans font-normal text-[#616E5E]"> / mo</span>
                    </span>
                  </div>

                  <Button
                    variant="butter"
                    size="pill"
                    onClick={() => navigate('/discover')}
                    className="min-w-[140px] uppercase tracking-[0.2em]"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Next Arrow Button */}
          <button
            onClick={nextSlide}
            aria-label="Next Space"
            className="absolute -right-3 sm:-right-6 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#FAF6EE] text-[#232B20] border border-[#556852]/25 shadow-md flex items-center justify-center hover:bg-[#556852] hover:text-[#FAF6EE] transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Dot Indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {curatedSpaces.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all ${
                activeSlide === idx
                  ? 'w-6 h-2 bg-[#556852] rounded-full'
                  : 'w-2 h-2 bg-[#556852]/30 rounded-full hover:bg-[#556852]/60'
              }`}
            />
          ))}
        </div>
      </section>

      {/* =========================================================================
          5. WHAT'S INCLUDED: SAGE GREEN GALLERY SECTION (Directly from Screenshot)
          ========================================================================= */}
      <section
        id="community"
        className="w-full bg-[#5B6E55] text-[#FAF6EE] py-14 sm:py-20 px-4 sm:px-6 lg:px-10"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white">
              What's Included in Your Stay
            </h2>
            <p className="text-white/80 text-sm sm:text-base mt-2 max-w-md mx-auto font-light">
              Mindful living crafted for everyday harmony, quiet rituals, and genuine community.
            </p>
          </div>

          {/* 4 Vertical Rounded Photo Tiles with Delicate Badge Labels */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {/* Tile 1: Yoga & Sunlit Morning */}
            <div className="flex flex-col items-center group">
              <div className="w-full h-48 sm:h-64 lg:h-72 rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-md bg-[#485743] border border-white/15">
                <img
                  src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80"
                  alt="Daily yoga and morning sunlight"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F7E599]" />
                <span>Daily Yoga & Sunlight</span>
              </div>
            </div>

            {/* Tile 2: Sound Healing / Filter Coffee & Cooking */}
            <div className="flex flex-col items-center group">
              <div className="w-full h-48 sm:h-64 lg:h-72 rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-md bg-[#485743] border border-white/15">
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
                  alt="Brass sound bowls and morning artisanal tea"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F7E599]" />
                <span>Sound & Evening Chai</span>
              </div>
            </div>

            {/* Tile 3: Sisterhood Circles / Roommate Evenings */}
            <div className="flex flex-col items-center group">
              <div className="w-full h-48 sm:h-64 lg:h-72 rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-md bg-[#485743] border border-white/15">
                <img
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80"
                  alt="Roommates laughing in supportive circle"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F7E599]" />
                <span>Soulful Circles</span>
              </div>
            </div>

            {/* Tile 4: Cultural Immersions / Workspaces */}
            <div className="flex flex-col items-center group">
              <div className="w-full h-48 sm:h-64 lg:h-72 rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-md bg-[#485743] border border-white/15">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80"
                  alt="Lush courtyard and serene pool immersion"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F7E599]" />
                <span>Cultural Immersions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. VIBE-MATCHED FLATMATES: MEET YOUR PEOPLE
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-10 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#556852] uppercase tracking-[0.2em] mb-1.5">
              <span>✦</span>
              <span>Mindful Roommates</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#232B20] tracking-tight">
              Meet Flatmates Who Match Your Energy
            </h2>
          </div>

          <Link
            to="/discover"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#374435] hover:text-[#556852] transition-colors"
          >
            <span>Explore All Profiles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Flatmate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredFlatmates.map((flatmate) => (
            <FlatmateCard
              key={flatmate.id}
              name={flatmate.name}
              age={flatmate.age}
              occupation={flatmate.occupation}
              budget={`₹${flatmate.budget.toLocaleString('en-IN')}/mo`}
              location={`${flatmate.locality}, ${flatmate.city}`}
              compatibilityScore={flatmate.compatibilityScore}
              image={flatmate.image}
              bio={flatmate.bio}
              tags={flatmate.tags}
              onConnect={() => navigate('/discover')}
            />
          ))}
        </div>
      </section>

      {/* =========================================================================
          7. HOW IT WORKS: 3 EDITORIAL STEPS
          ========================================================================= */}
      <section id="how-it-works" className="px-4 sm:px-6 lg:px-10 max-w-5xl mx-auto">
        <div className="bg-[#FAF6EE] rounded-[32px] p-8 sm:p-12 border border-[#556852]/15 text-center">
          <span className="text-xs font-medium text-[#556852] uppercase tracking-[0.24em]">
            ✦ The Journey ✦
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#232B20] mt-2 mb-10">
            Three Steps to Finding Your Sanctuary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Step 1 */}
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#EBF1EA] text-[#556852] font-serif text-lg font-bold flex items-center justify-center border border-[#556852]/20">
                01
              </div>
              <h3 className="font-serif text-xl font-medium text-[#232B20]">
                Curate Your Profile
              </h3>
              <p className="text-xs sm:text-sm text-[#616E5E] leading-relaxed">
                Tell us about your daily rhythms, sleeping schedule, cleanliness, and neighborhood
                preferences.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#EBF1EA] text-[#556852] font-serif text-lg font-bold flex items-center justify-center border border-[#556852]/20">
                02
              </div>
              <h3 className="font-serif text-xl font-medium text-[#232B20]">
                Vibe-Check & Match
              </h3>
              <p className="text-xs sm:text-sm text-[#616E5E] leading-relaxed">
                Browse through verified souls. Swipe right on people you would love to share a home,
                chai, and laughter with.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#EBF1EA] text-[#556852] font-serif text-lg font-bold flex items-center justify-center border border-[#556852]/20">
                03
              </div>
              <h3 className="font-serif text-xl font-medium text-[#232B20]">
                Connect & Move In
              </h3>
              <p className="text-xs sm:text-sm text-[#616E5E] leading-relaxed">
                Start a conversation, visit your favorite space together, and begin your next chapter
                with zero stress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. FINAL CALL TO ACTION
          ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-10 max-w-4xl mx-auto text-center">
        <div className="bg-[#EBF1EA] rounded-[36px] p-8 sm:p-14 border border-[#556852]/25 space-y-5">
          <span className="text-xl sm:text-2xl text-[#C59B27]">❋</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#232B20] font-normal tracking-tight">
            Your next home is more than four walls.
          </h2>
          <p className="text-sm sm:text-base text-[#435240] max-w-lg mx-auto leading-relaxed">
            Discover a place that feels like home and a roommate who feels like your people.
          </p>
          <div className="pt-2">
            <Button
              variant="butter"
              size="pill"
              onClick={handleStartNow}
              className="text-xs uppercase tracking-[0.22em] px-8 py-3.5 shadow-md"
            >
              Start Your Journey ✦
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
