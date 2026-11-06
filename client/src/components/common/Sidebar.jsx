// src/components/common/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  Boxes,
  ClipboardList,
  FileBarChart,
  LayoutDashboard,
  ShoppingCart,
  Truck,
  Users,
  UserRound,
  WalletCards,
} from 'lucide-react';

const Sidebar = () => {
  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Inventory', path: '/inventory', icon: Boxes },
    { name: 'Suppliers', path: '/suppliers', icon: Truck },
    { name: 'Customers', path: '/customers', icon: Users },
    { name: 'Purchases', path: '/purchases', icon: ClipboardList },
    { name: 'Sales', path: '/sales', icon: ShoppingCart },
    { name: 'Reports', path: '/reports', icon: FileBarChart },
    { name: 'Users', path: '/users', icon: UserRound },
    { name: 'Employee Salaries', path: '/employee-salaries', icon: WalletCards },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-brand">
          <span className="brand-mark"><BarChart3 size={19} strokeWidth={2.5} /></span>
          <div>
            <h2 className="sidebar-title">TWS Inventory</h2>
            <span className="sidebar-kicker">Operations hub</span>
          </div>
        </div>
        <div className="sidebar-section-label">Workspace</div>
        <nav>
          <ul className="sidebar-nav">
            {links.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                >
                  <link.icon size={18} strokeWidth={2.2} />
                  <span>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
