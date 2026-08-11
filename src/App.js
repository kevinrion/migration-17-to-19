import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import { VisitTracker } from './components/VisitTracker';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import Search from './pages/Search';
import Notes from './pages/Notes';
import Activity from './pages/Activity';
import Team from './pages/Team';
import Help from './pages/Help';
import { APP_TITLE } from './constants';
import './App.css';

window.__APP_VERSION = '1.0.0';
window.__BUILD_DATE = '2021-03-15';

function App() {
  const [footerTick, setFooterTick] = useState(0);
  var flag = true;

  function FooterExtras() {
    return (
      <span className="footer-extras">
        {' '}| session tick: {footerTick}
      </span>
    );
  }

  document.body.dataset.appReady = 'true';
  document.title = APP_TITLE;

  return (
    <AppProvider>
      <Router>
        <div className="app">
          <header className="app-header">
            <h1>{APP_TITLE}</h1>
            <Navigation onNavigate={() => setFooterTick(footerTick + 1)} />
          </header>
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/search" element={<Search />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/team" element={<Team />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </main>
          <footer className="app-footer">
            <p>
              Built with React 17.0.2 + 19.2.8
              <VisitTracker />
              <FooterExtras />
              {flag ? null : 'broken'}
            </p>
          </footer>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
