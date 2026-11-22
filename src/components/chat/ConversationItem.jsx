import React from 'react';
import { MapPin } from 'lucide-react';

const ConversationItem = ({ conversation, isActive, onClick }) => {
  const { participant, lastMessageText, lastMessageTime, unreadCount } = conversation;

  return (
    <div
      onClick={onClick}
      className={`p-3.5 rounded-2xl flex items-center gap-3 cursor-pointer transition-all ${
        isActive
          ? 'bg-[#F0ECFF] border-r-4 border-[#7056D8] shadow-sm'
          : 'hover:bg-[#FAF9F6] border-r-4 border-transparent'
      }`}
    >
      {/* Avatar with Online Status Indicator */}
      <div className="relative flex-shrink-0">
        <img
          src={
            participant?.image ||
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
          }
          alt={participant?.name || 'Match'}
          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm ring-2 ring-[#F0ECFF]"
        />
        {/* Mock Online status badge */}
        <span
          className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"
          title="Online now"
        />
      </div>

      {/* Conversation Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-1">
          <h4 className="text-sm font-extrabold text-[#252333] truncate">
            {participant?.name || 'Match'}
          </h4>
          <span className="text-[11px] font-medium text-[#656377] flex-shrink-0">
            {lastMessageTime}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <p
            className={`text-xs truncate ${
              unreadCount > 0
                ? 'font-bold text-[#252333]'
                : 'text-[#656377] font-normal'
            }`}
          >
            {lastMessageText || 'Start chatting with your match!'}
          </p>

          {/* Unread Message Count Badge */}
          {unreadCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#7056D8] text-white text-[10px] font-extrabold flex items-center justify-center flex-shrink-0 shadow-sm animate-pulse">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;

