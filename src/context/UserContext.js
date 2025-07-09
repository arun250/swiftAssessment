import React, { createContext, useState,useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const storedName = localStorage.getItem('userName') || 'Leanne Graham';
  const [userName, setUserName] = useState(storedName);

  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]);

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};
