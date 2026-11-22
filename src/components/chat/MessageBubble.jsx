import React from 'react';
import { CheckCheck, Check } from 'lucide-react';

const MessageBubble = ({ message, isMe, participant }) => {
  return (
    <div className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`flex items-end gap-2 max-w-[85%] sm:max-w-[70%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Participant Avatar for incoming message */}
        {!isMe && (
          <img
            src={participant?.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
            alt={participant?.name || 'Match'}
            className="w-7 h-7 rounded-full object-cover border border-white shadow-sm flex-shrink-0 mb-1"
          />
        )}

        {/* Message Bubble Container */}
        <div
          className={`relative px-4 py-2.5 rounded-2xl text-sm transition-all leading-relaxed shadow-sm ${
            isMe
              ? 'bg-[#7056D8] text-white rounded-br-sm'
              : 'bg-white text-[#252333] border border-slate-200/90 rounded-bl-sm shadow-slate-900/5'
          }`}
        >
          {/* Message Text */}
          <p className="break-words select-text">{message.text}</p>

          {/* Timestamp and Delivery Status */}
          <div
            className={`flex items-center justify-end gap-1 text-[10px] mt-1 select-none ${
              isMe ? 'text-white/80' : 'text-[#656377]'
            }`}
          >
            <span>{message.timestamp}</span>
            {isMe && (
              <span>
                {message.status === 'read' || message.status === 'delivered' ? (
                  <CheckCheck className="w-3.5 h-3.5 text-white/90" />
                ) : (
                  <Check className="w-3.5 h-3.5 text-white/70" />
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

