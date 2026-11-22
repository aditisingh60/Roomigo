import React from 'react';
import { CheckCheck, Check } from 'lucide-react';

const MessageBubble = ({ message, isMe, participant }) => {
  return (
    <div className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`flex items-end gap-2 max-w-[85%] sm:max-w-[70%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Participant Avatar for incoming message */}
        {!isMe && (
          <img
            src={
              participant?.image ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
            }
            alt={participant?.name || 'Match'}
            className="w-7 h-7 rounded-full object-cover border border-[#556852]/20 shadow-none flex-shrink-0 mb-1"
          />
        )}

        {/* Message Bubble Container */}
        <div
          className={`relative px-4 py-2.5 rounded-2xl text-xs sm:text-sm transition-all leading-relaxed shadow-sm ${
            isMe
              ? 'bg-[#556852] text-[#FAF6EE] rounded-br-sm'
              : 'bg-white text-[#232B20] border border-[#556852]/15 rounded-bl-sm shadow-sm'
          }`}
        >
          {/* Message Text */}
          <p className="break-words select-text">{message.text}</p>

          {/* Timestamp and Delivery Status */}
          <div
            className={`flex items-center justify-end gap-1 text-[10px] mt-1 select-none ${
              isMe ? 'text-[#FAF6EE]/80' : 'text-[#616E5E]'
            }`}
          >
            <span>{message.timestamp}</span>
            {isMe && (
              <span>
                {message.status === 'read' || message.status === 'delivered' ? (
                  <CheckCheck className="w-3.5 h-3.5 text-[#F7E599]" />
                ) : (
                  <Check className="w-3.5 h-3.5 text-[#FAF6EE]/70" />
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
