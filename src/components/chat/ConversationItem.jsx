import React from 'react';

const ConversationItem = ({ conversation, isActive, onClick }) => {
  const { participant, lastMessageText, lastMessageTime, unreadCount } = conversation;

  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-2xl flex items-center gap-3 cursor-pointer transition-all ${
        isActive
          ? 'bg-[#EBF1EA] border-r-4 border-[#556852] shadow-sm'
          : 'hover:bg-[#EBF1EA]/60 border-r-4 border-transparent'
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
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border border-[#556852]/20 shadow-sm"
        />
        {/* Online status badge */}
        <span
          className="absolute bottom-0 right-0 w-3 h-3 bg-[#556852] border-2 border-[#FAF6EE] rounded-full"
          title="Online now"
        />
      </div>

      {/* Conversation Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <h4 className="font-serif text-base font-normal text-[#232B20] truncate">
            {participant?.name || 'Match'}
          </h4>
          <span className="text-[10px] font-medium text-[#616E5E] flex-shrink-0">
            {lastMessageTime}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <p
            className={`text-xs truncate ${
              unreadCount > 0
                ? 'font-semibold text-[#232B20]'
                : 'text-[#616E5E] font-normal'
            }`}
          >
            {lastMessageText || 'Start chatting with your match!'}
          </p>

          {/* Unread Message Count Badge */}
          {unreadCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#556852] text-[#FAF6EE] text-[9px] font-bold flex items-center justify-center flex-shrink-0 shadow-sm">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
