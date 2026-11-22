import React, { createContext, useContext, useState } from 'react';
import { initialMessages } from '../data/messages';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState(initialMessages);
  const [activeChat, setActiveChat] = useState(null);

  const sendMessage = (conversationId, messageText) => {
    const newMessage = {
      id: Date.now(),
      sender: 'You',
      text: messageText,
      timestamp: 'Just now',
      isMe: true,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        messages,
        activeChat,
        setActiveChat,
        sendMessage,
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

