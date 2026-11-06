import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bell, LogOut, Search, UserRound } from 'lucide-react';

const Header = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="main-header">
      <div className="header-brand">
        <Link to="/" className="brand-link">
          <span className="mobile-brand-mark">S</span>
          <span>Stockwise</span>
        </Link>
      </div>
      <nav className="header-nav">
        <ul className="nav-list">
          <li className="nav-item header-search">
            <Search size={16} aria-hidden="true" />
            <input aria-label="Search" placeholder="Search inventory..." />
          </li>
          <li className="nav-item header-icon-button" aria-label="Notifications">
            <Bell size={18} />
            <span className="notification-dot" />
          </li>
          <li className="nav-item">
            <span className="user-avatar"><UserRound size={17} /></span>
            <span className="user-info"><small>Signed in as</small>{user?.name || 'User'}</span>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="nav-link nav-btn" aria-label="Logout">
              <LogOut size={17} /><span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
