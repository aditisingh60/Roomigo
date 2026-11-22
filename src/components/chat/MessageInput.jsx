import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Sparkles } from 'lucide-react';

const COMMON_EMOJIS = ['👋', '😊', '✨', '🏠', '☕', '🎉', '👍', '❤️', '🛋️', '📍', '🔑', '🍕', '🪴', '🐶', '🐱', '🙌'];

const QUICK_PROMPTS = [
  'Hey! Are you free for a flat tour?',
  'What is your target move-in date?',
  'Love your profile vibe! ✨',
];

const MessageInput = ({ onSendMessage, disabled = false }) => {
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);
  const pickerRef = useRef(null);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!text.trim() || disabled) return;
    onSendMessage(text);
    setText('');
    setShowEmojiPicker(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const addEmoji = (emoji) => {
    setText((prev) => prev + emoji);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="p-3 sm:p-4 bg-white border-t border-slate-200/80 relative">
      {/* Quick Prompts Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-[10px] font-bold text-[#7056D8] uppercase tracking-wider flex items-center gap-1 flex-shrink-0">
          <Sparkles className="w-3 h-3 text-[#FF8BA7]" /> Quick:
        </span>
        {QUICK_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSendMessage(prompt)}
            className="text-xs bg-[#F0ECFF] hover:bg-[#e4ddfc] text-[#7056D8] px-2.5 py-1 rounded-full whitespace-nowrap transition-colors flex-shrink-0 cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Emoji Picker Popup */}
      {showEmojiPicker && (
        <div
          ref={pickerRef}
          className="absolute bottom-20 left-4 z-50 bg-white rounded-2xl border border-slate-200 shadow-2xl p-3 w-64 animate-scaleIn"
        >
          <div className="text-xs font-bold text-[#656377] uppercase tracking-wider mb-2">
            Reactions & Emojis
          </div>
          <div className="grid grid-cols-6 gap-1.5 text-xl">
            {COMMON_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => addEmoji(emoji)}
                className="w-8 h-8 rounded-lg hover:bg-[#F0ECFF] flex items-center justify-center transition-colors cursor-pointer"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSend} className="flex items-center gap-2">
        {/* Emoji Trigger */}
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className={`p-2 rounded-full transition-colors cursor-pointer ${
            showEmojiPicker
              ? 'text-[#7056D8] bg-[#F0ECFF]'
              : 'text-[#656377] hover:text-[#252333] hover:bg-[#FAF9F6]'
          }`}
          title="Add emoji"
        >
          <Smile className="w-5 h-5" />
        </button>

        {/* Message Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={disabled}
          className="flex-1 px-4 py-2.5 bg-[#FAF9F6] border border-slate-200/90 rounded-full text-sm text-[#252333] focus:outline-none focus:ring-2 focus:ring-[#7056D8] focus:bg-white transition-all"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim() || disabled}
          className="w-10 h-10 rounded-full bg-[#7056D8] hover:bg-[#5d44c8] disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center shadow-md shadow-[#7056D8]/25 transition-all cursor-pointer active:scale-95 flex-shrink-0"
          title="Send message"
        >
          <Send className="w-4 h-4 -ml-0.5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;

