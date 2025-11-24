/**
 * Sidebar Component
 * 
 * Fixed navigation sidebar for the Agentic Factory dashboard.
 * Contains the logo, main navigation menu, and user profile section.
 * 
 * The sidebar uses a controlled pattern - the active state and navigation
 * handler are passed in as props from the parent container.
 * 
 * @module components/layout/Sidebar
 */

import React from 'react';
import { theme } from '../../utils/theme';

/**
 * Navigation menu items configuration
 * Each item defines a route with icon, label, and ID
 */
const navItems = [
  { id: 'overview', label: 'Overview', icon: '◉' },
  { id: 'performance', label: 'Performance', icon: '⚡' },
  { id: 'compliance', label: 'Compliance', icon: '🛡' },
  { id: 'costs', label: 'Costs', icon: '◈' },
  { id: 'settings', label: 'Settings', icon: '◇' },
];

/**
 * Renders the main navigation sidebar
 * 
 * @param {Object} props - Component props
 * @param {string} props.activeNav - Currently active navigation item ID
 * @param {Function} props.onNavigate - Handler called when nav item is clicked
 * 
 * @example
 * <Sidebar 
 *   activeNav="overview" 
 *   onNavigate={(id) => setActiveNav(id)} 
 * />
 */
export const Sidebar = ({ activeNav, onNavigate }) => {
  return (
    <aside style={{
      width: '260px',
      background: theme.colors.surface,
      borderRight: `1px solid ${theme.colors.border}`,
      padding: '32px 0',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      height: '100vh',
      left: 0,
      top: 0,
    }}>
      {/* ============================================
          Logo Section
          ============================================ */}
      <div style={{
        padding: '0 28px',
        marginBottom: '40px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        {/* Logo Icon */}
        <div style={{
          width: '36px',
          height: '36px',
          background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)', // Rentokil red
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '18px',
          fontWeight: '600',
        }}>
          A
        </div>
        
        {/* Logo Text */}
        <div>
          <div style={{
            fontSize: '17px',
            fontWeight: '600',
            letterSpacing: '-0.02em',
            color: theme.colors.text.primary,
          }}>
            Agentic Factory
          </div>
          <div style={{
            fontSize: '11px',
            color: theme.colors.text.secondary,
            letterSpacing: '0.01em',
            marginTop: '1px',
          }}>
            Admin Console
          </div>
        </div>
      </div>

      {/* ============================================
          Navigation Menu
          ============================================ */}
      <nav style={{ flex: 1, padding: '0 16px' }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              border: 'none',
              borderRadius: '10px',
              // Active state styling
              background: activeNav === item.id ? 'rgba(220, 38, 38, 0.08)' : 'transparent',
              color: activeNav === item.id ? '#DC2626' : '#6e6e73',
              fontSize: '14px',
              fontWeight: activeNav === item.id ? '600' : '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginBottom: '4px',
              textAlign: 'left',
              letterSpacing: '-0.01em',
            }}
            // Hover effect for inactive items
            onMouseEnter={(e) => {
              if (activeNav !== item.id) {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.03)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeNav !== item.id) {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <span style={{ 
              fontSize: '16px',
              opacity: activeNav === item.id ? 1 : 0.7,
            }}>
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* ============================================
          User Profile Section
          ============================================ */}
      <div style={{
        padding: '20px 24px',
        borderTop: `1px solid ${theme.colors.border}`,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        {/* User Avatar */}
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f5f5f7 0%, #e8e8ed 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: '600',
          color: '#6e6e73',
        }}>
          S
        </div>
        
        {/* User Info */}
        <div>
          <div style={{
            fontSize: '13px',
            fontWeight: '600',
            color: theme.colors.text.primary,
            letterSpacing: '-0.01em',
          }}>
            Srini
          </div>
          <div style={{
            fontSize: '11px',
            color: theme.colors.text.secondary,
          }}>
            Administrator
          </div>
        </div>
      </div>
    </aside>
  );
};
