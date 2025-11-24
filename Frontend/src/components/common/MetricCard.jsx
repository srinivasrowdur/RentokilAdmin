import React from 'react';
import { theme } from '../../utils/theme';

export const MetricCard = ({ label, value, change, trend, color, subtitle }) => (
  <div
    style={{
      background: theme.colors.surface,
      borderRadius: '16px',
      padding: '24px',
      border: `1px solid ${theme.colors.border}`,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = theme.shadows.hover;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    <div style={{
      fontSize: '12px',
      color: theme.colors.text.secondary,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontWeight: '500',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}>
      {color && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />}
      {label}
    </div>
    <div style={{
      fontSize: '28px',
      fontWeight: '600',
      letterSpacing: '-0.03em',
      color: theme.colors.text.primary,
      marginBottom: '4px',
    }}>
      {value}
    </div>
    {subtitle && (
      <div style={{ fontSize: '12px', color: theme.colors.text.secondary, marginBottom: '4px' }}>
        {subtitle}
      </div>
    )}
    {change && (
      <div style={{
        fontSize: '12px',
        fontWeight: '500',
        color: trend === 'up' ? theme.colors.status.active : trend === 'down' ? theme.colors.status.error : theme.colors.text.secondary,
      }}>
        {change}
      </div>
    )}
  </div>
);

