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
        className="absolute inset-0 bg-[#252333]/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full border border-slate-200/80 shadow-2xl text-center space-y-6 animate-scaleIn z-10 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FF8BA7]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#7056D8]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#656377] hover:text-[#252333] rounded-full hover:bg-[#F0ECFF] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebratory Tag */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FFE5EC] text-[#FF8BA7] text-xs font-extrabold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5 fill-[#FF8BA7]" />
          It's a Match!
        </div>

        {/* Side-by-Side Avatars with Heart Badge */}
        <div className="relative flex items-center justify-center pt-2">
          {/* User's Avatar */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-xl ring-4 ring-[#F0ECFF] -mr-4 z-10">
            <img src={currentPhoto} alt="You" className="w-full h-full object-cover" />
          </div>

          {/* Central Heart Connector Badge */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#7056D8] to-[#FF8BA7] text-white flex items-center justify-center shadow-lg shadow-[#7056D8]/30 z-30 ring-4 ring-white animate-pulse">
            <Heart className="w-6 h-6 fill-white" />
          </div>

          {/* Matched Profile's Avatar */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-xl ring-4 ring-[#FFE5EC] -ml-4 z-10">
            <img src={matchPhoto} alt={match.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Congratulatory Copy */}
        <div className="space-y-1.5">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#252333]">
            You and {match.name} liked each other!
          </h3>
          <p className="text-xs sm:text-sm text-[#656377]">
            You both share compatible flat preferences in {match.location || 'Bengaluru'}.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <Button
            variant="primary"
            size="lg"
            icon={MessageSquare}
            onClick={handleSendMessage}
            className="w-full shadow-lg shadow-[#7056D8]/25 font-bold"
          >
            Send a Message
          </Button>

          <Button
            variant="ghost"
            size="md"
            onClick={onClose}
            className="w-full text-xs font-semibold text-[#656377] hover:text-[#252333]"
          >
            Keep Swiping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MatchModal;
