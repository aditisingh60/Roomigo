import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, MessageSquare, X } from 'lucide-react';
import Button from '../common/Button';

const MatchModal = ({ match, currentUser, onClose }) => {
  const navigate = useNavigate();

  if (!match) return null;

  const currentPhoto =
    currentUser?.profile?.profilePic ||
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80';
  const matchPhoto =
    match.image ||
    (match.images && match.images[0]) ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';

  const handleSendMessage = () => {
    onClose();
    navigate('/chat', { state: { participantId: match.id } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred Backdrop */}
      <div
        className="absolute inset-0 bg-[#242D21]/65 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FAF6EE] rounded-[32px] p-8 sm:p-10 max-w-md w-full border border-[#556852]/20 shadow-2xl text-center space-y-6 animate-scaleIn z-10 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#616E5E] hover:text-[#232B20] rounded-full hover:bg-[#EBF1EA] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebratory Tag */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#EBF1EA] text-[#374435] text-[11px] font-bold tracking-wider uppercase border border-[#556852]/15">
          <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
          It's a Vibe Match!
        </div>

        {/* Side-by-Side Avatars with Heart Badge */}
        <div className="relative flex items-center justify-center pt-2">
          {/* User's Avatar */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-[#FAF6EE] shadow-xl ring-4 ring-[#EBF1EA] -mr-4 z-10">
            <img src={currentPhoto} alt="You" className="w-full h-full object-cover" />
          </div>

          {/* Central Heart Connector Badge */}
          <div className="w-12 h-12 rounded-full bg-[#556852] text-[#F7E599] flex items-center justify-center shadow-lg z-30 ring-4 ring-[#FAF6EE] animate-pulse">
            <Heart className="w-6 h-6 fill-[#F7E599]" />
          </div>

          {/* Matched Profile's Avatar */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-[#FAF6EE] shadow-xl ring-4 ring-[#EBF1EA] -ml-4 z-10">
            <img src={matchPhoto} alt={match.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Congratulatory Copy */}
        <div className="space-y-1.5">
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#232B20]">
            You and {match.name} liked each other!
          </h3>
          <p className="text-xs sm:text-sm text-[#616E5E]">
            You both share compatible flat preferences in {match.location || 'Bengaluru'}.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <Button
            variant="butter"
            size="lg"
            icon={MessageSquare}
            onClick={handleSendMessage}
            className="w-full text-xs uppercase tracking-wider font-semibold shadow-md"
          >
            Start Conversation
          </Button>

          <Button
            variant="ghost"
            size="md"
            onClick={onClose}
            className="w-full text-xs font-semibold text-[#616E5E] hover:text-[#232B20]"
          >
            Keep Exploring
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MatchModal;
