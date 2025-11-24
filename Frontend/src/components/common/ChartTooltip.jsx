import React from 'react';
import { theme } from '../../utils/theme';

export const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.98)',
        border: 'none',
        borderRadius: '12px',
        padding: '16px 20px',
        boxShadow: theme.shadows.card,
        backdropFilter: 'blur(20px)',
      }}>
        <p style={{ 
          margin: '0 0 12px 0', 
          fontWeight: '600', 
          color: theme.colors.text.primary,
          fontSize: '13px',
          letterSpacing: '-0.01em'
        }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ 
            margin: '6px 0', 
            color: entry.color,
            fontSize: '12px',
            fontWeight: '500'
          }}>
            {entry.name}: {typeof entry.value === 'number' && entry.name.includes('Cost') ? `$${entry.value.toLocaleString()}` : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

