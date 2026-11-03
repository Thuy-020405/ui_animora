import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount } from '@/types';
import { safeGetStorage, safeSetStorage, safeRemoveStorage } from '@/utils/cartLogic';

interface AuthContextType {
  currentUser: UserAccount | null;
  setCurrentUser: (user: UserAccount | null) => void;
  isLoggedIn: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() =>
    safeGetStorage<UserAccount | null>('animora_current_user', null)
  );

  useEffect(() => {
    if (currentUser) {
      safeSetStorage('animora_current_user', currentUser);
    } else {
      safeRemoveStorage('animora_current_user');
    }
  }, [currentUser]);

  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, isLoggedIn: Boolean(currentUser), logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
