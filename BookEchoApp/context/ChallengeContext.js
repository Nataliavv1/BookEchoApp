import React, { createContext, useState, useContext } from 'react';
import challengesData from '../components/data/challengesData';

const ChallengeContext = createContext();

export const ChallengeProvider = ({ children }) => {
  const [myChallenges, setMyChallenges] = useState([]);
  const [availableChallenges, setAvailableChallenges] = useState(challengesData);

  const startChallenge = (challenge) => {
    setMyChallenges([...myChallenges, challenge]);
    setAvailableChallenges(availableChallenges.filter((item) => item.id !== challenge.id));
  };

  return (
    <ChallengeContext.Provider value={{ myChallenges, availableChallenges, startChallenge }}>
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallenges = () => useContext(ChallengeContext);