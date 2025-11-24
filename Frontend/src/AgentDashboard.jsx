import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Overview } from './components/views/Overview';
import { Performance } from './components/views/Performance';
import { Compliance } from './components/views/Compliance';
import { Costs } from './components/views/Costs';
import { useAgentData } from './hooks/useAgentData';
import { theme } from './utils/theme';

/**
 * Main Agent Dashboard Container
 * 
 * Architectural Decisions:
 * 1. Separation of Concerns: Logic (hooks) vs Presentation (components).
 * 2. Single Source of Truth: Data is fetched once in the container and passed down.
 * 3. Modular Views: Each section is its own component for maintainability.
 * 4. Theming: Centralized design tokens for consistent UI.
 */
export default function AgentDashboard() {
  const [activeNav, setActiveNav] = useState('overview');
  
  // Data hook - ready for real-time WebSocket implementation
  const data = useAgentData();

  // Render content based on active navigation
  // This pattern allows for code splitting if we wrap these in React.Suspense later
  const renderContent = () => {
    switch (activeNav) {
      case 'overview': return <Overview data={data} onNavigate={setActiveNav} />;
      case 'performance': return <Performance data={data} />;
      case 'compliance': return <Compliance data={data} />;
      case 'costs': return <Costs data={data} />;
      case 'settings': 
        return (
          <div style={{
            background: theme.colors.surface,
            borderRadius: '20px',
            padding: '32px',
            border: `1px solid ${theme.colors.border}`,
          }}>
            <p style={{ color: theme.colors.text.secondary, fontSize: '14px' }}>Settings panel coming soon...</p>
          </div>
        );
      default: return <Overview data={data} onNavigate={setActiveNav} />;
    }
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: theme.colors.background,
      fontFamily: theme.typography.fontFamily,
      color: theme.colors.text.primary,
    }}>
      {/* Sidebar Navigation */}
      <Sidebar activeNav={activeNav} onNavigate={setActiveNav} />

      {/* Main Content Area */}
      <main style={{
        flex: 1,
        marginLeft: '260px', // Matching sidebar width
        padding: '40px 48px',
      }}>
        {renderContent()}
      </main>
    </div>
  );
}
