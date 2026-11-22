import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
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
    <aside className="w-full h-full flex flex-col bg-[#FAF6EE] border-r border-[#556852]/15 overflow-hidden">
      {/* Sidebar Header */}
      <div className="p-4 sm:p-5 border-b border-[#556852]/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-normal text-[#232B20] tracking-tight">
              Messages
            </h2>
            {totalUnread > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#556852] text-[#FAF6EE] text-[10px] font-bold shadow-sm">
                {totalUnread}
              </span>
            )}
          </div>
        </div>

        {/* Bumble-Style "New Matches" Horizontal Strip */}
        {matches.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#556852] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C59B27]" /> Matched Roomies ({matches.length})
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
                          ? 'ring-2 ring-[#556852] scale-105'
                          : 'ring-1 ring-[#556852]/20 hover:ring-[#556852]/60'
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
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#556852] rounded-full border-2 border-[#FAF6EE]" />
                    </div>
                    <span className="text-[10px] font-medium text-[#232B20] max-w-[50px] truncate group-hover:text-[#556852]">
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
          <Search className="w-3.5 h-3.5 text-[#616E5E] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-9 pr-4 py-2 bg-white/80 border border-[#556852]/20 rounded-full text-xs sm:text-sm text-[#232B20] focus:outline-none focus:ring-2 focus:ring-[#556852] focus:bg-white transition-all placeholder:text-[#616E5E]/60"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1 divide-y-0">
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
          <div className="p-8 text-center text-xs text-[#616E5E]">
            No conversations match your search.
          </div>
        )}
      </div>
    </aside>
  );
};

export default ChatSidebar;
