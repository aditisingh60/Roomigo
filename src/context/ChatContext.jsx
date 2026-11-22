import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { initialConversations } from '../data/messages';
import { useMatch } from './MatchContext';

const ChatContext = createContext();

// Helper to format current time like "10:45 AM"
const formatCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const ChatProvider = ({ children }) => {
  const { matches } = useMatch();

  // Load conversations from localStorage or initialize with seed conversations
  const [conversations, setConversations] = useState(() => {
    try {
      const saved = localStorage.getItem('roomigo_conversations');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse conversations from localStorage', e);
    }
    return initialConversations;
  });

  const [activeConversationId, setActiveConversationId] = useState(() => {
    return initialConversations.length > 0 ? initialConversations[0].id : null;
  });

  // Typing indicator simulation state (holds participantId or null)
  const [isTyping, setIsTyping] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('roomigo_conversations', JSON.stringify(conversations));
    } catch (e) {
      console.error('Failed to save conversations to localStorage', e);
    }
  }, [conversations]);

  // MATCH INTEGRATION:
  // Automatically create a conversation whenever a new mutual match occurs in MatchContext!
  useEffect(() => {
    if (!matches || matches.length === 0) return;

    setConversations((prev) => {
      let updated = [...prev];
      let hasChanges = false;

      matches.forEach((matchedUser) => {
        const convId = `conv_${matchedUser.id}`;
        const exists = updated.some((c) => c.id === convId || c.participantId === matchedUser.id);

        if (!exists) {
          hasChanges = true;
          const newConversation = {
            id: convId,
            participantId: matchedUser.id,
            participant: {
              id: matchedUser.id,
              name: matchedUser.name,
              age: matchedUser.age,
              gender: matchedUser.gender || 'Unknown',
              occupation: matchedUser.occupation || matchedUser.occupationType,
              institution: matchedUser.institution || '',
              location: matchedUser.location || matchedUser.locationBudget?.preferredLocality || 'Bengaluru',
              image: matchedUser.image || (matchedUser.images && matchedUser.images[0]),
              bio: matchedUser.bio || 'Excited to find a compatible flatmate!',
              lifestyle: matchedUser.lifestyle || {},
              roomPreferences: matchedUser.roomPreferences || {},
              locationBudget: matchedUser.locationBudget || {},
              isOnline: true,
              lastSeen: 'Online',
            },
            lastMessageText: `Hey! We're a mutual match on Roomigo 🎉 Excited to connect!`,
            lastMessageTime: formatCurrentTime(),
            unreadCount: 1,
            messages: [
              {
                id: `msg_${Date.now()}`,
                senderId: matchedUser.id,
                text: `Hey! We matched on Roomigo 🎉 I saw our lifestyle preferences align really well. Are you looking for a place in ${matchedUser.location || 'Bengaluru'}?`,
                timestamp: formatCurrentTime(),
                date: 'Today',
                isMe: false,
                status: 'delivered',
              },
            ],
          };

          updated = [newConversation, ...updated];
        }
      });

      return hasChanges ? updated : prev;
    });
  }, [matches]);

  // Mark conversation messages as read
  const markAsRead = (conversationId) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === conversationId ? { ...c, unreadCount: 0 } : c))
    );
  };

  // Select conversation and mark as read
  const selectConversation = (conversationId) => {
    setActiveConversationId(conversationId);
    markAsRead(conversationId);
  };

  // SEND MESSAGE & SIMULATE REALISTIC BIDIRECTIONAL REPLY
  const sendMessage = (conversationId, messageText) => {
    if (!messageText.trim()) return;

    const time = formatCurrentTime();
    const newMessage = {
      id: `msg_${Date.now()}`,
      senderId: 'me',
      text: messageText.trim(),
      timestamp: time,
      date: 'Today',
      isMe: true,
      status: 'sent',
    };

    // Update conversation state with sent message
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            lastMessageText: messageText.trim(),
            lastMessageTime: time,
            messages: [...conv.messages, newMessage],
          };
        }
        return conv;
      })
    );

    // Update status to 'delivered' shortly after
    setTimeout(() => {
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === conversationId) {
            return {
              ...conv,
              messages: conv.messages.map((m) =>
                m.id === newMessage.id ? { ...m, status: 'delivered' } : m
              ),
            };
          }
          return conv;
        })
      );
    }, 400);

    // SIMULATE AUTOMATED REPLY AFTER 1.5s
    const activeConv = conversations.find((c) => c.id === conversationId);

    setTimeout(() => {
      setIsTyping(true);
    }, 900);

    setTimeout(() => {
      setIsTyping(false);

      // Contextual replies with Indian origin context
      let replyText = `That sounds awesome! I'm really excited about sharing a space. When can we check out some flats? 😊`;
      const lower = messageText.toLowerCase();

      if (lower.includes('coffee') || lower.includes('chai') || lower.includes('meet') || lower.includes('call')) {
        replyText = `I'd love to! Saturday afternoon works great for filter coffee in Koramangala or a quick call. What time suits you? ☕`;
      } else if (lower.includes('rent') || lower.includes('budget') || lower.includes('price')) {
        replyText = `That budget fits really well with the 2 BHK listings around HSR and Koramangala! 🏠`;
      } else if (lower.includes('when') || lower.includes('move') || lower.includes('date')) {
        replyText = `I'm aiming for the 1st of next month, but I can be flexible by a week or two!`;
      } else if (lower.includes('pet') || lower.includes('dog') || lower.includes('cat')) {
        replyText = `I love pets! Having a pet around makes the flat feel like home 🐾`;
      }

      const replyTime = formatCurrentTime();
      const replyMessage = {
        id: `msg_${Date.now() + 1}`,
        senderId: activeConv?.participantId || 'partner',
        text: replyText,
        timestamp: replyTime,
        date: 'Today',
        isMe: false,
        status: 'delivered',
      };

      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === conversationId) {
            return {
              ...conv,
              lastMessageText: replyText,
              lastMessageTime: replyTime,
              unreadCount: activeConversationId === conversationId ? 0 : (conv.unreadCount || 0) + 1,
              messages: [...conv.messages, replyMessage],
            };
          }
          return conv;
        })
      );
    }, 2400);
  };

  const activeConversation = conversations.find((c) => c.id === activeConversationId) || null;

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversationId,
        activeConversation,
        isTyping,
        selectConversation,
        sendMessage,
        markAsRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
