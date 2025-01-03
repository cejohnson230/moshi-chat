import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
  userId: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId] = useState(() => {
    // Check if userId exists in sessionStorage
    const existingUserId = sessionStorage.getItem('userId');
    if (existingUserId) return existingUserId;
    
    // Generate new userId if none exists
    const newUserId = `user_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('userId', newUserId);
    return newUserId;
  });

  return (
    <UserContext.Provider value={{ userId }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 