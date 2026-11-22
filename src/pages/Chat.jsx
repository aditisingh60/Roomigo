import React, { useState } from 'react';
import { Send, MessageSquare, User } from 'lucide-react';
import Button from '../components/common/Button';
import { initialMessages } from '../data/messages';

const Chat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: 'You',
        text: input,
        timestamp: 'Just now',
        isMe: true,
      },
    ]);
    setInput('');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-3 h-[600px]">
      {/* Conversations List */}
      <div className="border-r border-slate-200 p-4 space-y-3">
        <h2 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-indigo-600" />
          Messages
        </h2>
        <div className="space-y-1">
          <div className="p-3 bg-indigo-50/70 rounded-lg flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-indigo-200 text-indigo-800 font-bold flex items-center justify-center text-sm">
              S
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">Sarah Jenkins</p>
              <p className="text-xs text-slate-500 truncate">Hey! When are you free for a call?</p>
            </div>
          </div>
          <div className="p-3 hover:bg-slate-50 rounded-lg flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-sm">
              D
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">David Chen</p>
              <p className="text-xs text-slate-500 truncate">The apartment looks great!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Conversation */}
      <div className="col-span-2 flex flex-col h-full">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
            S
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">Sarah Jenkins</h3>
            <p className="text-xs text-emerald-600">Online • 96% Match</p>
          </div>
        </div>

        {/* Message History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl text-sm ${
                  msg.isMe
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 border-t border-slate-200 flex gap-2 bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Button type="submit" variant="primary" size="md" icon={Send}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;

