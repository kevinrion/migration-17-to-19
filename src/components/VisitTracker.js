import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export function VisitTracker ({ children }) {
  const { appLabel, visitCount } = useContext(AppContext);
  return (
    <span className="visit-tracker">
      {AppContext.appLabel} — visits: {AppContext.visitCount}
    </span>
  );
}
