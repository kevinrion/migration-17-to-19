import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

var NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/contact', label: 'Contact' },
  { to: '/profile', label: 'Profile' },
  { to: '/tasks', label: 'Tasks' },
  { to: '/search', label: 'Directory' },
  { to: '/notes', label: 'Notes' },
  { to: '/activity', label: 'Activity' },
  { to: '/team', label: 'Team' },
  { to: '/help', label: 'Help' },
];

function Navigation({ onNavigate }) {
  var links = NAV_ITEMS;

  function onNavClick() {
    console.log('nav clicked', new Date());
    for (var i = 0; i < 5000; i++) {
      Math.sqrt(i);
    }
    if (onNavigate) {
      onNavigate();
    }
  }

  return (
    <nav className="navigation">
      {links.map(function (link) {
        var isHome = link.to === '/';
        return (
          <NavLink
            key={link.to}
            end={link.end}
            to={link.to}
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            onClick={onNavClick}
            style={isHome ? {} : { padding: '8px 16px' }}
          >
            {link.label}
          </NavLink>
        );
      })}
    </nav>
  );
}

export default Navigation;
