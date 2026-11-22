import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Sparkles } from 'lucide-react';

const COMMON_EMOJIS = ['👋', '😊', '✨', '🏠', '☕', '🎉', '👍', '❤️', '🛋️', '📍', '🔑', '🪴', '🙌', '🌿'];

const QUICK_PROMPTS = [
  'Hey! Are you free for a flat visit?',
  'What is your target move-in date?',
  'Love your profile vibe! 🌿',
  'Do you prefer filter coffee or chai? ☕',
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
    <div className="p-3 sm:p-4 bg-[#FAF6EE] border-t border-[#556852]/15 relative">
      {/* Quick Prompts Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-[10px] font-bold text-[#556852] uppercase tracking-[0.2em] flex items-center gap-1 flex-shrink-0">
          <Sparkles className="w-3 h-3 text-[#C59B27]" /> Quick:
        </span>
        {QUICK_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSendMessage(prompt)}
            className="text-xs bg-[#EBF1EA] hover:bg-[#dce6d9] text-[#374435] border border-[#556852]/15 px-3 py-1 rounded-full whitespace-nowrap transition-colors flex-shrink-0 cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Emoji Picker Popup */}
      {showEmojiPicker && (
        <div
          ref={pickerRef}
          className="absolute bottom-20 left-4 z-50 bg-[#FAF6EE] rounded-2xl border border-[#556852]/20 shadow-2xl p-3 w-64 animate-scaleIn"
        >
          <div className="text-[11px] font-bold text-[#556852] uppercase tracking-wider mb-2">
            Reactions & Emojis
          </div>
          <div className="grid grid-cols-7 gap-1.5 text-lg">
            {COMMON_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => addEmoji(emoji)}
                className="w-7 h-7 flex items-center justify-center hover:bg-[#EBF1EA] rounded-lg transition-colors cursor-pointer"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Input Form */}
      <form onSubmit={handleSend} className="flex items-center gap-2">
        {/* Emoji Button */}
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-2 rounded-full text-[#616E5E] hover:text-[#556852] hover:bg-[#EBF1EA] transition-colors cursor-pointer"
          aria-label="Insert Emoji"
        >
          <Smile className="w-5 h-5" />
        </button>

        {/* Text Input */}
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Type your message..."
            className="w-full px-5 py-2.5 bg-white border border-[#556852]/25 rounded-full text-xs sm:text-sm text-[#232B20] placeholder:text-[#616E5E]/60 focus:outline-none focus:ring-2 focus:ring-[#556852] focus:bg-white transition-all shadow-none"
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim() || disabled}
          className="w-10 h-10 rounded-full bg-[#556852] hover:bg-[#435340] disabled:opacity-40 disabled:hover:bg-[#556852] text-[#FAF6EE] flex items-center justify-center transition-all cursor-pointer flex-shrink-0 shadow-sm active:scale-95"
          aria-label="Send message"
        >
          <Send className="w-4 h-4 -translate-x-0.5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
