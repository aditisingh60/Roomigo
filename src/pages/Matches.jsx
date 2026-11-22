import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, MessageSquare, Compass, ArrowRight } from 'lucide-react';
import FlatmateCard from '../components/cards/FlatmateCard';
import Button from '../components/common/Button';
import { useMatch } from '../context/MatchContext';
import { initialUsers } from '../data/users';

const Matches = () => {
  const { matches, likedProfiles } = useMatch();
  const [activeTab, setActiveTab] = useState('matches'); // 'matches' | 'liked'

  // If matches is empty on first load, seed with high compatibility users so page looks rich
  const displayMatches =
    matches.length > 0
      ? matches
      : initialUsers.filter((u) => u.compatibilityScore >= 92).slice(0, 2);

  const displayLiked =
    likedProfiles.length > 0
      ? likedProfiles
      : initialUsers.slice(0, 3);

  const profilesToShow = activeTab === 'matches' ? displayMatches : displayLiked;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#556852]/15 pb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#556852] text-[#FAF6EE] flex items-center justify-center shadow-md">
            <Heart className="w-6 h-6 fill-[#FAF6EE]" />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-normal text-[#232B20]">Your Connections</h1>
            <p className="text-xs sm:text-sm text-[#616E5E]">
              Flatmates you liked and mutual connections
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-[#EBF1EA] p-1 rounded-full border border-[#556852]/15 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('matches')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'matches'
                ? 'bg-[#556852] text-[#FAF6EE] shadow-sm'
                : 'text-[#616E5E] hover:text-[#232B20]'
            }`}
          >
            Mutual Matches ({displayMatches.length})
          </button>
          <button
            onClick={() => setActiveTab('liked')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'liked'
                ? 'bg-[#556852] text-[#FAF6EE] shadow-sm'
                : 'text-[#616E5E] hover:text-[#232B20]'
            }`}
          >
            Liked Profiles ({displayLiked.length})
          </button>
        </div>
      </div>

      {/* Profiles Grid */}
      {profilesToShow.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {profilesToShow.map((user) => (
            <div key={user.id} className="relative group">
              <FlatmateCard
                name={user.name}
                age={user.age}
                occupation={user.occupation || user.occupationType}
                budget={user.budget || `$${user.locationBudget?.maxBudget}/mo`}
                location={user.location || user.locationBudget?.preferredLocality}
                compatibilityScore={user.compatibilityScore || 92}
                image={user.image || (user.images && user.images[0])}
                bio={user.bio}
                tags={user.tags || ['Verified', 'Co-living']}
                onConnect={() => {}}
              />
              {activeTab === 'matches' && (
                <div className="mt-2 text-center">
                  <Link to="/chat" state={{ participantId: user.id }}>
                    <Button variant="primary" size="sm" icon={MessageSquare} className="w-full">
                      Start Conversation
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto space-y-4 border border-slate-200">
          <div className="w-14 h-14 rounded-2xl bg-[#FFE5EC] text-[#FF8BA7] mx-auto flex items-center justify-center">
            <Heart className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-[#252333]">No matches yet</h3>
          <p className="text-xs text-[#656377]">
            Keep swiping on the Discover page to connect with compatible roommates!
          </p>
          <Link to="/discover">
            <Button variant="primary" size="md" icon={Compass}>
              Find Flatmates
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Matches;
