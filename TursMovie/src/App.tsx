import { useState, useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen';
// import { CustomerApp } from './components/CustomerApp';
// import { KasirApp } from './components/KasirApp';
import { ChefApp } from './components/ChefApp';
import { OperatorApp } from './components/OperatorApp';
import IPhone16Frame from './components/iPhone16Frame';

export type UserRole = 'customer' | 'kasir' | 'chef' | 'operator' | null;

export interface User {
  id: string;
  username: string;
  role: UserRole;
  name: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading/splash screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (isLoading) {
    return (
      <IPhone16Frame>
        <div className="min-h-screen bg-gradient-to-br from-red-600 via-purple-700 to-pink-700 flex items-center justify-center relative overflow-hidden">
          {/* Animated background circles */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          
          <div className="text-center relative z-10">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-white rounded-[40px] flex items-center justify-center shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-500 rounded-[40px] opacity-20 animate-pulse"></div>
                <svg className="w-20 h-20 text-red-600 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
                </svg>
              </div>
            </div>
            <h1 className="text-white text-4xl mb-2">TursMovie</h1>
            <p className="text-red-200 mb-8">Your Premium Cinema Experience</p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      </IPhone16Frame>
    );
  }

  if (!currentUser) {
    return (
      <IPhone16Frame>
        <LoginScreen onLogin={handleLogin} />
      </IPhone16Frame>
    );
  }

  // Route to appropriate app based on role
  switch (currentUser.role) {
    // case 'customer':
    //   return (
    //     <IPhone16Frame>
    //       <CustomerApp user={currentUser} onLogout={handleLogout} />
    //     </IPhone16Frame>
    //   );
    // case 'kasir':
    //   return (
    //     <IPhone16Frame>
    //       <KasirApp user={currentUser} onLogout={handleLogout} />
    //     </IPhone16Frame>
    //   );
    case 'chef':
      return (
        <IPhone16Frame>
          <ChefApp user={currentUser} onLogout={handleLogout} />
        </IPhone16Frame>
      );
    case 'operator':
      return (
        <IPhone16Frame>
          <OperatorApp user={currentUser} onLogout={handleLogout} />
        </IPhone16Frame>
      );
    default:
      return (
        <IPhone16Frame>
          <LoginScreen onLogin={handleLogin} />
        </IPhone16Frame>
      );
  }
}

export default App;