import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'active' : '';

  return (
    <header>
      <div className="container header-inner">
        {/* Logo */}
        <div className="header-logo">
          <Link to="/">
            <span className="logo-text">VR<span className="logo-accent">Construction</span></span>
          </Link>
        </div>

        {/* Contact Info */}
        <div className="header-contact">
          <ul>
            <li>
              <i className="fa fa-map-marker"></i>
              <div>
                <p>44 New Design Street,<br />Melbourne 005</p>
              </div>
            </li>
            <li>
              <i className="fa fa-phone"></i>
              <div>
                <h6>+61 (123) 456 789</h6>
                <p>info@vrconstruction.com</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Mobile Toggle */}
        <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <i className={`fa ${menuOpen ? 'fa-times' : 'fa-navicon'}`}></i>
        </button>

        {/* Navigation */}
        <nav>
          <ul className={`ownmenu ${menuOpen ? 'open' : ''}`}>
            <li className={isActive('/')}>
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li className={isActive('/about')}>
              <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            </li>
            <li className={isActive('/services')}>
              <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
            </li>
            <li className={isActive('/gallery')}>
              <Link to="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>
            </li>
            <li className={isActive('/blog')}>
              <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
            </li>
            <li className={isActive('/contact')}>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
