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
    const candidate = initialUsers[0]; // Ananya Sharma
    likeProfile(candidate, currentUser);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Container Frame styled to match serene website aesthetic */}
      <div className="bg-[#FAF6EE] rounded-[32px] border border-[#556852]/20 shadow-xl overflow-hidden h-[82vh] min-h-[600px] flex">
        {/* CONDITION 1: Friendly Empty State when User Has No Matches */}
        {conversations.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-6 max-w-md mx-auto">
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl bg-[#EBF1EA] text-[#556852] flex items-center justify-center shadow-md border border-[#556852]/20">
                <MessageSquare className="w-10 h-10 stroke-[1.8]" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#F7E599] text-[#232B20] flex items-center justify-center shadow-md border border-[#556852]/20">
                <Heart className="w-4 h-4 fill-[#232B20]" />
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#232B20]">
                No Connections Yet
              </h2>
              <p className="text-xs sm:text-sm text-[#616E5E] leading-relaxed">
                The messaging sanctuary is accessible only to flatmates who have mutually matched.
                Head over to Discover to explore compatible souls!
              </p>
            </div>

            <div className="w-full space-y-3 pt-2">
              <Link to="/discover" className="w-full block">
                <Button
                  variant="butter"
                  size="lg"
                  icon={Compass}
                  className="w-full shadow-md text-xs uppercase tracking-[0.2em]"
                >
                  Start Discovering Flatmates
                </Button>
              </Link>

              {/* Instant match simulator button for testing convenience */}
              <button
                type="button"
                onClick={handleSimulateMatch}
                className="text-xs text-[#556852] hover:text-[#232B20] underline transition-colors cursor-pointer"
              >
                Instant Match with Demo Profile
              </button>
            </div>
          </div>
        ) : (
          /* CONDITION 2: Normal Chat Interface with Responsive Layout */
          <>
            {/* Left Sidebar (hidden on mobile when viewing chat window) */}
            <div
              className={`w-full md:w-80 lg:w-96 flex-shrink-0 h-full ${
                mobileViewingChat ? 'hidden md:block' : 'block'
              }`}
            >
              <ChatSidebar
                conversations={conversations}
                activeConversationId={activeConversationId}
                onSelectConversation={handleSelect}
                matches={matches}
              />
            </div>

            {/* Right Chat Window (hidden on mobile when viewing sidebar) */}
            <div
              className={`flex-1 h-full min-w-0 ${
                !mobileViewingChat ? 'hidden md:block' : 'block'
              }`}
            >
              {activeConversation ? (
                <ChatWindow
                  conversation={activeConversation}
                  isTyping={isTyping}
                  onSendMessage={sendMessage}
                  onBack={() => setMobileViewingChat(false)}
                  isMobileView={mobileViewingChat}
                />
              ) : (
                /* CONDITION 3: Empty State when no conversation is selected */
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-4 bg-[#F8F3EA]/60">
                  <div className="w-16 h-16 rounded-full bg-[#EBF1EA] text-[#556852] flex items-center justify-center border border-[#556852]/20 shadow-sm">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-[#232B20]">
                    Select a Sanctuary Conversation
                  </h3>
                  <p className="text-xs sm:text-sm text-[#616E5E] max-w-sm leading-relaxed">
                    Choose a matched flatmate from the sidebar to begin discussing move-in dates,
                    habits, and coffee routines.
                  </p>
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
