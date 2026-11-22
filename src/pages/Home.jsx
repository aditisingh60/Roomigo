import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Users, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import Button from '../components/common/Button';
import FlatmateCard from '../components/cards/FlatmateCard';
import PropertyCard from '../components/cards/PropertyCard';

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50/60 to-transparent rounded-2xl border border-indigo-50">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 mb-4">
          <Sparkles className="w-3.5 h-3.5" /> Smarter Roommate Compatibility
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto">
          Find your ideal flatmate without the hassle.
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Discover compatible roommates matching your lifestyle, habits, budget, and preferred location.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/discover">
            <Button variant="primary" size="lg" icon={Compass}>
              Find Flatmates
            </Button>
          </Link>
          <Link to="/matches">
            <Button variant="outline" size="lg" icon={Heart}>
              View Top Matches
            </Button>
          </Link>
        </div>
      </section>

      {/* Highlights / Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl border border-slate-200">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-900 mb-1">Lifestyle Match</h3>
          <p className="text-sm text-slate-600">
            Compare sleeping patterns, cleanliness, work habits, and pet preferences.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-900 mb-1">Verified Community</h3>
          <p className="text-sm text-slate-600">
            Connect with verified profiles and authentic listings in your target cities.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200">
          <div className="w-10 h-10 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center mb-4">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-900 mb-1">Direct Chat</h3>
          <p className="text-sm text-slate-600">
            Message potential roommates directly and schedule flat viewings together.
          </p>
        </div>
      </section>

      {/* Featured Flatmates Preview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Featured Flatmates</h2>
            <p className="text-sm text-slate-500">People looking for a roommate in popular areas</p>
          </div>
          <Link to="/discover">
            <Button variant="ghost" size="sm">
              See all
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FlatmateCard
            name="Sarah Jenkins"
            age={26}
            occupation="Software Engineer"
            budget="$1,100/mo"
            location="Manhattan, NY"
            compatibilityScore={96}
            tags={['Early Bird', 'Work From Home', 'Vegetarian']}
          />
          <FlatmateCard
            name="David Chen"
            age={25}
            occupation="Product Designer"
            budget="$950/mo"
            location="Williamsburg, Brooklyn"
            compatibilityScore={91}
            tags={['Quiet', 'Non-smoker', 'Fitness']}
          />
          <FlatmateCard
            name="Elena Rodriguez"
            age={23}
            occupation="Graduate Student"
            budget="$800/mo"
            location="Astoria, Queens"
            compatibilityScore={88}
            tags={['Studies Late', 'Clean', 'Cat Lover']}
          />
        </div>
      </section>

      {/* Featured Properties Preview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Recent Spaces & Rooms</h2>
            <p className="text-sm text-slate-500">Available rooms ready for move-in</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PropertyCard
            title="Spacious Master Bedroom with En-suite"
            rent="$1,300/mo"
            location="East Village, NY"
            beds={3}
            baths={2}
            type="Private Room"
          />
          <PropertyCard
            title="Bright Modern Room near Subway"
            rent="$950/mo"
            location="Bushwick, Brooklyn"
            beds={2}
            baths={1}
            type="Private Room"
          />
          <PropertyCard
            title="Cozy Loft in Historic Building"
            rent="$1,150/mo"
            location="Long Island City, Queens"
            beds={2}
            baths={1}
            type="Shared Flat"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;

