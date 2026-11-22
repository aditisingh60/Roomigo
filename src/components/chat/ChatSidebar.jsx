import React, { useState } from 'react';
import { Search, MessageSquare, Sparkles, Heart } from 'lucide-react';
import ConversationItem from './ConversationItem';

const ChatSidebar = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  matches = [],
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Total unread messages across all conversations
  const totalUnread = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  // Filter conversations by participant name or last message text
  const filteredConversations = conversations.filter((conv) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    const nameMatch = (conv.participant?.name || '').toLowerCase().includes(q);
    const msgMatch = (conv.lastMessageText || '').toLowerCase().includes(q);
    return nameMatch || msgMatch;
  });

  return (
    <aside className="w-full h-full flex flex-col bg-white border-r border-slate-200/80 overflow-hidden">
      {/* Sidebar Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-[#252333] tracking-tight">
              Messages
            </h2>
            {totalUnread > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#7056D8] text-white text-xs font-bold shadow-sm">
                {totalUnread}
              </span>
            )}
          </div>
        </div>

        {/* Bumble-Style "New Matches" Horizontal Strip */}
        {matches.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7056D8] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#FF8BA7]" /> Matched Roomies ({matches.length})
            </span>
            <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
              {matches.map((matchedUser) => {
                const convId = `conv_${matchedUser.id}`;
                const isSelected = activeConversationId === convId;

                return (
                  <button
                    key={matchedUser.id}
                    type="button"
                    onClick={() => onSelectConversation(convId)}
                    className="flex flex-col items-center gap-1 flex-shrink-0 group cursor-pointer"
                  >
                    <div
                      className={`relative w-12 h-12 rounded-full p-0.5 transition-all ${
                        isSelected
                          ? 'ring-2 ring-[#7056D8] scale-105'
                          : 'ring-1 ring-slate-200 hover:ring-[#7056D8]/50'
                      }`}
                    >
                      <img
                        src={
                          matchedUser.image ||
                          (matchedUser.images && matchedUser.images[0]) ||
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
                        }
                        alt={matchedUser.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                    </div>
                    <span className="text-[10px] font-bold text-[#252333] max-w-[50px] truncate group-hover:text-[#7056D8]">
                      {matchedUser.name?.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Search Conversations Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#656377] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-9 pr-4 py-2 bg-[#FAF9F6] border border-slate-200 rounded-xl text-xs sm:text-sm text-[#252333] focus:outline-none focus:ring-2 focus:ring-[#7056D8] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Conversations List Scroll Area */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conv) => (
            <ConversationItem
              key={conv.id}
              conversation={conv}
              isActive={activeConversationId === conv.id}
              onClick={() => onSelectConversation(conv.id)}
            />
          ))
        ) : (
          <div className="p-8 text-center text-xs text-[#656377] space-y-2">
            <MessageSquare className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="font-semibold text-[#252333]">No conversations found</p>
            <p>Try searching with another name or message.</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default ChatSidebar;

