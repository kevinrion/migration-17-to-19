import { createContext, useState } from 'react';

// https://react.dev/blog/2024/04/25/react-19-upgrade-guide#removed-removing-legacy-context

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [visitCount, setVisitCount] = useState(0);
  const appLabel = 'React 17 SPA';
  function incrementVisit() {
    setVisitCount((count) => count + 1);
  }
  return (
    <AppContext.Provider value={{ visitCount, appLabel, incrementVisit }}>
      {children}
    </AppContext.Provider>
  );
}
