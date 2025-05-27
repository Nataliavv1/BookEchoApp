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

export const useLlistes = () => useContext(LlistesContext);
