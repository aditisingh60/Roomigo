import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  MapPin,
  User,
  MoreVertical,
  ShieldCheck,
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

  // Automatically scroll to the latest message
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
    <div className="h-full flex flex-col bg-[#FAF9F6]/50">
      {/* Header */}
      <div className="p-3.5 sm:p-4 bg-white border-b border-slate-200/80 flex items-center justify-between gap-3 shadow-sm z-10">
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile Back Button */}
          {isMobileView && (
            <button
              onClick={onBack}
              className="p-1.5 rounded-full hover:bg-[#FAF9F6] text-[#252333] transition-colors cursor-pointer"
              aria-label="Back to messages"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          {/* Participant Avatar */}
          <div className="relative flex-shrink-0 cursor-pointer" onClick={() => setProfileModalOpen(true)}>
            <img
              src={
                participant?.image ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
              }
              alt={participant?.name || 'Match'}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-white ring-2 ring-[#F0ECFF] shadow-sm"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
          </div>

          {/* Participant Name & Location */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3
                onClick={() => setProfileModalOpen(true)}
                className="font-extrabold text-[#252333] text-sm sm:text-base truncate hover:text-[#7056D8] cursor-pointer transition-colors"
              >
                {participant?.name || 'Match'}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F0ECFF] text-[#7056D8] flex-shrink-0">
                {participant?.age} yrs
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#656377] truncate">
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </span>
              <span>•</span>
              <span className="truncate flex items-center gap-0.5">
                <MapPin className="w-3 h-3 text-[#7056D8] flex-shrink-0" />
                {participant?.location || 'New York'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Header Action: View Profile */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setProfileModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0ECFF] hover:bg-[#e4ddfc] text-[#7056D8] text-xs font-bold transition-colors cursor-pointer shadow-sm"
          >
            <User className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Profile</span>
          </button>
        </div>
      </div>

      {/* Message History Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
        {/* Match Verification Banner */}
        <div className="text-center my-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F0ECFF] border border-[#7056D8]/20 text-[#7056D8] text-[11px] font-bold shadow-sm">
            <Sparkles className="w-3 h-3 text-[#FF8BA7]" /> You and {participant?.name} mutually matched on Roomigo
          </span>
        </div>

        {/* Date Separator */}
        <div className="flex items-center justify-center my-4">
          <span className="text-[11px] font-bold text-[#656377] bg-white border border-slate-200/80 px-3 py-1 rounded-full shadow-sm">
            Today
          </span>
        </div>

        {/* Message Bubbles */}
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isMe={msg.isMe}
            participant={participant}
          />
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-[#656377] animate-fadeIn pl-9">
            <div className="bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7056D8] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#7056D8] animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#7056D8] animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] font-medium ml-1 text-[#252333]">
                {participant?.name} is typing...
              </span>
            </div>
          </div>
        )}

        {/* Bottom Scroll Target */}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Message Input */}
      <MessageInput onSendMessage={(text) => onSendMessage(conversation.id, text)} />

      {/* Full Profile Modal */}
      <ProfileModal
        profile={participant}
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </div>
  );
};

export default ChatWindow;

