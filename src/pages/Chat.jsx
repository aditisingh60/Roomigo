import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  MessageSquare,
  Sparkles,
  Heart,
  Compass,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatWindow from '../components/chat/ChatWindow';
import Button from '../components/common/Button';
import { useChat } from '../context/ChatContext';
import { useMatch } from '../context/MatchContext';
import { useAuth } from '../context/AuthContext';
import { initialUsers } from '../data/users';

const Chat = () => {
  const {
    conversations,
    activeConversationId,
    activeConversation,
    isTyping,
    selectConversation,
    sendMessage,
  } = useChat();

  const { matches, likeProfile } = useMatch();
  const { currentUser } = useAuth();
  const location = useLocation();

  // Mobile navigation state: track if mobile user is viewing chat window or sidebar
  const [mobileViewingChat, setMobileViewingChat] = useState(false);

  // If redirected from Matches with participantId, auto-select that conversation
  useEffect(() => {
    if (location.state?.participantId) {
      const targetConv = conversations.find(
        (c) => c.participantId === location.state.participantId
      );
      if (targetConv) {
        selectConversation(targetConv.id);
        setMobileViewingChat(true);
      }
    }
  }, [location.state, conversations, selectConversation]);

  // Handle conversation select
  const handleSelect = (convId) => {
    selectConversation(convId);
    setMobileViewingChat(true);
  };

  // Quick helper to simulate a match if user visits /chat before swiping on Discover
  const handleSimulateMatch = () => {
    const candidate = initialUsers[0]; // Maya Lin
    likeProfile(candidate, currentUser);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Container Frame */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden h-[80vh] min-h-[580px] flex">
        {/* CONDITION 1: Friendly Empty State when User Has No Matches */}
        {conversations.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-6 max-w-md mx-auto">
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl bg-[#F0ECFF] text-[#7056D8] flex items-center justify-center shadow-lg shadow-[#7056D8]/15">
                <MessageSquare className="w-10 h-10 stroke-[2]" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#FF8BA7] text-white flex items-center justify-center shadow-md">
                <Heart className="w-4 h-4 fill-white" />
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252333]">
                No Matches Yet
              </h2>
              <p className="text-sm text-[#656377] leading-relaxed">
                The chat system is accessible only to users who have mutually matched. Head over to Discover to swipe right on potential flatmates!
              </p>
            </div>

            <div className="w-full space-y-3 pt-2">
              <Link to="/discover" className="w-full block">
                <Button
                  variant="primary"
                  size="lg"
                  icon={Compass}
                  className="w-full shadow-lg shadow-[#7056D8]/25 font-bold"
                >
                  Start Swiping on Discover
                </Button>
              </Link>

              {/* Instant match simulator button for testing convenience */}
              <button
                type="button"
                onClick={handleSimulateMatch}
                className="text-xs font-semibold text-[#7056D8] hover:underline flex items-center justify-center gap-1.5 w-full cursor-pointer py-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FF8BA7]" />
                Simulate a match with Maya Lin for instant testing
              </button>
            </div>
          </div>
        ) : (
          /* CONDITION 2: Active Chat Interface (WhatsApp Web / Bumble Style) */
          <>
            {/* Left Sidebar (Desktop: always visible, Mobile: visible when not viewing chat) */}
            <div
              className={`w-full md:w-[360px] lg:w-[400px] flex-shrink-0 h-full ${
                mobileViewingChat ? 'hidden md:flex' : 'flex'
              }`}
            >
              <ChatSidebar
                conversations={conversations}
                activeConversationId={activeConversationId}
                onSelectConversation={handleSelect}
                matches={matches}
              />
            </div>

            {/* Right Chat Window (Desktop: always visible, Mobile: visible when viewing chat) */}
            <div
              className={`flex-1 h-full ${
                !mobileViewingChat ? 'hidden md:flex' : 'flex'
              }`}
            >
              {activeConversation ? (
                <div className="w-full h-full">
                  <ChatWindow
                    conversation={activeConversation}
                    isTyping={isTyping}
                    onSendMessage={sendMessage}
                    onBack={() => setMobileViewingChat(false)}
                    isMobileView={mobileViewingChat}
                  />
                </div>
              ) : (
                /* Empty state when no conversation is selected (desktop) */
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-4 bg-[#FAF9F6]/50">
                  <div className="w-16 h-16 rounded-3xl bg-[#F0ECFF] text-[#7056D8] flex items-center justify-center shadow-md">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold text-[#252333]">
                      Select a Conversation
                    </h3>
                    <p className="text-xs text-[#656377] max-w-xs">
                      Choose a matched roomie from the sidebar to view your messages and chat.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
