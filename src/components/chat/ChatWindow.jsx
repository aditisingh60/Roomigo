import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  MapPin,
  User,
  Sparkles,
} from 'lucide-react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import ProfileModal from './ProfileModal';

const ChatWindow = ({
  conversation,
  isTyping,
  onSendMessage,
  onBack,
  isMobileView,
}) => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const participant = conversation?.participant;
  const messages = conversation?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  if (!conversation) {
    return null;
  }

  return (
    <div className="h-full flex flex-col bg-[#F8F3EA]/70">
      {/* Header */}
      <div className="p-3.5 sm:p-4 bg-[#FAF6EE] border-b border-[#556852]/15 flex items-center justify-between gap-3 shadow-none z-10">
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile Back Button */}
          {isMobileView && (
            <button
              onClick={onBack}
              className="p-1.5 rounded-full hover:bg-[#EBF1EA] text-[#232B20] transition-colors cursor-pointer"
              aria-label="Back to messages"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          {/* Participant Avatar */}
          <div
            className="relative flex-shrink-0 cursor-pointer group"
            onClick={() => setProfileModalOpen(true)}
          >
            <img
              src={
                participant?.image ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
              }
              alt={participant?.name || 'Match'}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-[#556852]/20 shadow-sm group-hover:opacity-90 transition-opacity"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#556852] rounded-full border-2 border-[#FAF6EE]" />
          </div>

          {/* Participant Name & Location */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3
                onClick={() => setProfileModalOpen(true)}
                className="font-serif text-lg sm:text-xl font-normal text-[#232B20] truncate hover:text-[#556852] cursor-pointer transition-colors"
              >
                {participant?.name || 'Match'}
              </h3>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EBF1EA] text-[#374435] border border-[#556852]/15 flex-shrink-0">
                {participant?.age} yrs
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#616E5E] truncate">
              <span className="text-[#556852] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#556852] animate-pulse" />
                Online
              </span>
              <span>•</span>
              <span className="truncate flex items-center gap-0.5">
                <MapPin className="w-3 h-3 text-[#556852] flex-shrink-0" />
                {participant?.location || 'Bengaluru'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Header Action: View Profile */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setProfileModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#EBF1EA] hover:bg-[#dce6d9] text-[#374435] border border-[#556852]/20 text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer shadow-none"
          >
            <User className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Profile</span>
          </button>
        </div>
      </div>

      {/* Message History Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {/* Date Separator Pill */}
        <div className="flex items-center justify-center my-3">
          <span className="px-3 py-1 rounded-full bg-[#EBF1EA] text-[#374435] border border-[#556852]/15 text-[11px] font-serif uppercase tracking-wider shadow-none">
            Today
          </span>
        </div>

        {/* Message Bubbles */}
        {messages.map((message) => {
          const isMe = message.senderId === 'current_user';
          return (
            <MessageBubble
              key={message.id}
              message={message}
              isMe={isMe}
              participant={participant}
            />
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-[#616E5E] italic py-1 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-[#556852] animate-bounce" />
            <span>{participant?.name?.split(' ')[0]} is crafting a reply...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Message Input Bar */}
      <MessageInput onSendMessage={onSendMessage} />

      {/* Matched User Profile Detail Modal */}
      <ProfileModal
        profile={participant}
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </div>
  );
};

export default ChatWindow;
