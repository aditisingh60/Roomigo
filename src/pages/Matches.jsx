import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Sparkles,
  MessageSquare,
  Compass,
  ArrowRight,
  UserX,
  Trash2,
  CheckCircle2,
  RotateCcw,
  AlertCircle,
} from 'lucide-react';
import FlatmateCard from '../components/cards/FlatmateCard';
import Button from '../components/common/Button';
import { useMatch } from '../context/MatchContext';
import { useChat } from '../context/ChatContext';

const Matches = () => {
  const { matches, likedProfiles, removeMatch, removeLikedProfile, likeProfile } = useMatch();
  const { removeConversation } = useChat();
  const [activeTab, setActiveTab] = useState('matches'); // 'matches' | 'liked'

  // Toast / notification state for manual removal
  const [notification, setNotification] = useState(null);
  // Modal state for confirmation before removing
  const [personToRemove, setPersonToRemove] = useState(null);

  const profilesToShow = activeTab === 'matches' ? matches : likedProfiles;

  const handleConfirmRemove = () => {
    if (!personToRemove) return;

    const { user, type } = personToRemove;
    if (type === 'match') {
      removeMatch(user.id);
      removeConversation(user.id);
      setNotification({
        text: `Removed ${user.name} from your mutual matches.`,
        removedUser: user,
        type: 'match',
      });
    } else {
      removeLikedProfile(user.id);
      setNotification({
        text: `Removed ${user.name} from your liked profiles.`,
        removedUser: user,
        type: 'liked',
      });
    }

    setPersonToRemove(null);

    // Auto-dismiss notification after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleUndo = () => {
    if (!notification?.removedUser) return;
    if (notification.type === 'match') {
      // Re-add to matches
      likeProfile(notification.removedUser);
    } else {
      likeProfile(notification.removedUser);
    }
    setNotification(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Undo / Success Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#232B20] text-[#FAF6EE] px-5 py-3.5 rounded-2xl shadow-2xl border border-[#556852]/30 flex items-center gap-3.5 animate-fadeIn text-xs sm:text-sm">
          <CheckCircle2 className="w-4 h-4 text-[#F7E599] flex-shrink-0" />
          <span>{notification.text}</span>
          <button
            type="button"
            onClick={handleUndo}
            className="ml-2 font-bold text-[#F7E599] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Undo
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      {personToRemove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#242D21]/60 backdrop-blur-sm"
            onClick={() => setPersonToRemove(null)}
          />
          <div className="relative bg-[#FAF6EE] rounded-[32px] p-6 sm:p-8 max-w-sm w-full border border-[#556852]/20 shadow-2xl z-10 space-y-5 animate-scaleIn text-center">
            <div className="w-14 h-14 rounded-full bg-[#EBF1EA] text-[#D47A60] mx-auto flex items-center justify-center border border-[#556852]/15">
              <UserX className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-serif text-2xl font-normal text-[#232B20]">
                {personToRemove.type === 'match' ? 'Unmatch Flatmate?' : 'Remove from Liked?'}
              </h3>
              <p className="text-xs sm:text-sm text-[#616E5E] leading-relaxed">
                Are you sure you want to remove{' '}
                <strong className="text-[#232B20] font-semibold">
                  {personToRemove.user.name}
                </strong>
                ?{' '}
                {personToRemove.type === 'match'
                  ? 'They will be removed from your matches and messaging sidebar.'
                  : 'They will no longer appear in your liked profiles.'}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="sand"
                size="sm"
                onClick={() => setPersonToRemove(null)}
                className="w-1/2 text-xs uppercase tracking-wider"
              >
                Cancel
              </Button>
              <Button
                variant="accent"
                size="sm"
                onClick={handleConfirmRemove}
                className="w-1/2 text-xs uppercase tracking-wider"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#556852]/15 pb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#556852] text-[#FAF6EE] flex items-center justify-center shadow-md">
            <Heart className="w-6 h-6 fill-[#FAF6EE]" />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-normal text-[#232B20]">Your Connections</h1>
            <p className="text-xs sm:text-sm text-[#616E5E]">
              Flatmates you liked and mutual connections across India
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
            Mutual Matches ({matches.length})
          </button>
          <button
            onClick={() => setActiveTab('liked')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'liked'
                ? 'bg-[#556852] text-[#FAF6EE] shadow-sm'
                : 'text-[#616E5E] hover:text-[#232B20]'
            }`}
          >
            Liked Profiles ({likedProfiles.length})
          </button>
        </div>
      </div>

      {/* Profiles Grid */}
      {profilesToShow.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {profilesToShow.map((user) => {
            const displayBudget =
              typeof user.budget === 'number'
                ? `₹${user.budget.toLocaleString('en-IN')}/mo`
                : user.budget ||
                  (user.locationBudget?.maxBudget
                    ? `₹${Number(user.locationBudget.maxBudget).toLocaleString('en-IN')}/mo`
                    : '₹18,500/mo');

            return (
              <div key={user.id} className="relative group flex flex-col justify-between">
                {/* Discrete Remove Button on Card Corner */}
                <button
                  type="button"
                  onClick={() =>
                    setPersonToRemove({
                      user,
                      type: activeTab === 'matches' ? 'match' : 'liked',
                    })
                  }
                  title={activeTab === 'matches' ? 'Remove match' : 'Remove from liked'}
                  className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#FAF6EE]/90 hover:bg-[#D47A60] hover:text-white text-[#616E5E] border border-[#556852]/20 flex items-center justify-center transition-all shadow-sm cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <FlatmateCard
                  name={user.name}
                  age={user.age}
                  occupation={user.occupation || user.occupationType}
                  budget={displayBudget}
                  location={user.location || user.locationBudget?.preferredLocality || 'Bengaluru'}
                  compatibilityScore={user.compatibilityScore || 92}
                  image={user.image || (user.images && user.images[0])}
                  bio={user.bio}
                  tags={user.tags || ['Verified', 'Co-living']}
                  onConnect={() => {}}
                />

                {/* Bottom Action Bar for Connection */}
                <div className="mt-3 flex items-center gap-2">
                  {activeTab === 'matches' ? (
                    <>
                      <Link
                        to="/chat"
                        state={{ participantId: user.id }}
                        className="flex-1"
                      >
                        <Button
                          variant="butter"
                          size="sm"
                          icon={MessageSquare}
                          className="w-full text-xs uppercase tracking-wider"
                        >
                          Start Chat
                        </Button>
                      </Link>
                      <button
                        type="button"
                        onClick={() => setPersonToRemove({ user, type: 'match' })}
                        className="px-3.5 py-2 rounded-full border border-[#556852]/25 text-[#374435] hover:bg-[#D47A60] hover:text-white hover:border-transparent text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                        title="Remove match"
                      >
                        <UserX className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Unmatch</span>
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPersonToRemove({ user, type: 'liked' })}
                      className="w-full py-2 rounded-full border border-[#556852]/25 text-[#374435] hover:bg-[#D47A60] hover:text-white hover:border-transparent text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove from Liked</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-[#FAF6EE] rounded-[32px] p-10 sm:p-14 text-center max-w-md mx-auto space-y-4 border border-[#556852]/20 shadow-md">
          <div className="w-16 h-16 rounded-full bg-[#EBF1EA] text-[#556852] mx-auto flex items-center justify-center border border-[#556852]/20">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl font-normal text-[#232B20]">
            {activeTab === 'matches' ? 'No mutual matches currently' : 'No liked profiles yet'}
          </h3>
          <p className="text-xs sm:text-sm text-[#616E5E] leading-relaxed">
            {activeTab === 'matches'
              ? 'Head over to Discover to swipe right on people you would love to share a home with.'
              : 'Browse potential roommates on the Discover page to save people who match your vibe.'}
          </p>
          <div className="pt-2">
            <Link to="/discover">
              <Button variant="butter" size="md" icon={Compass} className="text-xs uppercase tracking-widest px-6">
                Discover Flatmates
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Matches;
