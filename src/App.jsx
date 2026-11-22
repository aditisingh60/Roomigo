import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { MatchProvider } from './context/MatchContext';
import { ChatProvider } from './context/ChatContext';

function App() {
  return (
    <AuthProvider>
      <MatchProvider>
        <ChatProvider>
          <AppRoutes />
        </ChatProvider>
      </MatchProvider>
    </AuthProvider>
  );
}

export default App;

