import React, { createContext, useState, useContext } from 'react';

const LlistesContext = createContext();

export const LlistesProvider = ({ children }) => {
  const [llistesPredet, setLlistesPredet] = useState({
    llegint: null,
    llegit: null,
    perLlegir: null
  });

  return (
    <LlistesContext.Provider value={{ llistesPredet, setLlistesPredet }}>
      {children}
    </LlistesContext.Provider>
  );
};

export const useLlistes = () => {
  const ctx = useContext(LlistesContext);
  if (!ctx)
    throw new Error('useLlistes must be used within a LlistesProvider');
  return ctx;
};
