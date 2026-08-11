import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>React 17 SPA</h1>
          <Navigation />
        </header>
        <main className="app-main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/contact" component={Contact} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </main>
        <footer className="app-footer">
          <p>Built with React 17.0.2</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
