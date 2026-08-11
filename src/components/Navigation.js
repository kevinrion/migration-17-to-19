import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <NavLink exact to="/" activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/contact" activeClassName="active">
        Contact
      </NavLink>
      <NavLink to="/profile" activeClassName="active">
        Profile
      </NavLink>
    </nav>
  );
}

export default Navigation;
